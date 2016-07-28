// tree obj
var dTreeCode = null;
var gHgrnCdSeq = "";
var gCdSeq = "";

/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
});


/**
 * 조회
 */
function btnSearchClick() {
	
	var result = validate();

	if ( result )
	{
		var sData = $("#inData").val();
		$("#outData").val("");
		ComUtil.postAjaxString($("input[name=apiUrl]").val(), {data : sData}, 'btnSearchCallBack', true, '처리 중 입니다.' );		
	}
}


/**
 * 조회 call back
 */
function btnSearchCallBack(data) {
	try {
		console.log("data", eval("("+data+")"));
	} catch(e){}
	$("#outData").val(data);
//	gHgrnCdSeq  = data.RESULT_DATA.hgrnCdSeq;
//	gCdSeq 		= data.RESULT_DATA.cdSeq;
//	btnSearch();
}

