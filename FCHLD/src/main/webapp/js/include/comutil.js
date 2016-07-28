var arrWinHandle = new Array();	// 팝업창 핸들 저장 array

/*** ComUtil Object */
var ComUtil = function(){
};


/**
 * 객체에 fucus를 줄 때 readonly, disabled를 검사한 후 준다.
 * obj : 객체
 */
ComUtil.setFocus=function(obj)
{
	if (obj.readOnly || obj.disabed)
	{
		return;
	}
	else
	{
		obj.focus();
	}
};

/*
* 두 날짜간의 차이를 계산한다.
*/
ComUtil.calDay=function(sdate , edate)
{
	var sDate = new Date(sdate.substr(0,4),sdate.substr(4,2)-1,sdate.substr(6,2)).getTime();
	var eDate = new Date(edate.substr(0,4),edate.substr(4,2)-1,edate.substr(6,2)).getTime();

	var result = (eDate-sDate)/(1000*60*60*24) +1;

	return result;
};


/**
 * 배열안에 원하는 문자열이 존재하는지 체크한다.
 * arr : Array
 * str : 문자열
 * return : 존재여부
 */
ComUtil.hasStr=function(arr, str)
{
	for (var i=0; i<arr.length; i++)
	{
		if (arr[i] == str)
		{
			return true;
		}
	}

	return false;
};

ComUtil.getDecimalFormat=function(moneyval)
{
	if((moneyval+"").length == 0) return moneyval;

	if(parseInt(moneyval, 10) == 0) return 0;
	moneyval = ""+(moneyval);
	var decimal = moneyval.split(".");
	var delimeter = ",";

	//음수처리때문에 removeNumberMask로 변경 2014-12-22 임지은
	moneyval	= "" + ComUtil.removeNumberMask(""+parseInt(decimal[0],10));	


	var temp 	= "";
	var money 	= "";
	var ret		= "";

	for(var i = moneyval.length; i > 0; i -= 3)
	{
		if((i-3) <= 0)
		{
			temp 	= moneyval.substring(0,i);
			money 	= temp;
			ret		= money + ret;
		}
		else
		{
			temp 	= moneyval.substring(i-3,i);
			money	= delimeter + temp;
			ret		= money + ret;
		}
	}

	if((ret.charAt(0) == "+") || (ret.charAt(0) == "-"))
	{
		if(ret.charAt(1) == delimeter.charAt(0))
		{
			tempMoneyStr = ret.substring(0,1) + ret.substring(2,ret.length);
			ret = "";
			ret = tempMoneyStr;
		}
	}
	if (decimal.length >1) ret = ret+"."+decimal[1];
	return ret;
};


//문장내에서 ":", "-", "," 마스크 제거
ComUtil.removeMask=function(str)
{
	if(ComUtil.isNull(str)) return str;
//	var sPattern 	= /[^0-9]/g;
	var sPattern 	= /[:\/-]/g;
	var sRet = ComUtil.replaceStr(str.replace(sPattern,''),',','');
	return sRet;
};

/* form clearMask 계산 용*/
ComUtil.clearMask=function(f)
{
	if (!f) f = document.forms[0];

	if (f!=null)
	{
		for (var i=0; i<f.length; i++)
		{
			if((f.elements[i].type == "text"))
			{
				f.elements[i].value = ComUtil.removeMask(f.elements[i].value);
			}					
		}
	}
};


// 숫자만 가져온다.
ComUtil.removeNumberMask = function(str)
{
	var val = "";
	str = "" + str;
	if (str == null || str == "") return val;

	for (var i = 0; i < str.length; i++)
	{
		// 음수일 경우도 가져온다. 소수점도 포함
		if (ComUtil.isOnlyNumberic(str.charAt(i)) || (i == 0 && str.charAt(i) == "-") || str.charAt(i) == ".")
		{
			val += str.charAt(i);
		}
	}
	return val;
};


//숫자만 있는지를 검색한다.
ComUtil.isOnlyNumberic=function(string)
{
	var regExp 	= /[^\d]/i;
	var isVaild	= !(regExp.test(string));

	return isVaild;
};

/**
  * 문자열의 특정 문자열을 지정 문자열로 치환해준다.
  * str : 문자열
  * delimeter1 : 치환대상 문자열
  * delimeter2 : 치환 문자열
  * return 치환된 문자열
  */
 ComUtil.replaceStr=function(str, delimeter1, delimeter2)
{
	var s_Data = "";
	var s_Tmp = str;
	var i = s_Tmp.indexOf(delimeter1);

	while (i!= -1)
	{
		s_Data = s_Data + s_Tmp.substring(0,i) + delimeter2;
		s_Tmp = s_Tmp.substring(i+delimeter1.length);
		i = s_Tmp.indexOf(delimeter1);
	}
	s_Data = s_Data + s_Tmp;
	return s_Data;
};


// 문자가 null인 경우 대체 한다.
ComUtil.nvl=function(oldstr, newstr)
{
	if (oldstr == "")
	{
		return newstr;
	}
	else
	{
		return oldstr;
	}
};

