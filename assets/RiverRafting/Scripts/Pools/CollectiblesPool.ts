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
        switch (pack.name)
        {
            case 'healthpack':
                pack.parent.removeChild(pack);
                pack.active = false;
                this.HealthPacks.push(pack);
                break;
            case 'coinpack':
                pack.parent.removeChild(pack);
                pack.active = false;
                this.CoinsPack.push(pack);
                break;
        }
    }

    getCollectibleFromPool(packName: string): cc.Node 
    {
        switch (packName)
        {
            case 'healthpack':
                var healthpack = this.HealthPacks.pop();
                // healthpack.active = true;
                return healthpack;
                break;

            case 'coinpack':
                var coinpack = this.CoinsPack.pop();
                // coinpack.active = true;
                return coinpack;
                break;
        }
    }
}