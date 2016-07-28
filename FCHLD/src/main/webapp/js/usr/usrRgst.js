function fnGoList() {
	//$("#mainForm").attr('method', 'GET');
    //$("#mainForm").attr('target', '_self').attr("action", rootContextPath + "/usr/readUserList.do").submit();
	window.location=rootContextPath + "/usr/readUserList.do";
}

function fnSaveRailStn() {

	var check = dui.wv.validate($("#mainForm"));
	if(!check){
		return true;
	}
	
    AjaxUtil.ajaxPOST(rootContextPath + "/usr/addUserList.ajax"
        ,formSerializeObject($("#mainForm"))
        ,function( data, status, xhr ) {
             var resultType = data[KSCC_RES_KEY_RESULT];
             if( resultType == KSCC_RES_KEY_RESULT_SUCCESS ) {  // KSCC_RES_KEY_RESULT_ERROR
                 alert("성공하였습니다.");
                 fnGoList();
             }else{
            	 alert("실패하였습니다.");
             }
    });
}

function formSerializeObject(form){
    var obj = {};

    form.find("input,select,textarea").each(function() {
        var tag = $(this);
        var tagName = tag[0].tagName.toUpperCase();
        if( tagName == "TEXTAREA" ) {
            obj[$(this).attr("name")] = $(this).val() +  '';
        } else if( tagName == "SELECT" ) {
            obj[$(this).attr("name")] = $(this).val() +  '';
        } else if( tagName == "INPUT" ) {
            var type = $(this).attr('type');
            if( type && type.toUpperCase() == "BUTTON" ) {
                obj[$(this).attr("name")] = $(this).val() +  '';
            } else if( type && type.toUpperCase() == "RADIO" ) {
                if( ! $(this).is(":checked") ) return true;
                obj[$(this).attr("name")] = $(this).val() +  '';
            } else {
                obj[$(this).attr("name")] = fnComRemovePattern($(this).attr("format"),$(this).val()) +  '';
            }
        }
    });
    return obj;
}

