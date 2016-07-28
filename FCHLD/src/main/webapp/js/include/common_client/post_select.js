
var g_s_Row;		//리스트 전체 수
var g_s_LastPage;	//페이지 번호
var g_s_List_NO;	//TR 번호

g_s_Row = "0";
g_s_LastPage = "";
g_s_List_NO = "";

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
	document.getElementById("txtSearch_Word").focus();
	document.getElementById("txtSearch_Word").select();

	btnSearchView_Click("02");
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
function btnSearchView_Click(vSearchView_C)
{
	btnInit_Click();

	document.getElementById("g_s_SearchView_C").value = vSearchView_C;

	switch (vSearchView_C)
	{
		case "01":

			document.getElementById("A_SEARCH_01").className = "button blue";
			document.getElementById("A_SEARCH_02").className = "button white";
			document.getElementById("A_SEARCH_03").className = "button white";

			document.getElementById("DIV_SEARCH_01").style.display = "";
			document.getElementById("DIV_SEARCH_02").style.display = "none";
			document.getElementById("DIV_SEARCH_03").style.display = "none";

			document.getElementById("txtSearch_Word").className = "input_txt v-req";
			document.getElementById("txtSearch_LOTN_MN").className = "input_txt";
			document.getElementById("txtSearch_LOTN_SUB").className = "input_txt";
			document.getElementById("txtSearch_ROAD_NM").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_MN").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_SUB").className = "input_txt";
			document.getElementById("txtSearch_DSR_BUD_NM").className = "input_txt";
			document.getElementById("txtSearch_03_Word").className = "input_txt";

			break;

		case "02":

			document.getElementById("A_SEARCH_01").className = "button white";
			document.getElementById("A_SEARCH_02").className = "button blue";
			document.getElementById("A_SEARCH_03").className = "button white";

			document.getElementById("DIV_SEARCH_01").style.display = "none";
			document.getElementById("DIV_SEARCH_02").style.display = "";
			document.getElementById("DIV_SEARCH_03").style.display = "none";

			document.getElementById("txtSearch_Word").className = "input_txt";
			document.getElementById("txtSearch_LOTN_MN").className = "input_txt";
			document.getElementById("txtSearch_LOTN_SUB").className = "input_txt";
			document.getElementById("txtSearch_ROAD_NM").className = "input_txt v-req";
			document.getElementById("txtSearch_BUD_N_MN").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_SUB").className = "input_txt";
			document.getElementById("txtSearch_DSR_BUD_NM").className = "input_txt v-req";
			document.getElementById("txtSearch_03_Word").className = "input_txt";

			cbxSearch_Type_Change();

			break;

		case "03":

			document.getElementById("A_SEARCH_01").className = "button white";
			document.getElementById("A_SEARCH_02").className = "button white";
			document.getElementById("A_SEARCH_03").className = "button blue";

			document.getElementById("DIV_SEARCH_01").style.display = "none";
			document.getElementById("DIV_SEARCH_02").style.display = "none";
			document.getElementById("DIV_SEARCH_03").style.display = "";

			document.getElementById("txtSearch_Word").className = "input_txt";
			document.getElementById("txtSearch_LOTN_MN").className = "input_txt";
			document.getElementById("txtSearch_LOTN_SUB").className = "input_txt";
			document.getElementById("txtSearch_ROAD_NM").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_MN").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_SUB").className = "input_txt";
			document.getElementById("txtSearch_DSR_BUD_NM").className = "input_txt";
			document.getElementById("txtSearch_03_Word").className = "input_txt v-req";

			break;

		default:

			break;
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
function cbxSearch_Type_Change()
{
	switch (document.getElementById("cbxSearch_Type").value)
	{
		case "0201":

			document.getElementById("SPAN_SEARCH_LCT_NM").style.display = "";
			document.getElementById("SPAN_SEARCH_LOTN").style.display = "";
			document.getElementById("SPAN_SEARCH_ROAD_NM").style.display = "none";
			document.getElementById("SPAN_SEARCH_BUD_N").style.display = "none";
			document.getElementById("SPAN_SEARCH_DSR_BUD_NM").style.display = "none";

			document.getElementById("txtSearch_LOTN_MN").className = "input_txt";
			document.getElementById("txtSearch_LOTN_SUB").className = "input_txt";
			document.getElementById("txtSearch_ROAD_NM").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_MN").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_SUB").className = "input_txt";
			document.getElementById("txtSearch_DSR_BUD_NM").className = "input_txt";

			break;

		case "0202":

			document.getElementById("SPAN_SEARCH_LCT_NM").style.display = "none";
			document.getElementById("SPAN_SEARCH_LOTN").style.display = "none";
			document.getElementById("SPAN_SEARCH_ROAD_NM").style.display = "";
			document.getElementById("SPAN_SEARCH_BUD_N").style.display = "";
			document.getElementById("SPAN_SEARCH_DSR_BUD_NM").style.display = "none";

			document.getElementById("txtSearch_LOTN_MN").className = "input_txt";
			document.getElementById("txtSearch_LOTN_SUB").className = "input_txt";
			document.getElementById("txtSearch_ROAD_NM").className = "input_txt v-req";
			document.getElementById("txtSearch_BUD_N_MN").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_SUB").className = "input_txt";
			document.getElementById("txtSearch_DSR_BUD_NM").className = "input_txt";

			break;

		case "0203":

			document.getElementById("SPAN_SEARCH_LCT_NM").style.display = "";
			document.getElementById("SPAN_SEARCH_LOTN").style.display = "none";
			document.getElementById("SPAN_SEARCH_ROAD_NM").style.display = "none";
			document.getElementById("SPAN_SEARCH_BUD_N").style.display = "none";
			document.getElementById("SPAN_SEARCH_DSR_BUD_NM").style.display = "";

			document.getElementById("txtSearch_LOTN_MN").className = "input_txt";
			document.getElementById("txtSearch_LOTN_SUB").className = "input_txt";
			document.getElementById("txtSearch_ROAD_NM").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_MN").className = "input_txt";
			document.getElementById("txtSearch_BUD_N_SUB").className = "input_txt";
			document.getElementById("txtSearch_DSR_BUD_NM").className = "input_txt v-req";

			break;

		default:

			break;
	}
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 : 
// 결    과	: 
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
// 사용예제 : 
// 주의사항 : 
//** ---------------------------------------------------------------------------
function cbxSearch_CT_Change() 
{
	if (document.getElementById("cbxSearch_CT").value != "")
	{
		uf_SetComboCheckRadio_System("cbxSearch_DSR", "124", "19", "ZIP_CD_DSR", document.getElementById("cbxSearch_CT").value, "", "", "", "I", "1", "", "Y", "", "InputL", "1");
	}
	else
	{
		uf_SetComboCheckRadio_System("cbxSearch_DSR", "124", "19", "ZIP_CD_DSR", "NOTHING", "", "", "", "I", "1", "", "Y", "", "InputL", "1");
	}
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 : 
// 결    과	: 
// 목    적 : 서버에서 응답을 받은 후 수행하는 함수를 콜백 함수
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
// 사용예제 : 
// 주의사항 : 
//** ---------------------------------------------------------------------------
function cbxSearch_DSR_CallBack(data) 
{
	//document.getElementById("txtErrors").value = data;
	//alert(data);

	//alert(data.RESULT_MSG);

	var objEle;

	objEle = eval("document.getElementById('SPAN_" + data.txtID + "')");

	objEle.innerHTML = data.RESULT_TXT;

	cbxSearch_DSR_Change();
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 : 
// 결    과	: 
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
// 사용예제 : 
// 주의사항 : 
//** ---------------------------------------------------------------------------
function cbxSearch_DSR_Change() 
{
	if (document.getElementById("cbxSearch_DSR").value != "")
	{
		uf_SetComboCheckRadio_System("cbxSearch_LCT_NM", "124", "19", "ZIP_CD_LCT_NM", document.getElementById("cbxSearch_CT").value, document.getElementById("cbxSearch_DSR").value, "", "", "I", "1", "", "", "", "InputL", "1");
	}
	else
	{		
		uf_SetComboCheckRadio_System("cbxSearch_LCT_NM", "124", "19", "ZIP_CD_LCT_NM", "NOTHING", "", "", "", "I", "1", "", "", "", "InputL", "1");
	}
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 : 
// 결    과	: 
// 목    적 : 서버에서 응답을 받은 후 수행하는 함수를 콜백 함수
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
// 사용예제 : 
// 주의사항 : 
//** ---------------------------------------------------------------------------
function cbxSearch_LCT_NM_CallBack(data) 
{
	//document.getElementById("txtErrors").value = data;
	//alert(data);

	//alert(data.RESULT_MSG);

	var objEle;

	objEle = eval("document.getElementById('SPAN_" + data.txtID + "')");

	objEle.innerHTML = data.RESULT_TXT;
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
function btnSearch_Click()
{
	switch (document.getElementById("g_s_SearchView_C").value)
	{
		case "01":

			break;

		case "02":

			if ( document.getElementById("cbxSearch_CT").value == "" )
			{
				alert("시도를 선택하세요.");

				document.getElementById("cbxSearch_CT").focus();
				return;
			}
			
			if ( document.getElementById("cbxSearch_CT").value != "40" )
			{
				if ( document.getElementById("cbxSearch_DSR").value == "" )
				{
					alert("시군구를 선택하세요.");

					document.getElementById("cbxSearch_DSR").focus();
					return;
				}

				if ( document.getElementById("cbxSearch_Type").value != "0202" )
				{
					if ( document.getElementById("cbxSearch_LCT_NM").value == "" )
					{
						alert("읍면동을 선택하세요.");

						document.getElementById("cbxSearch_LCT_NM").focus();
						return;
					}
				}
			}
		
			document.getElementById("txtSearch_DSR").value = document.getElementById("cbxSearch_DSR").value;
			document.getElementById("txtSearch_LCT_NM").value = document.getElementById("cbxSearch_LCT_NM").value;

			break;

		case "03":

			break;

		default:

			break;
	}

	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	result = validate();

	if ( result )
	{
		document.getElementById("txtPage").value = "";

		btnPageSelect_Click();
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
function btnSearch_Press(e)
{
	if ( e == 13 )
	{
		btnSearch_Click();
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
function btnPageSelect_Click()
{
	g_s_List_NO = "";

	var sUrl;

	sUrl = "";

	switch (document.getElementById("g_s_SearchView_C").value)
	{
		case "01":

			sUrl = "/jsp/manage/include_files/common_server/post_01_select_action.do";

			break;

		case "02":

			sUrl = "/jsp/manage/include_files/common_server/post_02_select_action.do";

			break;

		case "03":

			sUrl = "/jsp/manage/include_files/common_server/post_03_select_action.do";

			break;

		default:

			break;
	}

	fnGetAjaxData(sUrl, 'form1', 'btnPageSelect_CallBack_Click', true, '조회 중 입니다.', '13000' );
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
function btnPageSelect_CallBack_Click(data)
{
	//document.all.txtErrors.value = data;
	//alert(data);

	//alert(data.RESULT_MSG);

	var iTotal;

	iTotal = data.iTotal;

	var strData;

	strData = "";

	strData = strData + "<div class='list'>";
	strData = strData + "<table id='TABLE_LIST'>";
	strData = strData + "<colgroup>";
	strData = strData + "<col width='60px' />";
	strData = strData + "<col width='100px' />";
	strData = strData + "<col width='*' />";
	strData = strData + "<col width='60px' />";
	strData = strData + "</colgroup>";
	strData = strData + "<tbody>";

	if ( data.DATA_LIST.length > 0)
	{				
		for(var i=0; i<data.DATA_LIST.length; i++)
		{
			strData = strData + "<tr id='TR_" + i + "' onClick=" + "javascript:btnList_Click('" + i + "');" + " style='CURSOR:pointer'>";
			strData = strData + "<td>" + uf_getAutoComma(iTotal) + "</td>";
			strData = strData + "<td>" + data.DATA_LIST[i].ZIP_CD + "</td>";
			strData = strData + "<td class='subject'>" + data.DATA_LIST[i].ADR + "</td>";
			strData = strData + "<td><a href=" + "javascript:btnSelect_Click('" + data.DATA_LIST[i].ZIP_CD + "','" + uf_getReplace( data.DATA_LIST[i].ADR, ' ', '|' ) + "');" + " class='button green small'>선택</a></td>";
			strData = strData + "</tr>";

			iTotal = parseInt(iTotal)-1;
		}
	}
	else
	{
		strData = strData + "<tr>";
		strData = strData + "<td colspan='4'>등록된 항목이 없습니다.</td>";
		strData = strData + "</tr>";
	}

	strData = strData + "</tbody>";
	strData = strData + "</table>";
	strData = strData + "</div>";

	document.getElementById("DIV_LIST").innerHTML = strData;

	var strPage;

	strPage = "";

	strPage = uf_SetPage_0("txtPageGo", data.txtPage, data.LastPage, "btnPageGo_Click", "btnPageGoMove_Press", "btnPageGoMove_Click", data.RecordCount, data.TotalCount);

	document.getElementById("DIV_PAGE").innerHTML = strPage;

	g_s_Row = data.intData;
	g_s_LastPage = data.LastPage;

	if ( data.DATA_LIST.length > 0)
	{
		btnList_Click("0");
	}
	else
	{
		btnList_Click("");
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
function btnList_Click(vRowID)
{
	if ( g_s_List_NO != vRowID )
	{
		if ( g_s_List_NO != "" )
		{
			uf_TRChangeColor_C("TR_" + g_s_List_NO, "1");
		}

		if ( vRowID != "" )
		{
			uf_TRChangeColor_C("TR_" + vRowID, "0");
		}

		g_s_List_NO = vRowID;
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
function btnPageGo_Click(vPage)
{
	document.getElementById("txtPage").value = vPage;

	btnPageSelect_Click();
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
function btnPageGoMove_Click()
{
	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	result = validate();

	if ( result )
	{
		if ( eval( uf_getSelectNumber( document.getElementById("txtPageGo").value ) ) < 1 || eval( uf_getSelectNumber( document.getElementById("txtPageGo").value ) ) > eval( uf_getSelectNumber( g_s_LastPage ) ) )
		{
			alert("허용된 범위의 페이지값을 입력하세요. \n\n페이지의 범위는 1 ~ " + g_s_LastPage + " 까지입니다.");
			document.getElementById("txtPageGo").focus();
			document.getElementById("txtPageGo").select();
			return;
		}

		document.getElementById("txtPage").value = uf_getSelectNumber(document.getElementById("txtPageGo").value);

		btnPageSelect_Click();
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
function btnPageGoMove_Press(e)
{
	if ( e == 13 )
	{
		btnPageGoMove_Click();
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
function btnSelect_Click(vZIP_CD,vADR)
{
	if ( confirm("선택 하시겠습니까?") )
	{
		switch (opener.g_s_SearchAddr_Check)
		{
			case "00":

				opener.document.getElementById("txtuf_getPostFormat").value = "";
				opener.document.getElementById("txtuf_getPostFormat2").value = "";

				opener.document.getElementById("txtuf_getPostFormat").value = vZIP_CD;
				opener.document.getElementById("txtuf_getPostFormat2").value = uf_getReplace( vADR, '|', ' ' );

				opener.document.getElementById("txtuf_getPostFormat2").focus();
				opener.document.getElementById("txtuf_getPostFormat2").select();

				break;

			case "01":

				opener.document.getElementById("txtZIP_CD").value = "";
				opener.document.getElementById("txtADR").value = "";

				opener.document.getElementById("txtZIP_CD").value = vZIP_CD;
				opener.document.getElementById("txtADR").value = uf_getReplace( vADR, '|', ' ' );

				opener.document.getElementById("txtADR").focus();
				opener.document.getElementById("txtADR").select();

				break;

			default:

				break;
		}

		btnClose_Click();
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
// 목    적 : 
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------
function btnInit_Click()
{
	var strData;

	strData = "";

	strData = strData + "<div class='list'>";
	strData = strData + "<table id='TABLE_LIST'>";
	strData = strData + "<colgroup>";
	strData = strData + "<col width='60px' />";
	strData = strData + "<col width='100px' />";
	strData = strData + "<col width='*' />";
	strData = strData + "<col width='60px' />";
	strData = strData + "</colgroup>";
	strData = strData + "<tbody>";

	for (var i=0;i<10;i++)
	{
		strData = strData + "<tr>";
		strData = strData + "<td></td>";
		strData = strData + "<td></td>";
		strData = strData + "<td class='subject'>&nbsp;</td>";
		strData = strData + "<td></td>";
		strData = strData + "</tr>";
	}

	strData = strData + "</tbody>";
	strData = strData + "</table>";
	strData = strData + "</div>";

	document.getElementById("DIV_LIST").innerHTML = strData;

	document.getElementById("DIV_PAGE").innerHTML = "";
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
