import Obstacles, { ObstacleType } from "./Obstacles";
import Player from "../Player";
import HealthManager from "../Managers/HealthManager";
import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rocks extends Obstacles {

    onEnable() {
        if (GameManager.isHighEndDevice)
            this.myAnimator.play();
    }
    onDisable() {
        if (GameManager.isHighEndDevice)
            this.myAnimator.stop();
    }

    start() {
        this.myType = ObstacleType.Rock;
    }

    // update (dt) {}

    onCollisionEnter(other, self) {
        if (other.node.parent.name == 'Player') {
            // console.log('player collided rock');
            Player.Instance.node.getComponent(HealthManager).takeDamage(5);
        }
    }
}
