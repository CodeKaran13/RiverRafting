import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";
import HealthManager from "../Managers/HealthManager";
import ObstaclePool from "../Pools/ObstaclePool";
import Player from "../Player";
import BonusSystem from "../GamePlay/BonusSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Logs extends Obstacles {

    start() {
        this.myType = ObstacleType.Log;
    }
    onEnable() {
        this.myAnimator.play();
        this.myPos = this.node.convertToWorldSpace(cc.Vec2.ZERO).y;
    }

    onDisable() {
        this.myPos = 0;
        this.myAnimator.stop();
    }

    update(dt) {
        if (this.node.active) {
            if (Player.Instance.node.position.y - 500 > this.myPos) {
                console.log('LOGS, player is above me');
                // this._obstaclePool.addObstacleBackToPool(this.node);
                ObstaclePool.Instance.addObstacleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            this.myAnimator.play('floating_wood_break');
            Player.Instance.node.getComponent(HealthManager).takeDamage(this.damage);
            BonusSystem.Instance.stopAction();
            // this._player.getComponent(HealthManager).takeDamage(this.damage);
        }
    }
}
