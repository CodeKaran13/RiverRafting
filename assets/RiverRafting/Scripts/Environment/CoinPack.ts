import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";
import ScoreManager from "../Managers/ScoreManager";
import FollowPlayer from "./FollowPlayer";
import AudioScript from "../Sound/AudioScript";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CoinPack extends Collectibles {

    start() {
        this.myType = CollectibleType.Coins;
    }
    onEnable() {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
        this.startSequence();
    }
    onDisable() {
        this.myPos = 0;
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('player collided coin');

            // increase score
            this.changeToCullGroup();
            ScoreManager.Instance.totalCoinsCollected += 1;
            ScoreManager.Instance.AddScore(ScoreManager.Instance.perCoinBonus);
            AudioScript.Instance.PlayCoinCollectSound();
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
    }
    changeToCullGroup() {
        this.myCol.enabled = false;
        this.node.group = 'Cull';
        this.node.stopAction(this.sequence);
    }
}