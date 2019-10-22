const { ccclass, property } = cc._decorator;

@ccclass
export default class StartRiverMap extends cc.Component {

    

    OnStartGame() {
        this.node.children[0].children[0].group = 'Waves';
        // this.tutorialAnim.play();
        // this.node.children[0].children[1].group = 'default';
        // this.node.children[0].children[3].group = 'default';
    }
}
