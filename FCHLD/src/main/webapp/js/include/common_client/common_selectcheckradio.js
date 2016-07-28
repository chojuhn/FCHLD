
//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 : 	1. txtID			: selectbox/checkbox/radio id, name
//			2. txtWIDTH			: selectbox/checkbox/radio width
//			3. txtHEIGHT		: selectbox/checkbox/radio height
//			4. cbxSELECTED		: selectbox : 값 / checkBox/radio : 값|값| 형식
//			5. txtNUM			: checkBox/radio 한줄에 보여줄 개수
//			6. cbxOPTIONTYPE	: selectbox : R:전체, I:선택, !''.equals(''):입력문자
//			7. cbxDISPLAY		: 1:selectBox, 2:checkbox, 3:radio
//			8. txtONCLICK		: checkBox/radio OnClick() 이벤트 / Y : OnClick() 생성 / txtID + _Click()이라는 형태의 이벤트 핸들러를 연결시킨다.
//			9. txtONCHANGE		: selectBox OnChange() 이벤트 / Y : OnChange() 생성 / txtID + _Change()이라는 형태의 이벤트 핸들러를 연결시킨다.
//			10. txtDISABLED		: Y : 컨트롤을 disabled 시킨다.
//			11. txtCSS			: style sheet
//			12. txtVALUE		: 코드|코드명|코드|코드명|코드|코드명|코드|코드명|
// 결    과	: 
// 목    적 : 	1. CheckBox/RadioBox/ComboBox 만드는 함수
//			2. OnClick이벤트에서 sID + _Click라는 형태의 이벤트 핸들러를 연결시킨다.
//			3. OnChange이벤트에서 sID + _Change라는 형태의 이벤트 핸들러를 연결시킨다.
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
// 사용예제 : sTemp = uf_SetComboCheckRadio_User("cbxTOP_NTCE_F_CD_CLIENT_USER", "130", "19", "0", "", "I", "1", "", "Y", "", "InputL", sValue);
// 주의사항 :
//** ---------------------------------------------------------------------------  
function uf_SetComboCheckRadio_User(txtID, txtWIDTH, txtHEIGHT, cbxSELECTED, txtNUM, cbxOPTIONTYPE, cbxDISPLAY, txtONCLICK, txtONCHANGE, txtDISABLED, txtCSS, txtVALUE) 
{
	var Temp_cbxSELECTED;

	Temp_cbxSELECTED = cbxSELECTED.split("|");

	var s_Temp_sVALUE;
	var s_Temp_CD;		//코드
	var s_Temp_CD_NM;	//코드명

	s_Temp_sVALUE = txtVALUE.split("|");
	s_Temp_CD = "";
	s_Temp_CD_NM = "";

	for (var x = 0; x < (s_Temp_sVALUE.length/2)-1; x++)
	{	
		s_Temp_CD = s_Temp_CD	+ s_Temp_sVALUE[x*2] + "|";
		s_Temp_CD_NM = s_Temp_CD_NM + s_Temp_sVALUE[x*2+1] + "|";
	}

	var s_CD;		//코드 배열
	var s_CD_NM;	//코드명 배열
	var i_CD_COUNT;	//코드 개수

	s_CD = s_Temp_CD.split("|");
	s_CD_NM = s_Temp_CD_NM.split("|");
	i_CD_COUNT = s_CD.length;

	var sTemp_DISABLED;

	sTemp_DISABLED = "";

	if ( txtDISABLED == "Y" )
	{
		sTemp_DISABLED = " ReadOnly Disabled ";
	}

	var sTemp_DISPLAY;

	sTemp_DISPLAY = "";

	if ( cbxDISPLAY == "2" )
	{
		sTemp_DISPLAY = "checkbox";
	}
	else if ( cbxDISPLAY == "3" )
	{
		sTemp_DISPLAY = "radio";
	}

	var i;
	var j;
	var k;

	i = 0;
	j = 0;
	k = 0;

	var strData;

	strData = "";

	if ( cbxDISPLAY == "1" )
	{
		if ( txtONCHANGE == "Y")
		{
			strData = strData + "<select id='" + txtID + "' name='" + txtID + "' class='" + txtCSS + "' style='width:" + txtWIDTH + "px;height:" + txtHEIGHT + "px;' OnChange='javascript:" + txtID + "_Change();' " + sTemp_DISABLED + ">";
		}
		else
		{
			strData = strData + "<select id='" + txtID + "' name='" + txtID + "' class='" + txtCSS + "' style='width:" + txtWIDTH + "px;height:" + txtHEIGHT + "px;' " + sTemp_DISABLED + ">";
		}

		if ( cbxOPTIONTYPE == "R")
		{
			strData = strData + "<option value='' selected>==전체==</option>";
		}
		else if ( cbxOPTIONTYPE == "I" )
		{
			strData = strData + "<option value='' selected>==선택==</option>";
		}
		else if ( !cbxOPTIONTYPE == "" )
		{
			strData = strData + "<option value='' selected>" + cbxOPTIONTYPE + "</option>";
		}

		for (var x = 0; x < i_CD_COUNT-1; x++)
		{
			if ( s_CD[x] == cbxSELECTED )
			{
				strData = strData + "<option value='" + s_CD[x] + "' selected>" + s_CD_NM[x] + "</option>";
			}
			else
			{
				strData = strData + "<option value='" + s_CD[x] + "'>" + s_CD_NM[x] + "</option>";
			}
		}

		strData = strData + "</select>";
	}
	else
	{
		strData = strData + "<div class='border0'>";

		strData = strData + "<table style='width:" + (parseInt(txtWIDTH)*parseInt(txtNUM)) + "px' align='left' valign='middle' border='0' cellspacing='0' cellpadding='0'>";
		strData = strData + "<tr>";

		for (var x = 0; x < i_CD_COUNT-1; x++)
		{
			if ( i == parseInt(txtNUM) )
			{
				i = 0;

				strData = strData + "</tr>";
				strData = strData + "<tr>";
				strData = strData + "<td style='height:5px' colspan='" + txtNUM + "'></td>";
				strData = strData + "</tr>";
				strData = strData + "<tr>";
			}
			
			strData = strData + "<td style='width:" + txtWIDTH + "px;height:100%' align='left' valign='top'>";

			strData = strData + "<table style='width:100%;height:100%' align='center' valign='middle' border='0' cellpadding='0' cellspacing='0'>";
			strData = strData + "<tr>";
			strData = strData + "<td style='height:100%' align='left' valign='top'>";

			strData = strData + "<table style='width:" + (parseInt(txtWIDTH)-1) + "px;height:100%' border='0' cellspacing='0' cellpadding='0'>";
			strData = strData + "<tr>";
			strData = strData + "<td style='height:" + txtHEIGHT + "px'><input type='" + sTemp_DISPLAY + "' name='" + txtID + "' id='" + txtID
			
			if ( cbxDISPLAY == "2" )
			{
				strData = strData + "_" + x + " ";
			}

			strData = strData + "' value='" + s_CD[x] + "' ";
			
			for (var y = 0; y < Temp_cbxSELECTED.length-1; y++)
			{	
				if ( Temp_cbxSELECTED[y] != "" )
				{
					if ( s_CD[x] == parseInt(Temp_cbxSELECTED[y]) )
					{
						strData = strData + " checked ";
					}
				}
			}
			
			if ( txtONCLICK == "Y" )
			{
				strData = strData + " OnClick=javascript:" + txtID + "_Click('" + s_CD[x] + "'); ";
			}

			strData = strData + " " + sTemp_DISABLED + "> " + s_CD_NM[x] + "</td>";

			strData = strData + "</tr>";
			strData = strData + "</table>";

			strData = strData + "</td>";

			if (i == parseInt(txtNUM)-1 )
			{
				strData = strData + "<td style='width:1px'></td>";
			}
			else
			{
				strData = strData + "<td style='width:1px'></td>";
			}

			strData = strData + "</tr>";
			strData = strData + "</table>";

			strData = strData + "</td>";

			i = i + 1;
		}

		//빈여백 작업

		i = i - 1;

		if ( i < parseInt(txtNUM)-1 )
		{
			i = (parseInt(txtNUM)-1) - i;
		}
		else
		{
			i = 0;
		}

		if (i > 0)
		{
			for (j = 1; j <= i; j++)
			{	
				strData = strData + "<td style='width:" + txtWIDTH + "px;height:100%' align='center' valign='top'>";
				strData = strData + "</td>";

			}
		}

		//빈여백 작업

		strData = strData + "</tr>";
		strData = strData + "</table>";
		
		strData = strData + "</div>";

	}

	var objEle;

	objEle = eval("document.getElementById('DIV_"+ txtID +"')");

	objEle.innerHTML = strData;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : 	1. txtID			: selectbox/checkbox/radio id, name
//			2. txtWIDTH			: selectbox/checkbox/radio width
//			3. txtHEIGHT		: selectbox/checkbox/radio height
//			4. txtPRNT_CD		: 부모 코드
//			5. txtETC_1_CD		: 기타1 코드
//			6. txtETC_2_CD		: 기타2 코드
//			7. cbxSELECTED		: selectbox : 값 / checkBox/radio : 값|값| 형식
//			8. txtNUM			: checkBox/radio 한줄에 보여줄 개수
//			9. cbxOPTIONTYPE	: selectbox : R:전체, I:선택, !''.equals(''):입력문자
//			10. cbxDISPLAY		: 1:selectBox, 2:checkbox, 3:radio
//			11. txtONCLICK		: checkBox/radio OnClick() 이벤트 / Y : OnClick() 생성 / txtID + _Click()이라는 형태의 이벤트 핸들러를 연결시킨다.
//			12. txtONCHANGE		: selectBox OnChange() 이벤트 / Y : OnChange() 생성 / txtID + _Change()이라는 형태의 이벤트 핸들러를 연결시킨다.
//			13. txtDISABLED		: Y : 컨트롤을 disabled 시킨다.
//			14. txtCSS			: style sheet
//			15. txtDB_F			: 0 : DB, 1: CodeCache
//결    과	: 
//목    적 : 	1. CheckBox/RadioBox/ComboBox 만드는 함수
//			2. OnClick이벤트에서 sID + _Click라는 형태의 이벤트 핸들러를 연결시킨다.
//			3. OnChange이벤트에서 sID + _Change라는 형태의 이벤트 핸들러를 연결시킨다.
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : sTemp = uf_SetComboCheckRadio_System("cbxTOP_NTCE_F_CD_CLIENT", "130", "19", "F_CD", "", "", "", "", "R", "1", "", "Y", "", "InputL", "1");
//주의사항 :
//** ---------------------------------------------------------------------------  
function uf_SetComboCheckRadio_System(txtID, txtWIDTH, txtHEIGHT, txtPRNT_CD, txtETC_1_CD, txtETC_2_CD, cbxSELECTED, txtNUM, cbxOPTIONTYPE, cbxDISPLAY, txtONCLICK, txtONCHANGE, txtDISABLED, txtCSS, txtDB_F) 
{
	var hiddenField;

	if ( String(document.getElementById('txtID')) == "undefined" || String(document.getElementById('txtID')) == "null" || document.getElementById('txtID') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtID");
		hiddenField.setAttribute("name", "txtID");
		hiddenField.setAttribute("value", txtID);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtID').value = "";
		document.getElementById('txtID').value = txtID;		
	}

	if ( String(document.getElementById('txtWIDTH')) == "undefined" || String(document.getElementById('txtWIDTH')) == "null" || document.getElementById('txtWIDTH') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtWIDTH");
		hiddenField.setAttribute("name", "txtWIDTH");
		hiddenField.setAttribute("value", txtWIDTH);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtWIDTH').value = "";
		document.getElementById('txtWIDTH').value = txtWIDTH;		
	}

	if ( String(document.getElementById('txtHEIGHT')) == "undefined" || String(document.getElementById('txtHEIGHT')) == "null" || document.getElementById('txtHEIGHT') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtHEIGHT");
		hiddenField.setAttribute("name", "txtHEIGHT");
		hiddenField.setAttribute("value", txtHEIGHT);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtHEIGHT').value = "";
		document.getElementById('txtHEIGHT').value = txtHEIGHT;	
	}

	if ( String(document.getElementById('txtPRNT_CD')) == "undefined" || String(document.getElementById('txtPRNT_CD')) == "null" || document.getElementById('txtPRNT_CD') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtPRNT_CD");
		hiddenField.setAttribute("name", "txtPRNT_CD");
		hiddenField.setAttribute("value", txtPRNT_CD);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtPRNT_CD').value = "";
		document.getElementById('txtPRNT_CD').value = txtPRNT_CD;	
	}

	if ( String(document.getElementById('txtETC_1_CD')) == "undefined" || String(document.getElementById('txtETC_1_CD')) == "null" || document.getElementById('txtETC_1_CD') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtETC_1_CD");
		hiddenField.setAttribute("name", "txtETC_1_CD");
		hiddenField.setAttribute("value", txtETC_1_CD);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtETC_1_CD').value = "";
		document.getElementById('txtETC_1_CD').value = txtETC_1_CD;	
	}

	if ( String(document.getElementById('txtETC_2_CD')) == "undefined" || String(document.getElementById('txtETC_2_CD')) == "null" || document.getElementById('txtETC_2_CD') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtETC_2_CD");
		hiddenField.setAttribute("name", "txtETC_2_CD");
		hiddenField.setAttribute("value", txtETC_2_CD);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtETC_2_CD').value = "";
		document.getElementById('txtETC_2_CD').value = txtETC_2_CD;	
	}

	if ( String(document.getElementById('cbxSELECTED')) == "undefined" || String(document.getElementById('cbxSELECTED')) == "null" || document.getElementById('cbxSELECTED') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "cbxSELECTED");
		hiddenField.setAttribute("name", "cbxSELECTED");
		hiddenField.setAttribute("value", cbxSELECTED);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('cbxSELECTED').value = "";
		document.getElementById('cbxSELECTED').value = cbxSELECTED;	
	}

	if ( String(document.getElementById('txtNUM')) == "undefined" || String(document.getElementById('txtNUM')) == "null" || document.getElementById('txtNUM') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtNUM");
		hiddenField.setAttribute("name", "txtNUM");
		hiddenField.setAttribute("value", txtNUM);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtNUM').value = "";
		document.getElementById('txtNUM').value = txtNUM;	
	}

	if ( String(document.getElementById('cbxOPTIONTYPE')) == "undefined" || String(document.getElementById('cbxOPTIONTYPE')) == "null" || document.getElementById('cbxOPTIONTYPE') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "cbxOPTIONTYPE");
		hiddenField.setAttribute("name", "cbxOPTIONTYPE");
		hiddenField.setAttribute("value", cbxOPTIONTYPE);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('cbxOPTIONTYPE').value = "";
		document.getElementById('cbxOPTIONTYPE').value = cbxOPTIONTYPE;	
	}

	if ( String(document.getElementById('cbxDISPLAY')) == "undefined" || String(document.getElementById('cbxDISPLAY')) == "null" || document.getElementById('cbxDISPLAY') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "cbxDISPLAY");
		hiddenField.setAttribute("name", "cbxDISPLAY");
		hiddenField.setAttribute("value", cbxDISPLAY);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('cbxDISPLAY').value = "";
		document.getElementById('cbxDISPLAY').value = cbxDISPLAY;	
	}

	if ( String(document.getElementById('txtONCLICK')) == "undefined" || String(document.getElementById('txtONCLICK')) == "null" || document.getElementById('txtONCLICK') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtONCLICK");
		hiddenField.setAttribute("name", "txtONCLICK");
		hiddenField.setAttribute("value", txtONCLICK);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtONCLICK').value = "";
		document.getElementById('txtONCLICK').value = txtONCLICK;	
	}

	if ( String(document.getElementById('txtONCHANGE')) == "undefined" || String(document.getElementById('txtONCHANGE')) == "null" || document.getElementById('txtONCHANGE') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtONCHANGE");
		hiddenField.setAttribute("name", "txtONCHANGE");
		hiddenField.setAttribute("value", txtONCHANGE);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtONCHANGE').value = "";
		document.getElementById('txtONCHANGE').value = txtONCHANGE;	
	}

	if ( String(document.getElementById('txtDISABLED')) == "undefined" || String(document.getElementById('txtDISABLED')) == "null" || document.getElementById('txtDISABLED') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtDISABLED");
		hiddenField.setAttribute("name", "txtDISABLED");
		hiddenField.setAttribute("value", txtDISABLED);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtDISABLED').value = "";
		document.getElementById('txtDISABLED').value = txtDISABLED;	
	}

	if ( String(document.getElementById('txtCSS')) == "undefined" || String(document.getElementById('txtCSS')) == "null" || document.getElementById('txtCSS') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtCSS");
		hiddenField.setAttribute("name", "txtCSS");
		hiddenField.setAttribute("value", txtCSS);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtCSS').value = "";
		document.getElementById('txtCSS').value = txtCSS;	
	}

	if ( String(document.getElementById('txtDB_F')) == "undefined" || String(document.getElementById('txtDB_F')) == "null" || document.getElementById('txtDB_F') == null )
	{
		hiddenField = document.createElement("input");	 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "txtDB_F");
		hiddenField.setAttribute("name", "txtDB_F");
		hiddenField.setAttribute("value", txtDB_F);
		document.getElementById('form0').appendChild(hiddenField);
	}
	else
	{
		document.getElementById('txtDB_F').value = "";
		document.getElementById('txtDB_F').value = txtDB_F;	
	}
	
	fnGetAjaxData('/jsp/manage/include_files/common_server/common_code_client_action.do', 'form0', txtID+'_CallBack', false, '조회 중 입니다.', '13000' );
}

//** ---------------------------------------------------------------------------
// 함 수 명 : 
// 인    자 : 
// 결    과 : 
// 목    적 : 서버에서 응답을 받은 후 수행하는 함수를 콜백 함수
// 플 로 우 : 
// 검    수 :
// 생 성 일 : 
// 수    정 :
// 사용예제 : 
// 주의사항 : 별도의 함수로 빠질경우의 Sample 입니다.
//** ---------------------------------------------------------------------------
function uf_SetComboCheckRadio_System_CallBack(sVal) 
{
	//document.getElementById("Errors").value	= sVal
	//alert(sVal);

	var temp_Result;

	temp_Result = eval("(" + sVal + ")");

	switch (temp_Result.RESULT_YN)
	{
		case "Y":

			//alert(temp_Result.RESULT_MSG);

			var objEle;

			objEle = eval("document.getElementById('DIV_"+ temp_Result.txtID +"')");

			objEle.innerHTML = temp_Result.RESULT_TXT;

			break;

		case "N":

			alert(temp_Result.RESULT_MSG);

			break;

		default:
			
			alert(g_s_Request_Error_Msg);

			break;
	}
}
