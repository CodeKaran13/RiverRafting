import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollectiblesPool extends cc.Component
{
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    HealthPacks: cc.Node[] = [];

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    CoinsPack: cc.Node[] = [];

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    addCollectibleBackToPool(pack: cc.Node)
    {
        var type = pack.getComponent(Collectibles).myType;
        switch (type)
        {
            case CollectibleType.Health:
                // console.log('healthpack added successfully');
                pack.parent.removeChild(pack);
                pack.active = false;
                this.HealthPacks.push(pack);
                break;
            case CollectibleType.Coins:
                // console.log('coinpack added successfully');
                pack.parent.removeChild(pack);
                pack.active = false;
                this.CoinsPack.push(pack);
                break;
        }
    }

    getCollectibleFromPool(packName: CollectibleType): cc.Node 
    {
        switch (packName)
        {
            case CollectibleType.Health:
                var healthpack = this.HealthPacks.pop();
                // healthpack.active = true;
                return healthpack;
            case CollectibleType.Coins:
                var coinpack = this.CoinsPack.pop();
                // coinpack.active = true;
                return coinpack;
        }
    }
}