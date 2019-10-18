import ScoreManager from "../Managers/ScoreManager";
import GameManager, { GameState } from "../Managers/GameManager";
import TimeManager from "../Managers/TimeManager";
import Player from "../Player";

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
    is5SecSequenceOn: boolean = false;
    isBonusSequenceOn: boolean = false;

    public static Instance: BonusSystem = null;

    start() {
        if (BonusSystem.Instance == null) {
            BonusSystem.Instance = this;
        }
    }

    IS_5_SEC_SEQUENCE_ON() {
        return this.is5SecSequenceOn;
    }

    resetBonus() {
        this.bonusMultiplier = 1;
        this.startYPos = 0;
        this.endYPos = 0;
    }

    // 5 SEC SEQUENCE TO CHECK PLAYER HAS NOT HIT ANYTHING DURING THIS TIME. IF HIT, RESTART SEQUENCE
    restartCounter() {
        // this.cleanTime = 0;
        this.startTime = 0;
        this.currentTime = this.bonusStartTime;
        this.startCounter();
    }
    startCounter() {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.countdown, this));
        this.node.runAction(this.sequence.repeatForever());
        this.is5SecSequenceOn = true;
    }
    countdown() {
        this.currentTime -= 1;

        if (this.currentTime <= 0) {
            // start rewarding player with clean run bonus until he hits the bound

            if (GameManager.currentGameState == GameState.InGame) {
                this.startCleanRunBonus();
                this._playerBonusEffect.node.group = 'default';
                this._playerBonusEffect.play();

                this.STOP_5_SEC_SEQUENCE();
            }
        }
    }

    STOP_5_SEC_SEQUENCE() {
        this.node.stopAction(this.sequence);
        if (!this.isBonusSequenceOn)
            this.restartCounter();
    }

    // CLEAN RUN SEQUENCE
    totalCleanTime: number = 0;
    startTime: number = 0;
    startYPos: number = 0;
    endYPos: number = 0;
    cleanRunSequence: cc.ActionInterval;
    startCleanRunBonus() {
        var time = cc.delayTime(1);
        this.cleanRunSequence = cc.sequence(time, cc.callFunc(this.cleanRunCountdown, this));
        this.node.runAction(this.cleanRunSequence.repeatForever());
        this.startTime = TimeManager.Instance.currentime;
        this.startYPos = Player.Instance.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
        this.isBonusSequenceOn = true;
    }
    cleanRunCountdown() {

        

        // console.log('bonus multiplier: ' + this.bonusMultiplier);
        // console.log('bonus reward: ' + this.bonusMultiplier);
        // this.bonusMultiplier += 0.05;

        this.onUIUpdate();
    }

    stopAction() {
        this.node.stopAction(this.cleanRunSequence);
        // this.totalCleanTime = this.totalCleanTime + this.cleanTime;
        this.endYPos = Player.Instance.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
        this.totalCleanTime = this.startTime - TimeManager.Instance.currentime;
        // console.log('distance travelled: ' + Math.floor(((this.endYPos - this.startYPos) / 100)));

        this.bonusMultiplier = this.bonusMultiplier + (0.05 * Math.floor(((this.endYPos - this.startYPos) / 100)));
        ScoreManager.Instance.AddBonus(Math.floor(this.bonusReward * this.bonusMultiplier));
        ScoreManager.Instance.AddScore(Math.floor(this.bonusReward * this.bonusMultiplier));

        this.closeLabel();
        this.resetBonus();
        this._playerBonusEffect.stop();
        this._playerBonusEffect.node.group = 'Cull';
        this.isBonusSequenceOn = false;

        if(!this.IS_5_SEC_SEQUENCE_ON()) {
            this.restartCounter();
        }
    }
    openLabel() {
        this.cleanRunTimeLabel.node.active = true;
    }
    closeLabel() {
        this.cleanRunTimeLabel.node.active = false;
    }
    onUIUpdate() {
        this.openLabel();
        var cleanTime;
        cleanTime = this.startTime - TimeManager.Instance.currentime;
        this.cleanRunTimeLabel.string = 'CLEAN RUN: ' + cleanTime + ' SEC';
    }
}
