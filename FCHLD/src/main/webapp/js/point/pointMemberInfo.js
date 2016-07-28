function inputSearchPoint(){

	if ($('#searchPointScope').val() == 'GAP'){
		$('#inputSearchPointTo').css("display","");
	} else {
		$('#inputSearchPointTo').css("display","none");
	}
}


$(document).ready(function(){
	// 검색 버튼btnSearch1
	$("#btnSearch1").on("click",(function() {  
		searchClick();
	}));
	
	
	// 초기화 버튼
	$("#btnInit").on("click",(function() {  
		btnInitClick();
	}));
	
	
	// 페이지 건수 변경시 
	$("#pageSize2").on("change",(function() {
		$("#btnSearch1").trigger("click");
	}));
	
	inputSearchPoint();
	
});


function searchClick(){
	
	$("input[name=currentPage]").val("1");
	$("input[name=pageSize]").val($('#pageSize2').val());
	
	$("form[name=form1]").attr("action", "/mktp/point/pointMemberInfo.do");
	$("form[name=form1]").submit();
}

function searchClick2(){
	
	$("form[name=form1]").attr("action", "/mktp/point/pointMemberInfo.do");
	$("form[name=form1]").submit();
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/point/pointMemberInfo.do");
	$("form[name=form1]").submit();
	
}

function btnExcelClick() {
	
	$("form[name=form1]").attr("action", "/mktp/point/aggregateMemberExcel.do");
	$("form[name=form1]").submit();
}

function popCardInfo(mbrMngNo){
	ComUtil.popupPost("/mktp/member/popup/integrationMemberInfoPopup.do", "800", "500", "viewGroupInfo", { searchMbrMngNo : mbrMngNo });	

}

function selectAll() {
	var chk = $('input:checkbox[id="checkAll"]').is(":checked");
	if(chk){
		 $('input:checkbox[name="chkid"]').prop("checked",true);
	}else{
		 $('input:checkbox[name="chkid"]').prop("checked",false);
	}
}

/**
 * 초기화 버튼 Click
 */
function btnInitClick()
{
	ComUtil.clearForm("form1");
}