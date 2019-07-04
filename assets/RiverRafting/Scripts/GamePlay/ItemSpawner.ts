import CollectiblesPool from "../Pools/CollectiblesPool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemSpawner extends cc.Component
{
    @property
    healthPackSpawnTime: number = 30;

    @property({
        type: CollectiblesPool,
        visible: true,
        serializable: true
    })
    _CollectiblePoolRef: CollectiblesPool = null;

    currentime: number = 0;
    sequence: cc.ActionInterval;

    SpawnPos: cc.Node[] = [];

    // onLoad () {}

    start()
    {
        this.restartTimer();
        this.startTimer();
    }

    restartTimer()
    {
        this.currentime = this.healthPackSpawnTime;
    }

    startTimer()
    {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.countdown, this));
        this.node.runAction(this.sequence.repeatForever());
    }

    countdown()
    {
        if (this.currentime > 0)
        {
            this.currentime -= 1;
        }
        else
        {
            //trigger new spawn for item
            this.node.stopAction(this.sequence);
            this.SpawnHealthPack();
            this.restartTimer();
            this.startTimer();
        }
    }

    SpawnHealthPack()
    {
        var healthpack = this._CollectiblePoolRef.getCollectibleFromPool('healthpack');

        var parent = this.getRandomSpawnPos();
        // console.log('spawnposition' + pos);

        if (healthpack.parent != null)
        {
            healthpack.parent.removeChild(healthpack);
        }

        parent.active = true;
        parent.addChild(healthpack);
        healthpack.setPosition(cc.Vec2.ZERO);

        healthpack.active = true;
        // console.log('healthpackposition' + healthpack.position);
    }

    getRandomSpawnPos(): cc.Node
    {
        var rand = Math.floor(Math.random() * this.SpawnPos.length);
        // return this.SpawnPos[rand].getPosition();
        if (this.SpawnPos[rand] != null)
        {
            // return this.SpawnPos[rand].convertToWorldSpace(cc.Vec2.ZERO);
            return this.SpawnPos[rand];
        }
        else
        {
            console.log('spawn pos is null');
        }
    }
}