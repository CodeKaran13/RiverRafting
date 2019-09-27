import Obstacles, { ObstacleType } from "./Obstacles";
import Player from "../Player";
import HealthManager from "../Managers/HealthManager";
import GameManager from "../Managers/GameManager";
import BonusSystem from "./BonusSystem";
import FollowPlayer from "../Environment/FollowPlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rocks extends Obstacles {

    onEnable() {
        // if (GameManager.isHighEndDevice)
        //     this.myAnimator.play();

        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;

        this.startSequence();
    }
    onDisable() {
        // this.myAnimator.stop();
    }

    start() {
        this.myType = ObstacleType.Rock;
    }

    onCollisionEnter(other, self) {
        if (other.node.parent.name == 'Player') {
            // console.log('player collided rock');
            Player.Instance.node.getComponent(HealthManager).takeDamage(5);
            BonusSystem.Instance.stopAction();
        }
    }

    //sequence to turn on/off box collider
    sequence: cc.ActionInterval;
    @property(cc.BoxCollider)
    myCol: cc.BoxCollider = null;
    startSequence() {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.checkPosition, this));
        this.node.runAction(this.sequence.repeatForever());
    }
    checkPosition() {
        if (!this.myCol.enabled) {
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
        this.myCol.enabled = true;
        this.node.group = 'default';
        this.myAnimator.play();
    }
    changeToCullGroup() {
        this.myCol.enabled = false;
        this.myAnimator.stop();
        this.node.group = 'Cull';
        this.node.stopAction(this.sequence);
    }
}