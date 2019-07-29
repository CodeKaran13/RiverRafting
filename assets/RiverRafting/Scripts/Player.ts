import GameManager, { GameState } from "./Managers/GameManager";
import { Difficulty } from "./Enums";
import HealthManager from "./Managers/HealthManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component
{
    @property
    movementSpeed: number = 0;
    @property
    turnSpeed: number = 0;

    MAXTURNSPEED: number = 3;
    MINMOVEMENTSPEED: number = 1;
    MAXMOVEMENTSPEED: number = 2;

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

        // check for wrong direction
        if (this.node.angle > 60 || this.node.angle < -60)
        {
            console.log('wrong direction..');
        }
    }

    StartAccelerationSequence()
    {
        this.startAccelerating();
    }

    ApplyBrakeSequence()
    {
        this.startApplyingBrakes();
    }

    // CheckBound()
    // {
    //     var results = cc.director.getPhysicsManager().rayCast(this.node.position, this.node.children[2].convertToWorldSpaceAR(cc.Vec2.ZERO), cc.RayCastType.Closest);
    //     if (results.length > 1)
    //     {
    //         for (let i = 0; i < results.length; i++)
    //         {
    //             if (results[i].collider.node.group == 'Bound')
    //             {
    //                 // var distance = results[i].point.sub(this.node.position);
    //                 var distance = results[i].point.y - this.node.position.y;
    //                 // console.log('dist: ' + distance + ' ' + results[i].collider.name);
    //                 if (distance < 100)
    //                 {
    //                     return true;
    //                 }
    //             }
    //             else
    //             {
    //                 return false;
    //             }
    //         }
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }

    RotateLeft()
    {
        var toLeft = cc.rotateTo(1, -60);
        var tilt = cc.rotate3DTo(0.5, 0, 0, -25);
        this.node.runAction(toLeft);
        this.currentAction = toLeft;
        this.node.children[0].children[0].runAction(tilt);


        // this.node.children[0].children[0].eulerAngles = new cc.Vec3(0, 0, 15);

        this.node.children[4].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
        this.node.children[3].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;

        // this.CheckBound();
    }

    RotateRight()
    {
        var toRight = cc.rotateTo(1, 60);
        var tilt = cc.rotate3DTo(0.5, 0, 0, 25);
        this.node.runAction(toRight);
        this.currentAction = toRight;

        this.node.children[0].children[0].runAction(tilt);


        // this.node.children[0].children[0].eulerAngles = new cc.Vec3(0, 0, -15);

        this.node.children[4].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        this.node.children[3].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;

        // this.CheckBound();
    }

    RotateToCenter()
    {
        var toCenter = cc.rotateTo(1.5, 0);
        var tilt = cc.rotate3DTo(0.5, 0, 0, 0);
        this.node.runAction(toCenter);
        this.currentAction = toCenter;

        this.node.children[0].children[0].runAction(tilt);

        // this.node.children[0].children[0].eulerAngles = new cc.Vec3(0, 0, 0);

        this.node.children[4].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        this.node.children[3].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;

        // this.CheckBound();
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

    // Boat wrong direction
    wrongDirectionSequence: cc.ActionInterval;
    IsWrongDirection: boolean = false;
    restartWrongDirectionSequence()
    {
        this.startWrongDirectionSequence();
    }
    startWrongDirectionSequence()
    {
        var time = cc.delayTime(1);
        this.wrongDirectionSequence = cc.sequence(time, cc.callFunc(this.CheckWrongDirection, this));
        this.node.runAction(this.wrongDirectionSequence.repeatForever());
    }
    CheckWrongDirection()
    {
        // check for wrong direction
        if (!this.IsWrongDirection)
        {
            if (this.node.angle > 60 || this.node.angle < -60)
            {
                console.log('wrong direction..');
                this.IsWrongDirection = true;
            }
        }
        else
        {
            this.node.stopAction(this.wrongDirectionSequence);
        }
    }

    // lerpVec3(start: cc.Vec3, end: cc.Vec3, amt)
    // {
    //     var x = (1 - amt) * start.x + amt * end.x;
    //     var y = (1 - amt) * start.y + amt * end.y;
    //     var z = (1 - amt) * start.z + amt * end.z;

    //     return new cc.Vec3(x, y, z);
    // }

    onBeginContact(contact, self, other)
    {
        if (other.node.group == 'Bound')
        {
            // console.log('' + other.node.name);
            this.node.getComponent(HealthManager).takeDamage(5);
        }
    }
}