<template>
    <el-row class="container">
        <el-row class="header">
            <el-col :span="12" class="logo">
                <span>Json</span>
            </el-col>
            <el-col :span="12" class="link">
                <div class="item">about JSON</div>
            </el-col>
        </el-row>
        <el-row class="content">
            <el-col :span="12" class="item">
                <el-input resize="none" type="textarea" @input="checkJson" v-model="inputData" class="jsonTextarea" placeholder="在此输入json字符串或者object字符串"></el-input>
            </el-col>
            <el-col :span="12" class="item">
                <el-row class="jsonHandle">
                    <div class="toolItem" :class="{'active':showMini}" @click="showMini = !showMini" effect="dark" content="压缩" placement="top">
                        <i class="iconfont icon-database"></i>
                        <transition name="el-fade-in">
                            <div class="tooltips">压缩</div>
                        </transition>
                    </div>
                    <div class="toolItem" @click="clear">
                        <i class="iconfont icon-clear"></i>
                        <transition name="el-fade-in">
                            <div class="tooltips">清空</div>
                        </transition>
                    </div>
                    <div class="toolItem" @click="dowload">
                        <i class="iconfont icon-upload-demo"></i>
                        <transition name="el-fade-in">
                            <div class="tooltips">另存为</div>
                        </transition>
                    </div>
                    <!-- <div id="copyBtn" :data-clipboard-text="miniData" class="toolItem"> -->
                    <div @click="copyValue" class="toolItem">
                        <i class="iconfont icon-copy"></i>
                        <transition name="el-fade-in">
                            <div class="tooltips">复制</div>
                        </transition>
                    </div>
                </el-row>
                <el-row class="jsonContent">
                    <vue-json-pretty v-show="!showMini && !hasError && inputData" :data="json"></vue-json-pretty>  
                    <el-row v-show="showMini && !hasError">{{miniData}}</el-row>
                    <el-row v-show="hasError" class="error">Error: Invalid data</el-row>
                </el-row>
            </el-col>
        </el-row>
    </el-row>
    <!-- <vue-json-pretty
        :data="json">
    </vue-json-pretty> -->
</template>
<script>

// import VueJsonPretty from 'vue-json-pretty'
import VueJsonPretty from '../components/json-beautiful/app'
import { formatToJson } from '../utils/Utils'
let fs = require('fs');
export default {
    name:'index',
    components:{
        VueJsonPretty
    },
    computed: {
        miniData(){
            if(!this.hasError){
                return JSON.stringify(this.json);
            } else{
                return 'Error: Invalid data';
            }
        }
    },
    watch:{
        inputData(val) {
            try {
                if(val && val.length > 0){
                    let str = val.replace(/\r\n/g,'').replace(/\n/g,"");
                    let objStr = new Function('return '+ str +';')();
                    let time = new Date().getTime();
                    console.log(time);
                    this.json = formatToJson(objStr);
                    console.log(new Date().getTime() - time);
                } else{
                    this.errorText = '';
                    this.json = '';
                }
                this.$cache.set('jsonData',{
                    json:this.json,
                    inputData:val
                });
                this.hasError = false;
            } catch (error) {
                console.log(error);
                this.hasError = true;
            }
        }
    },
    data() {
        return {
            show:false,
            json:{},
            inputData:'',
            transformError:false,
            showMini:false,//
            hasError:false
        }
    },
    methods:{
        clear(){
            this.inputData = '';
        },
        checkJson() {
            // console.log(this.inputData);
            // let str = this.inputData.replace(/\r\n/g,'').replace(/\n/g,"").replace(/\ +/g,"");
            // let objStr = new Function('return '+ str +';')();
            // this.json = formatToJson(objStr);
        },
        copyValue() {
            if(this.showMini){
                this.$electron.clipboard.writeText(this.miniData);
            } else{
                this.$electron.clipboard.writeText(JSON.stringify(this.json,'','\t'));
            }
            this.$message('复制成功');
        },
        dowload() {
            this.$electron.remote.dialog.showSaveDialog({
                title:'文件另存为',
            },filePath => {
                if(filePath){
                    fs.writeFileSync(filePath,JSON.stringify(this.json,'','\t'));
                    this.$message('保存成功');
                }
            });
        }
    },
    mounted:function(){
        if(this.$cache.get('jsonData')){
            this.json = this.$cache.get('jsonData').json;
            this.inputData = this.$cache.get('jsonData').inputData;
        }
    }
}
</script>
<style lang="scss">
.container{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
    background: #fff;
    color: #4A5560;
    font-size: 12px;
    font-family: menlo,monospace, Tahoma,"微软雅黑","幼圆";
    &::-webkit-scrollbar {
        display: none;
    }
    .header{
        line-height: 50px;
        border-bottom: solid 1px #E5EBEE;
        padding: 0 15px;
        .logo{
            color: #0fd59d;
            font-size: 20px;
        }
        .link{
            display: flex;
            justify-content: flex-end;
            padding: 0 20px;
            .item{
                cursor: pointer;
                color: #4A5560;
                font-weight: bold;
            }
        }
    }
    .content{
        height: calc(100% - 50px);
        overflow: auto;
        .item{
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            position: relative;
            &:last-child{
                border-left: solid 1px #E5EBEE;
            }
            .jsonTextarea{
                width: 100%;
                height: 100%;
                .el-textarea__inner{
                    height: 100%;
                    box-sizing: border-box;
                    border: none;
                    &:focus{
                        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
                    }
                }
            }
            .jsonHandle{
                height: 40px;
                padding: 10px;
                box-sizing: border-box;
                border-bottom: solid 1px #eee;
                background-color: #fff;
                font-size: 12px;
                color: #999;
                display: flex;
                .toolItem{
                    padding: 0 20px;
                    cursor: pointer;
                    position: relative;
                    .tooltips{
                        position: absolute;
                        line-height: 20px;
                        // padding: 0 10px;
                        border-radius: 4px;
                        background: #000;
                        color: #fff;
                        box-sizing: border-box;
                        width: 40px;
                        text-align: center;
                        top: 23px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: none;
                        transition: all .3s cubic-bezier(.55,0,.1,1);
                        &::after{
                            content: '';
                            border-width:0 5px 5px;
                            border-style:solid;
                            border-color:transparent transparent #000;/*透明 透明  黄*/
                            width: 0;
                            height: 0;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            top: -5px;
                        }
                    }
                    &.active{
                        color: #15b374;
                    }
                    &:hover{
                        color: #15b374;
                        .tooltips{
                            display: block;
                        }
                    }
                }
            }
            .jsonContent{
                height: calc(100% - 40px);
                overflow: auto;
                box-sizing: border-box;
                padding: 10px;
                .error{
                    color: #f1592a;
                    font-weight: bold;
                    font-size: 12px;
                    white-space: pre-line;
                    padding: 0 20px;
                }
            }
            .vjs-key{
                color: #92278f;
                font-weight: bold;
            }
            .vjs-tree {
                font-size: 12px;
                .vjs-tree__content{
                    padding-left: 2em;
                    div{
                        line-height: 2em;
                    }
                }
            }
        }
    }
    
}
</style>