/**
  * oldstr 문자열을 판별하여 무효한 값일 경우 newstr 를 리턴해준다.
  * oldstr : 기존 문자열
  * return : 치환 문자열
  * 예외일때 사용할값을 리턴받고 싶을때 newstr에 원하는값을 보낸다.
  * 예외판별로직에 사용할때는 newstr에 boolean값을 보내 사용한다.
  * 문자(string) 기준으로 한다.
  */
ComUtil.nvlall=function(oldstr, newstr)
{
	if (oldstr == ""
	 || oldstr == undefined
	 || oldstr == "undefined"
	 || oldstr == null
	 || typeof(oldstr) == "undefined"
	){
		return newstr;
	}else{
		return oldstr;
	}
};

// LEFT TRIM
ComUtil.lTrim=function(str)
{
	var val = "";

	if (typeof(str) == "undefined" || str == "") return "";

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) != " ")
		{
			val = str.substr(i, str.length);
			break;
		}
	}

	return val;
};

// RIGHT TRIM
ComUtil.rTrim=function(str)
{
	var val = "";

	if (typeof(str) == "undefined" || str == "") return "";

	for (var i = str.length; i > 0; i--)
	{
		if (str.charAt(i - 1) != " ")
		{
			val = str.substr(0, i);
			break;
		}
	}

	return val;
};

// trim
ComUtil.trim=function(str) {
	return ComUtil.lTrim(ComUtil.rTrim(str));
};



//byte 수 계산
ComUtil.getByte=function(str)
{
    var t;
    var msglen;
    msglen = 0;
    var l = str.length;

    for(var k = 0; k < l; k++ )
    {
        t = str.charAt( k );
        if ( escape( t ).length > 4 )
        {
        	msglen += ComUtil.getCharsetByte();
        }
        else
        {
        	msglen++;
        }
    }
    return msglen;
};

/**
  * charset에 따라 한글 byte계산할 값 return
  */
ComUtil.getCharsetByte=function()
{
	if (charset == "utf-8")
	{
		return 3;
	}
	else
	{
		return 2;
	}
};


/* form clear*/
ComUtil.clear=function(f)
{
	
	$("#"+f).find("input,select,textarea").each(function(index, element) {
        var value = pData[this.name] != null ? pData[this.name] : "";
        
        switch (this.type) {
            case "image":    // 이미지
            case "button":   // 버튼
            case "submit":   // 서브밋
                break;
            case "radio":    // 라디오
            case "checkbox": // 체크박스
            	this.checked = false;
                break;
            default:         // 기타
                this.value = value;
                break;
        }
    });
	
	if (!f) f = document.forms[0];

	if (f!=null)
	{
		for (var i=0; i<f.length; i++)
		{
			if (f.elements[i].type == "select-one")
				f.elements[i].selectedIndex=0;
			else if (f.elements[i].type == "checkbox")
				f.elements[i].checked=false;
			else if((f.elements[i].type == "text") || (f.elements[i].type == "password") || (f.elements[i].type == "textarea") || (f.elements[i].type == "tel"))
				f.elements[i].value = "";
		}
	}
};


/* form hidden clear*/
ComUtil.hdnClear=function(f)
{
	f = $(f);
	if (!f) f = document.forms[0];

	if (f!=null)
	{
		for (var i=0; i<f.length; i++)
		{
			if (f.elements[i].type == "hidden")
				f.elements[i].value = "";
		}
	}
};

/* form clear*/
ComUtil.allClear=function(f)
{
	ComUtil.clear(f);
	ComUtil.hdnClear(f);
};


/**
 * form clear => "form1" 
 * @param f
 */
ComUtil.clearForm=function(f)
{
	
	$("#"+f).find("input,select,textarea").each(function(index, element) {
        switch (this.type) {
            case "image":    // 이미지
            case "button":   // 버튼
            case "submit":   // 서브밋
                break;
            case "radio":    // 라디오
            case "checkbox": // 체크박스
            	this.checked = false;
                break;
            default:         // 기타
                this.value = "";
                break;
        }
    });
};


/**
  * 특정 길이만큼의 문자열을 채워준다. 예) lpad("1", "0", 2) -> "01"
  * str : 대상 문자열
  * chr : 채워줄 문자
  * cnt : 문자열 길이
  */
ComUtil.lpad=function(str, chr, cnt) 
{
	var temp = "";

	for (var i=0; i<(cnt-str.length); i++) {
		temp += chr;
	}

	return temp + str;
};

/**
  * 특정 길이만큼의 문자열을 오른쪽에 채워준다. 예) rpad("1", "0", 2) -> "10"
  * str : 대상 문자열
  * chr : 채워줄 문자
  * cnt : 문자열 길이
  */
ComUtil.rpad=function(str, chr, cnt) 
{
	var temp = "";
	for (var i=0; i<(cnt-str.length); i++)
	{
		temp += chr;
	}

	return str+temp;
};

