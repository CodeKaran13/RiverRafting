import GameManager, { GameState } from "./Managers/GameManager";
import { Difficulty } from "./Enums";
import HealthManager from "./Managers/HealthManager";
import CollisionDetection from "./Environment/CollisionDetection";
import BonusSystem from "./GamePlay/BonusSystem";
import Cyclone from "./Environment/Cyclone";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    @property
    movementSpeed: number = 0;
    @property
    turnSpeed: number = 0;

    MAXTURNSPEED: number = 3;
    MINMOVEMENTSPEED: number = 1;
    MAXMOVEMENTSPEED: number = 1;

    turnSequence: cc.Action = null;
    brakeSequence;
    accelerateSequence;
    currentAction: cc.Action = null;

    HasAccelerationStarted: boolean = false;

    // Windy Environment
    IsWindy: boolean = false;
    windDir: number = 1;
    windSpeed: number = 125;

    public static Instance: Player = null;

    start() {
        if (Player.Instance == null) {
            Player.Instance = this;
        }
    }

    update(dt) {

        if (GameManager.currentGameState == GameState.InGame) {
            if (!this.HasAccelerationStarted) {
                this.HasAccelerationStarted = true;
                // this.StartAccelerationSequence();
                this.restartWrongDirectionSequence();
            }

            this.startAcceleration(dt);
        }
    }

    startAcceleration(dt) {
        // console.log('player pos: ' + this.node.position);
        // console.log('forward vector pos: ' + this.node.children[3].convertToWorldSpaceAR(cc.Vec2.ZERO));

        if (!this.IsCycloned && !this.IsWindy) {
            var direction = this.node.children[2].convertToWorldSpaceAR(cc.Vec2.ZERO).sub(this.node.position);
            this.node.position = this.node.position.add(direction.normalizeSelf().mulSelf(this.movementSpeed));

            // check for wrong direction
            if (this.IsWrongDirection) {
                this.RotateToCenter();
                this.IsWrongDirection = false;
            }
        }
        else if (!this.IsCycloned && this.IsWindy) {
            var direction = this.node.children[2].convertToWorldSpaceAR(new cc.Vec2(this.windDir * this.windSpeed, 0)).sub(this.node.position);
            this.node.position = this.node.position.add(direction.normalizeSelf().mulSelf(this.movementSpeed));

            if (this.IsWrongDirection) {
                this.RotateToCenter();
                this.IsWrongDirection = false;
            }
        }
    }

    StartAccelerationSequence() {
        this.startAccelerating();
    }

    // ApplyBrakeSequence() {
    //     this.startApplyingBrakes();
    // }

    IsCollidingBound() {
        var results = cc.director.getPhysicsManager().rayCast(this.node.position, this.node.children[2].convertToWorldSpaceAR(cc.Vec2.ZERO), cc.RayCastType.All);
        // var results = cc.director.getPhysicsManager().rayCast(this.node.position, this.node.position.add(new cc.Vec2(0, 300)), cc.RayCastType.Closest);
        if (results.length > 1) {
            for (let i = 0; i < results.length; i++) {
                // console.log(results[i].collider.node.name);
                if (results[i].collider.node.group == 'Bound') {
                    // var distance = results[i].point.sub(this.node.position);
                    // var distance = results[i].point.y - this.node.position.y;
                    // console.log('dist: ' + distance + ' ' + results[i].collider.name);
                    // if (distance < 100) {
                    return true;
                    // }
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }

    RotateLeft() {
        var toLeft = cc.rotateTo(1, -80);
        var tilt = cc.rotate3DTo(0.5, 0, 0, -25);
        this.node.runAction(toLeft);
        this.currentAction = toLeft;
        this.node.children[0].children[0].runAction(tilt);

        this.node.children[4].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
        this.node.children[3].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
    }

    RotateRight() {
        var toRight = cc.rotateTo(1, 80);
        var tilt = cc.rotate3DTo(0.5, 0, 0, 25);
        this.node.runAction(toRight);
        this.currentAction = toRight;

        this.node.children[0].children[0].runAction(tilt);

        this.node.children[4].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        this.node.children[3].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
    }

    RotateToCenter() {
        var toCenter = cc.rotateTo(1.5, 0);
        var tilt = cc.rotate3DTo(0.5, 0, 0, 0);
        this.node.runAction(toCenter);
        this.currentAction = toCenter;

        this.node.children[0].children[0].runAction(tilt);

        this.node.children[4].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
        this.node.children[3].getComponent(dragonBones.ArmatureDisplay).timeScale = 3;
    }

    StartAction(action: cc.Action) {
        this.node.runAction(action);
    }

    StopAction(action: cc.Action) {
        this.node.stopAction(action);
    }

    // resetMovementSpeed() {
    //     // console.log('reset movement speed');
    //     this.node.stopAction(this.brakeSequence);
    //     this.node.stopAction(this.brakeSequence);
    //     this.startAccelerating();
    // }

    // When the player is turning, lower the movement speed/apply brakes.
    // startApplyingBrakes() {
    //     // console.log('start applying brakes');
    //     var time = cc.delayTime(0.2);
    //     this.brakeSequence = cc.sequence(time, cc.callFunc(this.applyBrake, this));
    //     this.node.runAction(this.brakeSequence.repeatForever());
    // }

    // applyBrake() {
    //     // console.log('apply brakes');
    //     // console.log('movement speed: ' + this.movementSpeed);
    //     this.movementSpeed -= 1;
    //     if (this.movementSpeed <= this.MINMOVEMENTSPEED) {
    //         // console.log('min movement speed');
    //         this.movementSpeed = this.MINMOVEMENTSPEED;
    //         this.node.stopAction(this.brakeSequence);
    //     }
    // }

    // Start acceleration after brakes are applied.
    startAccelerating() {
        var time = cc.delayTime(0.2);
        this.accelerateSequence = cc.sequence(time, cc.callFunc(this.accelerate, this));
        this.node.runAction(this.accelerateSequence.repeatForever());
    }

    accelerate() {
        this.movementSpeed += 0.2;
        if (this.movementSpeed >= this.MAXMOVEMENTSPEED) {
            this.movementSpeed = this.MAXMOVEMENTSPEED;
            // console.log('speed: ' + this.movementSpeed);
            this.node.stopAction(this.accelerateSequence);
        }
    }

    // Boat wrong direction
    wrongDirectionSequence: cc.ActionInterval;
    IsWrongDirection: boolean = false;
    restartWrongDirectionSequence() {
        this.startWrongDirectionSequence();
    }
    startWrongDirectionSequence() {
        var time = cc.delayTime(1);
        this.wrongDirectionSequence = cc.sequence(time, cc.callFunc(this.CheckWrongDirection, this));
        this.node.runAction(this.wrongDirectionSequence.repeatForever());
    }
    CheckWrongDirection() {
        // check for wrong direction
        if (!this.IsWrongDirection) {
            if (this.node.angle > 80 || this.node.angle < -80) {
                // console.log('wrong direction..');
                this.IsWrongDirection = true;
            }
        }
        else {
            this.node.stopAction(this.wrongDirectionSequence);
        }
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
    lerpVec2(start: cc.Vec2, end: cc.Vec2, amt) {
        var x = (1 - amt) * start.x + amt * end.x;
        var y = (1 - amt) * start.y + amt * end.y;

        return new cc.Vec2(x, y);
    }
    lerpVec3(start: cc.Vec3, end: cc.Vec3, amt) {
        var x = (1 - amt) * start.x + amt * end.x;
        var y = (1 - amt) * start.y + amt * end.y;
        var z = (1 - amt) * start.z + amt * end.z;

        return new cc.Vec3(x, y, z);
    }

    // Cyclone Effect
    IsCycloned: boolean = false;
    dragSequence: cc.ActionInterval;
    cycloneSequence: cc.ActionInterval;
    currentRot: number = 0;
    reachedCenter: boolean = false;
    startCyclone(pos) {
        if (!this.IsCycloned) {
            var time = cc.delayTime(0.03);
            this.dragSequence = cc.sequence(time, cc.callFunc(this.dragRaftToCyclone, this, pos));
            this.node.runAction(this.dragSequence.repeatForever());
            BonusSystem.Instance.stopAction();
            // this.startCycloneEffect();
        }
    }
    dragRaftToCyclone(target, pos: cc.Vec2) {
        var dir = pos.sub(this.node.position);
        var endPos = this.node.position.add(dir.normalizeSelf().mulSelf(4));

        this.node.position = this.lerpVec2(this.node.position, endPos, 0.5);
        // console.log('dragging..');
        if (this.reachedCenter) {
            this.node.stopAction(this.dragSequence);
            // console.log('reached center');
            // this.startCycloneEffect();
        }
    }
    startCycloneEffect(node) {
        if (!this.IsCycloned) {
            this.IsCycloned = true;
            var time = cc.delayTime(0.01);
            this.cycloneSequence = cc.sequence(time, cc.callFunc(this.cycloneEffect, this, node));
            this.node.runAction(this.cycloneSequence.repeatForever());
        }
    }
    cycloneEffect(target, node) {
        if (this.currentRot < 3) {
            var endRot = this.node.angle + 10;
            this.node.angle = this.lerp(this.node.angle, endRot, 0.5);
            if (this.node.angle > 355) {
                this.node.angle = 0;
                this.currentRot++;
                // console.log('angle above 355, ' + this.currentRot);
            }
        }
        else {
            this.node.stopAction(this.cycloneSequence);
            this.node.stopAction(this.dragSequence);
            // node.active = false;
            node.getComponent(Cyclone).changeToCullGroup();
            this.reachedCenter = false;
            this.IsCycloned = false;
            this.currentRot = 0;
        }
    }



}