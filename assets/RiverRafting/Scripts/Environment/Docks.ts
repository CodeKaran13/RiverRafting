import Obstacles from "../GamePlay/Obstacles";
import HealthManager from "../Managers/HealthManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Docks extends Obstacles
{

    // onLoad () {}

    start()
    {

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
        if (this.node.active)
        {
            if (this._player.position.y - 500 > this.myPos)
            {
                // console.log('player is above me');
                this._ObstaclePoolRef.addObstacleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self)
    {
        if (other.node.name == this._player.name)
        {
            this.myAnimator.play('dock_crack');
            this._player.getComponent(HealthManager).takeDamage(this.damage);
        }
    }
}
