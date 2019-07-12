const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component
{

    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    HealthLabel: cc.Label = null;

    @property({
        type: cc.Label,
        visible: true,
        serializable: true
    })
    ScoreLabel: cc.Label = null;

    // onLoad () {}

    start()
    {
        
    }

    // update (dt) {}

    OnUIUpdateHealth(health: number)
    {
        this.HealthLabel.string = '' + health;
    }

    OnUIUpdateScore(score: number)
    {
        this.ScoreLabel.string = '' + score;
    }
}