/**
  * 로컬시스템의 현재일자를 가져온다.
  * flag : 날짜 포맷 문자
  * return : 현재일자
  */
ComUtil.getCurDay=function(flag, type)
{
	var now = new Date();

	if (/MSIE/.test(navigator.userAgent))
	{
		// IE9 (이상의) 브라우저에서는 getYear()로 년도출력시 ex)'2011'을 '111'로 출력하는 오류가 발생해 IE9,IE10 에서는 getFullYear()로 변경함.
		if(navigator.appVersion.indexOf("MSIE 9.0")>=0 || navigator.appVersion.indexOf("MSIE 10.0")>=0)	//IE9, IE10
		{
			if (type == "T")
			{
				return ComUtil.lpad(now.getHours().toString(), "0", 2) + ":" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + ":" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
			}
			else if (type == "DT")
			{
				return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2) + " "
					 + ComUtil.lpad(now.getHours().toString(), "0", 2) + ":" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + ":" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
			}
			else if (type == "DTN")
			{
				return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2) + ""
					 + ComUtil.lpad(now.getHours().toString(), "0", 2) + "" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + "" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
			}
			else
			{
				return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2);
			}
		}
		else
		{
			if (type == "T")
			{
				return ComUtil.lpad(now.getHours().toString(), "0", 2) + ":" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + ":" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
			}
			else if (type == "DT")
			{
				return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2) + " "
					 + ComUtil.lpad(now.getHours().toString(), "0", 2) + ":" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + ":" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
			}
			else if (type == "DTN")
			{
				return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2) + ""
					 + ComUtil.lpad(now.getHours().toString(), "0", 2) + "" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + "" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
			}
			else
			{
				return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2);
			}
		}
	}
	else
	{
		if (type == "T")
		{
			return ComUtil.lpad(now.getHours().toString(), "0", 2) + ":" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + ":" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
		}
		else if (type == "DT")
		{
			return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2) + " "
				 + ComUtil.lpad(now.getHours().toString(), "0", 2) + ":" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + ":" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
		}
		else if (type == "DTN")
		{
			return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2) + ""
				 + ComUtil.lpad(now.getHours().toString(), "0", 2) + "" + ComUtil.lpad(now.getMinutes().toString(), "0", 2) + "" + ComUtil.lpad(now.getSeconds().toString(), "0", 2);
		}
		else
		{
			return now.getFullYear() + flag + ComUtil.lpad((now.getMonth()+1).toString(), "0", 2) + flag + ComUtil.lpad(now.getDate().toString(), "0", 2);
		}
	}
};


/* 스트링 -> 숫자  */
ComUtil.parseNumeric=function(str) 
{
	var ls_num = "";

	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) != '0'){
			ls_num = str.substring(i);
			break;
		}
	}

	if (ls_num == "") return 0;
	else return parseInt(ls_num);
};

/**
 * 입력 받은 날짜를 구분자("-")를 넣어 반환 한다.
 * @param sVal
 * @return
 */
ComUtil.getDateFormat=function(pVal)
{
	if (ComUtil.nvl(pVal) == "")
	{
		return "";
	}

	var rtnValue = ComUtil.removeNumberMask(pVal);

	if (rtnValue.length != 8)
	{
		return rtnValue;
	}

	var sYear 	= rtnValue.substr(0,4);
	var sMonth 	= rtnValue.substr(4,2);
	var sDay 	= rtnValue.substr(6,2);

	rtnValue = sYear + "-" + sMonth + "-" + sDay;
	return rtnValue;

};


/*
* 특정한 날짜에 일자를 더한다.
*/
ComUtil.addDay=function(yyyy, mm, dd, pDay, pType) // 년, 월, 일, 계산할 일자 (년도는 반드시 4자리로 입력), 계산항목('Y':year, 'M':month, 'D':day)
{
	var oDate; // 리턴할 날짜 객체 선언

	dd = dd*1;

	switch (pType) // 날짜 계산
	{
		case "Y": yyyy = yyyy+pDay*1;break;
		case "M": mm = mm+pDay*1;break;
		default:  dd = dd+pDay*1;break;
	} 

	mm--; // 월은 0~11 이므로 하나 빼준다

	oDate = new Date(yyyy, mm, dd); // 계산된 날짜 객체 생성 (객체에서 자동 계산)

	var year = oDate.getFullYear();
	var month = oDate.getMonth()+1;
	var day = oDate.getDate();

		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;

	oDate = year+""+month+""+day;

	return oDate;
};

