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
	}));
    
	// 검색 버튼
	$("#btnSearch2").on("click",(function() {  
		btnSearch2Click();
	}));

	// 엑셀 버튼
	$("#btnExcel2").on("click",(function() {  
		btnExcel2Click();
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
	var data = {};
	if($("input[name=searchInqrTyp1]:checked").val() == "S") {
		data = {	
					  searchInqrYy1 : $("select[name=searchInqrYy1]").val()
					, searchInqrMm1 : $("select[name=searchInqrMm1]").val()
				};
	}
	ComUtil.postAjaxData('/mktp/member/memberStatistics01AgeRange.json', data, 'btnSearch1CallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 조회1 조회 call back
 * @param data
 */
function btnSearch1CallBack(data) {
	
	var strHtml = "";
	$("#tblTBody1 > tr").remove();
	if(data.RESULT_LIST.length > 0 ) {

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
		$("#tblTBody1").append(strHtml);
		
		// 리스트 생성
		for(var idx=1; idx < data.RESULT_LIST.length; idx++ ) {
			strHtml = "<tr>";

			strHtml += "<td class='Lfirst'>"+(data.RESULT_LIST[idx].joinAppNm)+"</td>";
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
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='16' class='Lfirst'>검색결과가 없습니다.</td>";
		strHtml += "</tr>";

		$("#tblTBody1").append(strHtml);
		
	}
	initTable();
}


/**
 * 엑셀 버튼 Click
 */
function btnExcel1Click() {
	
	$("form[name=form1]").attr("action", "/mktp/member/memberStatistics01AgeRangeExcel.do");
	$("form[name=form1]").submit();
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
	var data = {};
	if($("input[name=searchInqrTyp2]:checked").val() == "S") {
		data = {	
					  searchInqrYy2 : $("select[name=searchInqrYy2]").val()
					, searchInqrMm2 : $("select[name=searchInqrMm2]").val()
				};
	}
	ComUtil.postAjaxData('/mktp/member/memberStatistics01AgeGroup.json', data, 'btnSearch2CallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 조회2 조회 call back
 * @param data
 */
function btnSearch2CallBack(data) {
	
	var strHtml = "";
	$("#tblTBody2 > tr").remove();
	if(data.RESULT_LIST.length > 0 ) {

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
		$("#tblTBody2").append(strHtml);
		
		// 리스트 생성
		for(var idx=1; idx < data.RESULT_LIST.length; idx++ ) {
			strHtml = "<tr>";

			strHtml += "<td class='Lfirst'>"+(data.RESULT_LIST[idx].joinAppNm)+"</td>";
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
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='20' class='Lfirst'>검색결과가 없습니다.</td>";
		strHtml += "</tr>";

		$("#tblTBody2").append(strHtml);
		
	}
	initTable();
}

/**
 * 엑셀2 버튼 Click
 */
function btnExcel2Click() {
	
	$("form[name=form2]").attr("action", "/mktp/member/memberStatistics01AgeGroupExcel.do");
	$("form[name=form2]").submit();
}

