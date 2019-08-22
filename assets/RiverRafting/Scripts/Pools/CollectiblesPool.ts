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
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    DrowningHumansPack: cc.Node[] = [];

    start()
    {

    }

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
            case CollectibleType.DrowningHuman:
                // console.log('drowninghuman added successfully');
                pack.parent.removeChild(pack);
                pack.active = false;
                this.DrowningHumansPack.push(pack);
                break;
        }
    }

    getCollectibleFromPool(packName: CollectibleType): cc.Node 
    {
        switch (packName)
        {
            case CollectibleType.Health:
                var healthpack = this.HealthPacks.pop();
                return healthpack;
            case CollectibleType.Coins:
                var coinpack = this.CoinsPack.pop();
                return coinpack;
            case CollectibleType.DrowningHuman:
                var drowningPack = this.DrowningHumansPack.pop();
                return drowningPack;
        }
    }
}