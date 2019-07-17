import CollectiblesPool from "../Pools/CollectiblesPool";
import ObstaclePool from "../Pools/ObstaclePool";

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
    _CollectiblePool: CollectiblesPool = null;

    currentTimeHealth: number = 0;
    currentTimeCoin: number = 0;
    sequenceHealth: cc.ActionInterval;
    sequenceCoin: cc.ActionInterval;

    SpawnPos: cc.Node[] = [];

    onGameStart()
    {
        //spawn health packs
        this.restartTimerForPack('healthpack');
        this.startTimerForPack('healthpack');

        //spawn coin packs
        this.restartTimerForPack('coinpack');
        this.startTimerForPack('coinpack');
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
        if (this.currentTimeCoin > 0)
        {
            this.currentTimeCoin -= 1;
        }
        else
        {
            // trigger new spawn for item
            this.node.stopAction(this.sequenceCoin);
            this.SpawnCoinPack();
            this.restartTimerForPack('coinpack');
            this.startTimerForPack('coinpack');
        }
    }

    SpawnHealthPack()
    {
        var healthpack = this._CollectiblePool.getCollectibleFromPool('healthpack');

        var parent = this.getRandomSpawnPos();

        if (healthpack.parent != null)
        {
            healthpack.parent.removeChild(healthpack);
        }

        parent.active = true;
        parent.addChild(healthpack);
        healthpack.setPosition(cc.Vec2.ZERO);

        healthpack.active = true;
    }

    SpawnCoinPack()
    {
        var coinpack = this._CollectiblePool.getCollectibleFromPool('coinpack');

        var parent = this.getRandomSpawnPos();

        if (coinpack.parent != null)
        {
            coinpack.parent.removeChild(coinpack);
        }
        parent.active = true;
        parent.addChild(coinpack);
        coinpack.setPosition(cc.Vec2.ZERO);

        coinpack.active = true;
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