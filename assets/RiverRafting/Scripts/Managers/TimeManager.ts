import MatchManager from "./MatchManager";
import { Difficulty } from "../Enums";
import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimeManager extends cc.Component
{

    @property(cc.Label)
    TimeLabel: cc.Label = null;

    _matchManagerRef: MatchManager = null;

    @property({
        type: GameManager,
        visible: true,
        serializable: true
    })
    _gameManagerRef: GameManager = null;

    @property({
        visible: true,
        serializable: true
    })
    public totaltime: number = 180;

    @property
    ShouldTimePass: boolean = true;

    currentime: number;
    sequenceas;
    // static BonusTime: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad()
    {

    }

    start()
    {
        // this.restartTimer();
        // this.startTimer();
    }


    restartTimer()
    {
        this.currentime = this.totaltime;
    }

    startTimer()
    {
        var timew = cc.delayTime(1);
        this.sequenceas = cc.sequence(timew, cc.callFunc(this.countdown, this));
        this.node.runAction(this.sequenceas.repeatForever());
    }

    countdown()
    {
        if (this.ShouldTimePass)
        {
            if (this.currentime > 0)
            {
                this.currentime -= 1;
                this.TimeLabel.string = this.calculateFormat(this.currentime);

                if (this.currentime < this.totaltime / 2)
                {
                    this._gameManagerRef.currentDifficulty = Difficulty.Hard;
                }
            }
            else
            {
                //trigger game over
                this._gameManagerRef.OnGameOver();
            }
        }
        else
        {
            this.TimeLabel.string = "";
            // TimeManager.BonusTime = this.currentime;
            this.node.stopAction(this.sequenceas);
        }
    }

    // update (dt) {}

    calculateFormat(time: number)
    {
        if (time > 0)
        {
            var minutes = Math.floor(time / 60);
            var seconds = (time % 60).toString();
            if ((time % 60) < 10)
            {
                seconds = "0" + seconds;
            }
            var returntime = minutes + ":" + seconds.toString();
            return returntime
        }
        else
        {
            return "0:0";
        }
    }

}
