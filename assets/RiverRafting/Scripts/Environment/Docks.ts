const { ccclass, property } = cc._decorator;

@ccclass
export default class Docks extends cc.Component
{

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    onCollisionEnter(other, self)
    {
        if(other.node.name == 'Player')
        {
            this.node.getComponent(cc.Animation).play('dock fall');
        }
    }
}
