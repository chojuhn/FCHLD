/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	$("form[name=form1]").submit(function() {
		try {
			event.preventDefault();
		} catch(e) {
			try {
				event.returnValue = false;
				event.cancelBubble = true;
			} catch(e) {}
		}
	});
	
	$(document).on("keydown",(function() {
		ComUtil.setClearBackSpace();
	}));	// history.back() 방지
	
	$("#btnReport").on("click",(function() {  
		btnReportClick();
	}));
});

/**
 * 분실/도난 신고 버튼 Click
 */
function btnReportClick() {
	
	var $radioChecked = $('input:radio[name=rdoDbid]:checked');
	
	var cardNo = $radioChecked.val();
	
	if(cardNo == null) {
		alert("분실/도난 신고할 교통카드를 선택해주세요.");
		return;
	}
	
	var status = $radioChecked.get(0).getAttribute("status");
	var telno = $radioChecked.get(0).getAttribute("telNo");
	var dptpJoinYn = $radioChecked.get(0).getAttribute("dptpJoinYn");
	
	if(status == 'CARD_LOST') {
		alert("이미 신고처리된 교통카드입니다.");
		return;
	}
	
	$("#telNo").val(telno);
	$("#dptpJoinYn").val(dptpJoinYn);
	
	$("form[name=form1]").attr("action", "/mktp/member/popup/stolMissDlcrPrgsPopup.do");
	$("form[name=form1]").submit();
}
