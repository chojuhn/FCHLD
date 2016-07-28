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
        
	// 초기화 버튼
	$("#btnInit1").on("click",(function() {  
		btnInit1Click();
	}));
    
	// 검색 버튼
	$("#btnSearch1").on("click",(function() {  
		btnSearch1Click();
	}));

	// 엑셀 버튼
	$("#btnExcel1").on("click",(function() {  
		btnExcel1Click();
	}));


	
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
		$("#btnAdd1Week2").trigger("click");
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
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month2").on("click",(function() {
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month2").on("click",(function() {
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month2").on("click",(function() {
		//if($("input[name=searchInqrDtTo]").val() == "") {}
			$("input[name=searchInqrDtTo]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=searchInqrDtTo]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=searchInqrDtTo]").val());
			$("input[name=searchInqrDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
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
	
	// 강제로 1주일
	$("#btnAdd1Week2").trigger("click");
	
});


/**
 * 초기화 버튼 Click
 */
function btnInit1Click()
{
	$("form[name=form1] select[name=searchAfltPrdId] option:eq(0)").attr("selected", "selected");
	$("form[name=form1] select[name=searchInqrYy1] option:eq(0)").attr("selected", "selected");
	$("form[name=form1] select[name=searchInqrMm1] option:eq(0)").attr("selected", "selected");
	$("form[name=form1] select[name=searchInqrYy2] option:eq(0)").attr("selected", "selected");
	$("form[name=form1] select[name=searchInqrMm2] option:eq(11)").attr("selected", "selected");
}

/**
 * 조회 버튼 Click
 */
