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
	$("#btnInit1").on("click",(function() {  
		btnInit1Click();
		firstCheck1();
	}));
    
	// 검색 버튼
	$("#btnSearch1").on("click",(function() {  
		btnSearch1Click();
	}));

	// 엑셀 버튼
	$("#btnExcel1").on("click",(function() {  
		btnExcel1Click();
	}));

	// 1 주
	$("#btnAdd1Week1").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
		var to_day = ComUtil.removeMask(ComUtil.getCurDay("-", ""));
		$("input[name=searchJoinDtTo]").val(ComUtil.addDayMask(to_day, -1, "D", "-"));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month1").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
		var to_day = ComUtil.removeMask(ComUtil.getCurDay("-", ""));
		$("input[name=searchJoinDtTo]").val(ComUtil.addDayMask(to_day, -1, "D", "-"));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month1").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
		var to_day = ComUtil.removeMask(ComUtil.getCurDay("-", ""));
		$("input[name=searchJoinDtTo]").val(ComUtil.addDayMask(to_day, -1, "D", "-"));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month1").on("click",(function() {
		//if($("input[name=searchJoinDtTo]").val() == "") {}
		var to_day = ComUtil.removeMask(ComUtil.getCurDay("-", ""));
		$("input[name=searchJoinDtTo]").val(ComUtil.addDayMask(to_day, -1, "D", "-"));
		
		if($("input[name=searchJoinDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
			$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
		}
	}));
	
	// 페이지 건수 변경시 
	$("#searchpageSize").on("change",(function() {
		$("#btnSearch1").trigger("click");
	}));
});


/**
 * 초기화 버튼 Click
 */
function btnInit1Click()
{
	ComUtil.clearForm("form1");
}

/**
 * 조회 버튼 Click
 */
function btnSearch1Click() {
	
	var result = validate();

	if ( result )
	{
		if($("input[name=searchJoinDtFrom]").val() == "" || $("input[name=searchJoinDtTo]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()), ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize").val($("#searchPageSize").val());
	
		var data = {	
						  currentPage 	   	: $("input[name=currentPage]").val()
						, pageSize          : $("input[name=pageSize]").val()
						, searchJoinDtFrom : $("input[name=searchJoinDtFrom]").val()
						, searchJoinDtTo   : $("input[name=searchJoinDtTo]").val()
					};
		
		
		$("form[name=form1]").attr("action", "/mktp/member/affiliateCardStatistics.do");
		$("form[name=form1]").submit();
		
		/*
		$("#tblTBodyTotal1 > tr").remove();
		$("#tblTBody1 > tr").remove();
		ComUtil.postAjaxData('/mktp/member/affiliateCardStatistics.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );*/
	}
}

/**
 * 페이지1 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("input[name=pageSize").val($("#searchPageSize").val());
	var data = {	
			  currentPage  	   	: $("input[name=currentPage]").val()
			, pageSize          : $("input[name=pageSize]").val()
			, searchJoinDtFrom : $("input[name=searchJoinDtFrom]").val()
			, searchJoinDtTo   : $("input[name=searchJoinDtTo]").val()
		};
	
	$("form[name=form1]").attr("action", "/mktp/member/affiliateCardStatistics.do");
	$("form[name=form1]").submit();
/*
	ComUtil.postAjaxData('/mktp/member/affiliateCardStatistics.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );*/
}


/**
 * 조회1 조회 call back
 * @param data
 */
