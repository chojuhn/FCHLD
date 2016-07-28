/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    
	// 목록으로 버튼
	$("#btnList").on("click",(function() {  
		btnListClick();
	}));

	// 삭제 버튼
	$("#btnUpdate").on("click",(function() {  
		btnUpdateClick();
	}));

    $( "#adptEndDt" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
	
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
	$("form[name=form1]").attr("action", "/mktp/member/affiliateCardIssuInfo.do");
	$("form[name=form1]").submit();
}

/**
 * 결제 정보 Click
 */
function viewPymInfoPoup()
{
	if($("input[name=searchMbrMngNo]").val() == "") return;
	ComUtil.popupPost("/mktp/member/popup/affiliateCardPaymentInfo.do", "850", "600", "viewPymInfoPoup", { searchMbrMngNo : $("input[name=searchMbrMngNo]").val(), searchAfltPrdId : $("input[name=searchAfltPrdId]").val() });
}


/**
 * 카드 상세 정보 Click
 */
function viewCardInfoPopup(cardNo)
{
	if(cardNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/cardInfoPopup.do", "850", "600", "viewCardInfo", { searchCardNo : cardNo });
}

/**
 * 회원 상세 정보 Click
 */
function viewMemberInfo(mbrMngNo){
	if(mbrMngNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/integrationMemberInfoPopup.do", "1100", "700", "viewMemberInfo", { searchMbrMngNo : mbrMngNo });

}

/**
 * 수정 버튼 Click
 */
function btnUpdateClick()
{
	if($("input[name=searchMbrMngNo]").val() != "") {
		if ( confirm("수정 하시겠습니까?") )
		{
			ComUtil.postAjaxData("/mktp/member/updateAffiliateCardPaymentInfo.json", 'form1', 'btnUpdateClickCallBack', true, '처리 중 입니다.' );		
		}
	}	
}

/**
 * 수정 callback
 */
function btnUpdateClickCallBack() {
	btnListClick();		// 목록조회로 이동
}