/*
* 특정한 날짜에 일자를 더한다. 마스크 추가
*/
ComUtil.addDayMask=function(pVal, pDay, pType, pMask) // 년, 월, 일, 계산할 일자 (년도는 반드시 4자리로 입력), 계산항목('Y':year, 'M':month, 'D':day)
{

	if (ComUtil.removeNumberMask(pVal).length != 8)
	{
		return pVal;
	}
	
	var yyyy = pVal.substr(0, 4)*1;
	var mm = pVal.substr(4, 2)*1;
	var dd = pVal.substr(6, 2)*1;
	
	var oDate; // 리턴할 날짜 객체 선언

	dd = dd*1;

	switch (pType) // 날짜 계산
	{
		case "Y": yyyy = yyyy + pDay*1;break;
		case "M": mm   = mm   + pDay*1;break;
		default:  dd   = dd   + pDay*1;break;
	} 
	mm--; // 월은 0~11 이므로 하나 빼준다

	oDate = new Date(yyyy, mm, dd); // 계산된 날짜 객체 생성 (객체에서 자동 계산)

	var year = oDate.getFullYear();
	var month = oDate.getMonth()+1;
	var day = oDate.getDate();

		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;

	oDate = year+pMask + month + pMask +day;

	return oDate;
};

/**
  * 초를 시간 포맷으로
  * sec : 초
  * return : 시:분:초 (00:00:00)
  */
ComUtil.getSecToTime=function(sec)
{
	var v_sec = parseFloat(sec);

	if(isNaN(v_sec)) return "";

	var v_temp		    = Math.round(v_sec);
	var v_hour_temp 	= Math.floor(v_temp / 3600);
	var v_minute_temp	= Math.floor(v_temp%3600/60);
	var v_second_temp	= v_temp%60;

	if(v_hour_temp < 10)
	{
		v_hour_temp = '0'+v_hour_temp;
	}
	if(v_minute_temp < 10)
	{
		v_minute_temp = '0'+v_minute_temp;
	}
	if(v_second_temp < 10)
	{
		v_second_temp = '0'+v_second_temp;
	}

	return v_hour_temp + ':' + v_minute_temp + ':' + v_second_temp;
};


 
/**
 * 콤보박스의 선택된 option text를 가져온다.
 * obj : 콤보박스 객체
 * return option text
 */
ComUtil.getSelectedText=function(obj) 
{
	try	{
		var text = "";

		if (obj && obj.options && obj.selectedIndex > -1) {
			text = obj.options[obj.selectedIndex].text;
		} else {
			text = "";
		}

		return text;
	} catch (e) {}
};

              

/**
 * obj.value를 넘기면 널값을 체크해서 반환
 * @param objVal
 * @return
 */
ComUtil.isNull=function(objVal)
{
	var retVal = false;
	if(objVal == null || objVal == '')	retVal = true;
	return retVal;	
};       

ComUtil.selfClose=function()
{
	if (/MSIE/.test(navigator.userAgent))
	{
		if(navigator.appVersion.indexOf("MSIE 7.0")>=0) //IE7
		{
			window.open('about:blank','_self').close();
		}
		else if(navigator.appVersion.indexOf("MSIE 8.0")>=0) //IE9
		{
			window.open('about:blank','_self').close();
		}
		else if(navigator.appVersion.indexOf("MSIE 9.0")>=0) //IE8
		{
			window.open('about:blank','_self').close();
		}
		else if(navigator.appVersion.indexOf("MSIE 10.0")>=0) //IE10
		{
			window.open('about:blank','_self').close();
		}
		else if(navigator.appVersion.indexOf("MSIE 11.0")>=0) //IE11
		{
			window.open('about:blank','_self').close();
		}
		else //IE7이외
		{
			window.open("about:blank","_self").close();
			opener = window;
			window.close();
		}
	}	
};



/**
 * json 데이터를 string 으로 반환한다.
 */
ComUtil.jsonToStr=function(/** JSON */ json) 
{
	try {
		return JSON2.stringify(json);
	} catch (e) {
		console.error(e);
	}
};


/**
 * 폼 초기화하기 
 * @param el
 */
ComUtil.resetForm=function(/** element */ el) {
	if (el === undefined || el == 'form') {
		el = 'form *';
	} 
	$(el).each(function(i) {
		if (this.type == 'text' || this.type == 'password' || this.type == 'textarea' || this.type == 'tel') {
			this.value = '';
		} else if (this.type == 'select' || this.type == 'select-one') {
			this.selectedIndex = 0;
		}
	});
};

/**
 * 화면 좌우 사이즈 중앙 값 계산
 * @param w
 * @param h
 * @returns {String}
 */
ComUtil.getOpt=function(/** Number */ w, /** Number */ h) {
	var x = screen.width;
	// var y = screen.height;
	var left  = (x- w) / 2;
	var top = 32; //(y- h) /2;
	var pos = 'height='+ h+ ',width='+ w+ ',left='+ left+ ',top='+ top;
//	var pos = 'fullscreen,scrollbars';
	//toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1
	var opt = 'location=no,directories=no,toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,'+ pos;
	return opt;
};


/**
 *  화면 중앙에 POST 방법으로 팝업창 띄우기
 * @param url		: url
 * @param w			: 창 폭
 * @param h			: 창 높이
 * @param _name		: 창 이름
 * @param arg		: 파라메터 map
 * @returns
 */
