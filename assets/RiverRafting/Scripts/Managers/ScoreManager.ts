const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreManager extends cc.Component
{

    totalScore: number = 0;

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    AddScore(value: number)
    {
        this.totalScore += value;
    }

    SubScore(value: number)
    {
        this.totalScore -= value;
        if (this.totalScore < 0)
        {
            this.totalScore = 0;
        }
    }
}
