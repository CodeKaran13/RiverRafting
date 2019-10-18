import Obstacles, { ObstacleType } from "./Obstacles";
import Player from "../Player";
import HealthManager from "../Managers/HealthManager";
import BonusSystem from "./BonusSystem";
import FollowPlayer from "../Environment/FollowPlayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rocks extends Obstacles {

    onEnable() {
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
        if (other.node.name == 'Player') {
            Player.Instance.node.getComponent(HealthManager).takeDamage(5);
            Player.Instance.PlayBlinkEffect();
            if (BonusSystem.Instance.IS_5_SEC_SEQUENCE_ON()) {
                BonusSystem.Instance.STOP_5_SEC_SEQUENCE();
            }
            if (BonusSystem.Instance.isBonusSequenceOn)
                BonusSystem.Instance.stopAction();
        }
    }
    onCollisionStay(other, self) {
        if (other.node.name == 'Player') {
            if (BonusSystem.Instance.IS_5_SEC_SEQUENCE_ON()) {
                BonusSystem.Instance.STOP_5_SEC_SEQUENCE();
            }
            if (BonusSystem.Instance.isBonusSequenceOn)
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