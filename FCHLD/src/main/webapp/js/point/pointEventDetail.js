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


	
});

function setPageSize(str) {
	$("input[name=pageSize]").val(str);
}

function goDetail() {
	
	var url = "/mktp/point/popup/pointEventMemberInfo.do";	
	var name = 'memberPop'; 
	var specs = 'menubar=no,status=no,toolbar=no,width=600,height=480';
	var newWindow = window.open("", name, specs);
//	newWindow.focus();
	
	$("input[name=currentPage]").val("1");
	$("form[name=form1]").attr("target", name);
	$("form[name=form1]").attr("action", url);
	$("form[name=form1]").submit();
}


function goAprv(str) {
	
	if ( $("input[name=acmtPrcgDtmCd]").val() != "PE21" ) {
		alert("이미 적립처리된 이벤트 입니다");
		return false;
	}

	question = "이벤트명 : [" + str + "]\n이벤트를 승인하시겠습니까?";
	if ( confirm(question) == true ) {
		$("input[name=aprvStaDvs]").val("PE12");
		$("form[name=form1]").removeAttr("target");	// 상세내역(팝업)을 본 후 실행하면 새탭으로 열려서 추가함 2014-12-22 : 임지은
		$("form[name=form1]").attr("action", "/mktp/point/pointEventInfoAprv.do");
		$("form[name=form1]").submit();
		
	}
}

function goAprvCancel(str) {
		
	if ( $("input[name=acmtPrcgDtmCd]").val() != "PE21" ) {
		alert("이미 적립처리된 이벤트 입니다");
		return false;
	}

	question = "이벤트명 : [" + str + "]\n이벤트를 승인취소하시겠습니까?";
	if ( confirm(question) == true ) {

		$("input[name=aprvStaDvs]").val("PE13");
		$("form[name=form1]").removeAttr("target");	// 상세내역(팝업)을 본 후 실행하면 새탭으로 열려서 추가함 2014-12-22 : 임지은
		$("form[name=form1]").attr("action", "/mktp/point/pointEventInfoAprv.do");
		$("form[name=form1]").submit();
		
	}
}

function goDelete(str) {
	
	question = "이벤트명 : [" + str + "]\n이벤트를 삭제하시겠습니까?";
	if ( confirm(question) == true ) {
		$("form[name=form1]").removeAttr("target");	// 상세내역(팝업)을 본 후 실행하면 새탭으로 열려서 추가함 2014-12-22 : 임지은
		$("form[name=form1]").attr("action", "/mktp/point/pointEventDelete.do");
		$("form[name=form1]").submit();
		
	}
}
	
function goUpdate() {
	
	if ( $("input[name=acmtPrcgDtmCd]").val() != "PE21" ) {
		alert("이미 적립처리된 이벤트 입니다");
		return false;
	}
	$("form[name=form1]").removeAttr("target");	// 상세내역(팝업)을 본 후 실행하면 새탭으로 열려서 추가함 2014-12-22 : 임지은
	$("form[name=form1]").attr("action", "/mktp/point/pointEventUpdate.do");
	$("form[name=form1]").submit();
}

function goList() {
	$("form[name=form1]").removeAttr("target");	// 상세내역(팝업)을 본 후 실행하면 새탭으로 열려서 추가함 2014-12-22 : 임지은
	$("form[name=form1]").attr("action", "/mktp/point/pointEventInfo.do");
	$("form[name=form1]").submit();
}
