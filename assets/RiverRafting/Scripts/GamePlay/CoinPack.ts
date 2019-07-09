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

    onEnable() 
    {
        this.myPos = this.node.convertToWorldSpace(cc.Vec2.ZERO).y;
    }

    onDisable()
    {
        this.myPos = 0;
    }

    update(dt) 
    {
        if (this.node.active)
        {
            if (this._player.position.y - 500 > this.myPos)
            {
                console.log('player is above me');
                this._CollectiblePoolRef.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self)
    {
        if(other.node.name == this._player.name)
        {
            console.log('player collided coin');

            // increase score
            this._CollectiblePoolRef.addCollectibleBackToPool(this.node);
        }
    }
}