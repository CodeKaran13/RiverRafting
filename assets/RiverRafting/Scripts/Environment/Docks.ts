import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";
import HealthManager from "../Managers/HealthManager";
import Player from "../Player";
import BonusSystem from "../GamePlay/BonusSystem";
import CameraController from "../CameraController";
import FollowPlayer from "./FollowPlayer";
import AudioScript from "../Sound/AudioScript";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Docks extends Obstacles {

    start() {
        this.myType = ObstacleType.Dock;
    }

    onEnable() {
        this.myAnimator.stop();
        this.myPos = this.node.convertToWorldSpace(cc.Vec2.ZERO).y;

        this.startSequence();
    }
    onDisable() {
        this.myPos = 0;
        this.myAnimator.stop();
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            this.myAnimator.play('dock_crack');
            Player.Instance.node.getComponent(HealthManager).takeDamage(this.damage);
            Player.Instance.PlayBlinkEffect();
            CameraController.Instance.cameraShake();
            AudioScript.Instance.PlayDockImpactSound();
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
        this.node.group = 'Obstacles';
    }
    changeToCullGroup() {
        this.myCol.enabled = false;
        this.node.group = 'Cull';
        this.node.stopAction(this.sequence);
    }
}
