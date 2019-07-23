const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOff extends cc.Component
{
    onCollisionEnter(other, self: cc.BoxCollider)
    {
        if (self.tag == 1 && other.node.name == 'EndCollider')
        {
            // console.log('deactivating me');
            for (let i = 0; i < this.node.children[0].childrenCount; i++)
            {
                this.node.children[0].children[i].active = false;
            }
            for (let i = 0; i < this.node.children[2].childrenCount; i++)
            {
                if(this.node.children[2].children[i].active)
                    this.node.children[2].children[i].active = false;
            }
        }
    }
}
