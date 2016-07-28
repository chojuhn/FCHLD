/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#rgtDt1" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#rgtDt2" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../../images/btn_icon_calendar.gif",
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
	}));
    
	// 조회 버튼
	$("#btnSearch").on("click",(function() {  
		btnSearchClick();
	}));
});

/**
 * 초기화 버튼 Click
 */
function btnInitClick() {
	
	ComUtil.clearForm("form1");
	
	$("input[name=currentPage]").val(1);
	$("input[name=pageSize]").val(10);			// 페이지 size 고정
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
	
	var result = validate();
	
	if ( result )
	{
		if(($("#rgtDt1").val()).replace(/-/gi,"") < $("#rgtDt2").val().replace(/-/gi,"")) {
			alert("전시종료일자가 전시시작일자보다 빠를 수 없습니다.");
			return;
		}
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);			// 페이지 size 고정
		$("form[name=form1]").attr("action", "/mktp/adhub/popup/copyAdExpsInfo.do");
		$("form[name=form1]").submit();
	}
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
	
	$("input[name=currentPage]").val(pageNo);
	$("form[name=form1]").attr("action", "/mktp/adhub/popup/copyAdExpsInfo.do");
	$("form[name=form1]").submit();
	
}

/**
 * 전체 체크박스 선택/해제
 */
function fnChkAllClick() {
	
	if($("#checkAll").is(":checked")) {
		$("input[name=chkSubID]").prop("checked", true);
	} else {
		$("input[name=chkSubID]").prop("checked", false);
	}
}

/**
 * 조회된 내용의 체크박스 선택/해제시 전체 체크박스 제어
 */
function fnChkIDClick() {
	
	if($("#checkAll").is(":checked")) {
		$("#checkAll").prop("checked", false);
	}
}

function viewCategoryPopup() {
	ComUtil.popupPost("/mktp/calendar/popup/getAdCtgrList.do", "450", "550", "viewCtgrMng", null);
}

function returnCategory(cd, cd_nm) {
	$("#searchCtgrNm").val(cd_nm);
	$("#searchCtgrId").val(cd);
}

/**
 * 추가 버튼 Click
 */
function btnAddClick() {
	
	
	var data = $("input[name=chkSubID]");
	
	
	// 전달 데이터 준비
	var ksccAdvrId = new Array();
	
	for(var i = 0; i < data.length; i++) {
		if(data[i].checked) {
			ksccAdvrId.push(data[i].getAttribute("ksccAdvrId") != "" ? data[i].getAttribute("ksccAdvrId") : "null");
		}
	}
	
	if(!(ksccAdvrId.length > 0)) {
		alert("복사할 광고를 선택해주시요.");
		return;
	} else if(ksccAdvrId.length > 1){
		alert("복사할 광고는 하나만 선택할 수 있습니다.");
		return;
	} else {
		if(!confirm("선택한 광고를 복사 하시겠습니까?")) {
			return;
		}
	}
	
	
	$("#ksccAdvrId").val(ksccAdvrId);
	
	// ajax 호출
	var data = {
					ksccAdvrId : $("#ksccAdvrId").val()
				};
	
	window.opener.detailInfoLoad(data);
	
	window.close();
	
	
	/*$("#form2").attr("action","/mktp/calendar/adListInfoInsert.json");
	$("#form2").attr("target", "adCalendarExpsInfo");
	$("#form2").submit();
	
	window.close();*/
}

