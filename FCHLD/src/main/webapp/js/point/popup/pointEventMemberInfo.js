/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	// 페이지 건수 변경시 
	$("#searchPageSize").on("change",(function() {
		window.opener.setPageSize($("select[name=searchPageSize]").val());
		window.opener.goDetail();
	}));
	
	
});



function btnExcelClick() {
	
	$("form[name=form1]").attr("action", "/mktp/point/pointEventMemberInfoExcel.do");
	$("form[name=form1]").submit();
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/point/popup/pointEventMemberInfo.do");
	$("form[name=form1]").submit();
	
}



