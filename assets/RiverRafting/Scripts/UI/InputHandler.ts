import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InputHandler extends cc.Component
{

    @property(cc.Node)
    player: cc.Node = null;
    _playerRef: Player = null;

    @property
    xDir: number = 0;

    isTouchActive: boolean = false;


    onLoad()
    {
        this._playerRef = this.player.getComponent('Player');

        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) =>
        {
            this.isTouchActive = true;
            if (this.xDir < 0)
            {
                this._playerRef.ApplyBrakeSequence();
                this._playerRef.StopAction(this._playerRef.currentAction);
                this._playerRef.RotateLeft();
            }
            else if (this.xDir > 0)
            {
                this._playerRef.ApplyBrakeSequence();
                this._playerRef.StopAction(this._playerRef.currentAction);
                this._playerRef.RotateRight();
            }
            this._playerRef.restartCounter();
            this._playerRef.startCounter();
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) =>
        {
            this.isTouchActive = false;
            this._playerRef.StopAction(this._playerRef.currentAction);
            this._playerRef.resetMovementSpeed();
            this._playerRef.RotateToCenter();
            this._playerRef.restartCounter();
            this.onKeyUp();
        }, this.node);
    }

    start()
    {

    }

    update(dt)
    {
        if (this.isTouchActive)
        {
            this.onKeyDown();
        }
        else
        {
        }
    }

    onKeyDown()
    {
        this.player.setPosition(new cc.Vec2(this.player.position.x + (this.xDir * this._playerRef.turnSpeed), this.player.position.y));

        // if (this.xDir < 0) {
        //     // ROTATE LEFT

        //     if (this._playerRef.turnSpeed > 0 && this._playerRef.turnSpeed <= 4) {
        //         for (let i = this.player.rotation; i > -10; i--) {
        //             this.player.rotation = cc.misc.lerp(this.player.rotation, i, 1);
        //         }
        //     }
        //     else if (this._playerRef.turnSpeed > 4 && this._playerRef.turnSpeed <= 6) {
        //         for (let i = this.player.rotation; i > -20; i--) {
        //             this.player.rotation = cc.misc.lerp(this.player.rotation, i, 1);
        //         }
        //     }
        //     else if (this._playerRef.turnSpeed > 6) {
        //         for (let i = this.player.rotation; i > -30; i--) {
        //             this.player.rotation = cc.misc.lerp(this.player.rotation, i, 0.5);
        //         }
        //         this.player.rotation = cc.misc.lerp(this.player.rotation, -30, 1);
        //     }
        // }
        // else {
        //     // ROTATE RIGHT
        //     if (this._playerRef.turnSpeed > 0 && this._playerRef.turnSpeed <= 4) {
        //         this.player.rotation = cc.misc.lerp(this.player.rotation, 10, 1);
        //     }
        //     else if (this._playerRef.turnSpeed > 4 && this._playerRef.turnSpeed <= 6) {
        //         this.player.rotation = cc.misc.lerp(this.player.rotation, 20, 1);
        //     }
        //     else if (this._playerRef.turnSpeed > 6) {
        //         this.player.rotation = cc.misc.lerp(this.player.rotation, 30, 1);
        //     }
        // }
    }

    onKeyUp()
    {
        // this.player.rotation = cc.misc.lerp(this.player.rotation, 0, 0.9);
    }
}