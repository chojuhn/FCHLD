
var g_s_SearchAddr_Check;	//우편번호/주소 검색 구분 변수
var g_s_MNGR_SEQ_N_CMN;		//관리자 일련번호
var g_s_CUST_SEQ_N_CMN;		//회원 일련번호

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : vCheck (호출 구분)
//목    적 : 없음
//플 로 우 : 우편번호/주소 검색 화면 오픈
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnSearchAddr_0_Click(vCheck)
//주의사항 :
//** ---------------------------------------------------------------------------  
function btnSearchAddr_0_Click(vCheck)
{
	g_s_SearchAddr_Check = vCheck;

	window.open( "/jsp/manage/include_files/common_server/post_select.do?MNGR_MENU_STATE=HOME" ,"SearchAddr_0", "toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=840,height=660" );
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : vMNGR_SEQ_N (관리자 일련번호)
//결    과 : 없음
//목    적 : 관리자정보수정 화면 오픈
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnMNGR_Update_0_Click(vMNGR_SEQ_N)
//주의사항 :
//** ---------------------------------------------------------------------------  
function btnMNGR_Update_0_Click(vMNGR_SEQ_N)
{
	g_s_MNGR_SEQ_N_CMN = vMNGR_SEQ_N;

	window.open( "/jsp/manage/include_files/common_server/mngr_update.do?MNGR_MENU_STATE=HOME" ,"MNGR_Update_0", "toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=840,height=680" );
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : vMNGR_SEQ_N (관리자 일련번호)
//결    과 : 없음
//목    적 : 관리자정보 화면 오픈
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnMNGR_INFO_0_Click(vMNGR_SEQ_N)
//주의사항 :
//** ---------------------------------------------------------------------------  
function btnMNGR_INFO_0_Click(vMNGR_SEQ_N)
{
	g_s_MNGR_SEQ_N_CMN = vMNGR_SEQ_N;

	window.open( "/jsp/manage/include_files/common_server/mngr_info.do?MNGR_MENU_STATE=HOME" ,"MNGR_INFO_0", "toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=840,height=460" );
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : vNum (메시지 번호)
//결    과 : 없음
//목    적 : 관리자정보 없을때 메시지
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnMNGR_INFO_ALERT_0_Click(vNum)
//주의사항 :
//** ---------------------------------------------------------------------------  
function btnMNGR_INFO_ALERT_0_Click(vNum)
{
	switch (vNum)
	{
		case "01":

			alert("등록자 정보가 없습니다.");

			break;

		case "02":

			alert("수정자 정보가 없습니다.");

			break;

		default:
			
			alert("관리자 정보가 없습니다.");

			break;
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : vCUST_SEQ_N (회원 일련번호)
//결    과 : 없음
//목    적 : 회원정보 화면 오픈
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnCUST_INFO_0_Click(vCUST_SEQ_N)
//주의사항 : 사이트에 맞는 회원 정보로 화면 수정 해야 함
//** ---------------------------------------------------------------------------  
function btnCUST_INFO_0_Click(vCUST_SEQ_N)
{
	g_s_CUST_SEQ_N_CMN	= vCUST_SEQ_N;

	window.open( "/jsp/manage/include_files/common_server/cust_info.asp" ,"CUST_INFO_0", "toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=840,height=340" );
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 :
//목    적 : 권한 관련 버튼을 remove() 시킨다.
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 : ajax로 가져와서 생성하는 버튼들은 버튼 생성 후 btnPAGE_BUTTON_REMOVE_0_Click() 함수를 한번 호출해 준다.
//** ---------------------------------------------------------------------------
function btnPAGE_BUTTON_REMOVE_0_Click()
{
	if ( document.getElementById("txtMNGR_GRD_CD").value != "01" )
	{
		var arrSITE_AUTH_C_CD;

		arrSITE_AUTH_C_CD = document.getElementById("txtSITE_AUTH_C_CD").value.split("|");

		for( var i = 0; i < arrSITE_AUTH_C_CD.length; i++)
		{
			if ( document.getElementById("txtMENU_AUTH_C_CD").value.indexOf(arrSITE_AUTH_C_CD[i]) == -1 )
			{
				$("#"+arrSITE_AUTH_C_CD[i]).remove();
				$("a[name='"+arrSITE_AUTH_C_CD[i]+"']").remove(); 
			}
		}
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 :
//목    적 : uf_getKeyCode_0 함수 호출 시 권한 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 : 
//** ---------------------------------------------------------------------------
function btnPAGE_KEY_PRESS_CHECK_0_Click()
{
	var result;

	result = false;

	var objEle;

	objEle = eval(document.getElementById("txtMNGR_GRD_CD"));

	if ( String(objEle) != "undefined" && objEle != null )
	{
		if ( document.getElementById("txtMNGR_GRD_CD").value != "01" )
		{
			if ( document.getElementById("txtMENU_AUTH_C_CD").value.indexOf("BTN_SAVE") == -1 || document.getElementById("txtMENU_AUTH_C_CD").value.indexOf("BTN_OK") == -1 )
			{
				result = true;
			}
		}
	}

	return result;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : e (event)
//결    과 : keycode
//목    적 : KeyCode 값을 준다
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : uf_getKeyCode_0(e)
//주의사항 :
//** ---------------------------------------------------------------------------  
function uf_getKeyCode_0(e)
{
	//페이지의 권한 체크
	if (btnPAGE_KEY_PRESS_CHECK_0_Click())
	{
		alert("권한이 없습니다.");
		return;
	}
	//페이지의 권한 체크

	var result;

	if(window.event)
	{
		result = window.event.keyCode;
	}
	else if(e)
	{
		result = e.which;
	}

	return result;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : 없음
//결    과 : 없음
//목    적 : 로그아웃
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnLogOut_0_Click()
//주의사항 :
//** ---------------------------------------------------------------------------  
function btnLogOut_0_Click()
{
	if ( confirm("로그아웃 하시겠습니까?") )
	{
		var hiddenField;
		
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtCHECK_BLANK");
		hiddenField.setAttribute("name", "txtCHECK_BLANK");
		hiddenField.setAttribute("value", "Y");
		
		document.getElementById('form0').appendChild(hiddenField);
		
		fnGetAjaxData('/jsp/manage/contents/login_logout/logout_action.do', 'form0', 'btnLogOut_0_CallBack_Click', true, '처리 중 입니다.', '13000' );
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 :
//목    적 : 
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
function btnLogOut_0_CallBack_Click(data)
{
	//document.all.txtErrors.value = data;
	//alert(data);
	
	alert(data.RESULT_MSG);
	
	window.location.href = "/jsp/manage/contents/login_logout/login.do";
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 :	1. PAGE_ID				: input box id
//		2. PAGE_VALUE			: 현재 페이지 값
//		3. LASTPAGE_VALUE		: 마지막 페이지 값
//		4. FUNC_NM_PREV_NEXT	: 이전/이후 함수명
//		5. FUNC_NM_KEYPRESS		: input box 의 onkeyprees 함수명
//		6. FUNC_NM_ONCLICK		: input box 의 onclick 함수명
//		7. RECORDCOUNT			: 검색DATA결과 수
//		8. TOTALCOUNT			: 전체DATA 수
//결    과 : PAGE HTML
//목    적 : PAGE 만드는 함수
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : sTemp = uf_SetPage_0(PAGE_ID, PAGE_VALUE, LASTPAGE_VALUE, FUNC_NM_PREV_NEXT, FUNC_NM_KEYPRESS, FUNC_NM_ONCLICK, RECORDCOUNT, TOTALCOUNT) 
//주의사항 :
//** ---------------------------------------------------------------------------  
function uf_SetPage_0(PAGE_ID,PAGE_VALUE,LASTPAGE_VALUE,FUNC_NM_PREV_NEXT,FUNC_NM_KEYPRESS,FUNC_NM_ONCLICK,RECORDCOUNT,TOTALCOUNT) 
{
	var strHTML;	//PAGE HTML

	strHTML = "";

	strHTML = strHTML + "<div class='paging'>";
	strHTML = strHTML + "	<span class='sresult'>검색결과: " + uf_getAutoComma(RECORDCOUNT) + "건 / 전체결과: " + uf_getAutoComma(TOTALCOUNT) + "건</span>";
	
	if ( parseInt(PAGE_VALUE) > 1 )
	{
		strHTML = strHTML + "	<span><a href=" + "javascript:" + FUNC_NM_PREV_NEXT + "('" + (parseInt(PAGE_VALUE)-1) + "');" + "><img src='/html/manage/images/common/paging_pre.gif' alt='이전페이지' /></a></span>";
	}
	else
	{
		strHTML = strHTML + "	<span><img src='/html/manage/images/common/paging_pre.gif' alt='이전페이지' /></span>";
	}

	strHTML = strHTML + "	<span><strong>" + uf_getAutoComma(PAGE_VALUE) + "</strong> / " + uf_getAutoComma(LASTPAGE_VALUE) + "</span>";

	if ( parseInt(LASTPAGE_VALUE) > 0 && (parseInt(PAGE_VALUE)+1) != (parseInt(LASTPAGE_VALUE)+1) )
	{
		strHTML = strHTML + "	<span><a href=" + "javascript:" + FUNC_NM_PREV_NEXT + "('" + (parseInt(PAGE_VALUE)+1) + "');" + "><img src='/html/manage/images/common/paging_nex.gif' alt='다음페이지' /></a></span>";
	}
	else
	{
		strHTML = strHTML + "	<span><img src='/html/manage/images/common/paging_nex.gif' alt='다음페이지' /></span>";
	}

	strHTML = strHTML + "	<span>바로가기 <input type='text' id='" + PAGE_ID + "' name='" + PAGE_ID + "' value='" + PAGE_VALUE + "' maxlength='12' class='page v-req v-num' title='이동할 페이지 번호' onKeyPress=" + "javascript:" + FUNC_NM_KEYPRESS + "(uf_getKeyCode_0(event));" + " /> Page <input class='button blue small' type='button' value='Go' onClick=" + "javascript:" + FUNC_NM_ONCLICK + "();" + " /></span>";
	strHTML = strHTML + "</div>";

	return strHTML;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 :	1. PAGE_ID				: input box id
//		2. PAGE_VALUE			: 현재 페이지 값
//		3. LASTPAGE_VALUE		: 마지막 페이지 값
//		4. FUNC_NM_PREV_NEXT	: 이전/이후 함수명
//		5. FUNC_NM_KEYPRESS		: input box 의 onkeyprees 함수명
//		6. FUNC_NM_ONCLICK		: input box 의 onclick 함수명
//		7. RECORDCOUNT			: 검색DATA결과 수
//		8. TOTALCOUNT			: 전체DATA 수
//결    과 : PAGE HTML
//목    적 : PAGE 만드는 함수
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : sTemp = uf_SetPage_0_2(PAGE_ID, PAGE_VALUE, LASTPAGE_VALUE, FUNC_NM_PREV_NEXT, FUNC_NM_KEYPRESS, FUNC_NM_ONCLICK, RECORDCOUNT, TOTALCOUNT) 
//주의사항 :
//** ---------------------------------------------------------------------------  
function uf_SetPage_0_2(PAGE_ID,PAGE_VALUE,LASTPAGE_VALUE,FUNC_NM_PREV_NEXT,FUNC_NM_KEYPRESS,FUNC_NM_ONCLICK,RECORDCOUNT,TOTALCOUNT) 
{
	var strHTML;	//PAGE HTML

	strHTML = "";

	if ( parseInt(LASTPAGE_VALUE) >= 1 )
	{
		strHTML = strHTML + "<div class='page'>";
		strHTML = strHTML + "<ul>";

		var BlockPage;
		var i;

		BlockPage = parseInt((parseInt(PAGE_VALUE)-1)/10)*10+1;

		//strHTML = strHTML + "<li class='first'><a href='#'><img src='/html/manage/images/btn_first.png' width='16' height='17' alt='처음' /></a></li>";

		if ( parseInt(BlockPage) != 1 )
		{
			strHTML = strHTML + "<li class='prev'><a href=" + "javascript:" + FUNC_NM_PREV_NEXT + "('" + BlockPage-10 + "');" + "><img src='/html/manage/images/btn_prev.png' width='16' height='17' alt='이전' /></a></li>";
		}
		else
		{
			strHTML = strHTML + "<li class='prev'><img src='/html/manage/images/btn_prev.png' width='16' height='17' alt='이전' /></li>";
		}

		i = 1;

		strHTML = strHTML + "<li class='page_no'>";

		//while( i > 10 || parseInt(BlockPage) > parseInt(LASTPAGE_VALUE) )
		//while(!(i > 10 || parseInt(BlockPage) > parseInt(LASTPAGE_VALUE)))
		while( i <= 10 && parseInt(BlockPage) <= parseInt(LASTPAGE_VALUE) )
		{
			if ( parseInt(BlockPage) == parseInt(PAGE_VALUE) )
			{
				strHTML = strHTML + " <span class='now'><a href=" + "javascript:" + FUNC_NM_PREV_NEXT + "('" + BlockPage + "');" + ">" + BlockPage + "</a></span> ";
			}
			else
			{
				strHTML = strHTML + " <a href=" + "javascript:" + FUNC_NM_PREV_NEXT + "('" + BlockPage + "');" + ">" + BlockPage + "</a> ";
			}

			BlockPage = BlockPage + 1;

			i = i + 1;

			if ( i <= 10 && parseInt(BlockPage) <= parseInt(LASTPAGE_VALUE) )
			{
			}
		}

		strHTML = strHTML + "</li>";

		if ( parseInt(BlockPage) <= parseInt(LASTPAGE_VALUE) )
		{
			strHTML = strHTML + "<li class='next'><a href=" + "javascript:" + FUNC_NM_PREV_NEXT + "('" + BlockPage + "');" + "><img src='/html/manage/images/btn_next.png' width='16' height='17' alt='다음' /></a></li>";
		}
		else
		{
			strHTML = strHTML + "<li class='next'><img src='/html/manage/images/btn_next.png' width='16' height='17' alt='다음' /></li>";
		}

		//strHTML = strHTML + "<li class='last'><img src='/html/manage/images/btn_last.png' width='16' height='17' alt='마지막' /></li>";

		strHTML = strHTML + "</ul>";
		strHTML = strHTML + "</div>";
	}

	return strHTML;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : sLeftMnuCD (왼쪽메뉴 2단계 메뉴코드)
//결    과 : 없음
//목    적 : 왼쪽메뉴 3단계 보여주기/숨기기  (마우스 클릭)
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : btnLeftMnu_0_Click(sLeftMnuCD)
//주의사항 :
//** --------------------------------------------------------------------------- 
function btnLeftMnu_0_Click(sLeftMnuCD)
{
	var objEle;

	objEle = eval("document.getElementsByName('"+ sLeftMnuCD +"')");

	for( var i=0; i<objEle.length; i++ )
	{
		if ( objEle[i].style.display == "" )
		{
			objEle[i].style.display = "none";
		}
		else
		{
			objEle[i].style.display = "";
		}
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : fnGetKeyEvent
//인    자 : 1. e : key event
//목    적 : 
//플 로 우 : 
//검    수 :
//예   제  : 검색조건의 사용자 명 enter 체크시 사용
//		$('input[name=searchUerNm]').bind('keydown',function(event) 
//		{
//			if(fnGetKeyEvent(event) == 13)
//			{
//				$("#btn_search").trigger("click");
//			}
//		});
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
function fnGetKeyEvent(e)
{
	var keyVal = 0;

	if (navigator.appName == 'Netscape')
	{
		//Netscape, CHROME
		keyVal = e.which;
	} 
	else if (navigator.appName == 'Microsoft Internet Explorer')
	{
		if(e.key == "KanaMode") 
		{ 
			//한/영 전환키
			keyVal = 999;
		}
		else
		{
			//MS
			keyVal = e.keyCode;
		}
	} 
	else
	{
		//OPERA
		keyVal = e.which;
	}

	return keyVal;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 :
//목    적 : history.back()을 방지 하기 위해 사용. 추후 정리 필요.
//		document.ready에 추가
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 : $(document).bind("keydown",(function() {  fnClearBackSpace()();}));
//** ---------------------------------------------------------------------------
function fnClearBackSpace()
{
	var t = document.activeElement;

	var sTagName = t.tagName;

	if ( fnGetKeyEvent(event) == 8 )
	{
		if ( ( t.tagName != "SELECT" ) && ( ( t.tagName == "INPUT" || t.tagName == "TEXTAREA" ) && $(t).attr("readonly") != "readonly" ) ) 
		{
			//selectbox가 아니고, input, textarea이면서 readonly
			;
		} 
		else 
		{
			event.preventDefault();

			try 
			{
				event.keyCode = 0;
				event.which = 0;
				event.returnValue = false;
			} 
			catch(error)
			{
				event.which = 0;
				event.returnValue = false;
			}
		}
	}	    	
}