function btnSearch1CallBack(data) {
	var strHtml = "";
	var nRow = 0;
	$("#tblTBody1 > tr").remove();
	if(data.RESULT_LIST.length > 0 ) {

		if(data.paginationInfo.currentPageNo == "1") {
			$("#tblTBodyTotal1 > tr").remove();
			nRow++;
			strHtml = "<tr class='Lwhole'>";
			strHtml += "	<td rowspan='2' class='Lfirst'>합계</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp010MCnt*1+data.RESULT_LIST[0].ageGrp010FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp020MCnt*1+data.RESULT_LIST[0].ageGrp020FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp030MCnt*1+data.RESULT_LIST[0].ageGrp030FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp040MCnt*1+data.RESULT_LIST[0].ageGrp040FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp050MCnt*1+data.RESULT_LIST[0].ageGrp050FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp060MCnt*1+data.RESULT_LIST[0].ageGrp060FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp070MCnt*1+data.RESULT_LIST[0].ageGrp070FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp080MCnt*1+data.RESULT_LIST[0].ageGrp080FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp090MCnt*1+data.RESULT_LIST[0].ageGrp090FCnt*1))+"</td>";
			strHtml += "	<td rowspan='2' class='Llast Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrpTotCnt*1))+"</td>";
			strHtml += "</tr>";
			strHtml += "<tr class='Lwhole'>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp010MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp010FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp020MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp020FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp030MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp030FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp040MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp040FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp050MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp050FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp060MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp060FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp070MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp070FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp080MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp080FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp090MCnt*1))+"</td>";
			strHtml += "	<td class='Llast Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageGrp090FCnt*1))+"</td>";
			strHtml += "</tr>";
	
			
			strHtml += "</tr>";
			$("#tblTBodyTotal1").append(strHtml);
		}
		
		// 리스트 생성
		for(var idx=nRow; idx < data.RESULT_LIST.length; idx++ ) {
			strHtml = "<tr onclick=\"javascript:goDtlPage('"+data.RESULT_LIST[idx].joinDt+"');\" style='cursor:pointer;'>";

			strHtml += "<td class='Lfirst'>"+ComUtil.getDateFormat(data.RESULT_LIST[idx].joinDt)+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp010MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp010FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp020MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp020FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp030MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp030FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp040MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp040FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp050MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp050FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp060MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp060FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp070MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp070FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp080MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp080FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp090MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrp090FCnt*1))+"</td>";
			strHtml += "<td class='Llast Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageGrpTotCnt*1))+"</td>";
			
			strHtml += "</tr>";
			
			$("#tblTBody1").append(strHtml);			
		}
		$("#divPaging1").html(ComUtil.fnMakePageHtml(data.paginationInfo, "pagination1Click"));
		$("#totalCnt1").html("건/페이지 (총 "+data.paginationInfo.totalRecordCount+" 건)");
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='20' class='Lfirst'>검색결과가 없습니다.</td>";
		strHtml += "</tr>";

		$("#tblTBody1").append(strHtml);
		$("#divPaging1").html("");		
		$("#totalCnt1").html("건/페이지 (총 0 건)");
		
	}
	initTable();
}


/** 
 * 상세
 * 
 */
function goDtlPage(date){
	
	$("#searchJoinDate").val(date);
	
	$("form[name=form1]").attr("action", "/mktp/member/affiliateCardStatisticsDtl.do");
	$("form[name=form1]").submit();
	
}


/**
 * 엑셀 버튼 Click
 */
function btnExcel1Click() {
	
	var result = validate();

	if ( result )
	{
		if($("input[name=searchJoinDtFrom]").val() == "" || $("input[name=searchJoinDtTo]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom]").val()), ComUtil.removeMask($("input[name=searchJoinDtTo]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}
	
		$("form[name=form1]").attr("action", "/mktp/member/affiliateCardStatisticsExcel.do");
		$("form[name=form1]").submit();
	}
}



/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 1 주일
function firstCheck1() {
	var today = ComUtil.removeMask(ComUtil.getCurDay("-", ""));
	if($("input[name=searchJoinDtTo]").val() == "") {
		$("input[name=searchJoinDtTo]").val(ComUtil.addDayMask(today, -1, "D", "-"));
	}
	if($("input[name=searchJoinDtTo]").val() != "") {
	var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
		$("input[name=searchJoinDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
	}	
}