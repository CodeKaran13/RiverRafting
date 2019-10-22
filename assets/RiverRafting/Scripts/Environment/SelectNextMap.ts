import { PrefabSet } from "../Enums";
import MatchManager from "../Managers/MatchManager";
import PoolingSystem from "../Pools/PoolingSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectNextMap extends cc.Component {

    counter: number = 0;

    public static Instance: SelectNextMap = null;

    onLoad() {
        if (SelectNextMap.Instance == null) {
            SelectNextMap.Instance = this;
        }
    }

    selectNextMap(prefabSet: PrefabSet) {

        switch (prefabSet) {
            case PrefabSet.Set_0:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet0.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet0.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet0);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet0.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet0.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet0);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet0.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet0.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet0);
                    }
                }
                this.counter++;
                return nextMap;
            case PrefabSet.Set_1:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet1.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet1.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet1);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet1.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet1.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet1);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet1.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet1.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet1);
                    }
                }
                this.counter++;
                return nextMap;

            case PrefabSet.Set_2:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet2.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet2.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet2);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet2.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet2.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet2);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet2.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet2.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet2);
                    }
                }
                this.counter++;
                return nextMap;

            case PrefabSet.Set_3:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet3.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet3.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet3);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet3.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet3.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet3);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet3.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet3.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet3);
                    }
                }
                this.counter++;
                return nextMap;

            case PrefabSet.Set_4:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet4.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet4.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet4);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet4.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet4.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet4);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet4.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet4.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet4);
                    }
                }
                this.counter++;
                return nextMap;

            case PrefabSet.Set_5:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet5.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet5.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet5);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet5.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet5.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet5);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet5.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet5.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet5);
                    }
                }
                this.counter++;
                return nextMap;

            case PrefabSet.Set_6:
                if (this.counter < MatchManager.Instance.totalEasyPrefabsToSpawn) {
                    if (PoolingSystem.Instance.EasyRiverMapSet6.size() > 0) {
                        var nextMap = PoolingSystem.Instance.EasyRiverMapSet6.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet6);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalEasyPrefabsToSpawn && this.counter < (MatchManager.Instance.totalEasyPrefabsToSpawn + MatchManager.Instance.totalMediumPrefabsToSpawn)) {
                    if (PoolingSystem.Instance.MediumRiverMapSet6.size() > 0) {
                        var nextMap = PoolingSystem.Instance.MediumRiverMapSet6.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet6);
                    }
                }
                else if (this.counter >= MatchManager.Instance.totalHardPrefabsToSpawn) {
                    if (PoolingSystem.Instance.HardRiverMapSet6.size() > 0) {
                        var nextMap = PoolingSystem.Instance.HardRiverMapSet6.get();
                    }
                    else {
                        var nextMap = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet6);
                    }
                }
                this.counter++;
                return nextMap;

                default:
                    return null;
        }
    }
}
