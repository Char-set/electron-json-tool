<template>
    <div>
        <slot></slot>
        <span
            :class="`_tree-value _tree-value__${dataType}`" v-if="dataType == 'string_url'">
            <a :href="data" :class="`_tree-value _tree-value__${dataType}`" target="_blank">{{miniDataFormat(data)}}</a>
        </span>
        <span
            :class="`_tree-value _tree-value__${dataType}`" v-else>
            {{miniDataFormat(data)}}
        </span>
    </div>
</template>
<script>
import jsonMixnis from './mixnis/json-mixnis'
export default {
    name:"min-data",
    mixins: [jsonMixnis],
    props:{
        currentKey:{

        },
        showEnd:Boolean
    },
    computed:{
        dataType(){
            let type = this.getDataType(this.data);
            if(type == 'string' && /^http(s)?:\/\//.test(this.data)){
                type += '_url'
            }
            return type;
        }
    },
    methods:{
        miniDataFormat(data){
            let text,type = this.getDataType(data);
            switch (type) {
                case 'string':
                    text = `"${data}"`;
                    break;
                case 'number':
                    text = `${data}`;
                    break;
                case 'boolean':
                    text = `${data}`;
                    break;
            
                default:
                    break;
            }
            return text + (this.showEnd ? ',':'');
        }
    }
}
</script>

