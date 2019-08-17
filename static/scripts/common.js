var common = {
    //serverUrl : "http://49.234.216.89:8080",
    serverUrl : "http://127.0.0.1:8080",
    url : {
        getData : "/getData",
        insertGenType : "/genManager/insertGenType",
        deleteGenType : "/genManager/deleteGenType",
        getGenTypeList : "/genManager/getGenTypeList",
        getGenDataList : "/genManager/getGenDataList",
        insertGenData : "/genManager/insertGenData"

    },

    /**
     * layui的不分页的Option
     */
    getNopageTableOption : function(elem,url,cols,defaultbar,doneCallback) {
      var option = {};
        option.elem = elem;
        option.url = common.serverUrl + url;
        option.method = 'post';
        option.cols = [cols];
        option.toolbar = 'default';
        option.height = 450;
        if (!defaultbar) {
            option.defaultToolbar = [];
        }
        option.page = false;
        option.response = {
            statusCode: 200
        }
        if (doneCallback) {
            option.done = doneCallback;
        }
        return option;
    },

    /**
     * 公共ajax
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
     */
    ajaxDefault : function($,url,param,type,callback) {
        common.ajaxObj($,url,param,type,callback,"application/x-www-form-urlencoded");
    },

    /**
     * 弹出窗体
     */
    layerOpen : function(layerObj,$,domId,height,width,yesCallBack) {
        layerObj.open({
            type: 1,
            content:$("#" + domId), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            btn: ['确定', '取消'],
            area: [height + 'px', width + 'px'],
            offset: 't',
            yes: function(index, layero){
                yesCallBack();
            }
        });
    },
    /**
     * 生成select 的option
     */
    setSelect : function ($,form,domId,data) {
        for (var i = 0; i < data.length; i++) {
            $("#" + domId).append("<option value=\"" + data[i].id + "\">" + data[i].name + "</option>");
            form.render("select");
        }
    }

}