import CollectiblesPool from "../Pools/CollectiblesPool";
// import ObstaclePool from "../Pools/ObstaclePool";
import { CollectibleType } from "./Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemSpawner extends cc.Component {
    @property({
        type: CollectiblesPool,
        visible: true,
        serializable: true
    })
    _CollectiblePool: CollectiblesPool = null;

    healthSpawnPos: cc.Node[] = [];
    coinSpawnPos: cc.Node[] = [];
    humanSpawnPos: cc.Node[] = [];

    SpawnHealthPack() {
        var healthpack = this._CollectiblePool.getCollectibleFromPool(CollectibleType.Health);

        var spawnPosParent = this.getRandomHealthSpawnPos();

        if (healthpack.parent != null) {
            healthpack.parent.removeChild(healthpack);
        }

        // spawnPosParent.active = true;
        spawnPosParent.addChild(healthpack);
        healthpack.setPosition(cc.Vec2.ZERO);

        healthpack.active = true;
    }

    SpawnStarPack() {
        for (let i = 0; i < this.coinSpawnPos.length; i++) {
            var coinpack = this._CollectiblePool.getCollectibleFromPool(CollectibleType.Coins);

            if (coinpack.parent != null) {
                coinpack.parent.removeChild(coinpack);
            }

            this.coinSpawnPos[i].addChild(coinpack);
            coinpack.setPosition(cc.Vec2.ZERO);

            coinpack.active = true;
        }
    }

    SpawnDrowningHumans() {
        var collectible = this._CollectiblePool.getCollectibleFromPool(CollectibleType.DrowningHuman);
    }

    getRandomHealthSpawnPos(): cc.Node {
        var rand = Math.floor(Math.random() * this.healthSpawnPos.length);
        if (this.healthSpawnPos[rand] != null) {
            // console.log('spawn pos: ' + this.SpawnPos[rand].convertToNodeSpaceAR(cc.Vec2.ZERO));
            return this.healthSpawnPos[rand];
        }
        else {
            console.log('spawn pos is null');
        }
    }
    getRandomHumanSpawnPos(): cc.Node {
        var rand = Math.floor(Math.random() * this.humanSpawnPos.length);
        if (this.humanSpawnPos[rand] != null) {
            // console.log('spawn pos: ' + this.SpawnPos[rand].convertToNodeSpaceAR(cc.Vec2.ZERO));
            return this.humanSpawnPos[rand];
        }
        else {
            console.log('spawn pos is null');
        }
    }
}