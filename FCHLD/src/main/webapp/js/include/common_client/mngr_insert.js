
var g_s_SearchID;	//아이디 중복확인 변수
var g_s_SearchSSN;	//주민번호 중복확인 변수

g_s_SearchID = "false";
g_s_SearchSSN = "false";

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

	document.getElementById("txtMNGR_ID").focus();
	document.getElementById("txtMNGR_ID").select();
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
function btnSearchID_Click()
{
	if ( uf_check_Id( document.getElementById("txtMNGR_ID"), 4, 18, true, '아이디' ) == false )
	{
		return;
	}

	if ( confirm("[중복확인] 하시겠습니까?") )
	{
		//공통에서 제공하는 ajax 처리 함수 호출
		fnGetAjaxData('/jsp/manage/include_files/common_server/mngr_searchid_select_action.do', 'form1', 'btnSearchID_CallBack_Click', true, '처리 중 입니다.' );
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
function btnSearchID_CallBack_Click(data)
{
	//document.all.txtErrors.value = data;
	//alert(data);

	alert(data.RESULT_MSG);

	g_s_SearchID = data.RESULT_FLG;
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
function btnSearchSSN_Click()
{
	if ( uf_check_Common( document.getElementById("txtSSN"), 13, 14, true, 'N-', '숫자/[-]', '주민번호', 'TXT' ) == false )
	{
		return;
	}

	if ( confirm("[중복확인] 하시겠습니까?") )
	{
		//공통에서 제공하는 ajax 처리 함수 호출
		fnGetAjaxData('/jsp/manage/include_files/common_server/mngr_searchssn_select_action.do', 'form1', 'btnSearchSSN_CallBack_Click', true, '처리 중 입니다.' );
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
function btnSearchSSN_CallBack_Click(data)
{
	//document.all.txtErrors.value = data;
	//alert(data);

	alert(data.RESULT_MSG);

	g_s_SearchSSN = data.RESULT_FLG;
	
	if ( data.RESULT_FLG == "true" )
	{
		//생년월일 수식 추가

		var sSSN;

		sSSN = uf_getSelectNumber( document.getElementById("txtSSN").value ); //1111112111111

		var sSEX_CD;

		sSEX_CD = uf_getStringCut( sSSN, 'MB', 7, 1 );

		if ( sSEX_CD == "1" || sSEX_CD == "3" )
		{
			document.getElementById("cbxSEX_CD").value	= "0";
		}
		else
		{
			document.getElementById("cbxSEX_CD").value	= "1";
		}

		var sBRTH_Y_MD;

		if ( uf_getStringCut( sSSN, 'L', 1, 1 ) == "0" )
		{
			sBRTH_Y_MD = "20" + uf_getStringCut( sSSN, 'L', 1, 6 );
		}
		else
		{
			sBRTH_Y_MD = "19" + uf_getStringCut( sSSN, 'L', 1, 6 );
		}
		
		var strYear;
		var strMonth;
		var strDay;

		strYear = uf_getStringCut( sBRTH_Y_MD, 'L', 1, 4 );
		strMonth = uf_getStringCut( sBRTH_Y_MD, 'MB', 5, 2 );
		strDay = uf_getStringCut( sBRTH_Y_MD, 'R', 1, 2 );

		if ( uf_isDate( strYear, strMonth, strDay ) == false )
		{
			alert("생년월일의 날짜가 유효하지 않습니다." );
			document.getElementById("txtBRTH_Y_MD").value = "";
			return;
		}

		document.getElementById("txtBRTH_Y_MD").value = strYear + "-" + strMonth + "-" + strDay;

		//생년월일 수식 추가
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
function btnOK_Click()
{
	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	result = validate();

	if ( result )
	{
		if ( g_s_SearchID == "false" )
		{
			alert("아이디 중복확인을 해주십시요.");
			return;
		}

		/*
		if ( g_s_SearchSSN == "false" )
		{
			alert("주민번호 중복확인을 해주십시요.");
			return;
		}
		*/

		if ( confirm("[저장] 하시겠습니까?") )
		{
			//공통에서 제공하는 ajax 처리 함수 호출
			fnGetAjaxData('/jsp/manage/include_files/common_server/mngr_insert_action.do', 'form1', 'btnOK_CallBack_Click', true, '처리 중 입니다.' );
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
