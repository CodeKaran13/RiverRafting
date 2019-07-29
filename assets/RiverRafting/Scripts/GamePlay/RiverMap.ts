import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RiverMap extends cc.Component
{
    _matchManager: MatchManager = null;

    @property(cc.Node)
    player: cc.Node = null;
    CheckPlayerLocation: boolean = false;
    IsActive: boolean = false;
    @property
    myHeight: number = 0;

    onLoad()
    {
        this.myHeight = this.node.height;
        this._matchManager = cc.find('Script Collection/Match Manager').getComponent('MatchManager');
    }
}