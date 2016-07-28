/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#searchJoinDtFrom" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchJoinDtTo" ).datepicker({
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
		//if($("input[name=searchJoinDtTo]").val() == "") {}
			$("input[name=searchJoinDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
			$("input[name=searchJoinDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
			$("input[name=searchJoinDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
			$("input[name=searchJoinDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
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
	ComUtil.clearForm("form1");
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
			if($("input[name=searchJoinDtFrom]").val() == "" || $("input[name=searchJoinDtTo]").val() == "") {
				alert("등록일자는 필수 입력 항목 입니다.");
				return;
			} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) {
				alert("from등록일자가 to종료일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()), ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) > 186 ) {
				alert("검색 기간은 180일 이내로 설정해 주셔야 합니다.");
				return;
			}
		}
		
		if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() == "" ) {
			alert("to연령 항목을 입력하여 주셔야 합니다.");
			$("input[name=searchAgeTo]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() == "" && $("input[name=searchAgeTo]").val() != "" ) {
			alert("from연령 항목을 입력하여 주셔야 합니다.");
			$("input[name=searchAgeFrom]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() != "" ) {
			if($("input[name=searchAgeFrom]").val() > $("input[name=searchAgeTo]").val() != "" ) {
				alert("from연령이 to연령 보다 큽니다. 확인해 주세요.");
				$("input[name=searchAgeFrom]").focus();
				return;
			}
		}
		*/
		
		if($("input[name=searchJoinDtFrom]").val() != "" && $("input[name=searchJoinDtTo]").val() == "") {
			alert("from일자 입력시 to일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(1).trigger("click");
			return;
		} else if($("input[name=searchJoinDtFrom]").val() == "" && $("input[name=searchJoinDtTo]").val() != "") {
			alert("to일자 입력시 from일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(0).trigger("click");
			return;
		} else if($("input[name=searchJoinDtFrom]").val() != "" && $("input[name=searchJoinDtTo]").val() != "") {
			if(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) {
				alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			}
		}
		
		if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() == "" ) {
			alert("from연령 입력시 to연령은 필수 입력 입니다.");
			$("input[name=searchAgeTo]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() == "" && $("input[name=searchAgeTo]").val() != "" ) {
			alert("to연령 입력시 from연령은 필수 입력 입니다.");
			$("input[name=searchAgeFrom]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() != "" ) {
			if(($("input[name=searchAgeFrom]").val()*1) > ($("input[name=searchAgeTo]").val()*1)) {
				alert("from연령이 to연령 보다 큽니다. 확인해 주세요.");
				$("input[name=searchAgeFrom]").focus();
				return;
			}
		}
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
		$("form[name=form1]").attr("action", "/mktp/member/integrationMemberInfo.do");
		$("form[name=form1]").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	alert("시스템 과부하 방지를 위해 이용을 제한하고 있습니다. \n운영팀에 요청 바랍니다.");
	
	/*
	var result = validate();

	if ( result )
	{
		
		// 회원ID, 전화번호가 입력되지 않은 경우 등록일자가 필수여야함.
		if($("input[name=searchMbrId]").val() == "" && $("input[name=searchTelNo]").val() == "" ) {
			if($("input[name=searchJoinDtFrom]").val() == "" || $("input[name=searchJoinDtTo]").val() == "") {
				alert("등록일자는 필수 입력 항목 입니다.");
				return;
			} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) {
				alert("from등록일자가 to종료일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()), ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) > 186 ) {
				alert("검색 기간은 180일 이내로 설정해 주셔야 합니다.");
				return;
			}
		}
		
		
		if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() == "" ) {
			alert("to연령 항목을 입력하여 주셔야 합니다.");
			$("input[name=searchAgeTo]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() == "" && $("input[name=searchAgeTo]").val() != "" ) {
			alert("from연령 항목을 입력하여 주셔야 합니다.");
			$("input[name=searchAgeFrom]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() != "" ) {
			if($("input[name=searchAgeFrom]").val() > $("input[name=searchAgeTo]").val() != "" ) {
				alert("from연령이 to연령 보다 큽니다. 확인해 주세요.");
				$("input[name=searchAgeFrom]").focus();
				return;
			}
		}
		
		
		if($("input[name=searchJoinDtFrom]").val() != "" && $("input[name=searchJoinDtTo]").val() == "") {
			alert("from일자 입력시 to일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(1).trigger("click");
			return;
		} else if($("input[name=searchJoinDtFrom]").val() == "" && $("input[name=searchJoinDtTo]").val() != "") {
			alert("to일자 입력시 from일자는 필수 입력 입니다.");
			$(".ui-datepicker-trigger").eq(0).trigger("click");
			return;
		} else if($("input[name=searchJoinDtFrom]").val() != "" && $("input[name=searchJoinDtTo]").val() != "") {
			if(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) {
				alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
				$(".ui-datepicker-trigger").eq(0).trigger("click");
				return;
			}
		}
		
		if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() == "" ) {
			alert("from연령 입력시 to연령은 필수 입력 입니다.");
			$("input[name=searchAgeTo]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() == "" && $("input[name=searchAgeTo]").val() != "" ) {
			alert("to연령 입력시 from연령은 필수 입력 입니다.");
			$("input[name=searchAgeFrom]").focus();
			return;
		} else if($("input[name=searchAgeFrom]").val() != "" && $("input[name=searchAgeTo]").val() != "" ) {
			if(($("input[name=searchAgeFrom]").val()*1) > ($("input[name=searchAgeTo]").val()*1)) {
				alert("from연령이 to연령 보다 큽니다. 확인해 주세요.");
				$("input[name=searchAgeFrom]").focus();
				return;
			}
		}
		
		$("form[name=form1]").attr("action", "/mktp/member/excelIntegrationMemberInfo.do");
		$("form[name=form1]").submit();
	}*/
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/member/integrationMemberInfo.do");
	$("form[name=form1]").submit();
	
}

/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( mbrMngNo ) {
	$("input[name=searchMbrMngNo]").val(mbrMngNo);
	$("form[name=form1]").attr("action", "/mktp/member/integrationMemberInfoDetail.do");
	$("form[name=form1]").submit();
}

/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 당일
function firstCheck() {
	if($("input[name=searchJoinDtTo]").val() == "") {
		$("input[name=searchJoinDtTo]").val(ComUtil.getCurDay("-", ""));
	}
	if($("input[name=searchJoinDtTo]").val() != "") {
	//var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
		$("input[name=searchJoinDtFrom]").val(ComUtil.getCurDay("-", ""));
	}	
}
