/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	// form submit event
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

	// 엑셀 버튼
	$("#btnExcel1").on("click",(function() {  
		btnExcel1Click();
	}));

	// form submit event
	$("form[name=form2]").submit(function() {
		try {
			event.preventDefault();
		} catch(e) {
			try {
				event.returnValue = false;
				event.cancelBubble = true;
			} catch(e) {}
		}
	});

	// 엑셀 버튼
	$("#btnExcel2").on("click",(function() {  
		btnExcel2Click();
	}));

});

/**
 * 엑셀 버튼 Click
 */
function btnExcel1Click() {
	
	$("form[name=form1]").attr("action", "/mktp/member/affiliateCardStatisticsTypeExcel.do");
	$("form[name=form1]").submit();
}


/**
 * 엑셀2 버튼 Click
 */
function btnExcel2Click() {
	
	$("form[name=form2]").attr("action", "/mktp/member/affiliateCardStatisticsAreaExcel.do");
	$("form[name=form2]").submit();
}

