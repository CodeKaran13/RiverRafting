import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";
import Player from "../Player";
import CollectiblesPool from "../Pools/CollectiblesPool";
import ScoreManager from "../Managers/ScoreManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CoinPack extends Collectibles
{

    start()
    {
        this.myType = CollectibleType.Coins;
    }
    onEnable() 
    {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
    }
    onDisable()
    {
        this.myPos = 0;
    }
    update(dt)
    {
        if (this.node.active)
        {
            if (Player.Instance.node.position.y - 500 > this.myPos)
            {
                // console.log('coinpack, player is above me');
                // this._CollectiblePool.addCollectibleBackToPool(this.node);
                CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self)
    {
        if(other.node.name == 'Player')
        {
            // console.log('player collided coin');

            // increase score
            // this._scoreManager.totalCoinsCollected += 1;
            // this._scoreManager.AddScore(this._scoreManager.perCoinBonus);
            // this._CollectiblePool.addCollectibleBackToPool(this.node);

            ScoreManager.Instance.totalCoinsCollected += 1;
            ScoreManager.Instance.AddScore(ScoreManager.Instance.perCoinBonus);
            CollectiblesPool.Instance.addCollectibleBackToPool(this.node);
        }
    }
}