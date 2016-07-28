/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	// form submit event
	$("form[name=form1]").submit(function() {  
		event.preventDefault();
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
	

    $( "#searchUseDtFrom" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "/images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#searchUseDtTo" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "/images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    

    // 1 주
    $("#btnAdd1Week").on("click",(function() {
    	
    	//if($("input[name=searchUseDtTo]").val() == "") {}
    		$("input[name=searchUseDtTo]").val(ComUtil.getCurDay("-", ""));
    	
    	if($("input[name=searchUseDtTo]").val() != "") {
    		var strVal = ComUtil.removeMask($("input[name=searchUseDtTo]").val());
    		$("input[name=searchUseDtFrom]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
    	}
    }));

    // 1 개월
    $("#btnAdd1Month").on("click",(function() {
    	//if($("input[name=searchUseDtTo]").val() == "") {
    		$("input[name=searchUseDtTo]").val(ComUtil.getCurDay("-", ""));
    	
    	if($("input[name=searchUseDtTo]").val() != "") {
    		var strVal = ComUtil.removeMask($("input[name=searchUseDtTo]").val());
    		$("input[name=searchUseDtFrom]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
    	}
    }));

    // 3 개월
    $("#btnAdd3Month").on("click",(function() {
    	//if($("input[name=searchUseDtTo]").val() == "") {
    		$("input[name=searchUseDtTo]").val(ComUtil.getCurDay("-", ""));
    	
    	if($("input[name=searchUseDtTo]").val() != "") {
    		var strVal = ComUtil.removeMask($("input[name=searchUseDtTo]").val());
    		$("input[name=searchUseDtFrom]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
    	}
    }));

    // 6 개월
    $("#btnAdd6Month").on("click",(function() {
    	//if($("input[name=searchUseDtTo]").val() == "") {
    		$("input[name=searchUseDtTo]").val(ComUtil.getCurDay("-", ""));
    	
    	if($("input[name=searchUseDtTo]").val() != "") {
    		var strVal = ComUtil.removeMask($("input[name=searchUseDtTo]").val());
    		$("input[name=searchUseDtFrom]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
    	}
    }));
    

	$("#searchPageSize").on("change", function() {
		btnSearchClick();
	});

	
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
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
		$("form[name=form1]").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	$("form[name=form1]").attr("action", "/mktp/system/excelApiStatisticsInfo.do");
	$("form[name=form1]").submit();
}


function btnAddKeyClick() {
	ComUtil.popupPost("/mktp/system/popup/addApiKey.do", "800", "320", "viewGroupInfo", {});
}


/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/system/apiStatisticsInfo.do");
	$("form[name=form1]").submit();
	
}

/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( apiUseDt, svcAtcCd ) {
	
	$("input[name=searchApiUseDt]").val(apiUseDt);
	$("input[name=searchSvcAtcCd]").val(svcAtcCd);
	$("form[name=form1]").attr("action", "/mktp/system/apiStatisticsInfoDetail.do");
	$("form[name=form1]").submit();
}

function btnCheckAllClick() {
	
	var btnChecked = $("#btnCheckAll").get(0).checked;
	

	$("input[name=chkItem]").each(function (index) {
		this.checked = btnChecked ? "checked" : null;
	});
	
	
}

function btnUpdateKeyClick() {
	
	var checkbox = $("input[name=chkItem]");
	
	var checkedCount = 0;
	var checkedAuthKeySeq = 0;
	checkbox.each(function (index) {
		if (this.checked) {
			checkedCount++;
			checkedAuthKeySeq = $(this).val();
		}
	});
	
	if (checkedCount == 0) {
		alert("수정할 인증키를 선택하세요.");
		return;
	} else if (checkedCount > 1) {
		alert("한 번에 한 개의 인증키만 수정할 수 있습니다.");
		return;
	}
	
	if (checkedAuthKeySeq) {
	
		var data = {
				"searchAuthKeySeq" : checkedAuthKeySeq
		};
		ComUtil.popupPost("/mktp/system/popup/updateApiManagementInfo.do", "800", "320", "viewGroupInfo", data);

	}
}

function btnDeleteKeyClick() {

	var checkbox = $("input[name=chkItem]");
	
	var checkedAuthKeySeq = [];
	checkbox.each(function (index) {
		if (this.checked) {
			checkedAuthKeySeq.push($(this).val());
		}
	});
	
	if (checkedAuthKeySeq.length == 0) {
		alert("삭제할 인증키를 선택하세요.");
		return;
	}
	
	if (!confirm("선택한 인증키를 삭제하시겠습니까?")) {
		return;
	}
	
	$("#authKeySeqList").val(checkedAuthKeySeq.join(","));
	$("#form").attr("action", "/mktp/system/deleteApiManagementInfo.do");
	$("#form").submit();
}