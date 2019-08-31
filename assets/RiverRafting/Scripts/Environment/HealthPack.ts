import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";
import CollectiblesPool from "../Pools/CollectiblesPool";
import Player from "../Player";
import HealthManager from "../Managers/HealthManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthPack extends Collectibles {
    @property
    health: number = 20;

    start() {
        this.myType = CollectibleType.Health;
    }
    onEnable() {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
    }
    onDisable() {
        this.myPos = 0;
    }
    update(dt) {
        if (this.node.active) {
            if (Player.Instance.node.position.y - 500 > this.myPos) {
                // console.log('healthpack, player is above me');
                // this._CollectiblePool.addCollectibleBackToPool(this.node);
                CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('player collided health');
            // this._player.getComponent('HealthManager').increaseHP(this.health);
            // this._CollectiblePool.addCollectibleBackToPool(this.node);

            Player.Instance.node.getComponent(HealthManager).increaseHP(this.health);
            CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
        }
    }
}
