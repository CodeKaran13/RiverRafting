import Collectibles, { CollectibleType } from "./Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CoinPack extends Collectibles
{

    // onLoad () {}

    start()
    {
        this.myType = CollectibleType.Coins;
    }

    // update (dt) {}

    onCollisionEnter(other, self)
    {
        if(other.node.name == 'Player')
        {
            console.log('player collided coin');
        }
    }
}
