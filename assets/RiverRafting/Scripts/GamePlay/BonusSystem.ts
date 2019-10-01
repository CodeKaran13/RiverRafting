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
    @property({
        type: cc.Animation,
        visible: true,
        serializable: true
    })
    _playerBonusEffect: cc.Animation = null;
    @property(cc.Label)
    cleanRunTimeLabel: cc.Label = null;
    isBonusSequenceOn: boolean = false;

    public static Instance: BonusSystem = null;

    start() {
        if (BonusSystem.Instance == null) {
            BonusSystem.Instance = this;
        }
    }

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
                this.startCleanRunBonus();
                // this._playerBonusEffect.node.active = true;
                this._playerBonusEffect.node.group = 'default';
                this._playerBonusEffect.play();
            }
        }
    }

    stopAction() {
        this.node.stopAction(this.sequence);
        this.node.stopAction(this.cleanRunSequence);
        this.totalCleanTime = this.totalCleanTime + this.cleanTime;
        // console.log('total clean time in sec: ' + this.totalCleanTime);
        this.closeLabel();
        this.resetBonus();
        this._playerBonusEffect.stop();
        this._playerBonusEffect.node.group = 'Cull';
        // this._playerBonusEffect.node.active = false;
        this.isBonusSequenceOn = false;
        // this.restartCounter();
    }

    totalCleanTime: number = 0;
    cleanTime: number = 0;
    cleanRunSequence: cc.ActionInterval;
    startCleanRunBonus() {
        var time = cc.delayTime(1);
        this.cleanRunSequence = cc.sequence(time, cc.callFunc(this.cleanRunCountdown, this));
        this.node.runAction(this.cleanRunSequence.repeatForever());
    }
    cleanRunCountdown() {
        this.cleanTime++;

        ScoreManager.Instance.AddBonus(this.bonusReward * this.bonusMultiplier);
        ScoreManager.Instance.AddScore(this.bonusReward * this.bonusMultiplier);
        this.bonusMultiplier += 0.05;

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
        this.cleanRunTimeLabel.string = 'CLEAN RUN: ' + this.cleanTime + ' SEC';
    }
}
