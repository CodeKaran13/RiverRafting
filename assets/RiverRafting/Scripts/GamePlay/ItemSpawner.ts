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
        var coinpack = this._CollectiblePool.getCollectibleFromPool(CollectibleType.Coins);

        // var spawnPosParent = this.getRandomHealthSpawnPos();

        if (coinpack.parent != null) {
            coinpack.parent.removeChild(coinpack);
        }

        // spawnPosParent.active = true;
        // spawnPosParent.addChild(coinpack);
        // coinpack.setPosition(cc.Vec2.ZERO);

        // coinpack.active = true;
    }
    SpawnDrowningHumans() {
        var collectible = this._CollectiblePool.getCollectibleFromPool(CollectibleType.DrowningHuman);
    }

    getRandomHealthSpawnPos(): cc.Node {
        var rand = Math.floor(Math.random() * this.SpawnPos.length);
        if (this.SpawnPos[rand] != null) {
            // console.log('spawn pos: ' + this.SpawnPos[rand].convertToNodeSpaceAR(cc.Vec2.ZERO));
            return this.SpawnPos[rand];
        }
        else {
            console.log('spawn pos is null');
        }
    }
    getRandomCoinPacksNum() {

    }
}