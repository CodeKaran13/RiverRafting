import Player from "../Player";
import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";
import ObstaclePool from "../Pools/ObstaclePool";
import BonusSystem from "../GamePlay/BonusSystem";
import FollowPlayer from "./FollowPlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cyclone extends Obstacles {

    triggerOnce: boolean = false;

    start() {
        this.myType = ObstacleType.Cyclone;
    }
    onEnable() {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.myAnimator.play();

        this.startSequence();
    }
    onDisable() {
        this.myAnimator.stop();
        this.myPos = 0;
    }

    onCollisionEnter(other, self) {
        if (self.tag == 0 && other.node.name == 'Player') {
            if (!this.triggerOnce) {
                this.triggerOnce = true;
                BonusSystem.Instance.stopAction();
                // console.log('entered cyclone');
                Player.Instance.startCyclone(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
                Player.Instance.startCycloneEffect(this.node);
            }
        }
        if (self.tag == 1 && other.node.name == 'Player') {
            // console.log('center');
            other.node.getComponent(Player).reachedCenter = true;
        }
    }

    //sequence to turn on/off box collider
    sequence: cc.ActionInterval;
    @property(cc.CircleCollider)
    myCol1: cc.CircleCollider = null;
    @property(cc.BoxCollider)
    myCol2: cc.BoxCollider = null;
    startSequence() {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.checkPosition, this));
        this.node.runAction(this.sequence.repeatForever());
    }
    checkPosition() {
        if (!this.myCol1.enabled && !this.myCol2.enabled) {
            if (FollowPlayer.startColliderYPos > this.myPos) {
                this.changeToDefaultGroup();
            }
        }
        else {
            if (FollowPlayer.endColliderYPos > this.myPos) {
                this.changeToCullGroup();
            }
        }
    }

    changeToDefaultGroup() {
        this.myCol1.enabled = true;
        this.myCol2.enabled = true;
        this.node.group = 'default';
    }
    changeToCullGroup() {
        this.myCol1.enabled = false;
        this.myCol2.enabled = false;
        this.node.group = 'Cull';
        this.node.stopAction(this.sequence);
    }
}