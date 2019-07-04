import CollectiblesPool from "../Pools/CollectiblesPool";

const { ccclass, property } = cc._decorator;

export enum CollectibleType
{
    Health = 0,
    Coins = 1
}

@ccclass
export default class Collectibles extends cc.Component
{
    myType: CollectibleType = null;

    @property({
        type: CollectiblesPool,
        visible: true,
        serializable: true
    })
    _CollectiblePoolRef: CollectiblesPool = null;

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

}
