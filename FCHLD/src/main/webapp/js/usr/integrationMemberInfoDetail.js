/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    
	// 목록으로 버튼
	$("#btnList").on("click",(function() {  
		btnListClick();
	}));

	// 삭제 버튼
	$("#btnDelete").on("click",(function() {  
		btnDeleteClick();
	}));
	
});

/**
 * windwo unload 시 
 */
$(window).unload(function(){
	ComUtil.fnComClosePopup();
	
});


/**
 * 목록 버튼 Click
 */
function btnListClick()
{
	$("form[name=form1]").attr("action", "/mktp/member/integrationMemberInfo.do");
	$("form[name=form1]").submit();
}

/**
 * 그룹 정보 Click
 */
function viewGroupInfoPoup(grpId)
{
	if(grpId == "") return;
	ComUtil.popupPost("/mktp/member/popup/memberGroupInfo.do", "1200", "600", "viewGroupInfo", { searchGrpId : grpId });
}


/**
 * 삭제 버튼 Click
 */
function btnDeleteClick()
{
	if($("input[name=searchMbrMngNo]").val() != "") {
		if ( confirm("삭제 하시겠습니까?") )
		{
			ComUtil.postAjaxData("/mktp/member/deleteMemberInfo.json", 'form1', 'btnDeleteClickCallBack', true, '처리 중 입니다.' );		
		}
	}	
}

/**
 * 삭제 callback
 */
function btnDeleteClickCallBack() {
	btnListClick();		// 목록조회로 이동
}

