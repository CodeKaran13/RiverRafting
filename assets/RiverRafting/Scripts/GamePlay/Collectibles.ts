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

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

}
