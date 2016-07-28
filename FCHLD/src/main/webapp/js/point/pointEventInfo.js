/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#srchEvntSttDt" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#srchEvntEndDt" ).datepicker({
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

	// 승인 버튼
	$("#btnApprY").on("click",(function() {  
		btnApprYClick();
	}));

	// 승인취소 버튼
	$("#btnApprN").on("click",(function() {  
		btnApprNClick();
	}));

	// 신규등록 버튼
	$("#btnAdd").on("click",(function() {  
		btnAddClick();
	}));

	// 삭제 버튼
	$("#btnDel").on("click",(function() {  
		btnDelClick();
	}));

	// 1 주
	$("#btnAdd1Week").on("click",(function() {
		//if($("input[name=srchEvntEndDt]").val() == "") {}
			$("input[name=srchEvntEndDt]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=srchEvntEndDt]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=srchEvntEndDt]").val());
			$("input[name=srchEvntSttDt]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month").on("click",(function() {
		//if($("input[name=srchEvntEndDt]").val() == "") {
			$("input[name=srchEvntEndDt]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=srchEvntEndDt]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=srchEvntEndDt]").val());
			$("input[name=srchEvntSttDt]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month").on("click",(function() {
		//if($("input[name=srchEvntEndDt]").val() == "") {
			$("input[name=srchEvntEndDt]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=srchEvntEndDt]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=srchEvntEndDt]").val());
			$("input[name=srchEvntSttDt]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month").on("click",(function() {
		//if($("input[name=srchEvntEndDt]").val() == "") {
			$("input[name=srchEvntEndDt]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=srchEvntEndDt]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=srchEvntEndDt]").val());
			$("input[name=srchEvntSttDt]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
		}
	}));
	
	// 페이지 건수 변경시 
	$("#searchPageSize").on("change",(function() {
		$("#btnSearch").trigger("click");
	}));
	
	if ($("input[name=currentPage]").val()== "0")  btnSearchClick();
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
		if ( $("input[name=srchEvntEndDt]").val() < $("input[name=srchEvntSttDt]").val() ) {
			alert("조회기간을 다시 입력해주세요");
			return;
		} else {

			$("input[name=currentPage]").val(1);
			$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
			$("form[name=form1]").attr("action", "/mktp/point/pointEventInfo.do");
			$("form[name=form1]").submit();
		}
		
	} 
}

function goDetail(eventId) {
	$("input[name=eventId]").val(eventId);
	$("form[name=form1]").attr("action", "/mktp/point/pointEventDetail.do");
	$("form[name=form1]").submit();

}

function fncAdd() {
	$("form[name=form1]").attr("action", "/mktp/point/pointEventInsert.do");
	$("form[name=form1]").submit();

}
function selectAll() {
	var chk = $('input:checkbox[id="checkAll"]').is(":checked");
	if(chk){
		 $('input:checkbox[name="chkid"]').prop("checked",true);
	}else{
		 $('input:checkbox[name="chkid"]').prop("checked",false);
	}
}
/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/point/pointEventInfo.do");
	$("form[name=form1]").submit();
	
}

/**
 * 엑셀다운로드 Click
 * 2014-12-04 추가
 */
function btnExcelClick() {
	var result = validate();
	if ( result )
	{
		if ( $("input[name=srchEvntEndDt]").val() < $("input[name=srchEvntSttDt]").val() ) {
			alert("조회기간을 다시 입력해주세요");
			return;
		} else {
			$("form[name=form1]").attr("action", "/mktp/point/pointEventInfoExcel.do");
			$("form[name=form1]").submit();
		}
		
	} 
}