ComUtil.popupPost=function(/** String */ url, /** Number */ w, /** Number */ h, /** String */ _name, /** Map */ arg) {
	if (_name === undefined || _name == null) {
		_name = "_blank";
	}
	opt = ComUtil.getOpt(w, h);
	ComUtil.fnComClosePopup(_name);	// 기존 같은 이름의 팝업창을 닫는다.
	arrWinHandle[_name] = window.open('', _name, opt);

	if (arrWinHandle[_name]) {
		arrWinHandle[_name].focus();
		ComUtil.popupWindowThruPost(url, arg, 'searchVO', _name);
	}
	return arrWinHandle[_name];
};

/**
 * POST 방법으로 팝업창 띄우기
 * 
 * @param url
 * @param map1
 * @see #popupPost
 */
ComUtil.popupWindowThruPost=function(/** String */ url, /** map */ arg, /** String */ frmName, /** String */ tName) {
	tName = tName || '_v';
	var $frm = $('form[target='+ tName + ']');
	if ($frm.length == 1) {
		$frm.remove();
	}

	var frm = document.createElement('form');
	for (var key in arg) {
		var v = arg[key];
		var o = document.createElement('input');
		o.setAttribute('type', 'hidden');
		o.setAttribute('name', key);
		o.setAttribute('value', v);
		frm.appendChild(o);
	}
	
	frm.setAttribute('name', frmName );
	frm.setAttribute('action', url);
	frm.setAttribute('method', 'post');
	frm.setAttribute('target', tName);
	document.body.appendChild(frm);
	
	frm.submit();
};


//** ---------------------------------------------------------------------------
//함 수 명 : fnComClosePopup
//인    자 : 
//		  1. pWinName : open windown name
//목    적 : 현재 열린 popup창을  닫는다.
//플 로 우 : 
//검    수 :
//예   제  : 	
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
ComUtil.fnComClosePopup=function(pWinName) {
	if(typeof(pWinName) == 'undefined') {	// 전체 닫기
		for(var i in arrWinHandle){	// 현재 열려 있는 팝업창
			if(arrWinHandle[i] != null && typeof(arrWinHandle[i].name)== "string" ){ // 핸들이 존재하는 확인
				arrWinHandle[i].close();
				arrWinHandle[i] = null;
			}
		}

	} else {	// 넘어온 object만 닫기
		if(arrWinHandle[pWinName] != null && typeof(arrWinHandle[pWinName].name)== "string" ){ // 핸들이 존재하는 확인
			arrWinHandle[pWinName].close();
			arrWinHandle[pWinName] = null;
		}
	}
	 
};



/**
 * history.back()을 방지 하기 위해 사용. 추후 정리 필요.
 * document.ready에 추가
 * $(document).bind("keydown",(function() {  setClearBackSpace()();}));	
 */
ComUtil.setClearBackSpace=function() {
    var t = document.activeElement;
    if (ComUtil.getKeyEvent(event) == 8) {
        if ( 
    		( t.tagName != "SELECT" )
    		&& ((t.tagName == "INPUT" || t.tagName == "TEXTAREA") && $(t).attr("readonly") != "readonly")
        	) 
        { // select 가 아니고, input, textarea 이면서 readonly
        	;
        } else {
        	try {
	        	event.keyCode = 0;
	        	event.which = 0;
	        	event.returnValue = false;
        	} catch(error){
	        	event.which = 0;
	        	event.returnValue = false;
        	}
        }
    }
	    	
};


/**
 * 화면의 버튼 막기 
 * @param mesg
 * @param cssMap
 * @param timeout
 */
ComUtil.blockUI=function(/** String */ mesg, /** object of the css */ cssMap, /** Number */ timeout) {
	mesg = mesg || '처리중입니다. 잠시만 기다려 주세요.';
	//cssMap = cssMap || { width: 460, height: 50 };
	cssMap = cssMap || { backgroundColor: '#FFF', width:'310px', height:'130px', padding:'5px', position:'absolute', left:'45%', top:'35%' };
	timeout = timeout || 5000;
	
	$.blockUI({ 
		message: '<span class="msg">' + mesg + '</span><span class="load_img"><img src="/mktp/images/load_img.gif" alt="로딩 이미지"></span>',
		css: cssMap,
		overlayCSS: { backgroundColor: '#FFF', opacity: 0.5, cursor: 'wait' },
		blockMsgClass: 'loadBox',
		timeout: timeout
	});
	
	setTimeout($.unblockUI, timeout);
};

/**
 * 화면 풀기
 */
ComUtil.unblockUI=function() {
	$.unblockUI();
};



