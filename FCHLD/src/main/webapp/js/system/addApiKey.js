/**
 * 최초 실행 document ready
 */
$(window).ready(function(){
	
	if ($("#authKey").val()) {
		var authKey = $("#authKey").val();
		var parent = $("#authKey").parent();
		
		parent.children().remove();
		parent.append(authKey);

	}

	$("#btnGenerateApiKey").on("click", function () {
		
		$("#authKey").removeClass("v-req");
		
		var result = validate();
		
		if (result) {
			btnGenerateApiKeyClick();
			
			$("#authKey").addClass("v-req");
		}
	});
	
	$("#btnSave").on("click", function () {
		btnSaveClick();
	});
});


function btnGenerateApiKeyClick() {
	var data = {	
			uinNm : $("input[name=uinNm]").val()
			, apiUseDvsCd : $("select[name=apiUseDvsCd]").val()
			, svcAtcCd : $("select[name=svcAtcCd]").val()
	};
	ComUtil.postAjaxData('/mktp/system/generateAuthKey.json', data, 'btnGenerateApiKeyCallback', true, '처리 중 입니다.', '13000' );
}

function btnGenerateApiKeyCallback(data) {
	if (data.authKey) {
		$("#authKey").val(data.authKey);
	} else {
		alert("인증키 발급에 실패했습니다. 다시 시도해주세요.");
	}
}

function btnSaveClick() {

	var result = validate();
	
	if (result) {
		
		$("#form1").submit();
	}
}




