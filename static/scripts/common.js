var common = {
    //serverUrl : "http://49.234.216.89:8080",
    serverUrl : "http://127.0.0.1:8080",
    url : {
        getData : "/getData",
        insertGenType : "/genManager/insertGenType",
        deleteGenType : "/genManager/deleteGenType"
    },


    /**
     * 公共ajax
     * @param url
     * @param param
     * @param type
     * @param callback  回调函数
     * @param contentType
     */
    ajaxObj : function($,url,param,type,callback,contentType) {
        if (!type) {
            type = "POST";
        }
        if (!contentType) {
            contentType = "application/json;charset=utf-8";
            param = JSON.stringify(param);
        }
        $.ajax({
            type: type,
            url: common.serverUrl + url,
            data : param,
            contentType: contentType,
            dataType: 'json',
            success: function(o) {
                callback(o);
            }
        });
    },

    /**
     * 参数式ajax请求调用
     * @param url
     * @param param
     * @param type
     * @param callback
     */
    ajaxDefault : function($,url,param,type,callback) {
        common.ajaxObj($,url,param,type,callback,"application/x-www-form-urlencoded");
    }


}