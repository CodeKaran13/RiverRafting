const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationController extends cc.Component {
    
    @property(cc.Animation)
    myAnimation: cc.Animation = null;

    DeactivateMe() {
        this.myAnimation.stop();
        this.node.group = 'Cull';
    }
}