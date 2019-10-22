import CollectiblesPool from "../Pools/CollectiblesPool";
import ScoreManager from "../Managers/ScoreManager";

const { ccclass, property } = cc._decorator;

export enum CollectibleType
{
    Health = 0,
    Coins = 1,
    DrowningHuman = 2
}

@ccclass
export default class Collectibles extends cc.Component
{
    myType: CollectibleType = null;
    myPos: any;
    myAnim: any;
}
