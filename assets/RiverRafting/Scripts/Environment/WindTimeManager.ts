import Player from "../Player";
import GameManager from "../Managers/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WindTimeManager extends cc.Component {

    public static Instance: WindTimeManager = null;

    start() {
        if(WindTimeManager.Instance == null) {
            WindTimeManager.Instance = this;
        }
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
    windTime: number = 7;
    startWindyTimer() {
        var time = cc.delayTime(1);
        this.windSequence = cc.sequence(time, cc.callFunc(this.windCountdown, this));
        this.node.runAction(this.windSequence.repeatForever());
    }
    windCountdown() {
        this.windTime--;
        if (this.windTime <= 0) {
            Player.Instance.IsWindy = false;
            GameManager.Instance.StopWindEffect();
            this.node.stopAction(this.windSequence);
            this.windTime = 7;
        }
    }
}