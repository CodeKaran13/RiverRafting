import { Difficulty } from "../Enums";
import GameManager, { GameState } from "./GameManager";
import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimeManager extends cc.Component {

    @property(cc.Label)
    TimeLabel: cc.Label = null;

    @property({
        visible: true,
        serializable: true
    })
    public totaltime: number = 180;
    @property
    ShouldTimePass: boolean = true;
    currentime: number;
    sequenceas;

    public static Instance: TimeManager = null;

    onLoad() {
        if (TimeManager.Instance == null) {
            TimeManager.Instance = this;
        }
    }

    restartTimer() {
        this.currentime = this.totaltime;
    }

    startTimer() {
        var timew = cc.delayTime(1);
        this.sequenceas = cc.sequence(timew, cc.callFunc(this.countdown, this));
        this.node.runAction(this.sequenceas.repeatForever());
    }

    countdown() {
        if (this.ShouldTimePass) {
            if (this.currentime > 0) {
                this.currentime -= 1;
                this.TimeLabel.string = this.calculateFormat(this.currentime);

                if (this.currentime >= 120) {
                    GameManager.currentDifficulty = Difficulty.Easy;
                    // if (!GameManager.isHighEndDevice) {
                    //     if (Player.Instance.MAXMOVEMENTSPEED != 6) {
                    //         // console.log('low end start sequence acc');
                    //         Player.Instance.MAXMOVEMENTSPEED = 6;
                    //         Player.Instance.StartAccelerationSequence();
                    //     }
                    // }
                    // else {
                    if (Player.Instance.MAXMOVEMENTSPEED != 3) {
                        // console.log('high end start sequence acc');
                        Player.Instance.MAXMOVEMENTSPEED = 3;
                        Player.Instance.StartAccelerationSequence();
                    }
                    // }
                }
                else if (this.currentime < 120 && this.currentime >= 60) {
                    GameManager.currentDifficulty = Difficulty.Normal;
                    if (GameManager.isHighEndDevice) {
                        if (Player.Instance.MAXMOVEMENTSPEED != 4) {
                            Player.Instance.MAXMOVEMENTSPEED = 4;
                            Player.Instance.StartAccelerationSequence();
                            // Player.Instance.windDir = this.getRandomWindDir();
                            // GameManager.Instance.PlayWindEffect(Player.Instance.windDir);
                            // Player.Instance.IsWindy = true;
                            // this.startWindyTimer();
                        }
                    }
                    // else {
                    //     if (Player.Instance.MAXMOVEMENTSPEED != 7) {
                    //         Player.Instance.MAXMOVEMENTSPEED = 7;
                    //         Player.Instance.StartAccelerationSequence();
                    //         // Player.Instance.windDir = this.getRandomWindDir();
                    //         // GameManager.Instance.PlayWindEffect(Player.Instance.windDir);
                    //         // Player.Instance.IsWindy = true;
                    //         // this.startWindyTimer();
                    //     }
                    // }
                }
                else {
                    GameManager.currentDifficulty = Difficulty.Hard;
                    if (GameManager.isHighEndDevice) {
                        if (Player.Instance.MAXMOVEMENTSPEED != 5) {
                            Player.Instance.MAXMOVEMENTSPEED = 5;
                            Player.Instance.StartAccelerationSequence();
                        }
                    }
                    // else {
                    //     if (Player.Instance.MAXMOVEMENTSPEED != 8) {
                    //         Player.Instance.MAXMOVEMENTSPEED = 8;
                    //         Player.Instance.StartAccelerationSequence();
                    //     }
                    // }
                }
            }
            else {
                //trigger game over
                this.ShouldTimePass = false;
                GameManager.Instance.OnGameOver();
            }
        }
        else {
            this.TimeLabel.string = "";
            this.node.stopAction(this.sequenceas);
        }
    }

    calculateFormat(time: number) {
        if (time > 0) {
            var minutes = Math.floor(time / 60);
            var seconds = (time % 60).toString();
            if ((time % 60) < 10) {
                seconds = "0" + seconds;
            }
            var returntime = minutes + ":" + seconds.toString();
            return returntime
        }
        else {
            return "00:00";
        }
    }
}