//** ---------------------------------------------------------------------------
//함 수 명 : getKeyEvent
//인    자 : 
//		  1. e : key event
//목    적 : 
//플 로 우 : 
//검    수 :
//예   제  : 	검색조건의 사용자 명 enter 체크시 사용
//			$('input[name=searchUerNm]').bind('keydown',function(event) {
//				if(getKeyEvent(event) == 13){
//					$("#btn_search").trigger("click");
//				}
//			});
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
ComUtil.getKeyEvent=function(e) { 
	var keyVal = 0;
	if (navigator.appName == 'Netscape') { 
		keyVal = e.which; //Netscape, CHROME 
	} else if (navigator.appName == 'Microsoft Internet Explorer'){ 
		if(e.key == "KanaMode") { // 한/영 전환키
			keyVal = 999;
		} else {
			keyVal = e.keyCode ; //MS 
		}
	} 
	else{ 
		keyVal = e.which ; //OPERA 
	} 
	return keyVal; 
};



//** ---------------------------------------------------------------------------
//함 수 명 : postAjaxData
//인    자 : 
//		  1. pUrl          : json 호출 url
//		  2. pData         : 파라메터 데이터 Form 명 또는 Array
//		  3. pCallBackFn   : 정상 처리 완료 후 호출 Function 명
//		  4. pBlockUI      : true - blockUI 함수를 호출 한다., false - blockUI 호출 하지 않는다.
//		  5. pBlockMessage : BlockUI에 설정 할 메시지
//목    적 : 
//플 로 우 : 
//검    수 :
//예   제  : 	fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', 'frm', 'callbackTblListClick', true, '조회 중 입니다.' );
//			fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', {codeId:$(obj).data("data").codeId}, 'callbackTblListClick', true, '조회 중 입니다.' );
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
ComUtil.postAjaxData=function(/* String */ pUrl, /* String or Array */ pData, /* String */ pCallBackFn, /* Bool */ pBlockUI, /* Bool */ pBlockMessage )
{
	try {
		var sData = null;
		if(typeof(pData) == "object" ) {
			sData = pData;
		} else if(pData == null) {
			sData = "";
		}
		else {
			sData = $('#'+pData).serialize();
		}
		try {
			console.log(sData);
		} catch(e) {}

		$.ajax({
			dataType:"text",
			type: "POST",
			url: pUrl,
			data:sData,
			async: true,
			cache: false, 
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend : function(){
				if(pBlockUI) {
					ComUtil.blockUI(pBlockMessage,'','30000');
				}
		 	},
			success : function(data, status, request) {
				try {
					console.log(data);
				} catch(e) {}
				var resultData	= eval("(" + data + ")");
				if(resultData.RESULT_CODE == "0000") {
					if(pCallBackFn != '') {
						eval(pCallBackFn+'(resultData);');
					}
				} else if(resultData.RESULT_CODE == "-9000") {	// 세션정보가 존재하지 않음
					alert(resultData.RESULT_MESSAGE);
					//if(typeof(opener) == "object") {	// 현재 창이 PopUp 창이면 현재 창을 닫는다.
					//	window.close();
					//}
				} else {
					alert(resultData.RESULT_MESSAGE);
				}
			},
			complete: function(){
				if(pBlockUI) {
					ComUtil.unblockUI();  // 진행중 표시 제거하기
				}
			},
		    error: function(data, status, error) {
				window.error = error;
				if(pBlockUI) {
					ComUtil.unblockUI();
				}
		    	alert("fnGetAjaxData["+error+"]");
			}
		});	
	} catch(e) {
		alert("fnGetAjaxData["+e.message+"]");
	}

};

//** ---------------------------------------------------------------------------
//함 수 명 : postAjaxData
//인    자 : 
//		  1. pUrl          : json 호출 url
//		  2. pData         : 파라메터 데이터 Form 명 또는 Array
//		  3. pCallBackFn   : 정상 처리 완료 후 호출 Function 명
//		  4. pBlockUI      : true - blockUI 함수를 호출 한다., false - blockUI 호출 하지 않는다.
//		  5. pBlockMessage : BlockUI에 설정 할 메시지
//목    적 : 
//플 로 우 : 
//검    수 :
//예   제  : 	fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', 'frm', 'callbackTblListClick', true, '조회 중 입니다.' );
//			fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', {codeId:$(obj).data("data").codeId}, 'callbackTblListClick', true, '조회 중 입니다.' );
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
ComUtil.postAjaxString=function(/* String */ pUrl, /* String or Array */ pData, /* String */ pCallBackFn, /* Bool */ pBlockUI, /* Bool */ pBlockMessage )
{
	try {
		var sData = null;
		if(typeof(pData) == "object" ) {
			sData = pData;
		} else if(pData == null) {
			sData = "";
		}
		else {
			sData = $('#'+pData).serialize();
		}
		$.ajax({
			dataType:"text",
			type: "POST",
			url: pUrl,
			data:sData,
			async: true,
			cache: false, 
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend : function(){
				if(pBlockUI) {
					ComUtil.blockUI(pBlockMessage,'','30000');
				}
		 	},
			success : function(data, status, request) {
				try {
					console.log(data);
				} catch(e) {}
				var resultData	= eval("(" + data + ")");
				if(resultData.RESULT_CODE == "0000") {
					if(pCallBackFn != '') {
						eval(pCallBackFn+'(data);');
					}
				} else if(resultData.RESULT_CODE == "-9000") {	// 세션정보가 존재하지 않음
					alert(resultData.RESULT_MESSAGE);
					//if(typeof(opener) == "object") {	// 현재 창이 PopUp 창이면 현재 창을 닫는다.
					//	window.close();
					//}
				} else {
					//alert(resultData.RESULT_MESSAGE);
					eval(pCallBackFn+'(data);');
				}
			},
			complete: function(){
				if(pBlockUI) {
					ComUtil.unblockUI();  // 진행중 표시 제거하기
				}
			},
		    error: function(data, status, error) {
				window.error = error;
				if(pBlockUI) {
					ComUtil.unblockUI();
				}
		    	alert("fnGetAjaxData["+error+"]");
			}
		});	
	} catch(e) {
		alert("fnGetAjaxData["+e.message+"]");
	}

};

