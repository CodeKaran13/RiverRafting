const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component
{
    @property
    movementSpeed: number = 0;

    @property
    turnSpeed: number = 0;

    MAXTURNSPEED: number = 3;
    MINMOVEMENTSPEED: number = 2;
    MAXMOVEMENTSPEED: number = 4;//12

    turnSequence: cc.Action = null;
    brakeSequence;
    accelerateSequence;
    currentAction: cc.Action = null;

    // ObstacleAhead: boolean = false;

    onLoad()
    {

    }

    start()
    {
        this.AccelerationSequence();
    }

    update(dt)
    {
        // this.startAcceleration(dt);
        // console.log('movement speed: ' + this.movementSpeed);

        if (!this.CheckBound())
        {
            // this.movementSpeed = this.MAXMOVEMENTSPEED;
            this.startAcceleration(dt);
        }
        else
        {
            // this.movementSpeed = 0;
        }
    }

    startAcceleration(dt)
    {
        // console.log('player pos: ' + this.node.position);
        // console.log('forward vector pos: ' + this.node.children[3].convertToWorldSpaceAR(cc.Vec2.ZERO));

        var direction = this.node.children[3].convertToWorldSpaceAR(cc.Vec2.ZERO).sub(this.node.position);
        this.node.position = this.node.position.add(direction.normalizeSelf().mulSelf(this.movementSpeed));
    }

    AccelerationSequence()
    {
        this.startAccelerating();
    }

    ApplyBrakeSequence()
    {
        this.startApplyingBrakes();
    }

    CheckBound()
    {
        var results = cc.director.getPhysicsManager().rayCast(this.node.position, this.node.children[3].convertToWorldSpaceAR(cc.Vec2.ZERO), cc.RayCastType.All);
        if (results.length > 1)
        {
            for (let i = 0; i < results.length; i++)
            {
                if (results[i].collider.node.group == 'Bound')
                {
                    var distance = results[i].point.y - this.node.position.y;
                    if (distance < 120)
                    {
                        return true;
                    }
                }
                else
                {
                    return false;
                }
            }
        }
        else
        {
            return false;
        }
    }
    // Increase turn speed slowly.
    // restartCounter()
    // {
    //     this.turnSpeed = 0;
    //     this.node.stopAction(this.turnSequence);
    // }

    // startCounter()
    // {
    //     var time = cc.delayTime(0.2);
    //     this.turnSequence = cc.sequence(time, cc.callFunc(this.countdown, this));
    //     this.node.runAction(this.turnSequence);
    // }

    // countdown()
    // {
    //     this.turnSpeed += 2;
    //     this.startCounter();
    //     if (this.turnSpeed >= this.MAXTURNSPEED)
    //     {
    //         this.turnSpeed = this.MAXTURNSPEED;
    //         this.node.stopAction(this.turnSequence);
    //     }
    // }

    RotateLeft()
    {
        var toLeft = cc.rotateTo(1, -60);
        this.node.runAction(toLeft);
        this.currentAction = toLeft;
        // this.node.children[1].getComponent(cc.Animation).play();
        // this.node.children[0].getComponent(cc.Animation).stop();

        this.node.children[1].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        this.node.children[0].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;

        this.CheckBound();
    }

    RotateRight()
    {
        var toRight = cc.rotateTo(1, 60);
        this.node.runAction(toRight);
        this.currentAction = toRight;
        // this.node.children[0].getComponent(cc.Animation).play();
        // this.node.children[1].getComponent(cc.Animation).stop();

        this.node.children[1].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
        this.node.children[0].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;

        this.CheckBound();
    }

    RotateToCenter()
    {
        var toCenter = cc.rotateTo(1.5, 0);
        this.node.runAction(toCenter);
        this.currentAction = toCenter;
        // this.node.children[0].getComponent(cc.Animation).play();
        // this.node.children[1].getComponent(cc.Animation).play();

        this.node.children[1].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        this.node.children[0].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;

        this.CheckBound();
    }

    StartAction(action: cc.Action)
    {
        this.node.runAction(action);
    }

    StopAction(action: cc.Action)
    {
        this.node.stopAction(action);
    }

    resetMovementSpeed()
    {
        // console.log('reset movement speed');
        this.node.stopAction(this.brakeSequence);
        this.node.stopAction(this.brakeSequence);
        this.startAccelerating();
    }

    // When the player is turning, lower the movement speed/apply brakes.
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
        console.log('start accelerating');
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
}