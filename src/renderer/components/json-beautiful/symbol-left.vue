<template>
    <div>
        <slot></slot>
        <!-- 展开 -->
        <span
            v-show="visible"
            @click="toggleSymbol"
            class="_symbol-left">{{Array.isArray(data) ? "[" : "{"}}
        </span>
        <!-- 收起 -->
        <span v-show="!visible" @click="toggleSymbol">
            <span  class="_symbol-left">{{renderSimpleData(data)}}
        </span>
        </span>
        
    </div>
</template>
<script>
import jsonMixnis from './mixnis/json-mixnis'
export default {
    name:'symbol-left',
    mixins: [jsonMixnis],
    props:{
        showEnd:Boolean,
        visible:Boolean
    },
    methods:{
        renderSimpleData(data){
            let text = Array.isArray(data) ? '[...]' : '{...}'
            return `${text}${this.showEnd?',':''}`
        }
    }
}
</script>