/**
 * Form 및 table에 DataSet을 넣어 준다.
 * 
 * @param data {Object} 데이터
 */
ComUtil.setFormData=function(pFormName, pData) {
	$("#"+pFormName).find("input,select,textarea").each(function(index, element) {
        var value = pData[this.name] != null ? pData[this.name] : "";
        
        switch (this.type) {
            case "image":    // 이미지
            case "button":   // 버튼
            case "submit":   // 서브밋
                break;
            case "radio":    // 라디오
            case "checkbox": // 체크박스
            	this.checked = this.value == value;
                break;
            default:         // 기타
                this.value = value;
                break;
        }
    });
};

/**
 * 버튼을 비활성화 한다.
 *  @param pBtnNm 버튼 명
 *  @param bFlag ===> true:비활성, false: 활성
 */
ComUtil.setDisableBtn=function(pBtnNm, bFlag) {
	var obj = null;
	if(typeof(pBtnNm) == "string") {
		obj = $("#"+pBtnNm);
		if(obj == null) {
			obj = $("[name="+pBtnNm+"]");
		}
	}
	if(obj == null) return;
	
	if(bFlag == true) {
		obj.off("click");
		obj.removeClass("white");
		obj.addClass("gray");
	} else {
		obj.off("click");
		obj.on("click",(function() {
			eval(this.id+"Click()");
		}));
		obj.removeClass("gray");
		obj.addClass("white");
	}

};


/**
 * 객체를 비활성화 한다.
 *  @param obj 객체명
 *  @param bFlag ===> true:비활성, false: 활성
 */
ComUtil.setDisableObj=function(objNm, bFlag) {
	var obj = null;
	if(typeof(objNm) == "string") {
		obj = $("#"+objNm);
		if(obj == null) {
			obj = $("[name="+objNm+"]");
		}
	}
	if(obj == null) return;
	
	if(bFlag == true) {	// 비활성화
		if(obj.prop("type") == "select-one" || obj.prop("type") == "radio" || obj.prop("type") == "radio") {
//			obj.removeClass("write-text");
//			obj.addClass("disable");
			obj.prop("disabled", true);
		} else {
			obj.removeClass("input");
			obj.removeClass("input_esst");
			obj.addClass("disable");
			obj.prop("readonly", true);
		}
	} else {	// 활성화
		if(obj.prop("type") == "select-one" || obj.prop("type") == "radio" || obj.prop("type") == "radio") {
//			obj.removeClass("disable");
//			obj.addClass("write-text");
			obj.prop("disabled", false);
		} else {
			if(obj.find(".v-req") > 0) {
				obj.removeClass("disable");
				obj.addClass("input_esst");
			} else {
				obj.removeClass("disable");
				obj.addClass("input");
			}
			obj.prop("readonly", false);
		}
	}
};


