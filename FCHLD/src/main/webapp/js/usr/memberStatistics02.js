/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#searchJoinDtFrom1" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchJoinDtTo1" ).datepicker({
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
		//if($("input[name=searchJoinDtTo1]").val() == "") {}
			$("input[name=searchJoinDtTo1]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo1]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo1]").val());
			$("input[name=searchJoinDtFrom1]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month1").on("click",(function() {
		//if($("input[name=searchJoinDtTo1]").val() == "") {}
			$("input[name=searchJoinDtTo1]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo1]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo1]").val());
			$("input[name=searchJoinDtFrom1]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month1").on("click",(function() {
		//if($("input[name=searchJoinDtTo1]").val() == "") {}
			$("input[name=searchJoinDtTo1]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo1]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo1]").val());
			$("input[name=searchJoinDtFrom1]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month1").on("click",(function() {
		//if($("input[name=searchJoinDtTo1]").val() == "") {}
			$("input[name=searchJoinDtTo1]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo1]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo1]").val());
			$("input[name=searchJoinDtFrom1]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
		}
	}));

	
    $( "#searchJoinDtFrom2" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchJoinDtTo2" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });

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
        
	// 초기화 버튼
	$("#btnInit2").on("click",(function() {  
		btnInit2Click();
		firstCheck2();
	}));
    
	// 검색 버튼
	$("#btnSearch2").on("click",(function() {  
		btnSearch2Click();
	}));

	// 엑셀 버튼
	$("#btnExcel2").on("click",(function() {  
		btnExcel2Click();
	}));

	// 1 주
	$("#btnAdd1Week2").on("click",(function() {
		//if($("input[name=searchJoinDtTo2]").val() == "") {}
			$("input[name=searchJoinDtTo2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo2]").val());
			$("input[name=searchJoinDtFrom2]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month2").on("click",(function() {
		//if($("input[name=searchJoinDtTo2]").val() == "") {}
			$("input[name=searchJoinDtTo2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo2]").val());
			$("input[name=searchJoinDtFrom2]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month2").on("click",(function() {
		//if($("input[name=searchJoinDtTo2]").val() == "") {}
			$("input[name=searchJoinDtTo2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo2]").val());
			$("input[name=searchJoinDtFrom2]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month2").on("click",(function() {
		//if($("input[name=searchJoinDtTo2]").val() == "") {}
			$("input[name=searchJoinDtTo2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchJoinDtTo2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo2]").val());
			$("input[name=searchJoinDtFrom2]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
		}
	}));
	
	// 페이지 건수 변경시 
	$("#searchPageSize1").on("change",(function() {
		$("#btnSearch1").trigger("click");
	}));
	
	// 페이지 건수 변경시 
	$("#searchPageSize2").on("change",(function() {
		$("#btnSearch2").trigger("click");
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
		if($("input[name=searchJoinDtFrom1]").val() == "" || $("input[name=searchJoinDtTo1]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom1]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo1]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom1]").val()), ComUtil.removeMask($("input[name=searchJoinDtTo1]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}
		
		$("input[name=currentPage1]").val(1);
		$("input[name=pageSize1]").val($("select[name=searchPageSize1]").val());
	
		var data = {	
						  currentPage 	   	: $("input[name=currentPage1]").val()
						, pageSize          : $("input[name=pageSize1]").val()
						, searchJoinAppId1  : $("select[name=searchJoinAppId1]").val()
						, searchJoinDtFrom1 : $("input[name=searchJoinDtFrom1]").val()
						, searchJoinDtTo1   : $("input[name=searchJoinDtTo1]").val()
					};
		$("#tblTBodyTotal1 > tr").remove();
		$("#tblTBody1 > tr").remove();
		ComUtil.postAjaxData('/mktp/member/memberStatistics02AgeRange.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );
	}
}

/**
 * 페이지1 Click
 * @param pageNo
 */
function pagination1Click( pageNo ) {
	$("input[name=currentPage1]").val(pageNo);
	var data = {	
			  currentPage  	   	: $("input[name=currentPage1]").val()
			, pageSize          : $("input[name=pageSize1]").val()
			, searchJoinAppId1  : $("select[name=searchJoinAppId1]").val()
			, searchJoinDtFrom1 : $("input[name=searchJoinDtFrom1]").val()
			, searchJoinDtTo1   : $("input[name=searchJoinDtTo1]").val()
		};

	ComUtil.postAjaxData('/mktp/member/memberStatistics02AgeRange.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );
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
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng00MCnt*1+data.RESULT_LIST[0].ageRng00FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng10MCnt*1+data.RESULT_LIST[0].ageRng10FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng20MCnt*1+data.RESULT_LIST[0].ageRng20FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng30MCnt*1+data.RESULT_LIST[0].ageRng30FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng40MCnt*1+data.RESULT_LIST[0].ageRng40FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng50MCnt*1+data.RESULT_LIST[0].ageRng50FCnt*1))+"</td>";
			strHtml += "	<td colspan='2' class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng60MCnt*1+data.RESULT_LIST[0].ageRng60FCnt*1))+"</td>";
			strHtml += "	<td rowspan='2' class='Llast Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRngTotCnt*1))+"</td>";
			strHtml += "</tr>";
			strHtml += "<tr class='Lwhole'>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng00MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng00FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng10MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng10FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng20MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng20FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng30MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng30FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng40MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng40FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng50MCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng50FCnt*1))+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng60MCnt*1))+"</td>";
			strHtml += "	<td class='Llast Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[0].ageRng60FCnt*1))+"</td>";
			strHtml += "</tr>";
	
			
			strHtml += "</tr>";
			$("#tblTBodyTotal1").append(strHtml);
		}
		
		// 리스트 생성
		for(var idx=nRow; idx < data.RESULT_LIST.length; idx++ ) {
			strHtml = "<tr>";

			strHtml += "<td class='Lfirst'>"+(data.RESULT_LIST[idx].joinDt)+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng00MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng00FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng10MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng10FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng20MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng20FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng30MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng30FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng40MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng40FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng50MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng50FCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng60MCnt*1))+"</td>";
			strHtml += "<td class='Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRng60FCnt*1))+"</td>";
			strHtml += "<td class='Llast Lright'>"+ComUtil.getDecimalFormat((data.RESULT_LIST[idx].ageRngTotCnt*1))+"</td>";
			
			strHtml += "</tr>";

			$("#tblTBody1").append(strHtml);
		}
		$("#divPaging1").html(ComUtil.fnMakePageHtml(data.paginationInfo, "pagination1Click"));
		$("#totalCnt1").html("건/페이지 (총"+data.paginationInfo.totalRecordCount+"건)");
		
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='16' class='Lfirst'>검색결과가 없습니다.</td>";
		strHtml += "</tr>";

		$("#tblTBody1").append(strHtml);
		$("#divPaging1").html("");		
		$("#totalCnt1").html("건/페이지 (총0건)");
		
	}
	initTable();
}


/**
 * 엑셀 버튼 Click
 */
function btnExcel1Click() {
	
	var result = validate();

	if ( result )
	{
		if($("input[name=searchJoinDtFrom1]").val() == "" || $("input[name=searchJoinDtTo]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom1]").val()) > ComUtil.removeMask($("input[name=searchJoinDtTo1]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom1]").val()), ComUtil.removeMask($("input[name=searchJoinDtTo1]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}
	
		$("form[name=form1]").attr("action", "/mktp/member/memberStatistics02AgeRangeExcel.do");
		$("form[name=form1]").submit();
	}
}


/**
 * 초기화2 버튼 Click
 */
function btnInit2Click()
{
	ComUtil.clearForm("form2");
}

/**
 * 조회2 버튼 Click
 */
function btnSearch2Click() {
	var result = validate();

	if ( result )
	{
		if($("input[name=searchJoinDtFrom2]").val() == "" || $("input[name=searchJoinDtFrom2]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val()) > ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val()), ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}

		$("input[name=currentPage2]").val(1);
		$("input[name=pageSize2]").val($("select[name=searchPageSize2]").val());
		var data = {	
						 currentPage  	   	: $("input[name=currentPage2]").val()
						, pageSize          : $("input[name=pageSize2]").val()
						, searchJoinAppId2  : $("select[name=searchJoinAppId2]").val()
						, searchJoinDtFrom2 : $("input[name=searchJoinDtFrom2]").val()
						, searchJoinDtTo2   : $("input[name=searchJoinDtTo2]").val()
					};
		$("#tblTBody2 > tr").remove();
		$("#tblTBodyTotal2 > tr").remove();
		ComUtil.postAjaxData('/mktp/member/memberStatistics02AgeGroup.json', data, 'btnSearch2CallBack', true, '처리 중 입니다.', '13000' );
	}
}

/**
 * 페이지 Click
 * @param pageNo
 */
function pagination2Click( pageNo ) {
	$("input[name=currentPage2]").val(pageNo);
	var data = {	
					 currentPage  	   	: $("input[name=currentPage2]").val()
					, pageSize          : $("input[name=pageSize2]").val()
					, searchJoinAppId2  : $("select[name=searchJoinAppId2]").val()
					, searchJoinDtFrom2 : $("input[name=searchJoinDtFrom2]").val()
					, searchJoinDtTo2   : $("input[name=searchJoinDtTo2]").val()
				};

	ComUtil.postAjaxData('/mktp/member/memberStatistics02AgeGroup.json', data, 'btnSearch2CallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 조회2 조회 call back
 * @param data
 */
function btnSearch2CallBack(data) {
	var strHtml = "";
	var nRow = 0;
	$("#tblTBody2 > tr").remove();
	if(data.RESULT_LIST.length > 0 ) {

		if(data.paginationInfo.currentPageNo == "1") {
			$("#tblTBodyTotal2 > tr").remove();
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
			$("#tblTBodyTotal2").append(strHtml);
		}
		
		// 리스트 생성
		for(var idx=nRow; idx < data.RESULT_LIST.length; idx++ ) {
			strHtml = "<tr>";

			strHtml += "<td class='Lfirst'>"+(data.RESULT_LIST[idx].joinDt)+"</td>";
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
			
			$("#tblTBody2").append(strHtml);			
		}
		$("#divPaging2").html(ComUtil.fnMakePageHtml(data.paginationInfo, "pagination2Click"));
		$("#totalCnt2").html("건/페이지 (총"+data.paginationInfo.totalRecordCount+"건)");
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='24' class='Lfirst'>검색결과가 없습니다.</td>";
		strHtml += "</tr>";

		$("#tblTBody2").append(strHtml);
		$("#divPaging2").html("");		
		$("#totalCnt2").html("건/페이지 (총0건)");
		
	}
	initTable();
}

/**
 * 엑셀2 버튼 Click
 */
function btnExcel2Click() {
	var result = validate();

	if ( result )
	{
		if($("input[name=searchJoinDtFrom2]").val() == "" || $("input[name=searchJoinDtFrom2]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val()) > ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val()), ComUtil.removeMask($("input[name=searchJoinDtFrom2]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}
		
		$("form[name=form2]").attr("action", "/mktp/member/memberStatistics02AgeGroupExcel.do");
		$("form[name=form2]").submit();
	}
}

/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 1 주일
function firstCheck1() {
	if($("input[name=searchJoinDtTo1]").val() == "") {
		$("input[name=searchJoinDtTo1]").val(ComUtil.getCurDay("-", ""));
	}
	if($("input[name=searchJoinDtTo1]").val() != "") {
	var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo1]").val());
		$("input[name=searchJoinDtFrom1]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
	}	
}

//1 주일
function firstCheck2() {
	if($("input[name=searchJoinDtTo2]").val() == "") {
		$("input[name=searchJoinDtTo2]").val(ComUtil.getCurDay("-", ""));
	}
	if($("input[name=searchJoinDtTo2]").val() != "") {
	var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo2]").val());
		$("input[name=searchJoinDtFrom2]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
	}	
}