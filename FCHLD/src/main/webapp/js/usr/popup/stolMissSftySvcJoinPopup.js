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
	
	// 가입
	$("#btnRgt").on("click",(function() {  
		btnRgtClick();
	}));
});


/**
 * 카테고리 전체 조회
 */
function btnRgtClick() {
	if(!$("#agrm").is(":checked")) {
		alert("분실/도난 안심서비스 안내동의는 필수로 선택해야 합니다.");
		$("#agrm").focus();
		
		return false;
	}
	ComUtil.postAjaxData('/mktp/member/popup/stolMissSftySvcJoinExec.json', 'form1', 'btnRgtCallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 카테고리 조회 call back
 * @param data
 */
function btnRgtCallBack(data) {
	if(data.RESULT_CODE == "0000") {
		alert("가입처리 되었습니다.");
		
		$("form[name=form2]").attr("action", "/mktp/member/stolMissSftySvcJoinPrnc.do");
		$("form[name=form2]").attr("target", "stolMissSftySvcJoinPrnc");
		$("form[name=form2]").submit();
		
		window.close();
	} else {
		alert("가입처리에 실패했습니다.");
	}
}