import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";
import CollectiblesPool from "../Pools/CollectiblesPool";
import Player from "../Player";
import HealthManager from "../Managers/HealthManager";
import FollowPlayer from "./FollowPlayer";
import AudioScript from "../Sound/AudioScript";

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

        this.startSequence();
    }
    onDisable() {
        this.myPos = 0;
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('player collided health');
            this.changeToCullGroup();
            AudioScript.Instance.PlayHealthCollectSound();
            other.node.getComponent(HealthManager).increaseHP(this.health);
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
        this.node.group = 'Collectibles';
    }
    changeToCullGroup() {
        this.myCol.enabled = false;
        this.node.group = 'Cull';
        this.node.stopAction(this.sequence);
    }
}
