
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

	var s_NM_SEX_CD_NM;
	var s_BRTH_Y_MD_SLR_LNR_CD_NM;
	var s_ZIP_CD_ADR;

	s_NM_SEX_CD_NM = "";
	s_BRTH_Y_MD_SLR_LNR_CD_NM = "";
	s_ZIP_CD_ADR = "";

	document.getElementById("SPAN_MNGR_ID").innerHTML = data.MNGR_ID;

	s_NM_SEX_CD_NM = data.NM;

	if ( data.SEX_CD_NM != "" )
	{
		s_NM_SEX_CD_NM = s_NM_SEX_CD_NM + " (" + data.SEX_CD_NM + ")";
	}

	document.getElementById("SPAN_NM_SEX_CD_NM").innerHTML = s_NM_SEX_CD_NM;

	if ( data.BRTH_Y_MD != "")
	{
		s_BRTH_Y_MD_SLR_LNR_CD_NM = data.BRTH_Y_MD;

		if ( data.SLR_LNR_CD_NM != "" )
		{
			s_BRTH_Y_MD_SLR_LNR_CD_NM = s_BRTH_Y_MD_SLR_LNR_CD_NM + " (" + data.SLR_LNR_CD_NM + ")";
		}
	}

	document.getElementById("SPAN_BRTH_Y_MD_SLR_LNR_CD_NM").innerHTML = s_BRTH_Y_MD_SLR_LNR_CD_NM;

	if ( data.ZIP_CD != "" )
	{
		s_ZIP_CD_ADR = "[" + data.ZIP_CD + "] ";
	}

	document.getElementById("SPAN_ZIP_CD_ADR").innerHTML = s_ZIP_CD_ADR + data.ADR;

	document.getElementById("SPAN_TEL_N").innerHTML = data.TEL_N;
	document.getElementById("SPAN_HDP_N").innerHTML = data.HDP_N;
	document.getElementById("SPAN_FAX_N").innerHTML = data.FAX_N;
	document.getElementById("SPAN_EM_ADR").innerHTML = data.EM_ADR;
	document.getElementById("SPAN_MNGR_OPSTN").innerHTML = data.MNGR_OPSTN;
	document.getElementById("SPAN_GRD_CD_NM").innerHTML = data.GRD_CD_NM;
	document.getElementById("SPAN_MNGR_C_CD_NM").innerHTML = data.MNGR_C_CD_NM;
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
