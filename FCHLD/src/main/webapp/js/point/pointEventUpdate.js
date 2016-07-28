/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	
    $( "#evntSttDt" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#evntEndDt" ).datepicker({
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
    

	// 저장 버튼
	$("#btnSave").on("click",(function() {  
		doSave();
	}));
    
	// 취소 버튼
	$("#btnCancel").on("click",(function() {  
		btnCancelClick();
	}));

	var cd = $("input[name=pntAcmtMthdDvsOrg]").val();
	if (cd == "PE31")
		$("input[name=pntAcmtMthdDvs]:radio:input[value=PE31])").attr("checked", "checked");
	else 
		$("input[name=pntAcmtMthdDvs]:radio:input[value=PE32])").attr("checked", "checked");
	
	if($("input[name=RESULT_CODE]").val() != "") {
		alert($("input[name=RESULT_MESSAGE]").val());
		return false;
	}
	
});

function btnCancelClick() {
	$("form[name=form1]").attr("action", "/mktp/point/pointEventInfo.do");
	$("form[name=form1]").submit();
}

function doSave(){
	
	if($("input[name=evntNm]").val() == "") {
		alert("이벤트명은 필수 입력사항입니다.");
		return false;
	}
	
	if ($("input:checkbox[name=checkDt]").is(":checked") == true) {
		$( "#evntSttDt" ).val("2014-01-01");
		$( "#evntEndDt" ).val("9999-12-31");
	} else {
		if($("input[name=evntSttDt]").val() == "" || $("input[name=evntEndDt]").val() == "") {
			alert("이벤트기간은 필수 입력입니다. 정하지 않으시려면 기간설정 없음을 체크하세요.");
			return false;
		}
	}
	
	if ($("select[name=vldTerm]").val() == "0") 		{
		if($("input[name=vldTermNum]").val() == "") {
			alert("유효기간을 입력하십시오");
			return false;
		} 
	}
	if ($("select[name=ptuTerm]").val()=="-1") 		{
		if($("input[name=ptuTermNum]").val() == "") {
			alert("가용기간을 입력하십시오");
			return false;
		} 
	}

	if($("input[name=pntAcmtMthdDvs]:checked").val() == "PE32") {
		$("input[name=acmtPnt]").val("0");
	} else {
		if($("input[name=acmtPnt]").val() == "") {
			alert("일괄적립시 포인트값은 필수입니다");
			return false;
		}
	}

/*
  	if($("input[name=file]").val() == "") {
		alert("이벤트 대상 고객 파일을 선택하지 않으셨습니다.");
		return false;
	}
*/

	$("form[name=form1]").attr("action", "/mktp/point/updatePointEventInfo.do");
	$("form[name=form1]").submit();
}


function onlyNum() {
	var keyCode = window.event.keyCode;
	
	if (keyCode==8 || (keyCode>=35 && keyCode<=40) || (keyCode>=46 && keyCode<=57) || (keyCode>=96 && keyCode<=105) ) {
		window.event.returnValue = true;
		return;
	} else {
		window.event.returnValue = false;
		return;
	}
}