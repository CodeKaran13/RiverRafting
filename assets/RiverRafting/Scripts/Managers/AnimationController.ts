import UIManager from "./UIManager";
import GameManager, { GameState } from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimationController extends cc.Component {

    @property(cc.Animation)
    myAnimation: cc.Animation = null;

    @property
    isBoatBlast: boolean = false;
    sequence: cc.ActionInterval;

    DeactivateMe() {
        this.myAnimation.stop();
        this.node.group = 'Cull';
        if (GameManager.currentGameState == GameState.PostGame && this.isBoatBlast) {
            var time = cc.delayTime(1);
            this.sequence = cc.sequence(time, cc.callFunc(this.onBoatDestroy, this));
            this.node.runAction(this.sequence);
        }
    }

    onBoatDestroy() {
        UIManager.Instance.OpenSubmitWindow();
    }
}