var common = {
    //serverUrl : "http://49.234.216.89:8080",
    serverUrl : "http://49.234.216.89:8080",
    indexPage : "http://49.234.216.89/index.html",
    loginPage : "http://49.234.216.89/login.html",
    url : {
        login : "/sys/login",
        getData : "/getData",
        genInsertSql : "/generator/genInsertSql",
        insertGenType : "/genManager/insertGenType",
        deleteGenType : "/genManager/deleteGenType",
        getGenTypeList : "/genManager/getGenTypeList",
        getGenDataList : "/genManager/getGenDataList",
        insertGenData : "/genManager/insertGenData",
        deleteGenData : "/genManager/deleteGenData"
    },

    defaultType : [
        {"name":"主键","value":0},
        {"name":"用户名","value":1},
        {"name":"整数","value":2},
        {"name":"日期-年月日时分秒","value":3},
        {"name":"日期-年月日","value":4},
        {"name":"邮箱","value":6},
        {"name":"地址","value":7},
        {"name":"手机号","value":8},
        {"name":"身份证号","value":9},
        {"name":"英文字符串","value":10}
        ],

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
                if (o.code == 302) {
                    top.window.location.href = common.loginPage;
                }
                if (o.code == 500) {
                    window.location.href = common.loginPage;
                }
                callback(o);
            }
        });
    },

    /**
     * 参数式ajax请求调用
     */
    ajaxDefault : function($,url,param,type,callback) {
        common.ajaxObj($,url,param,type,callback,"application/x-www-form-urlencoded;charset=utf-8");
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