function btnSearch1Click() {
	
	var result = validate();

	if ( result )
	{
		if($("input[name=searchInqrYy1]").val()||$("input[name=searchInqrMm1]").val() > $("input[name=searchInqrYy2]").val()||$("input[name=searchInqrMm2]").val()) {
			alert("시작월이 종료월 보다 큽니다. 확인해주세요.");
			return;
		}
		
		$("input[name=currentPage1]").val(1);
		$("input[name=pageSize1]").val($("select[name=searchPageSize1]").val());
	
		var data = {	
						  currentPage 	   	: $("form[name=form1] input[name=currentPage1]").val()
						, pageSize          : $("form[name=form1] input[name=pageSize1]").val()
						, searchAfltPrdId  	: $("form[name=form1] select[name=searchAfltPrdId]").val()
						, searchInqrYy1 	: $("form[name=form1] select[name=searchInqrYy1]").val()
						, searchInqrMm1   	: $("form[name=form1] select[name=searchInqrMm1]").val()
						, searchInqrYy2 	: $("form[name=form1] select[name=searchInqrYy2]").val()
						, searchInqrMm2   	: $("form[name=form1] select[name=searchInqrMm2]").val()
					};
		$("#tblTBodyTotal1 > tr").remove();
		$("#tblTBody1 > tr").remove();
		ComUtil.postAjaxData('/mktp/member/affiliateCardStlmMntlInfo.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );
	}
}

/**
 * 페이지1 Click
 * @param pageNo
 */
function pagination1Click( pageNo ) {
	$("form[name=form1] input[name=currentPage1]").val(pageNo);
	var data = {	
			  currentPage 	   	: $("form[name=form1] input[name=currentPage1]").val()
			, pageSize          : $("form[name=form1] input[name=pageSize1]").val()
			, searchAfltPrdId  	: $("form[name=form1] select[name=searchAfltPrdId]").val()
			, searchInqrYy1 	: $("form[name=form1] select[name=searchInqrYy1]").val()
			, searchInqrMm1   	: $("form[name=form1] select[name=searchInqrMm1]").val()
			, searchInqrYy2 	: $("form[name=form1] select[name=searchInqrYy2]").val()
			, searchInqrMm2   	: $("form[name=form1] select[name=searchInqrMm2]").val()
		};

	ComUtil.postAjaxData('/mktp/member/affiliateCardStlmMntlInfo.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 조회1 조회 call back
 * @param data
 */
function btnSearch1CallBack(data) {
	var strHtml = "";
	$("#tblTBody1 > tr").remove();

	if(data.RESULT_LIST != null && data.RESULT_LIST.length > 0 ) {

		if(data.paginationInfo.currentPageNo == "1") {
			$("#tblTBodyTotal1 > tr").remove();
			strHtml = "<tr class='Lwhole'>";
			strHtml += "	<td class='Lfirst'>합계</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.tmnyPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.pntPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.totPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.tmnyPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.pntPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.totPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.mktCostStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.tmnySysUseStlmAmt)+"</td>";
			strHtml += "	<td class='Llast Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.ksccPrtySeleStlmAmt)+"</td>";
			strHtml += "</tr>";
			
			strHtml += "</tr>";
			$("#tblTBodyTotal1").append(strHtml);
		}
		
		// 리스트 생성
		for(var idx=0; idx < data.RESULT_LIST.length; idx++ ) {
			if(idx%2) {
				strHtml = "<tr onClick=\"javascript:viewStlmInfoPopup('"+data.RESULT_LIST[idx].afltPrdId+"', '"+data.RESULT_LIST[idx].stlmYm+"-01', '');\" style='cursor:pointer;'>";
			} else {
				strHtml = "<tr class='Leven' onClick=\"javascript:viewStlmInfoPopup('"+data.RESULT_LIST[idx].afltPrdId+"', '"+data.RESULT_LIST[idx].stlmYm+"-01', '');\"  style='cursor:pointer;'>";
			}
			strHtml += "	<td class='Lfirst'>"+data.RESULT_LIST[idx].stlmYm+"</td>";
			strHtml += "	<td>"+data.RESULT_LIST[idx].afltPrdNm+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnyPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].pntPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].totPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mmFamt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnyPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].pntPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].totPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mktCostAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mktCostStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnySysUseAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnySysUseStlmAmt)+"</td>";
			strHtml += "	<td class='Llast Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].ksccPrtySeleStlmAmt)+"</td>";

			strHtml += "</tr>";

			$("#tblTBody1").append(strHtml);
		}
		$("#divPaging1").html(ComUtil.fnMakePageHtml(data.paginationInfo, "pagination1Click"));
		$("#totalCnt1").html("건/페이지 (총"+data.paginationInfo.totalRecordCount+"건)");
		
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='14' class='Lfirst'>검색결과가 없습니다.</td>";
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
		if($("input[name=searchInqrYy1]").val()||$("input[name=searchInqrMm1]").val() > $("input[name=searchInqrYy2]").val()||$("input[name=searchInqrMm2]").val()) {
			alert("시작월이 종료월 보다 큽니다. 확인해주세요.");
			return;
		}
	
		$("form[name=form1]").attr("action", "/mktp/member/excelAffiliateCardStlmMntlInfo.do");
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
		if($("input[name=searchInqrDtFrom]").val() == "" || $("input[name=searchInqrDtFrom]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()) > ComUtil.removeMask($("input[name=searchInqrDtFrom]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()), ComUtil.removeMask($("input[name=searchInqrDtFrom]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}

		$("form[name=form2] input[name=currentPage2]").val(1);
		$("form[name=form2] input[name=pageSize2]").val($("select[name=searchPageSize2]").val());
		var data = {	
						 currentPage  	   	: $("form[name=form2] input[name=currentPage2]").val()
						, pageSize          : $("form[name=form2] input[name=pageSize2]").val()
						, searchAfltPrdId  	: $("form[name=form2] select[name=searchAfltPrdId]").val()
						, searchInqrDtFrom 	: $("form[name=form2] input[name=searchInqrDtFrom]").val()
						, searchInqrDtTo   	: $("form[name=form2] input[name=searchInqrDtTo]").val()
					};
		$("#tblTBody2 > tr").remove();
		$("#tblTBodyTotal2 > tr").remove();
		ComUtil.postAjaxData('/mktp/member/affiliateCardStlmDlyInfo.json', data, 'btnSearch2CallBack', true, '처리 중 입니다.', '13000' );
	}
}

/**
 * 페이지 Click
 * @param pageNo
 */
function pagination2Click( pageNo ) {
	$("form[name=form2] input[name=currentPage2]").val(pageNo);
	var data = {	
			 currentPage  	   	: $("form[name=form2] input[name=currentPage2]").val()
			, pageSize          : $("form[name=form2] input[name=pageSize2]").val()
			, searchAfltPrdId  	: $("form[name=form2] select[name=searchAfltPrdId]").val()
			, searchInqrDtFrom 	: $("form[name=form2] input[name=searchInqrDtFrom]").val()
			, searchInqrDtTo   	: $("form[name=form2] input[name=searchInqrDtTo]").val()
		};

	ComUtil.postAjaxData('/mktp/member/affiliateCardStlmDlyInfo.json', data, 'btnSearch2CallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 조회2 조회 call back
 * @param data
 */
function btnSearch2CallBack(data) {
	var strHtml = "";
	$("#tblTBody2 > tr").remove();
	if(data.RESULT_LIST != null && data.RESULT_LIST.length > 0 ) {

		if(data.paginationInfo.currentPageNo == "1") {
			$("#tblTBodyTotal2 > tr").remove();
			strHtml = "<tr class='Lwhole'>";
			strHtml += "	<td class='Lfirst'>합계</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.tmnyPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.pntPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.totPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.tmnyPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.pntPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.totPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.mktCostStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.tmnySysUseStlmAmt)+"</td>";
			strHtml += "	<td class='Llast Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.ksccPrtySeleStlmAmt)+"</td>";
			strHtml += "</tr>";
			
			strHtml += "</tr>";
			$("#tblTBodyTotal2").append(strHtml);
		}
		
		// 리스트 생성
		for(var idx=0; idx < data.RESULT_LIST.length; idx++ ) {
			if(idx%2) {
				strHtml = "<tr onClick=\"javascript:viewStlmInfoPopup('"+data.RESULT_LIST[idx].afltPrdId+"', '"+data.RESULT_LIST[idx].stlmDt+"', '"+data.RESULT_LIST[idx].stlmDt+"');\" style='cursor:pointer;'>";
			} else {
				strHtml = "<tr class='Leven' onClick=\"javascript:viewStlmInfoPopup('"+data.RESULT_LIST[idx].afltPrdId+"', '"+data.RESULT_LIST[idx].stlmDt+"', '"+data.RESULT_LIST[idx].stlmDt+"');\" style='cursor:pointer;'>";
			}
			strHtml += "	<td class='Lfirst'>"+data.RESULT_LIST[idx].stlmDt+"</td>";
			strHtml += "	<td>"+data.RESULT_LIST[idx].afltPrdNm+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnyPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].pntPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].totPymMbrCnt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mmFamt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnyPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].pntPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].totPymStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mktCostAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mktCostStlmAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnySysUseAmt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].tmnySysUseStlmAmt)+"</td>";
			strHtml += "	<td class='Llast Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].ksccPrtySeleStlmAmt)+"</td>";
			
			strHtml += "</tr>";
			
			$("#tblTBody2").append(strHtml);			
		}
		$("#divPaging2").html(ComUtil.fnMakePageHtml(data.paginationInfo, "pagination2Click"));
		$("#totalCnt2").html("건/페이지 (총"+data.paginationInfo.totalRecordCount+"건)");
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='14' class='Lfirst'>검색결과가 없습니다.</td>";
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
		if($("input[name=searchInqrDtFrom]").val() == "" || $("input[name=searchInqrDtFrom]").val() == "") {
			alert("조회기간은 필수 입력 입니다.");
			return;
		} else if(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()) > ComUtil.removeMask($("input[name=searchInqrDtFrom]").val())) {
			alert("시작일자가 종료일자가 보다 큽니다. 확인해주세요.");
			return;
		} else if(ComUtil.calDay(ComUtil.removeMask($("input[name=searchInqrDtFrom]").val()), ComUtil.removeMask($("input[name=searchInqrDtFrom]").val())) > 186 ) {
			alert("조회기간은 180일 이내로 설정해 주세요.");
			return;
		}
		
		$("form[name=form2]").attr("action", "/mktp/member/excelAffiliateCardStlmDlyInfo.do");
		$("form[name=form2]").submit();
	}
}


/**
 * 결제 정보 Click
 */
function viewStlmInfoPopup(pAfltPrdId, pInqrDtFrom, pInqrDtTo)
{
	if(pAfltPrdId == "") return;
	ComUtil.popupPost("/mktp/member/popup/affiliateCardStlmInfoDetail.do", "1200", "600", "viewStlmInfoPopup", { searchAfltPrdId : pAfltPrdId, searchInqrDtFrom : pInqrDtFrom, searchInqrDtTo : pInqrDtTo});
}
