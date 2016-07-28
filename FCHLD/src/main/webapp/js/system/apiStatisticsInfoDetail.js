/**
 * 최초 실행 document ready
 */
$(document).ready(function(){

	// 엑셀 버튼
	$("#btnExcel").on("click",(function() {  
		btnExcelClick();
	}));
	
	$("#btnList").on("click", function () {
		history.go(-1);
	});
	
});



/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	$("form[name=form1]").attr("action", "/mktp/system/excelApiStatisticsInfoDetail.do");
	$("form[name=form1]").submit();
}


/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( apiUseDt, svcAtcCd ) {
	
	$("input[name=searchApiUseDt]").val(apiUseDt);
	$("input[name=searchSvcAtcCd]").val(svcAtcCd);
	$("form[name=form1]").attr("action", "/mktp/system/apiStatisticsInfoDetail.do");
	$("form[name=form1]").submit();
}
