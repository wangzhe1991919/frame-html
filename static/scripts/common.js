var common = {
    serverUrl : "http://" + window.location.host + "/wz",//部署应该是nginx的端口（部署前端应用的端口）
    indexPage : "http://" + window.location.host + "/navigation/index.html",
    loginPage : "http://" + window.location.host + "/login.html",
    url : {
        login : "/sys/login",
        getData : "/getData",
        genInsertSql : "/generator/genInsertSql",
        insertGenType : "/genManager/insertGenType",
        deleteGenType : "/genManager/deleteGenType",
        getGenTypeList : "/genManager/getGenTypeList",
        getGenDataList : "/genManager/getGenDataList",
        insertGenData : "/genManager/insertGenData",
        deleteGenData : "/genManager/deleteGenData",
        getFileList : "/file/list",

        getSysNavigationGroup : "/sysNavigationGroup/get",
        insertSysNavigationGroup : "/sysNavigationGroup/add",
        updateSysNavigationGroup : "/sysNavigationGroup/update",
        listNavigationGroup : "/sysNavigationGroup/list",
        deleteNavigationGroup : "/sysNavigationGroup/delete",

        getSysNavigation : "/sysNavigation/get",
        insertSysNavigation : "/sysNavigation/add",
        updateSysNavigation : "/sysNavigation/update",
        listNavigation : "/sysNavigation/list",
        deleteNavigation : "/sysNavigation/delete",
        listNavigationIndex : "/sysNavigation/listIndex",
        insertNote : "/sysNavigation/addNote",
        insertNoteCreate : "/sysNavigation/saveAndCreateNote",
        getNote : "/sysNavigation/getNote",

        nlpHome : "/nlp/",
        nlpAnalyzeByModel: "/nlpModel/analyzeByModel",
        nlpLearnOnline: "/nlpModel/learnOnline",
        nlpTrainModel: "/nlpModel/trainModel",
        nlpChangeModel: "/nlpModel/changeModelByName",
        nlpGetNatureDict: "/nlpModel/getNatureDict",
        nlpSetNature: "/nlpModel/setNature",

        nlpSaveCustomWord: "/nlpModel/saveWord",
        nlpGetNature: "/nlpModel/getNature",
        nlpDelWord: "/nlpModel/delWord",
        nlpGetWordList: "/nlpModel/getWordList",
        nlpLoadStatus: "/nlpModel/loadStatus",
        nlpLoadFile: "/nlpModel/loadFile",
        nlpLoadLine: "/nlpModel/loadLine",
        nlpLoadKeyWordToModel: "/nlpModel/loadKeyWordToModel",
        nlpGetContentFromMemery: "/nlpModel/getContentFromMemery"
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
        $("body").mLoading("show");
        $.ajax({
            type: type,
            url: common.serverUrl + url,
            data : param,
            contentType: contentType,
            dataType: 'json',
            success: function(o) {
                $("body").mLoading("hide");
                if (o.code == 302) {
                    top.window.location.href = common.loginPage;
                } else if (o.code != 200) {
                    alert("状态："+ o.code + ",信息：" + o.message);
                } else {
                    callback(o);
                }
            },error: function(o) {
                $("body").mLoading("hide");
                alert(o.responseJSON.message);
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
    },

    /**
     * [通过参数名获取url中的参数值]
     * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
     * @param  {[string]} queryName [参数名]
     * @return {[string]}           [参数值]
     */
    GetRequestParamValue : function (queryName) {
        var query = decodeURI(window.location.search.substring(1));
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === queryName) { return pair[1]; }
        }
        return null;
    }

};