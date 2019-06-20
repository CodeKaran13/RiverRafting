const { ccclass, property } = cc._decorator;

@ccclass
export default class InputHandler extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property
    xDir: number = 0;

    isTouchActive: boolean = false;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
            this.isTouchActive = true;
            // this.onKeyDown();
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            this.isTouchActive = false;
            // this.onKeyDown();
        }, this.node);
    }

    start() {

    }

    update(dt) {
        if (this.isTouchActive) {
            this.onKeyDown();
        }
    }

    onKeyDown() {
        this.player.setPosition(new cc.Vec2(this.player.position.x + (this.xDir * this.player.getComponent('Player').turnSpeed), this.player.position.y));
    }
}