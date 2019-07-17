import UIManager from "./UIManager";
import MatchManager from "./MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreManager extends cc.Component
{
    //All script refs
    @property({
        type: MatchManager,
        visible: true,
        serializable: true
    })
    _matchManager: MatchManager = null;
    @property({
        type: UIManager,
        visible: true,
        serializable: true
    })
    _UIManager: UIManager = null;

    totalScore: number = 0;

    onLoad () {
        this._matchManager._bonusSystem._scoreManager = this;
        this._matchManager._scoreManager = this;
    }

    start()
    {

    }

    // update (dt) {}

    AddScore(value: number)
    {
        this.totalScore += value;

        this._UIManager.OnUIUpdateScore(this.totalScore);
    }

    SubScore(value: number)
    {
        this.totalScore -= value;
        if (this.totalScore < 0)
        {
            this.totalScore = 0;
        }

        this._UIManager.OnUIUpdateScore(this.totalScore);
    }
}
