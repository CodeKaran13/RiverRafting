import Player from "../Player";
import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";
import ObstaclePool from "../Pools/ObstaclePool";
import BonusSystem from "../GamePlay/BonusSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cyclone extends Obstacles {

    triggerOnce: boolean = false;

    start() {
        this.myType = ObstacleType.Cyclone;
    }
    onEnable() {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        // console.log('cyclone pos: ' + this.myPos.y);
        // console.log('player pos: ' + this._player.position.y);
        this.node.getComponent(cc.Animation).play();
    }
    onDisable() {
        this.node.getComponent(cc.Animation).stop();
        // this._obstaclePool.addObstacleBackToPool(this.node);
        ObstaclePool.Instance.addObstacleBackToPool(this.node);
        this.myPos = 0;
    }

    update(dt) {
        if (this.node.active) {
            // console.log('cyclone pos: ' + this.myPos);
            // console.log('player pos: ' + this._player.position);
            if (Player.Instance.node.position.y - 500 > this.myPos.y) {

                // console.log('cyclone, player is above me');
                // this._obstaclePool.addObstacleBackToPool(this.node);
                ObstaclePool.Instance.addObstacleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self) {
        if (self.tag == 0 && other.node.name == 'Player') {
            if (!this.triggerOnce) {
                this.triggerOnce = true;
                BonusSystem.Instance.stopAction();
                // console.log('entered cyclone');
                // Player.Instance.IsCycloned = true;
                Player.Instance.startCyclone(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
                Player.Instance.startCycloneEffect(this.node);
            }
        }
        if (self.tag == 1 && other.node.name == 'Player') {
            // console.log('center');
            // this.node.active = false;
            other.node.getComponent(Player).reachedCenter = true;
        }
    }
}