import Obstacles from "../GamePlay/Obstacles";
import HealthManager from "../Managers/HealthManager";
import Player from "../Player";
import ObstaclePool from "../Pools/ObstaclePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RollingLogs extends Obstacles
{

    startMoving: boolean = false;

    @property
    rollingSpeed: number = 5;

    start()
    {
    }

    SetInitialPosition(pos: cc.Vec2)
    {
        this.node.position = pos;

        // console.log('' + this.node.position);
    }

    onEnable()
    {
        this.startMoving = true;
        this.myAnimator.play();
    }

    onDisable()
    {
        this.startMoving = false;
        this.myAnimator.stop();
    }

    update(dt) 
    {
        if (this.node.active)
        {
            if (this.startMoving)
            {
                this.node.position = this.node.position.add(new cc.Vec2(this.rollingSpeed, 0));
            }
        }

        if (Player.Instance.node.position.y - this.node.position.y > 500)
        {
            // console.log('rolling log: player is above me');
           ObstaclePool.Instance.addObstacleBackToPool(this.node);
        }
    }

    onCollisionEnter(other, self)
    {
        if (other.node.name == 'Player')
        {
            // console.log('rolling log collided with player.');

            // damage player here and add this back to pool
            Player.Instance.node.getComponent(HealthManager).takeDamage(this.damage);
            ObstaclePool.Instance.addObstacleBackToPool(this.node);
        }

        // if (other.node.group == 'Bound')
        // {
        //     console.log('rolling log collided with bound.');
        //     this._ObstaclePoolRef.addObstacleBackToPool(this.node);
        // }
    }
}
