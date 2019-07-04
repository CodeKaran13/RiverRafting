import Collectibles, { CollectibleType } from "./Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthPack extends Collectibles
{

    // onLoad () {}

    start()
    {
        this.myType = CollectibleType.Health;
    }

    // update (dt) {}

    onCollisionEnter(other, self)
    {
        if (other.node.name == 'Player')
        {
            console.log('player collided health');
        }
    }
}
