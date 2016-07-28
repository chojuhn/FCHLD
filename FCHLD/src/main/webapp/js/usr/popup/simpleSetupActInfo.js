/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    
    $( "#searchActDtFrom" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchActDtTo" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });

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
        
	// 초기화 버튼
	$("#btnInit").on("click",(function() {  
		btnInitClick();
		firstCheck();
	}));
    
	// 검색 버튼
	$("#btnSearch").on("click",(function() {  
		btnSearchClick();
	}));

	// 엑셀 버튼
	$("#btnExcel").on("click",(function() {  
		btnExcelClick();
	}));

	// 1 주
	$("#btnAdd1Week").on("click",(function() {
		//if($("input[name=searchActDtTo]").val() == "") {}
			$("input[name=searchActDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchActDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchActDtTo]").val());
			$("input[name=searchActDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month").on("click",(function() {
		//if($("input[name=searchActDtTo]").val() == "") {}
			$("input[name=searchActDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchActDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchActDtTo]").val());
			$("input[name=searchActDtFrom]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month").on("click",(function() {
		//if($("input[name=searchActDtTo]").val() == "") {}
			$("input[name=searchActDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchActDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchActDtTo]").val());
			$("input[name=searchActDtFrom]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month").on("click",(function() {
		//if($("input[name=searchActDtTo]").val() == "") {}
			$("input[name=searchActDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchActDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchActDtTo]").val());
			$("input[name=searchActDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
		}
	}));
	

	// 페이지 건수 변경시 
	$("#searchPageSize").on("change",(function() {
		$("#btnSearch").trigger("click");
	}));
	
});


/**
 * 초기화 버튼 Click
 */
function btnInitClick()
{
	ComUtil.clearForm("formdata");
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
	
	var result = validate();

	if ( result )
	{

		if(ComUtil.removeMask($("input[name=searchActDtFrom]").val()) > ComUtil.removeMask($("input[name=searchActDtTo]").val())) {
			alert("from조회기간이 to조회기간 보다 큽니다. 확인해 주세요.");
			$("input[name=searchActDtFrom]").focus();
			return;
		}
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
		$("form[name=form1]").attr("action", "/mktp/member/popup/simpleSetupActInfo.do");
		$("form[name=form1]").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	$("form[name=form1]").attr("action", "/mktp/member/popup/excelSimpleSetupActInfo.do");
	$("form[name=form1]").submit();
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/member/popup/simpleSetupActInfo.do");
	$("form[name=form1]").submit();
	
}

/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 6 개월
function firstCheck() {
	if($("input[name=searchActDtTo]").val() == "") {
		$("input[name=searchActDtTo]").val(ComUtil.getCurDay("-", ""));
	}
	if($("input[name=searchActDtTo]").val() != "") {
		var strVal = ComUtil.removeMask($("input[name=searchActDtTo]").val());
		$("input[name=searchActDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
	}	
}