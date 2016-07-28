/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	// form submit event
	$("form[name=form]").submit(function() {  
		event.preventDefault();
	});
	    
	// 초기화 버튼
	$("#btnInit").on("click",(function() {  
		btnInitClick();
	}));
	

	$("#btnCheckAll").on("click", function () {
		btnCheckAllClick();
	});
    
	// 검색 버튼
	$("#btnSearch").on("click",(function() {  
		btnSearchClick();
	}));

	// 엑셀 버튼
	$("#btnExcel").on("click",(function() {  
		btnExcelClick();
	}));

	// API 추가 버튼
	$("#btnAddKey").on("click", function () {
		btnAddKeyClick();
	});
	
	// API 수정 버튼
	$("#btnUpdateKey").on("click", function () {
		btnUpdateKeyClick();
	});
	
	// API 삭제 버튼
	$("#btnDeleteKey").on("click", function () {
		btnDeleteKeyClick();
	});
	
	
	$("#searchPageSize").on("change", function() {
		btnSearchClick();
	});
	
	$(".listItem").each(function () {
		$(this).children("td:gt(0)").on("click", function () {
			var item = $(this).parent().get(0);
			$("input[name=chkItem]").each(function (index) {
				this.checked = false;
			});
			
			var index = $(".listItem").index(item);
			$("input[name=chkItem]").eq(index).get(0).checked = true;
		});
	});
	
	
});


/**
 * 초기화 버튼 Click
 */
function btnInitClick()
{
	ComUtil.clearForm("form");
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
		$("form[name=form]").attr("action", "/mktp/system/apiManagementInfo.do");
		$("form[name=form]").submit();
	} 
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
	
	$("form[name=form]").attr("action", "/mktp/system/excelApiManagementInfo.do");
	$("form[name=form]").submit();
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
	$("form[name=form]").attr("action", "/mktp/system/apiManagementInfo.do");
	$("form[name=form]").submit();
	
}

/**
 * 회원 상세 Click
 * @param mbrMngNo
 */
function showDetail( mbrMngNo ) {
	
	$("input[name=searchMbrMngNo]").val(mbrMngNo);
	$("form[name=form]").attr("action", "/mktp/member/system/apiManagementInfoDetail.do");
	$("form[name=form]").submit();
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