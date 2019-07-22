import GameManager, { GameState } from "./Managers/GameManager";
import { Difficulty } from "./Enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component
{
    @property
    movementSpeed: number = 0;
    @property
    turnSpeed: number = 0;

    MAXTURNSPEED: number = 3;
    MINMOVEMENTSPEED: number = 0.2;
    MAXMOVEMENTSPEED: number = 1;

    turnSequence: cc.Action = null;
    brakeSequence;
    accelerateSequence;
    currentAction: cc.Action = null;

    HasAccelerationStarted: boolean = false;

    update(dt)
    {
        if (GameManager.currentGameState == GameState.InGame)
        {
            if (!this.HasAccelerationStarted)
            {
                this.HasAccelerationStarted = true
                this.StartAccelerationSequence();
            }

            this.startAcceleration(dt);
            // console.log('movement speed: ' + this.movementSpeed);

            // if (!this.CheckBound())
            // {
            //     this.startAcceleration(dt);
            // }
            // else
            // {

            // }
        }
    }

    startAcceleration(dt)
    {
        // console.log('player pos: ' + this.node.position);
        // console.log('forward vector pos: ' + this.node.children[3].convertToWorldSpaceAR(cc.Vec2.ZERO));

        var direction = this.node.children[2].convertToWorldSpaceAR(cc.Vec2.ZERO).sub(this.node.position);
        this.node.position = this.node.position.add(direction.normalizeSelf().mulSelf(this.movementSpeed));
    }

    StartAccelerationSequence()
    {
        this.startAccelerating();
    }

    ApplyBrakeSequence()
    {
        this.startApplyingBrakes();
    }

    CheckBound()
    {
        var results = cc.director.getPhysicsManager().rayCast(this.node.position, this.node.children[2].convertToWorldSpaceAR(cc.Vec2.ZERO), cc.RayCastType.Closest);
        if (results.length > 1)
        {
            for (let i = 0; i < results.length; i++)
            {
                if (results[i].collider.node.group == 'Bound')
                {
                    // var distance = results[i].point.sub(this.node.position);
                    var distance = results[i].point.y - this.node.position.y;
                    // console.log('dist: ' + distance + ' ' + results[i].collider.name);
                    if (distance < 100)
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

    RotateLeft()
    {
        var toLeft = cc.rotateTo(1, -60);
        this.node.runAction(toLeft);
        this.currentAction = toLeft;

        // this.startRotation(this.node.children[0].eulerAngles, new cc.Vec3(-90, 205, 0));
        // this.node.children[0].eulerAngles = this.lerpVec3(this.node.children[0].eulerAngles, new cc.Vec3(-90, 205, 0), 0.1);
        // this.node.children[0].eulerAngles = new cc.Vec3(-90, 205, 0);

        // this.node.children[2].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
        // this.node.children[1].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;

        this.CheckBound();
    }

    RotateRight()
    {
        var toRight = cc.rotateTo(1, 60);
        this.node.runAction(toRight);
        this.currentAction = toRight;

        // this.node.children[0].eulerAngles = new cc.Vec3(-90, 155, 0);

        // this.node.children[2].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        // this.node.children[1].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;

        this.CheckBound();
    }

    RotateToCenter()
    {
        var toCenter = cc.rotateTo(1.5, 0);
        this.node.runAction(toCenter);
        this.currentAction = toCenter;

        // this.node.children[0].eulerAngles = new cc.Vec3(-90, 180, 0);

        // this.node.children[2].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        // this.node.children[1].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;

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
        // console.log('start accelerating');
        var time = cc.delayTime(0.2);
        this.accelerateSequence = cc.sequence(time, cc.callFunc(this.accelerate, this));
        this.node.runAction(this.accelerateSequence.repeatForever());
    }

    accelerate()
    {
        this.movementSpeed += 0.2;
        // console.log('movement speed: ' + this.movementSpeed);
        if (this.movementSpeed >= this.MAXMOVEMENTSPEED)
        {
            this.movementSpeed = this.MAXMOVEMENTSPEED;
            this.node.stopAction(this.accelerateSequence);
        }
    }

    // Boat rotation sequence
    shouldRotate: boolean = false;
    rotateSequence: cc.ActionInterval;
    startRotation(init, end)
    {
        var time = cc.delayTime(0.1);
        this.shouldRotate = true;
        var data: cc.Vec3[] = [init, end];
        console.log(init);
        this.rotateSequence = cc.sequence(time, cc.callFunc(this.rotate, this, data));
        this.node.runAction(this.rotateSequence.repeatForever());
    }
    rotate(target, data)
    {

        if (this.shouldRotate)
        {
            console.log(data);
            //console.log('data1: ' + data[1]);
            if (data[0].y > data[1].y)
            {
                if (this.node.children[0].eulerAngles.y > data[1].y)
                {
                    this.node.children[0].eulerAngles = this.lerpVec3(data[0], data[1], 0.1);
                }
                else
                {
                    this.shouldRotate = false;
                }

            }
            else if (data[0].y < data[1].y)
            {
                if (this.node.children[0].eulerAngles.y < data[1].y)
                {
                    this.node.children[0].eulerAngles = this.lerpVec3(data[0], data[1], 0.1);
                }
                else
                {
                    this.shouldRotate = false;
                }
            }
        }
        else
        {
            this.node.stopAction(this.rotateSequence);
        }
    }

    lerpVec3(start: cc.Vec3, end: cc.Vec3, amt)
    {
        var x = (1 - amt) * start.x + amt * end.x;
        var y = (1 - amt) * start.y + amt * end.y;
        var z = (1 - amt) * start.z + amt * end.z;

        return new cc.Vec3(x, y, z);
    }
}