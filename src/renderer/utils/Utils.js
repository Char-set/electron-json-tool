const paramsFormat = (url) => {
    var qInd = url.indexOf("?");
    var sharpInd = url.indexOf("#"); //路由
    var search = "";
    var paramsList = [];
    var paramsObj = {};

    if (qInd >= 0) {
        if (sharpInd > 0) {
            search = url.substring(qInd + 1, sharpInd);
        } else {
            search = url.substring(qInd + 1);
        }
        paramsList = search.split("&");
        for (var ind in paramsList) {
            var param = paramsList[ind];
            var pind = param.indexOf("=");
            if (pind >= 0) {
                paramsObj[param.substring(0, pind)] = param.substr(pind + 1);
            } else {
                paramsObj[param] = "";
            }
        }
    }
    return paramsObj;
}

const dateFormart = (value, fmt) => {
    function format(value, fmt) {
        var date = new Date(value);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "w+": date.getDay(), //星期
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (k === 'w+') {
                if (o[k] === 0) {
                    fmt = fmt.replace('w', '周日');
                } else if (o[k] === 1) {
                    fmt = fmt.replace('w', '周一');
                } else if (o[k] === 2) {
                    fmt = fmt.replace('w', '周二');
                } else if (o[k] === 3) {
                    fmt = fmt.replace('w', '周三');
                } else if (o[k] === 4) {
                    fmt = fmt.replace('w', '周四');
                } else if (o[k] === 5) {
                    fmt = fmt.replace('w', '周五');
                } else if (o[k] === 6) {
                    fmt = fmt.replace('w', '周六');
                }
            } else if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    if (value) {
        value = format(value, fmt);
    }
    return value;
}

const getScrollTop = () => {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

const getScrollHeight = () => {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

const getWindowHeight = () => {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

const scrollLoading = (options) => {
    //只有回调函数，其他参数默认。
    if (typeof options == "function") {
        let cb = options;
        options = { callback: cb };
    }

    let delay = options.delay || 200;
    let triggerHeight = options.triggerHeight || 100;
    let callback = options.callback;
    let busy = false;

    window.onscroll = function () {
        if (busy) {
            return;
        }

        //检查是否已到触发加载的高度
        if (getScrollTop() + getWindowHeight() + triggerHeight > getScrollHeight()) {
            busy = true;
            // console.log('you are in the bottom');

            setTimeout(function () {
                busy = false;
                callback();
            }, delay);

        }
    };
}

// const wxConfig = (options,isDebugger) => {
//     if(wx != undefined){
//         wx.config({
//             debug: isDebugger ? true:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//             appId: options.appId, // 必填，公众号的唯一标识
//             timestamp: options.timestamp, // 必填，生成签名的时间戳
//             nonceStr: options.noncestr, // 必填，生成签名的随机串
//             signature: options.sgture,// 必填，签名
//             jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareWeibo','onMenuShareQZone','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ'] // 必填，需要使用的JS接口列表
//             // jsApiList: ["showAllNonBaseMenuItem", "hideAllNonBaseMenuItem", "showMenuItems", "hideMenuItems", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "scanQRCode", "getLocation"]
//         });
//     }
// }

// const wxShare = (options) => {
//     if(wx != undefined){
//         wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
//             wx.updateAppMessageShareData({ 
//                 title: options.title, // 分享标题
//                 desc: options.desc, // 分享描述
//                 link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//                 imgUrl: options.imgUrl, // 分享图标
//                 success: function () {
//                   // 设置成功
//                 }
//             });
//             wx.updateTimelineShareData({ 
//                 title: options.title, // 分享标题
//                 link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//                 imgUrl: options.imgUrl, // 分享图标
//                 success: function () {
//                   // 设置成功
//                 }
//             })
//         });

//     }
// }
const isMinData = (inputData) => {
    let minType = ['string','number','boolean','undefined'];
    let type = typeof inputData;
    return minType.indexOf(type) > -1;
}


const formatToJson = (data) => {
    let obj = {};
    // if(isMinData(data)){
    //     obj = {
    //         "data":data
    //     }
    //     return obj;
    // }
    if(typeof data != 'object'){
        throw error('Invalid data');
        return;
    }
    if(data instanceof Array){
        obj = arrToJson(data);
    } else if(typeof data == 'object'){
        obj = objectToJson(data);
    }
    return obj;
}
const arrToJson = (inputArr) => {
    let arr = [];
    if(!inputArr || !Array.isArray(inputArr)) {
        throw error('agrenment is require Array');
    }
    if(inputArr.length == 0) return arr;
    inputArr.forEach(item => {
        if(isMinData(item)){
            arr.push(item);
        } else{
            arr.push(formatToJson(item));
        }
    });
    return arr;
}
const objectToJson = (inputObject) => {
    let obj = {};
    if(JSON.stringify(inputObject) == "{}"){
        return obj;
    }
    for(let item in inputObject){
        if(isMinData(inputObject[item])){
            obj[item] = inputObject[item];
        } else{
            obj[item] = formatToJson(inputObject[item]);
        }
    }
    return obj;
}
export {
    paramsFormat,
    dateFormart,
    scrollLoading,
    // wxConfig,
    // wxShare,
    formatToJson
}