const { ccclass, property } = cc._decorator;

@ccclass
export default class ResolutionCheck extends cc.Component
{
    // @property(cc.Canvas)
    // canvas: cc.Canvas = null;

    @property(cc.Camera)
    mainCamera: cc.Camera = null;

    // @property(cc.Camera)
    // secondCamera: cc.Camera = null;

    value: number = 0.51;

    start()
    {
        this.getResolution();
    }

    getResolution()
    {
        var x = window.screen.width;
        var y = window.screen.height;

        var ratio = x / y;

        if(ratio > this.value)
        {
            this.mainCamera.zoomRatio = 1;
            // this.secondCamera.zoomRatio = 1;
        }
        else
        {
            this.mainCamera.zoomRatio = 0.8;
            // this.secondCamera.zoomRatio = 0.8;
        }
    }

}
