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


	// 페이지 건수 변경시 
	$("#searchPageSize").on("change",(function() {
		$("#btnSearch").trigger("click");
	}));
	
	$("#btnSearch").trigger("click");
	
});

/**
 * windwo unload 시 
 */
$(window).unload(function(){
	ComUtil.fnComClosePopup();
	
});

/**
 * 초기화 버튼 Click
 */
function btnInitClick()
{
	ComUtil.clearForm("tblSearch");
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
	
	var result = validate();

	if ( result )
	{
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
	
		var data = {	
						  currentPage 	   	: $("form[name=form1] input[name=currentPage]").val()
						, pageSize          : $("form[name=form1] input[name=pageSize]").val()
						, searchAfltPrdId  	: $("form[name=form1] input[name=searchAfltPrdId]").val()
						, searchInqrDtFrom 	: $("form[name=form1] input[name=searchInqrDtFrom]").val()
						, searchInqrDtTo   	: $("form[name=form1] input[name=searchInqrDtTo]").val()
						, searchMbrId 		: $("form[name=form1] input[name=searchMbrId]").val()
						, searchAfltCardNo  : $("form[name=form1] input[name=searchAfltCardNo]").val()
						, searchPymMthdCd  	: $("form[name=form1] select[name=searchPymMthdCd]").val()
					};
		$("#tblTBodyTotal > tr").remove();
		$("#tblTBody > tr").remove();
		ComUtil.postAjaxData('/mktp/member/popup/affiliateCardStlmInfoDetail.json', data, 'btnSearchCallBack', true, '처리 중 입니다.', '13000' );
	}
}


/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("form[name=form1] input[name=currentPage]").val(pageNo);
	var data = {	
			  currentPage 	   	: $("form[name=form1] input[name=currentPage]").val()
			, pageSize          : $("form[name=form1] input[name=pageSize]").val()
			, searchAfltPrdId  	: $("form[name=form1] input[name=searchAfltPrdId]").val()
			, searchInqrDtFrom 	: $("form[name=form1] input[name=searchInqrDtFrom]").val()
			, searchInqrDtTo   	: $("form[name=form1] input[name=searchInqrDtTo]").val()
			, searchMbrId 		: $("form[name=form1] input[name=searchMbrId]").val()
			, searchAfltCardNo  : $("form[name=form1] input[name=searchAfltCardNo]").val()
			, searchPymMthdCd  	: $("form[name=form1] select[name=searchPymMthdCd]").val()
		};
	
	ComUtil.postAjaxData('/mktp/member/popup/affiliateCardStlmInfoDetail.json', data, 'btnSearchCallBack', true, '처리 중 입니다.', '13000' );
}


/**
 * 조회 조회 call back
 * @param data
 */
function btnSearchCallBack(data) {
	var strHtml = "";
	$("#tblTBody > tr").remove();
	if(data.RESULT_LIST != null && data.RESULT_LIST.length > 0 ) {

		if(data.paginationInfo.currentPageNo == "1") {
			$("#tblTBodyTotal > tr").remove();
			strHtml = "<tr class='Lwhole'>";
			strHtml += "	<td class='Lfirst'>합계</td>";
			strHtml += "	<td></td>";
			strHtml += "	<td></td>";
			strHtml += "	<td></td>";
			strHtml += "	<td></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_DATA.pymAmt)+"</td>";
			strHtml += "	<td></td>";
			strHtml += "	<td class='Llast Lright'></td>";
			strHtml += "</tr>";
			
			strHtml += "</tr>";
			$("#tblTBodyTotal").append(strHtml);
		}
		
		// 리스트 생성
		for(var idx=0; idx < data.RESULT_LIST.length; idx++ ) {
			if(idx%2) {
				strHtml = "<tr>";
			} else {
				strHtml = "<tr class='Leven'>";
			}
			strHtml += "	<td class='Lfirst'>"+data.RESULT_LIST[idx].pymDtm+"</td>";
			strHtml += "	<td class='Lleft'>"+data.RESULT_LIST[idx].mbrId+"</td>";
			strHtml += "	<td class='Lleft'>"+data.RESULT_LIST[idx].afltPrdNm+"</td>";
			strHtml += "	<td class='Lleft'><a href=\"javascript:;\" onClick=\"javascript:viewAlftCardInfoPopup('"+data.RESULT_LIST[idx].mbrMngNo+"', '"+data.RESULT_LIST[idx].afltPrdId+"');\">"+data.RESULT_LIST[idx].afltCardNo+"</a></td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].mmFamt)+"</td>";
			strHtml += "	<td class='Lright'>"+ComUtil.getDecimalFormat(data.RESULT_LIST[idx].pymAmt)+"</td>";
			strHtml += "	<td class='Lleft'>"+data.RESULT_LIST[idx].pymMthdNm+"</td>";
			strHtml += "	<td class='Llast Lleft'><a href=\"javascript:;\" onClick=\"javascript:viewCardInfoPopup('"+data.RESULT_LIST[idx].pymCardNo+"');\">"+data.RESULT_LIST[idx].pymCardNo+"</td>";

			strHtml += "</tr>";

			$("#tblTBody").append(strHtml);
		}
		$("#divPaging").html(ComUtil.fnMakePageHtmlPopup(data.paginationInfo, "paginationClick"));
		$("#totalCnt").html("건/페이지 (총"+data.paginationInfo.totalRecordCount+"건)");
		
	} else {
		strHtml = "<tr class='Lwhole'>";
		strHtml += "	<td colspan='8' class='Lfirst'>검색결과가 없습니다.</td>";
		strHtml += "</tr>";

		$("#tblTBody").append(strHtml);
		$("#divPaging").html("");		
		$("#totalCnt").html("건/페이지 (총0건)");
		
	}
	initTable();
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	var result = validate();

	if ( result )
	{
		$("form[name=form1]").attr("action", "/mktp/member/popup/excelAffiliateCardStlmInfoDetail.do");
		$("form[name=form1]").submit();
	}
}


/**
 * 제휴 카드 정보 Click
 */
function viewAlftCardInfoPopup(pMbrMngNo, pAfltPrdId)
{
	if(pAfltPrdId == "") return;
	ComUtil.popupPost("/mktp/member/popup/affiliateCardIssuInfoDetail.do", "800", "600", "viewAlftCardInfoPopup", { searchMbrMngNo: pMbrMngNo, searchAfltPrdId : pAfltPrdId});
}



/**
 * 카드 상세 정보 Click
 */
function viewCardInfoPopup(cardNo)
{
	if(cardNo == "") return;
	ComUtil.popupPost("/mktp/member/popup/cardInfoPopup.do", "850", "600", "viewCardInfo", { searchCardNo : cardNo });
}
