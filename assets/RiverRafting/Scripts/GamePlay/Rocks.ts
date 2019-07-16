import Obstacles, { ObstacleType } from "./Obstacles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rocks extends Obstacles
{

    // onLoad () {}

    start()
    {
        this.myType = ObstacleType.Rock;
    }

    // update (dt) {}

    onCollisionEnter(other, self)
    {
        if (other.node.parent.name == 'Player')
        {
            // console.log('player collided rock');
        }
    }
}
