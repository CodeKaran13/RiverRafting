import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InputHandler extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;
    _PlayerRef: Player = null;

    @property
    xDir: number = 0;

    isTouchActive: boolean = false;


    onLoad() {
        this._PlayerRef = this.player.getComponent('Player');

        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.isTouchActive = true;
            console.log('touch start');
            this._PlayerRef.restartCounter();
            this._PlayerRef.startCounter();
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.isTouchActive = false;
            this._PlayerRef.restartCounter();
            this.onKeyUp();
        }, this.node);
    }

    start() {

    }

    update(dt) {
        if (this.isTouchActive) {
            this.onKeyDown();
        }
        else {
            // this.player.rotation = 0;
            // this._PlayerRef.restartCounter();
        }
    }

    onKeyDown() {
        this.player.setPosition(new cc.Vec2(this.player.position.x + (this.xDir * this._PlayerRef.turnSpeed), this.player.position.y));

        if (this.xDir < 0) {
            // ROTATE LEFT
            if (this._PlayerRef.turnSpeed > 0 && this._PlayerRef.turnSpeed <= 4) {
                this.player.rotation = cc.misc.lerp(this.player.rotation, -10, 1)
            }
            else if (this._PlayerRef.turnSpeed > 4 && this._PlayerRef.turnSpeed <= 6) {
                this.player.rotation = cc.misc.lerp(this.player.rotation, -20, 1);
            }
            else if (this._PlayerRef.turnSpeed > 6) {
                this.player.rotation = cc.misc.lerp(this.player.rotation, -30, 1);
            }
        }
        else {
            // ROTATE RIGHT
            if (this._PlayerRef.turnSpeed > 0 && this._PlayerRef.turnSpeed <= 4) {
                this.player.rotation = cc.misc.lerp(this.player.rotation, 10, 1);
            }
            else if (this._PlayerRef.turnSpeed > 4 && this._PlayerRef.turnSpeed <= 6) {
                this.player.rotation = cc.misc.lerp(this.player.rotation, 20, 1);
            }
            else if (this._PlayerRef.turnSpeed > 6) {
                this.player.rotation = cc.misc.lerp(this.player.rotation, 30, 1);
            }
        }
    }

    onKeyUp() {
        this.player.rotation = cc.misc.lerp(this.player.rotation, 0, 0.9);
    }
}