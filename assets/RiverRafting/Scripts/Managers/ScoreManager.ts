import UIManager from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreManager extends cc.Component
{

    @property({
        type: UIManager,
        visible: true,
        serializable: true
    })
    _UIManagerRef: UIManager = null;

    totalScore: number = 0;

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    AddScore(value: number)
    {
        this.totalScore += value;

        this._UIManagerRef.OnUIUpdateScore(this.totalScore);
    }

    SubScore(value: number)
    {
        this.totalScore -= value;
        if (this.totalScore < 0)
        {
            this.totalScore = 0;
        }

        this._UIManagerRef.OnUIUpdateScore(this.totalScore);
    }
}
