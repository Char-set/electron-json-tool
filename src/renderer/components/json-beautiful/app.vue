<template>
    <div 
        :class="{
            'beautiful_tree':true,
            'root': currentDeep == 1
        }">
        <template v-if="Array.isArray(data) || isObject(data)">
            <symbol-left
                :visible.sync="visible"
                :show-end="lastKey != currentKey"
                :data="data">
                <span class="_tree-key" v-if="currentKey && !Array.isArray(prentData)">{{keyDataFormat(currentKey)}}</span>
            </symbol-left>
            <div
                v-show="visible" 
                v-for="(item,key,index) in data"
                :key="key">
                <template v-if="(Array.isArray(data) && key < showMax) || (isObject(data) && index < showMax)">
                    <json-beautiful 
                        :data="item"
                        :prent-data="data"
                        :currentDeep="currentDeep + 1"
                        :currentKey="key">
                    </json-beautiful>
                </template>
                <template v-if="(Array.isArray(data) && key == showMax) || (isObject(data) && index == showMax)">
                    <div class="beautiful_tree ignore" @click="showMax += 100">···</div>
                </template>
            </div>
            <symbol-right
                :visible.sync="visible"
                :show-end="lastKey != currentKey"
                :data="data">
            </symbol-right>
        </template>
        <mini-data
            v-else
            :currentKey="currentKey"
            :show-end="lastKey != currentKey"
            :data="data">
            <span class="_tree-key" v-if="currentKey && !Array.isArray(prentData)">{{keyDataFormat(currentKey)}}</span>
        </mini-data>
    </div>
</template>
<script>
import MiniData from './mini-data'
import SymbolLeft from './symbol-left'
import SymbolRight from './symbol-right'
import jsonMixnis from './mixnis/json-mixnis'
export default {
    name:'json-beautiful',
    data(){
        return {
            visible:this.currentDeep < 4,
            showMax:20,// 最大显示子项数量
        }
    },
    components:{
        MiniData,
        SymbolLeft,
        SymbolRight
    },
    mixins: [jsonMixnis],
    props:{
        prentData:{
            
        },
        currentDeep:{
            type:Number,
            default:1
        },
        currentKey:{}
    },
    computed:{
        lastKey(){
            if(Array.isArray(this.prentData)){
                return this.prentData.length - 1;
            } else if(this.isObject(this.prentData)){
                let keys = Object.keys(this.prentData);
                return keys[keys.length - 1];
            }
        }
    },
    methods:{
        
    }
}
</script>
<style lang="scss">
.beautiful_tree{
    padding-left: 30px;
    font-family: "Monaco", "Menlo", "Consolas", "Bitstream Vera Sans Mono", monospace;
    font-size: 12px;
    line-height: 1.8em;
    border-left: 1px dotted #bfcbd9;
    .iconfont{
        font-size: 12px;
    }
    &.root{
        padding-left: 0;
        border-left: none;
    }
    &.ignore{
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
        &:hover{
            color: #25aae2;
        }
    }
    ._symbol-left,._symbol-right{
        cursor: pointer;
        &:hover{
            color: #25aae2;
        }
    }
    ._tree-key{
        color: #92278f;
        font-weight: bold;
    }
    ._tree-value{
        color: #3ab54a;
        font-weight: bold;
        &__boolean{
            color: #f98280;
        }
        &__number{
            color: #25aae2;
        }
        &__string_url{
            color: #61D2D6;
            cursor: pointer;
            &:hover{
                color: #47A7E6;
                text-decoration: underline;
            }
        }
    }
}
</style>
