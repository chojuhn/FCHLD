/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
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
	
	$(document).on("keydown",(function() {
		ComUtil.setClearBackSpace();
	}));	// history.back() 방지
	
	// 계좌인증
	$("#btnQuery").on("click",(function() {  
		btnQueryClick();
	}));
	
	$("#btnNext").on("click",(function() {  
		btnNextClick();
	}));
	
	$("#btnCancel").on("click",(function() {  
		btnCancelClick();
	}));
});

function btnCancelClick(data) {
	
	$("#mbrId2").val($("#mbrId").val());
	$("#svcJoinDt2").val($("#svcJoinDt").val());
	$("#searchMbrMngNo").val($("#mbrMngNo").val());
	
	$("form[name=form2]").attr("action", "/mktp/member/popup/stolMissDlcrListPopup.do");
	$("form[name=form2]").submit();
}

/**
 * 계좌인증 Click
 */
function btnQueryClick() {
	
	var ownerNm = $("#ownerNm").val();
	
	var bankCd = $("#bankCd").val();
	var acntNo = $("#acntNo").val();
	
	if(ownerNm == null || ownerNm == "") {
		alert("예금주가 입력되지 않았습니다. ");
		$("#ownerNm").focus();
		return;
	}
	if(acntNo == null || acntNo == "") {
		alert("계좌번호를 입력해주세요.");
		$("#acntNo").focus();
		return;
	}
	if(bankCd == null || bankCd == "") {
		alert("은행이 선택되지 않았습니다.");
		$("#bankCd").focus();
		return;
	}
	
	data =	{	
					bankCd			: bankCd
				,	acntNo			: acntNo
				,	ownerNm			: ownerNm
	};
	
	pUrl = "/mktp/member/popup/reqAuthAcntNm.do";
	
	window.name = "solMissDlcrPrgsPopup";
	ComUtil.popupPost(pUrl, "450", "550", "popAuth", data);
}

function btnNextClick() {
	
	var ownerNmVal = $("#ownerNm").val();
	
	if(ownerNmVal != null) {
		var ownerNm = ownerNmVal;
		
		var bankCd = $("#bankCd").val();
		var acntNo = $("#acntNo").val();
		
		if(ownerNm == null || ownerNm == "") {
			alert("예금주가 입력되지 않았습니다. ");
			$("#ownerNm").focus();
			return;
		}
		if(acntNo == null || acntNo == "") {
			alert("계좌번호를 입력해주세요.");
			$("#acntNo").focus();
			return;
		}
		if(bankCd == null || bankCd == "") {
			alert("은행이 선택되지 않았습니다.");
			$("#bankCd").focus();
			return;
		}
	}
	
	if(!confirm("입력한 정보로 분실/도난 신고를 하시겠습니까?")) {
		return;
	}
	
	var telNo1 = $("#telNo1").val();
	var telNo2 = $("#telNo2").val();
	var telNo3 = $("#telNo3").val();
	
	var telNo = "";
	
	if((telNo1 == "" || null) || (telNo2 == "" || null) || (telNo3 == "" || null)) {
		if(!confirm("연락처 정보 입력 없이 분실 신고를 진행하시겠습니까?\n진행상황에 대해 안내 받을 수 없습니다.")) {
			if(telNo1 == "") {
				$("#telNo1").focus();
			} else if(telNo2 == "") {
				$("#telNo2").focus();
			} else if(telNo3 == "") {
				$("#telNo3").focus();
			} else {
				$("#telNo1").focus();
			}
			
			return;
		}
	} else {
		telNo = telNo1 + "" + telNo2 + "" + telNo3;
	}
	
	if(telNo != "") {
		data =	{
					mbrMngNo : $("#mbrMngNo").val(),
					cardNo : $("#cardNo").val(),
					telNo : telNo
				};
		
		ComUtil.postAjaxData("/mktp/member/popup/checkTelNo.json", data, 'fnCheckBankAcntNoAuth', true, '처리 중 입니다.', '13000' );
	} else {
		fnCheckBankAcntNoAuth();
	}
}

function fnCheckBankAcntNoAuth(data) {
	
	var dptpJoinYn = $("#dptpJoinYn").val();
	ComUtil.postAjaxData("/mktp/member/popup/checkBankAcntNoAuth.json", {dptpJoinYn : dptpJoinYn}, 'fnCheckBankAcntNoAuthCallback', true, '처리 중 입니다.', '13000' );
}

function fnCheckBankAcntNoAuthCallback(data) {
	
	$("form[name=form1]").attr("action", "/mktp/member/popup/stolMissDlcrPrgsNext.do");
	$("form[name=form1]").submit();
}
