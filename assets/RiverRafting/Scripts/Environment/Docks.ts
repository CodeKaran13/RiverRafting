import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";
import HealthManager from "../Managers/HealthManager";
import Player from "../Player";
import BonusSystem from "../GamePlay/BonusSystem";
import CameraController from "../CameraController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Docks extends Obstacles
{

    // onLoad () {}

    start()
    {
        this.myType = ObstacleType.Dock;
    }

    onEnable() 
    {
        this.myAnimator.stop();
        this.myPos = this.node.convertToWorldSpace(cc.Vec2.ZERO).y;
    }

    onDisable()
    {
        this.myPos = 0;
        this.myAnimator.stop();
    }

    update(dt)
    {
        // if (this.node.active)
        // {
        //     if (Player.Instance.node.position.y - 500 > this.myPos)
        //     {
        //         // console.log('player is above me');
        //         // this._obstaclePool.addObstacleBackToPool(this.node);
        //         this.node.active = false;
        //     }
        // }
    }

    onCollisionEnter(other, self)
    {
        if (other.node.name == 'Player')
        {
            this.myAnimator.play('dock_crack');
            // this._player.getComponent(HealthManager).takeDamage(this.damage);
            Player.Instance.node.getComponent(HealthManager).takeDamage(this.damage);
            CameraController.Instance.cameraShake();
            BonusSystem.Instance.stopAction();
        }
    }
}
