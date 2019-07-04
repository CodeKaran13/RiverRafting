const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component
{
    @property
    movementSpeed: number = 0;

    @property
    turnSpeed: number = 0;

    MAXTURNSPEED: number = 8;
    MINMOVEMENTSPEED: number = 4;
    MAXMOVEMENTSPEED: number = 12;

    turnSequence: cc.Action = null;
    brakeSequence;
    accelerateSequence;
    currentAction: cc.Action = null;

    start()
    {
        this.movementSpeed = 8;
    }

    update(dt)
    {
        this.startAcceleration(dt);
        // console.log('turn speed: ' + this.turnSpeed);
        // console.log('movement speed: ' + this.movementSpeed);
    }

    startAcceleration(dt)
    {
        this.node.setPosition(new cc.Vec2(this.node.position.x, this.node.position.y + this.movementSpeed));
    }

    AccelerationSequence()
    {
        this.startAccelerating();
    }

    ApplyBrakeSequence()
    {
        this.startApplyingBrakes();
    }

    // Increase turn speed slowly.
    restartCounter()
    {
        this.turnSpeed = 0;
        this.node.stopAction(this.turnSequence);
    }

    startCounter()
    {
        var time = cc.delayTime(0.2);
        this.turnSequence = cc.sequence(time, cc.callFunc(this.countdown, this));
        this.node.runAction(this.turnSequence);
    }

    countdown()
    {
        this.turnSpeed += 2;
        this.startCounter();
        if (this.turnSpeed >= this.MAXTURNSPEED)
        {
            this.turnSpeed = this.MAXTURNSPEED;
            this.node.stopAction(this.turnSequence);
        }
    }

    RotateLeft()
    {
        var toLeft = cc.rotateTo(1, -45);
        this.node.runAction(toLeft);
        this.currentAction = toLeft;
        this.node.children[4].getComponent(cc.Animation).play();
        this.node.children[3].getComponent(cc.Animation).stop();
    }

    RotateRight()
    {
        var toRight = cc.rotateTo(1, 45);
        this.node.runAction(toRight);
        this.currentAction = toRight;
        this.node.children[3].getComponent(cc.Animation).play();
        this.node.children[4].getComponent(cc.Animation).stop();
    }

    RotateToCenter()
    {
        var toCenter = cc.rotateTo(1.5, 0);
        this.node.runAction(toCenter);
        this.currentAction = toCenter;
        this.node.children[3].getComponent(cc.Animation).play();
        this.node.children[4].getComponent(cc.Animation).play();
    }

    StartAction(action: cc.Action)
    {
        this.node.runAction(action);
    }

    StopAction(action: cc.Action)
    {
        this.node.stopAction(action);
    }

    // When the player is turning, lower the movement speed/apply brakes.
    resetMovementSpeed()
    {
        // console.log('reset movement speed');
        this.node.stopAction(this.brakeSequence);
        this.node.stopAction(this.brakeSequence);
        this.startAccelerating();
    }

    startApplyingBrakes()
    {
        // console.log('start applying brakes');
        var time = cc.delayTime(0.2);
        this.brakeSequence = cc.sequence(time, cc.callFunc(this.applyBrake, this));
        this.node.runAction(this.brakeSequence.repeatForever());
    }

    applyBrake()
    {
        // console.log('apply brakes');
        // console.log('movement speed: ' + this.movementSpeed);
        this.movementSpeed -= 1;
        if (this.movementSpeed <= this.MINMOVEMENTSPEED)
        {
            // console.log('min movement speed');
            this.movementSpeed = this.MINMOVEMENTSPEED;
            this.node.stopAction(this.brakeSequence);
        }
    }

    // Start acceleration after brakes are applied.
    startAccelerating()
    {
        // console.log('start accelerating');
        var time = cc.delayTime(0.1);
        this.accelerateSequence = cc.sequence(time, cc.callFunc(this.accelerate, this));
        this.node.runAction(this.accelerateSequence.repeatForever());
    }

    accelerate()
    {
        this.movementSpeed += 1;
        // console.log('movement speed: ' + this.movementSpeed);
        if (this.movementSpeed >= this.MAXMOVEMENTSPEED)
        {
            this.movementSpeed = this.MAXMOVEMENTSPEED;
            this.node.stopAction(this.accelerateSequence);
        }
    }

    onBeginContact(contact, selfCollider, otherCollider)
    {
        // console.log('collided');
    }
}