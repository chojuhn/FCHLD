
//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 페이지 로딩시
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
window.onload = function()
{
	$( "#txtBRTH_Y_MD" ).datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : 'yy-mm-dd',
		numberOfMonths : 1
	});

	document.getElementById("txtMNGR_PIN").focus();
	document.getElementById("txtMNGR_PIN").select();

	btnInfo_Click();
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
function btnInfo_Click()
{
	document.getElementById("txtMNGR_SEQ_N").value = opener.g_s_MNGR_SEQ_N_CMN;
	
	//공통에서 제공하는 ajax 처리 함수 호출
	fnGetAjaxData('/jsp/manage/include_files/common_server/mngr_info_action.do', 'form1', 'btnInfo_CallBack_Click', true, '조회 중 입니다.' );
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
function btnInfo_CallBack_Click(data)
{
	//document.all.txtErrors.value = data;
	//alert(data);

	//alert(data.RESULT_MSG);

	document.getElementById("txtMNGR_ID").value = data.MNGR_ID;
	document.getElementById("txtMNGR_PIN").value = data.MNGR_PIN;

	document.getElementById("txtNM").value = data.NM;
	document.getElementById("txtSSN").value = data.SSN;

	document.getElementById("cbxSEX_CD").value = data.SEX_CD;
	document.getElementById("cbxSLR_LNR_CD").value = data.SLR_LNR_CD;
	document.getElementById("txtBRTH_Y_MD").value = data.BRTH_Y_MD;

	document.getElementById("txtZIP_CD").value = data.ZIP_CD;
	document.getElementById("txtADR").value = data.ADR;
	document.getElementById("txtTEL_N").value = data.TEL_N;
	document.getElementById("txtHDP_N").value = data.HDP_N;
	document.getElementById("txtFAX_N").value = data.FAX_N;
	document.getElementById("txtEM_ADR").value = data.EM_ADR;

	document.getElementById("txtMNGR_OPSTN").value = data.MNGR_OPSTN;
	document.getElementById("txtRMK").value = data.RMK;

	document.getElementById("cbxGRD_CD").value = data.GRD_CD;
	document.getElementById("cbxALNC_F_CD").value = data.ALNC_F_CD;
	document.getElementById("cbxMNGR_C_CD").value = data.MNGR_C_CD;
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------  
function btnOK_Click()
{
	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	result = validate();

	if ( result )
	{
		if ( confirm("[저장] 하시겠습니까?") )
		{
			document.getElementById("txtMNGR_SEQ_N").value = opener.g_s_MNGR_SEQ_N_CMN;

			//공통에서 제공하는 ajax 처리 함수 호출
			fnGetAjaxData('/jsp/manage/include_files/common_server/mngr_update_action.do', 'form1', 'btnOK_CallBack_Click', true, '처리 중 입니다.' );
		}
	}
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------  
function btnOK_CallBack_Click(data)
{
	//document.all.txtErrors.value = data;
	//alert(data);

	alert(data.RESULT_MSG);

	btnClose_Click();
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
function btnOK_Press(e)
{
	if ( e == 13 )
	{
		btnOK_Click();
	}
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
function btnClose_Click()		
{
	window.close();
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 :
// 목    적 : 페이지 사라질때
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
window.onunload = function()
{
	
}
