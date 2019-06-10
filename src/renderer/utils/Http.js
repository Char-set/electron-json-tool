import Cookies from 'js-cookie';

const toQueryString = (obj) => {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

const get = (url,params) => {
    //fetch请求
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return doRequest('GET',null,url,null);
    
}
const post = (url,params) => {
    //fetch请求
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    return doRequest('POST',header,url,JSON.stringify(params));
}

const deleteApi = (url,params) => {
    //fetch请求
    return doRequest('DELETE',null,url,JSON.stringify(params));
}
const deleteJson = (url,params) => {
    //fetch请求
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    return doRequest('DELETE',header,url,JSON.stringify(params));
}

const put = (url,params) => {
    //fetch请求
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    return doRequest('PUT',header,url,toQueryString(params));
    
}
/*
    *  postForm 表单请求
    *  url:请求地址
    *  params:参数
    * */
const postForm = (url,params) => {
    //fetch请求
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    return doRequest('POST',header,url,toQueryString(params));
}
/**
 * 发起接口请求
 * @methods 请求方式
 * @headers 请求头
 * @url 请求地址 相对路径
 * @params 请求入参
 */
const doRequest = (methods,headers,url,params) => {
    url = process.env.REACT_APP_apiHost + process.env.REACT_APP_servePath + url;
    // console.log(Cookies)
    if(Cookies.get(process.env.REACT_APP_TOKEN_KEY)){
        let token = Cookies.get(process.env.REACT_APP_TOKEN_KEY);
        headers = headers?headers:{};
        headers.Authorization = token || '';
    }
    return new Promise((rl,rj) =>{
        let options = {
            method: methods,
            headers:headers || {}
        }
        if(methods != 'GET'){
            options.body = params;
        }
        fetch(url,options)
        .then((response) => {
            if(response.status == 404){
                global.$toast.center('服务不见咯');
                rj()
            } else{
                return response.json();
            }
        })
        .then((responseJSON) => {
            if (isSuccessful(responseJSON)) {
                rl(responseJSON)
            } else {
                rj(responseJSON);
                // if(process.env.NODE_ENV === 'development'){
                    _hanleError(responseJSON);
                // }
            }
        }) 
        .catch((error) => {
            console.log(error)
        });
    })
}
/**
 * 判断请求返回是成功还是失败
 */
const isSuccessful = (response) => {
    if(!response){
        return false;
    }
    var data = response;
    //JSON格式的数据
    if (data && (data.hasOwnProperty("code") || data.hasOwnProperty("Code"))) {
        if(data.code == "200" || data.Code == "200"){
            return true;
        }
    }

    //非JSON数据
    if (response.status >= 200 && response.status <= 300) {
        return true;
    }

    return false;
}
/**
 * 提示错误信息
 */
const _hanleError = (response) => {
    // let msg = response && response.msg ? response.msg : "请求出错，请稍后再试";
    if(response && response.code == 4000){
        Cookies.remove('user_info');
        // router.push('/login');
    }
    // global.$toast.center(msg)
}
export default {
    get,
    post,
    postForm,
    
}