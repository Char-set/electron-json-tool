<template>
    <div>
        <span v-show="visible"
            class="_symbol-right" @click="toggleSymbol">
            {{Array.isArray(data) ? "]" : "}"}}{{showEnd ? ',':''}}
        </span>
    </div>
</template>
<script>
import jsonMixnis from './mixnis/json-mixnis'
export default {
    name:'symbol-right',
    mixins: [jsonMixnis],
    props:{
        showEnd:Boolean,
        visible:Boolean
    }
}
</script>

