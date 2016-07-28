/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#searchInqrDtFrom" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchInqrDtTo" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
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
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month").on("click",(function() {
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month").on("click",(function() {
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month").on("click",(function() {
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
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
	$("form[name=form1] input[name=searchMbrId]").val("");
	$("form[name=form1] select[name=searchAfltPrdCd] option:eq(0)").attr("selected", "selected");
	$("form[name=form1] input[name=searchAfltCardNo]").val("");
	$("form[name=form1] select[name=searchAfltPrdStaCd] option:eq(0)").attr("selected", "selected");
	$("form[name=form1] select[name=searchInqrType] option:eq(0)").attr("selected", "selected");
	$("#btnAdd1Week").trigger("click");
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
	
	var result = validate();

	if ( result )
	{
		// 회원ID, 전화번호가 입력되지 않은 경우 등록일자가 필수여야함.
		/*
		if($("input[name=searchMbrId]").val() == "" && $("input[name=searchTelNo]").val() == "" ) {
			if($("input[name=searchInqrDtFrom]").val() == "" || $("input[name=searchInqrDtTo]").val() == "") {
				alert("등록일자는 필수 입력 항목 입니다.");
				return;
			} else if(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()) > ComUtil.removeMask($("input[name=searchInqrDtTo]").val())) {
				alert("from등록일자가 to등록일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()), ComUtil.removeMask($("input[name=searchInqrDtTo]").val())) > 186 ) {
				alert("검색 기간은 180일 이내로 설정해 주셔야 합니다.");
				return;
			}
		}
		*/

		if($("input[name=searchInqrDtFrom]").val() != "" && $("input[name=searchInqrDtTo]").val() == "") {
			alert("from일자 입력시 to일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(1).trigger("click");
			return;
		} else if($("input[name=searchInqrDtFrom]").val() == "" && $("input[name=searchInqrDtTo]").val() != "") {
			alert("to일자 입력시 from일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(0).trigger("click");
			return;
		} else if($("input[name=searchInqrDtFrom]").val() != "" && $("input[name=searchInqrDtTo]").val() != "") {
			if(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()) > ComUtil.removeMask($("input[name=searchInqrDtTo]").val())) {
				alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			}
		}
		

		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
		$("form[name=form1]").attr("action", "/mktp/member/affiliateCardIssuInfo.do");
		$("form[name=form1]").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	var result = validate();

	if ( result )
	{
		
		// 회원ID, 전화번호가 입력되지 않은 경우 등록일자가 필수여야함.
		if($("input[name=searchMbrId]").val() == "" && $("input[name=searchTelNo]").val() == "" ) {
			if($("input[name=searchInqrDtFrom]").val() == "" || $("input[name=searchInqrDtTo]").val() == "") {
				alert("등록일자는 필수 입력 항목 입니다.");
				return;
			} else if(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()) > ComUtil.removeMask($("input[name=searchInqrDtTo]").val())) {
				alert("from등록일자가 to등록일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()), ComUtil.removeMask($("input[name=searchInqrDtTo]").val())) > 186 ) {
				alert("검색 기간은 180일 이내로 설정해 주셔야 합니다.");
				return;
			}
		}
		

		if($("input[name=searchInqrDtFrom]").val() != "" && $("input[name=searchInqrDtTo]").val() == "") {
			alert("from일자 입력시 to일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(1).trigger("click");
			return;
		} else if($("input[name=searchInqrDtFrom]").val() == "" && $("input[name=searchInqrDtTo]").val() != "") {
			alert("to일자 입력시 from일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(0).trigger("click");
			return;
		} else if($("input[name=searchInqrDtFrom]").val() != "" && $("input[name=searchInqrDtTo]").val() != "") {
			if(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()) > ComUtil.removeMask($("input[name=searchInqrDtTo]").val())) {
				alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			}
		}
		
		$("form[name=form1]").attr("action", "/mktp/member/excelAffiliateCardIssuInfo.do");
		$("form[name=form1]").submit();
	}
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/member/affiliateCardIssuInfo.do");
	$("form[name=form1]").submit();
	
}

/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( mbrMngNo, afltPrdId ) {
//	ComUtil.popupPost("/mktp/member/popup/app01MemberInfoPopup.do", "1000", "600", "viewMemberInfo", { searchMbrMngNo : mbrMngNo });
	
	$("input[name=searchMbrMngNo]").val(mbrMngNo);
	$("input[name=searchAfltPrdId]").val(afltPrdId);
	$("form[name=form1]").attr("action", "/mktp/member/affiliateCardIssuInfoDetail.do");
	$("form[name=form1]").submit();
}

/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 당일
function firstCheck() {
	if($("input[name=searchInqrDtTo]").val() == "") {
		$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
	}
	if($("input[name=searchInqrDtTo]").val() != "") {
	//var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
		$("input[name=searchInqrDtFrom]").val(ComUtil.getCurDay("-", ""));
	}	
}

