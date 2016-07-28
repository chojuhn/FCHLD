/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    
	
});

/**
 * windwo unload 시 
 */
$(window).unload(function(){
	ComUtil.fnComClosePopup();
	
});

/**
 * 카드 상세 정보 Click
 */
function viewCardInfoPoup(cardNo)
{
	if(cardNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/cardInfoPopup.do", "850", "600", "viewCardInfo", { searchCardNo : cardNo });
}

/**
 * 회원 상세 정보 Click
 */
function viewMemberInfo(mbrMngNo){
	if(mbrMngNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/integrationMemberInfoPopup.do", "1000", "600", "viewMemberInfo", { searchMbrMngNo : mbrMngNo });

}

