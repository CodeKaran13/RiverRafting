import Player from "../Player";
import GameManager from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WindTimeManager extends cc.Component {

    public static Instance: WindTimeManager = null;

    start() {
        if (WindTimeManager.Instance == null) {
            WindTimeManager.Instance = this;
        }

        // this.startSequence();
    }

    // Wind Time Manager Sequence

    sequence: cc.ActionInterval = null;
    @property
    windIntervalTime: number = 20;
    startSequence() {
        var time = cc.delayTime(this.windIntervalTime);
        this.sequence = cc.sequence(time, cc.callFunc(this.windCountdown, this));
        this.node.runAction(this.sequence.repeatForever());
    }
    windCountdown() {
        Player.Instance.windDir = this.getRandomWindDir();
        GameManager.Instance.PlayWindEffect(Player.Instance.windDir);
        Player.Instance.IsWindy = true;
        this.startWindyTimer();
    }

    getRandomWindDir() {
        var rand = Math.floor(Math.random() * 2);

        if (rand == 0) {
            return -1;
        }
        else {
            return 1;
        }
    }

    // WIND SEQUENCE
    windSequence: cc.ActionInterval = null;
    @property
    windDuration: number = 7;
    startWindyTimer() {
        var time = cc.delayTime(1);
        this.windSequence = cc.sequence(time, cc.callFunc(this.windEffectCountdown, this));
        this.node.runAction(this.windSequence.repeatForever());
    }
    windEffectCountdown() {
        this.windDuration--;
        if (this.windDuration <= 0) {
            Player.Instance.IsWindy = false;
            GameManager.Instance.StopWindEffect();
            this.node.stopAction(this.windSequence);
            this.windDuration = 7;
        }
    }
}
