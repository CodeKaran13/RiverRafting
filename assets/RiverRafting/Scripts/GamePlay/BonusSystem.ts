import ScoreManager from "../Managers/ScoreManager";
import GameManager, { GameState } from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BonusSystem extends cc.Component
{

    currentTime: number = 0;
    @property
    bonusTime: number = 5;
    @property
    bonusReward: number = 500;
    bonusMultiplier: number = 1;
    sequence: cc.ActionInterval = null;

    // All script Refs
    _scoreManager: ScoreManager = null;

    resetBonus()
    {
        this.bonusMultiplier = 1;
    }

    restartCounter()
    {
        this.currentTime = this.bonusTime;
        this.startCounter();
    }

    startCounter()
    {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.countdown, this));
        this.node.runAction(this.sequence.repeatForever());
    }

    countdown()
    {
        this.currentTime -= 1;

        if (this.currentTime <= 0)
        {
            this.node.stopAction(this.sequence);
            // reward player with clean run bonus and restart counter

            this._scoreManager.AddScore(this.bonusReward * this.bonusMultiplier);
            this.bonusMultiplier += 0.2;
            if (GameManager.currentGameState == GameState.InGame)
            {
                this.restartCounter();
            }
        }
    }

    stopAction()
    {
        this.node.stopAction(this.sequence);
        this.resetBonus();
        this.restartCounter();
    }
}
