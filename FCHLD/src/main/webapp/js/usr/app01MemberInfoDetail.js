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
	$("form[name=form1]").attr("action", "/mktp/member/app01MemberInfo.do");
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
 * 카드 상세 정보 Click
 */
function viewCardInfoPoup(cardNo)
{
	if(cardNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/cardInfoPopup.do", "850", "600", "viewCardInfo", { searchCardNo : cardNo });
}


/**
 * 제휴 카드 정보 Click
 */
function viewAlftCardInfoPopup(pMbrMngNo, pAfltPrdId)
{
	if(pAfltPrdId == "") return;
	ComUtil.popupPost("/mktp/member/popup/affiliateCardIssuInfoDetail.do", "800", "600", "viewAlftCardInfoPopup", { searchMbrMngNo: pMbrMngNo, searchAfltPrdId : pAfltPrdId});
}

