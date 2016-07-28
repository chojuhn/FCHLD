/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#searchDateFrom" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchDateTo" ).datepicker({
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
		initDate();
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
	$("#btn1W").on("click",(function() {
		$("#searchDateTo").val(ComUtil.getCurDay("-", ""));
		
		if($("#searchDateTo").val() != "") {
			var strVal = ComUtil.removeMask($("#searchDateTo").val());
			$("#searchDateFrom").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btn1M").on("click",(function() {
		$("#searchDateTo").val(ComUtil.getCurDay("-", ""));
		
		if($("#searchDateTo").val() != "") {
			var strVal = ComUtil.removeMask($("#searchDateTo").val());
			$("#searchDateFrom").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btn3M").on("click",(function() {
		$("#searchDateTo").val(ComUtil.getCurDay("-", ""));
		
		if($("#searchDateTo").val() != "") {
			var strVal = ComUtil.removeMask($("#searchDateTo").val());
			$("#searchDateFrom").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btn6M").on("click",(function() {
		$("#searchDateTo").val(ComUtil.getCurDay("-", ""));
		
		if($("#searchDateTo").val() != "") {
			var strVal = ComUtil.removeMask($("#searchDateTo").val());
			$("#searchDateFrom").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
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
	$("#searchGubun").val("LOST");
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
	
	var result = validate();

	// 조회기간을 1개월 이하로
	var dateFr = ComUtil.removeMask($("#searchDateFrom").val());
	var dateTo = ComUtil.removeMask($("#searchDateTo").val());
	
	var cal = ComUtil.calDay(dateFr,dateTo );
	
	if (cal > 32) {
		alert("조회기간은 1개원 이하만 가능합니다.");
		return false;
	}
	
	if ( result )
	{
		$("#currentPage").val(1);
		$("#pageSize").val($("#searchPageSize").val());
		$("#form1").attr("action", "/mktp/member/stolMissDclrPrnc.do");
		$("#form1").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	$("#form1").attr("action", "/mktp/member/excelStolMissDclrPrnc.do");
	$("#form1").submit();
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/member/stolMissDclrPrnc.do");
	$("form[name=form1]").submit();
	
}

/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( mbrMngNo ) {
	ComUtil.popupPost("/mktp/point/popup/integrationMemberInfoPopup.do", "1000", "600", "viewMemberInfo", { searchMbrMngNo : mbrMngNo });
}

/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 당일
function initDate() {
	if($("#searchDateTo").val() == "") {
		$("#searchDateTo").val(ComUtil.getCurDay("-", ""));
	}
	if($("#searchDateTo").val() != "") {
		$("#searchDateFrom").val(ComUtil.getCurDay("-", ""));
	}	
}
