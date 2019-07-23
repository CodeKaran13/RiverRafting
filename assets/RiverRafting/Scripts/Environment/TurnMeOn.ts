const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOn extends cc.Component
{
    onCollisionEnter(other, self)
    {
        if (other.node.name == 'StartCollider')
        {
            // console.log('collider spotted');
            for (let i = 0; i < self.node.children[0].childrenCount; i++)
            {
                self.node.children[0].children[i].active = true;
            }
            for (let i = 0; i < self.node.children[2].childrenCount; i++)
            {
                self.node.children[2].children[i].active = true;
            }
        }
    }
}