//** ---------------------------------------------------------------------------
//함 수 명 : 
//		  ajax 사용시 pageing html을 만들어 준다.		  
//인    자 :		1. paginationInfo		: 전자 정부에서 제공하는 pageingInfo
//				2. callbackFunction		: 페이지 번호 클릭시 호출 할 함수명
//결    과	: PAGE HTML
//목    적 : PAGE 만드는 함수
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : $("#userListPage tbody tr:last td:first").html(fnMakePageHtml(data.paginationInfo, "userListChangePage"));
//주의사항 :
//** ---------------------------------------------------------------------------  
ComUtil.fnMakePageHtml=function(paginationInfo, callbackFunction) 
{
	var strHTML	= "";	//PAGE HTML

	if ( parseInt(paginationInfo.lastPageNo) >= 1 )
	{
		var BlockPage;
		var i;
		strHTML	= "<ul>";
		BlockPage		= parseInt((parseInt(paginationInfo.currentPageNo)-1)/10)*10+1;

		if ( parseInt(BlockPage) != 1 ) {
			strHTML	+= "<li class=\"Lbegin\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:"+callbackFunction+"('1'); return false;\">1page</a></span></li> ";
			strHTML	+= "<li class=\"Lprevious\"><span><a href=\"javascript:;\" onclick=\"javascript:"+callbackFunction+ "('" + (BlockPage-1) + "'); return false;\"><img src=\"../images/list_page_previous.gif\" alt=\"이전페이지\" /></a></span></li> ";
		} else {
			strHTML	+= "<li class=\"Lbegin\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:"+callbackFunction+"('1'); return false;\">1page</a></span></li> ";
		}
		
		i = 1;

		while( i <= 10 && parseInt(BlockPage) <= parseInt(paginationInfo.lastPageNo) )
		{
			if ( parseInt(BlockPage) == parseInt(paginationInfo.currentPageNo) ) {
				strHTML	+= "<li><span>" + BlockPage + "</span></li> ";
			} else {
				strHTML	+= "<li><span><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + BlockPage + "'); return false;\">"+BlockPage+"</a></span></li> ";
			}

			BlockPage	= BlockPage + 1;

			i			= i + 1;

			if ( i <= 10 && parseInt(BlockPage) <= parseInt(paginationInfo.lastPageNo) )
			{
			}
		}

		if ( parseInt(BlockPage) <= parseInt(paginationInfo.lastPageNo) ) {
			strHTML	+= "<li class=\"Lnext\"><span><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + BlockPage + "'); return false;\"><img src=\"../images/list_page_next.gif\" alt=\"다음페이지\" /></a></span></li> ";
			strHTML	+= "<li class=\"Lend\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + paginationInfo.lastPageNo + "'); return false;\">"+paginationInfo.lastPageNo+"page</a></span></li> ";
		} else {
			strHTML	+= "<li class=\"Lend\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + paginationInfo.lastPageNo + "'); return false;\">"+paginationInfo.lastPageNo+"page</a></span></li> ";
		}

		strHTML	+= "</ul>";
	}

	return strHTML;
};


//** ---------------------------------------------------------------------------
//함 수 명 : 
//		  ajax 사용시 pageing html을 만들어 준다.		  
//인    자 :		1. paginationInfo		: 전자 정부에서 제공하는 pageingInfo
//				2. callbackFunction		: 페이지 번호 클릭시 호출 할 함수명
//결    과	: PAGE HTML
//목    적 : PAGE 만드는 함수
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : $("#userListPage tbody tr:last td:first").html(fnMakePageHtml(data.paginationInfo, "userListChangePage"));
//주의사항 :
//** ---------------------------------------------------------------------------  
ComUtil.fnMakePageHtmlPopup=function(paginationInfo, callbackFunction) 
{
	var strHTML	= "";	//PAGE HTML

	if ( parseInt(paginationInfo.lastPageNo) >= 1 )
	{
		var BlockPage;
		var i;
		strHTML	= "<ul>";
		BlockPage		= parseInt((parseInt(paginationInfo.currentPageNo)-1)/10)*10+1;

		if ( parseInt(BlockPage) != 1 ) {
			strHTML	+= "<li class=\"Lbegin\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:"+callbackFunction+"('1'); return false;\">1page</a></span></li> ";
			strHTML	+= "<li class=\"Lprevious\"><span><a href=\"javascript:;\" onclick=\"javascript:"+callbackFunction+ "('" + (BlockPage-1) + "'); return false;\"><img src=\"../../images/list_page_previous.gif\" alt=\"이전페이지\" /></a></span></li> ";
		} else {
			strHTML	+= "<li class=\"Lbegin\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:"+callbackFunction+"('1'); return false;\">1page</a></span></li> ";
		}
		
		i = 1;

		while( i <= 10 && parseInt(BlockPage) <= parseInt(paginationInfo.lastPageNo) )
		{
			if ( parseInt(BlockPage) == parseInt(paginationInfo.currentPageNo) ) {
				strHTML	+= "<li><span>" + BlockPage + "</span></li> ";
			} else {
				strHTML	+= "<li><span><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + BlockPage + "'); return false;\">"+BlockPage+"</a></span></li> ";
			}

			BlockPage	= BlockPage + 1;

			i			= i + 1;

			if ( i <= 10 && parseInt(BlockPage) <= parseInt(paginationInfo.lastPageNo) )
			{
			}
		}

		if ( parseInt(BlockPage) <= parseInt(paginationInfo.lastPageNo) ) {
			strHTML	+= "<li class=\"Lnext\"><span><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + BlockPage + "'); return false;\"><img src=\"../../images/list_page_next.gif\" alt=\"다음페이지\" /></a></span></li> ";
			strHTML	+= "<li class=\"Lend\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + paginationInfo.lastPageNo + "'); return false;\">"+paginationInfo.lastPageNo+"page</a></span></li> ";
		} else {
			strHTML	+= "<li class=\"Lend\"><span class=\"preNext\"><a href=\"javascript:;\" onclick=\"javascript:" + callbackFunction + "('" + paginationInfo.lastPageNo + "'); return false;\">"+paginationInfo.lastPageNo+"page</a></span></li> ";
		}

		strHTML	+= "</ul>";
	}

	return strHTML;
};

