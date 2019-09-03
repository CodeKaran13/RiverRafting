import MatchManager from "./MatchManager";
import { Difficulty } from "../Enums";
import GameManager, { GameState } from "./GameManager";
import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimeManager extends cc.Component {

    @property(cc.Label)
    TimeLabel: cc.Label = null;

    _matchManager: MatchManager = null;
    @property({
        type: GameManager,
        visible: true,
        serializable: true
    })
    _gameManagerRef: GameManager = null;
    @property({
        type: Player,
        visible: true,
        serializable: true
    })
    _player: Player = null;

    @property({
        visible: true,
        serializable: true
    })
    public totaltime: number = 180;
    @property
    ShouldTimePass: boolean = true;
    currentime: number;
    sequenceas;

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
                }
                else if (this.currentime < 120 && this.currentime >= 60) {
                    GameManager.currentDifficulty = Difficulty.Normal;
                    if (Player.Instance.MAXMOVEMENTSPEED != 4) {
                        this._player.MAXMOVEMENTSPEED = 4;
                        this._player.StartAccelerationSequence();
                        Player.Instance.windDir = this.getRandomWindDir();
                        Player.Instance.IsWindy = true;
                        this.startWindyTimer();
                    }
                }
                else {
                    GameManager.currentDifficulty = Difficulty.Hard;
                    if (Player.Instance.MAXMOVEMENTSPEED != 5) {
                        Player.Instance.MAXMOVEMENTSPEED = 5;
                        Player.Instance.StartAccelerationSequence();
                    }
                }
            }
            else {
                //trigger game over
                this._gameManagerRef.OnGameOver();
                GameManager.currentGameState = GameState.PostGame;
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

    getRandomWindDir() {
        var rand = Math.floor(Math.random() * 2);

        if (rand == 0) {
            return -1;
        }
        else {
            return 1;
        }
    }

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
            this.node.stopAction(this.windSequence);
            this.windTime = 3;
        }
    }
}
