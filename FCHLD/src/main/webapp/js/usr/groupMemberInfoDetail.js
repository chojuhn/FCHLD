/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    
	// 목록으로 버튼
	$("#btnList").on("click",(function() {  
		btnListClick();
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
	$("form[name=form1]").attr("action", "/mktp/member/groupMemberInfo.do");
	$("form[name=form1]").submit();
}


/**
 * 카드 상세 정보 Click
 */
function viewCardInfoPoup(cardNo)
{
	if(cardNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/cardInfoPopup.do", "850", "600", "viewCardInfo", { searchCardNo : cardNo });
}

/**
 * 간편 설정 실행 정보 Click
 */
function viewSimpStupPoup(simpStupSeq)
{
	if(simpStupSeq == "") return;
	ComUtil.popupPost("/mktp/member/popup/simpleSetupActInfo.do", "800", "800", "simpleSetupActInfo", { searchSimpStupSeq: simpStupSeq });
}
