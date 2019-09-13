import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";
import Player from "../Player";
import CollectiblesPool from "../Pools/CollectiblesPool";
import ScoreManager from "../Managers/ScoreManager";
import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrowningHuman extends Collectibles {

    start() {
        this.myType = CollectibleType.DrowningHuman;
        // console.log(this.node.name);
    }
    onEnable() {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
        this.myAnim = this.node.getComponent(dragonBones.ArmatureDisplay);

        if(GameManager.isHighEndDevice) {
            this.myAnim.timeScale = 2;
        }
    }
    onDisable() {
        this.myAnim.timeScale = 0;
        this.myPos = 0;
    }
    update(dt) {
        if (this.node.active) {
            if (Player.Instance.node.position.y - 500 > this.myPos) {
                // console.log('drowning human, player is above me');
                CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('player collided coin');

            // increase score
            ScoreManager.Instance.totalHumanSaved += 1;
            ScoreManager.Instance.AddScore(ScoreManager.Instance.perHumanSavedBonus);
            
            CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
        }
    }
}
