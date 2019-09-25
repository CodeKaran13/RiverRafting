import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";
import CollectiblesPool from "../Pools/CollectiblesPool";
import Player from "../Player";
import HealthManager from "../Managers/HealthManager";
import FollowPlayer from "./FollowPlayer";

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

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('player collided health');
            this.changeToCullGroup();
            other.node.getComponent(HealthManager).increaseHP(this.health);
            // CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
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
