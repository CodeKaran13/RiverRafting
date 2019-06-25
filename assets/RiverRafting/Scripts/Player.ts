const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    @property
    movementSpeed: number = 8;

    @property
    turnSpeed: number = 0;

    MAXTURNSPEED: number = 8;

    turnSequence;
    currentAction: cc.Action = null;

    start() {

    }

    update(dt) {
        this.startAcceleration(dt);
        console.log('turn speed: ' + this.turnSpeed);
    }

    startAcceleration(dt) {
        this.node.setPosition(new cc.Vec2(this.node.position.x, this.node.position.y + this.movementSpeed));
    }

    restartCounter() {
        this.turnSpeed = 0;
        this.node.stopAction(this.turnSequence);
    }

    startCounter() {
        var time = cc.delayTime(0.35);
        this.turnSequence = cc.sequence(time, cc.callFunc(this.countdown, this));
        this.node.runAction(this.turnSequence);
    }

    countdown() {
        this.turnSpeed += 2;
        this.startCounter();
        if (this.turnSpeed >= this.MAXTURNSPEED) {
            this.turnSpeed = this.MAXTURNSPEED;
            this.node.stopAction(this.turnSequence);
        }
    }

    RotateLeft() {
        var toLeft = cc.rotateTo(1.5, -30);
        this.node.runAction(toLeft);
        this.currentAction = toLeft;
    }

    RotateRight() {
        var toRight = cc.rotateTo(1.5, 30);
        this.node.runAction(toRight);
        this.currentAction = toRight;
    }

    RotateToCenter() {
        var toCenter = cc.rotateTo(1.5, 0);
        this.node.runAction(toCenter);
        this.currentAction = toCenter;
    }

    StopAction(action: cc.Action) {
        this.node.stopAction(action);
    }
}