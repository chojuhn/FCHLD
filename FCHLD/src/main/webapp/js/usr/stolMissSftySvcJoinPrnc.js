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
		$("#form1").attr("action", "/mktp/member/stolMissSftySvcJoinPrnc.do");
		$("#form1").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	$("#form1").attr("action", "/mktp/member/excelStolMissSftySvcJoinPrnc.do");
	$("#form1").submit();
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/member/stolMissSftySvcJoinPrnc.do");
	$("form[name=form1]").submit();
	
}

/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( pNo, gubun ) {
	if(gubun == "MBR_NO") {
		ComUtil.popupPost("/mktp/point/popup/integrationMemberInfoPopup.do", "1000", "600", "viewMemberInfo", { searchMbrMngNo : pNo });
	} else if(gubun == "CARD_NO") {
		ComUtil.popupPost("/mktp/member/popup/cardInfoPopup.do", "850", "600", "viewCardInfo", { searchCardNo : ComUtil.removeMask(pNo) });
	}
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

/**
 * 서비스 가입/해지
 * 
 * @param mbrId
 * @param mbrMngNo
 * @param gubun
 * @returns {Boolean}
 */
function svcJoin(mbrId, mbrMngNo, gubun) {
	if(gubun == "RGT") {
		if(!confirm("[" + mbrId + "] 회원에 대한 분실/도난 안심서비스에 가입하시겠습니까?")) {
			return false;
		}
		
		var data = {
					mbrMngNo : mbrMngNo
				,	mbrId : mbrId
				,	orgCurrentPage		: $("#currentPage").val()
				,	orgPageSize			: $("#searchPageSize").val()
				,	orgSearchMbrId		: $("#searchMbrId").val()
				,	orgSearchCardNo		: $("#searchCardNo").val()
				,	orgSearchTelNo		: $("#searchTelNo").val()
				,	orgSearchGubun		: $("#searchGubun").val()
				,	orgSearchDateFrom	: $("#searchDateFrom").val()
				,	orgSearchDateTo		: $("#searchDateTo").val()
		};
		
		window.name = "stolMissSftySvcJoinPrnc";
		ComUtil.popupPost("/mktp/member/popup/stolMissSftySvcJoinPopup.do", "550", "365", "viewStolMissSftySvcJoin", data);
		
	} else if(gubun == "CNCN") {
		if(!confirm("[" + mbrId + "] 회원은 이미 분실/도난 안심서비스에 가입되어 있습니다. 분실/도난 안심서비스를 가입 해지하시겠습니까?")) {
			return false;
		}
		
		$("#pageSize").val($("#searchPageSize").val());
		$("#svcJoinDvs").val(gubun);
		$("#mbrMngNo").val(mbrMngNo);
		$("form[name=form1]").attr("action", "/mktp/member/stolMissSftySvcJoinExec.do");
		$("form[name=form1]").submit();
	}
}

/**
 * 도난/분실 신고페이지 이동
 * 
 * @param mbrMngNo
 */
function stolMissDlcr(mbrId, mbrMngNo, svcJoinDt) {
	var data = {
					searchMbrMngNo : mbrMngNo
				,	mbrId : mbrId
				,	svcJoinDt : svcJoinDt
	};
	
	window.name = "stolMissSftySvcJoinPrnc";
	ComUtil.popupPost("/mktp/member/popup/stolMissDlcrListPopup.do", "900", "500", "viewStolMissDlcr", data);
}