import Player from "../Player";
import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cyclone extends Obstacles {

    triggerOnce: boolean = false;

    start() {
        this.myType = ObstacleType.Cyclone;
    }
    onEnable() {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.node.getComponent(cc.Animation).play();
    }
    onDisable() {
        this.node.getComponent(cc.Animation).stop();
        this.myPos = 0;
    }

    update(dt) {
        if (this.node.active) {
            if (this._player.position.y - 500 > this.myPos) {
                // console.log('coinpack, player is above me');
                this._obstaclePool.addObstacleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self) {
        if (self.tag == 0 && other.node.name == 'Player') {
            if (!this.triggerOnce) {
                this.triggerOnce = true;
                // console.log('entered cyclone');
                other.node.getComponent(Player).IsCycloned = true;
                other.node.getComponent(Player).startCyclone(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
                other.node.getComponent(Player).startCycloneEffect(this.node);
            }
        }
        if (self.tag == 1 && other.node.name == 'Player') {
            // console.log('center');
            // this.node.active = false;
            other.node.getComponent(Player).reachedCenter = true
        }
    }
}