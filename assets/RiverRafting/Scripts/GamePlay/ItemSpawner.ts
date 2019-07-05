import CollectiblesPool from "../Pools/CollectiblesPool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemSpawner extends cc.Component
{
    @property
    healthPackSpawnTime: number = 30;

    @property
    coinPackSpawnTime: number = 15;

    @property({
        type: CollectiblesPool,
        visible: true,
        serializable: true
    })
    _CollectiblePoolRef: CollectiblesPool = null;

    currentTimeHealth: number = 0;
    currentTimeCoin: number = 0;
    sequenceHealth: cc.ActionInterval;
    sequenceCoin: cc.ActionInterval;

    SpawnPos: cc.Node[] = [];

    // onLoad () {}

    start()
    {
        this.restartTimerForPack('healthpack');
        this.startTimerForPack('healthpack');
    }

    restartTimerForPack(name: string)
    {
        if (name == 'healthpack')
        {
            this.currentTimeHealth = this.healthPackSpawnTime;
        }
        else if (name == 'coinpack')
        {
            this.currentTimeCoin = this.coinPackSpawnTime;
        }
    }

    startTimerForPack(packName: string)
    {
        if (packName == 'healthpack')
        {
            var time = cc.delayTime(1);
            this.sequenceHealth = cc.sequence(time, cc.callFunc(this.countdownHealth, this));
            this.node.runAction(this.sequenceHealth.repeatForever());
        }
        else if (packName == 'coinpack')
        {
            var time = cc.delayTime(1);
            this.sequenceCoin = cc.sequence(time, cc.callFunc(this.countdownCoin, this));
            this.node.runAction(this.sequenceCoin.repeatForever());
        }
    }

    countdownHealth()
    {
        if (this.currentTimeHealth > 0)
        {
            this.currentTimeHealth -= 1;
        }
        else
        {
            //trigger new spawn for item
            this.node.stopAction(this.sequenceHealth);
            this.SpawnHealthPack();
            this.restartTimerForPack('healthpack');
            this.startTimerForPack('healthpack');
        }
    }

    countdownCoin()
    {
        
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