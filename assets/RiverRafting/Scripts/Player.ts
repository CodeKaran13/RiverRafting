const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // @property({
    //     type: cc.RigidBody,
    //     visible: true,
    //     serializable: true
    // })
    // _rigidbody: cc.RigidBody = null;

    @property
    movementSpeed: number = 8;

    @property
    turnSpeed: number = 5;

    start() {

    }

    update(dt) {
        this.startAcceleration(dt);
    }

    // onKeyUp(event, customEvent) {

    // }

    startAcceleration(dt) {
        this.node.setPosition(new cc.Vec2(this.node.position.x, this.node.position.y + this.movementSpeed));
    }
}
