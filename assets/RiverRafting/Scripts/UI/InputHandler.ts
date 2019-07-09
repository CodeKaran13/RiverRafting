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
                // this._playerRef.ApplyBrakeSequence();
                this._playerRef.StopAction(this._playerRef.currentAction);
                this._playerRef.RotateLeft();
            }
            else if (this.xDir > 0)
            {
                // this._playerRef.ApplyBrakeSequence();
                this._playerRef.StopAction(this._playerRef.currentAction);
                this._playerRef.RotateRight();
            }
            // this._playerRef.restartCounter();
            // this._playerRef.startCounter();
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) =>
        {
            // this.isTouchActive = false;
            this._playerRef.StopAction(this._playerRef.currentAction);
            // this._playerRef.resetMovementSpeed();
            this._playerRef.RotateToCenter();
            // this._playerRef.restartCounter();
            this.onKeyUp();
        }, this.node);
    }

    start()
    {

    }

    update(dt)
    {
        // if (this.isTouchActive)
        // {
        //     this.onKeyDown();
        // }
        // else
        // {
        // }
    }

    onKeyDown()
    {
        // this.player.setPosition(new cc.Vec2(this.player.position.x + (this.xDir * this._playerRef.turnSpeed), this.player.position.y));
        
    }

    onKeyUp()
    {
        
    }
}