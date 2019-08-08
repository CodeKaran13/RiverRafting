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

    @property({
        type: CollectiblesPool,
        visible: true,
        serializable: true
    })
    _CollectiblePool: CollectiblesPool = null;
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    _player: cc.Node = null;
    @property({
        type: ScoreManager,
        visible: true,
        serializable: true
    })
    _scoreManager: ScoreManager = null;

    myPos: any;
}
