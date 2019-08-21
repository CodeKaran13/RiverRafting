import ScoreManager from "../Managers/ScoreManager";
import GameManager, { GameState } from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BonusSystem extends cc.Component {

    currentTime: number = 0;
    @property
    bonusStartTime: number = 5;
    @property
    bonusReward: number = 500;
    bonusMultiplier: number = 1;
    sequence: cc.ActionInterval = null;

    // All script Refs
    _scoreManager: ScoreManager = null;
    @property(cc.Label)
    cleanRunTimeLabel: cc.Label = null;

    resetBonus() {
        this.bonusMultiplier = 1;
    }
    restartCounter() {
        this.cleanTime = 0;
        this.currentTime = this.bonusStartTime;
        this.startCounter();
    }
    startCounter() {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.countdown, this));
        this.node.runAction(this.sequence.repeatForever());
    }
    countdown() {
        this.currentTime -= 1;

        if (this.currentTime <= 0) {
            this.node.stopAction(this.sequence);
            // start rewarding player with clean run bonus until he hits the bound

            if (GameManager.currentGameState == GameState.InGame) {
                // this.isCleanSequenceOn = false;
                this.startCleanRunBonus();
            }
            // this._scoreManager.AddBonus(this.bonusReward * this.bonusMultiplier);
            // this._scoreManager.AddScore(this.bonusReward * this.bonusMultiplier);
            // this.bonusMultiplier += 0.2;
            // if (GameManager.currentGameState == GameState.InGame) {
            //     this.restartCounter();
            // }
        }
    }

    stopAction() {
        this.node.stopAction(this.sequence);
        this.node.stopAction(this.cleanRunSequence);
        this.totalCleanTime = this.totalCleanTime + this.cleanTime;
        console.log('total clean time in sec: ' + this.totalCleanTime);
        this.closeLabel();
        this.resetBonus();
        this.restartCounter();
    }

    // isCleanSequenceOn: boolean = false;
    totalCleanTime: number = 0;
    cleanTime: number = 0;
    cleanRunSequence: cc.ActionInterval;
    startCleanRunBonus() {
        // if (!this.isCleanSequenceOn) {
            // this.isCleanSequenceOn = true;
            console.log('started clean run');
            var time = cc.delayTime(1);
            this.cleanRunSequence = cc.sequence(time, cc.callFunc(this.cleanRunCountdown, this));
            this.node.runAction(this.cleanRunSequence.repeatForever());
        // }
    }
    cleanRunCountdown() {
        this.cleanTime++;

        this._scoreManager.AddBonus(this.bonusReward * this.bonusMultiplier);
        this._scoreManager.AddScore(this.bonusReward * this.bonusMultiplier);
        this.bonusMultiplier += 0.2;

        this.onUIUpdate();
    }

    openLabel() {
        this.cleanRunTimeLabel.node.active = true;
    }
    closeLabel() {
        this.cleanRunTimeLabel.node.active = false;
    }
    onUIUpdate() {
        this.openLabel();
        this.cleanRunTimeLabel.string = 'CLEAN RUN: ' + this.cleanTime + 'SEC';
    }
}
