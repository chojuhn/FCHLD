
/*
* [지원되는 유효성검사 목록]
* v-req			: 필수입력
* v-num			: 숫자만 입력
* v-tel-num		: 전화번호 형식(하이픈 '-' 포함 형식)
* v-telnum		: 전화번호 형식(하이픈 제외 형식)
* v-gtel g-1    : 전화번호 그룹 형식 체크( 하이픈 제외 ) g-1 에서 1은 그룹번호를 의미한다. 그룹끼리 번호로 묶어야한다.
* v-email		: 이메일 형식
* v-ssn			: 주민등록번호 형식
* v-companyno	: 사업자등록번호 형식
* v-birth		: 생년월일 형식 (831020)
* v-engnum		: 영문소문자와 숫자만 가능한 형식
* v-opt			: radio 또는 checkbox 값
* v-len			: 문자열 입력 길이 제한 체크
* v-han			: 한글만 입력
* v-date		: 날짜 입력
*/
function validate()
{
    var test = true;

    $('.v-req, .v-num, .v-tel-num, .v-telnum, .v-email, v-email1, .v-ssn1, .v-ssn3, .v-ssn5, .v-companyno1, .v-companyno4, .v-opt, .v-len, .v-gtel, .v-engnum, .v-han, .v-date').each(function(i, o)
    {
        var val = $(o).val();
        var classNames = $(o).attr('class');

        var objName = typeof ($(o).attr('title')) != "undefined" ? $(o).attr('title') : "";

        if (/v-req/.test(classNames)) { // 필수입력
            if (!val || val.length == 0) {
                alert(objName + "(은)는 반드시 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }

        if (/v-han/.test(classNames)) { // 한글만 입력
        	var pattern = /[A-Za-z0-9]/;
            if (pattern.test(val)) {
                alert(objName + "(은)는 한글만 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }

        if (/v-num/.test(classNames)) { // 숫자만 입력
            if (isNaN(val) || /[^\d]/.test(val)) {
                var objName = $(o).attr('title') != "" ? $(o).attr('title') : $('label[for=' + $(o).attr('id') + ']').text();
                alert(objName + "(은)는 숫자만 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-tel-num/.test(classNames)) { // 전화번호 형식(하이픈 제외)
            var pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

            if (!pattern.test(val)) {
                alert(objName + "(은)는 형식이 올바르지 않습니다.\n");
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-telnum/.test(classNames)) { // 전화번호 형식(하이픈 포함)
            var pattern = /^[0-9]{9,11}$/;

            if (!pattern.test(val)) {
                alert(objName + "(은)는 형식이 올바르지 않습니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-mobile/.test(classNames)) { // 휴대전화 형식
            var pattern = /(01[016789])(\d{4}|\d{3})\d{4}$/g;

            if (!pattern.test(val)) {
                alert(objName + "(은)는 형식이 올바르지 않습니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-chkemail/.test(classNames)) { // 이메일 형식
        	//var pattern=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;                 
	    	 //if($(o).val()=='' || $(o).val().length<6 || !pattern.test($(o).val())) {

        	if(!isValid_email( $(o).val() )){
	                alert("바른 " + objName + " 주소를 입력하셔야 합니다.");
	                $(o).focus();
	                test = false;
	                return false;
	    	} 
	    }        
        
        if (/v-email/.test(classNames)) { // 이메일 형식
            var pattern = /[A-z0-9_\-]{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
            val = $(o).val() + '@' + $(o).next().val();

            if (!pattern.test(val)) {
                alert(objName + "바른 이메일 주소를 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-email1/.test(classNames)) { // 이메일 형식
            var pattern = /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
            val = $(o).val();

            if (!pattern.test(val)) {
                alert(objName + "바른 이메일 주소를 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-ssn1/.test(classNames)) { // 주민등록번호 형식(하이픈 '-' 제외)
            val = $(o).val() + $(o).next().val();

			if (val == '0000000000000') {
				return true;
			}

			if (fnrrnCheck(val) || fnfgnCheck(val)) {  
				return true;  
			}  
			else
			{
                alert("주민등록번호를 확인하세요.");
                $(o).focus();
                test = false;
                return false;

	            test = false;
				return false;  
			}
        }
        
        if (/v-ssn3/.test(classNames)) { // 무조건체크(1연속 입력 체크 제외)
            val = $(o).val() + $(o).next().val();

			if (fnrrnCheck(val) || fnfgnCheck(val)) {  
				return true;  
			}  
			else
			{
                alert("주민등록번호를 확인하세요.");
                $(o).focus();
                test = false;
                return false;

	            test = false;
				return false;  
			}
        }
        
        if (/v-ssn5/.test(classNames)) { // 공백인정
            val = $(o).val() + $(o).next().val();

			if (val.trim() == '') {
				return true;
			}

			if (fnrrnCheck(val) || fnfgnCheck(val)) {  
				return true;  
			}  
			else
			{
                alert("주민등록번호를 확인하세요.");
                $(o).focus();
                test = false;
                return false;

	            test = false;
				return false;  
			}
        }
        
        if (/v-companyno1/.test(classNames)) { // 사업자 등록번호 형식 (하이픈 '-' 제외)
            var pattern = /(^[0-9]{10}$)/;

            val = $(o).val() + $(o).next().val() + $(o).next().next().val();

            if (val == '1111111111') {
                return true;
            }

            if (!pattern.test(val)) {
                alert("사업자등록번호를 10자리 숫자로 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            } else {
                var sum = 0;
                var at = 0;
                var att = 0;
                var saupjano = val;
                sum = (saupjano.charAt(0) * 1) +
					  (saupjano.charAt(1) * 3) +
					  (saupjano.charAt(2) * 7) +
					  (saupjano.charAt(3) * 1) +
					  (saupjano.charAt(4) * 3) +
					  (saupjano.charAt(5) * 7) +
					  (saupjano.charAt(6) * 1) +
					  (saupjano.charAt(7) * 3) +
					  (saupjano.charAt(8) * 5);
                sum += parseInt((saupjano.charAt(8) * 5) / 10);
                at = sum % 10;
                if (at != 0)
                    att = 10 - at;

                if (saupjano.charAt(9) != att) {
                    alert("올바른 사업자등록번호가 아닙니다.");
                    $(o).focus();
                    test = false;
                    return false;
                }
            }
        }
        
        if (/v-companyno4/.test(classNames)) { // 무조건체크(1연속 입력 체크 제외)
            var pattern = /(^[0-9]{10}$)/;

            val = $(o).val() + $(o).next().val() + $(o).next().next().val();

            if (!pattern.test(val)) {
                alert("사업자등록번호를 10자리 숫자로 입력하셔야 합니다.");
                $(o).focus();
                test = false;
                return false;
            } else {
                var sum = 0;
                var at = 0;
                var att = 0;
                var saupjano = val;
                sum = (saupjano.charAt(0) * 1) +
					  (saupjano.charAt(1) * 3) +
					  (saupjano.charAt(2) * 7) +
					  (saupjano.charAt(3) * 1) +
					  (saupjano.charAt(4) * 3) +
					  (saupjano.charAt(5) * 7) +
					  (saupjano.charAt(6) * 1) +
					  (saupjano.charAt(7) * 3) +
					  (saupjano.charAt(8) * 5);
                sum += parseInt((saupjano.charAt(8) * 5) / 10);
                at = sum % 10;
                if (at != 0)
                    att = 10 - at;

                if (saupjano.charAt(9) != att) {
                    alert("올바른 사업자등록번호가 아닙니다.");
                    $(o).focus();
                    test = false;
                    return false;
                }
            }
        }
        
        if (/v-birth/.test(classNames)) { // 생년월일 형식 (831020) 
            var pattern = /(^[0-9]{6}$)/;

            if (!pattern.test(val)) {
                alert("주민번호 앞자리 또는 생년월일 형식은 6자리 숫자로 입력하셔야 합니다.");
                $(o).val('');
                $(o).focus();
                test = false;
                return false;
            } else {
                var y = NUMBER(val.substring(0, 2));
                var m = NUMBER(val.substring(2, 4));
                var d = NUMBER(val.substring(4, 6));
                var bool = false;
                if (m > 12) {
                    bool = true;
                }
                if (d < 1 || d > 31) {
                    bool = true;
                }

                if (bool) {
                    alert("생년월일 형식이 올바르지 않습니다.");
                    $(o).focus();
                    $(o).val('');
                    test = false;
                    return false;
                }
            }
        }
        
        if (/v-engnum/.test(classNames)) { // 영문소문자와 숫자만 입력
            var pattern = /[A-Z_0-9]*$/;

            if (!pattern.test(val)) {
                alert(objName + "(은)는 영문대문자와 숫자만 입력가능 합니다.");
                $(o).val('');
                $(o).focus();
                test = false;
                return false;
            }
        }
        
        if (/v-date/.test(classNames)) { // 날짜형식 체크
        	if(val != '') {
	        	if(!isValidDate(removeMask(val))) {
	                alert(objName + "(은)는 날짜 형식이 올바르지 않습니다.");
	                //$(o).val('');
	                $(o).focus();
	                test = false;
	                return false;
	        	}
        	}
        }   
        
        if (/v-opt/.test(classNames)) { // 라디오 버튼 또는 체크박스
            if ($(o).attr('type') == 'radio' || $(o).attr('type') == 'checkbox') {
                var obFlag = false;
                var obName = $(o).attr('name');
                var cnt = 0;
                $('input[name=' + obName + ']').each(function(x) {
                    cnt++;
                    if ($(this).attr('checked')) {
                        obFlag = true;
                        return;
                    }
                });

                if (!obFlag) {
                    alert(objName + "(을)는 선택하십시오");
                    test = false;
                    return false;
                }
            }
        }
        
        if (/v-len/.test(classNames)) { // 길이 제한 체크 max or min

            var maxLen = Number($(o).attr("maxlength"));
            var minLen = $(o).attr("minlength") ? Number($(o).attr("minlength")) : 0;
            var objLen = calcByte($(o).val());
            var msg;
            var mode = 0;
            mode += maxLen > 0 ? 1 : 0;
            mode += minLen > 0 ? 2 : 0;
            var rtn = true;
            if(objLen == 0) return rtn;
            switch (mode) {
                case 1: // max
                    if (objLen > maxLen) {
                        msg = objName + "(은)는 허용하는 최대 길이가 " + maxLen + " 자리 입니다";
                        alert(msg);
                        rtn = false;
                        test = false;
                        $(o).focus();
                    }
                    break;

                case 2: // min
                    if (objLen < minLen) {
                        msg = objName + "(은)는 최소 " + minLen + " 자리 이상 입력";
                        alert(msg);
                        rtn = false;
                        test = false;
                        $(o).focus();
                    }
                    break;

                case 3: // min - max 
                    if (objLen < minLen || objLen > maxLen) {
                        msg = objName + "(은)는 최소 " + minLen + " 자리부터 최대 " + maxLen + " 자리까지 입력";
                        alert(msg);
                        rtn = false;
                        test = false;
                        $(o).focus();
                    }

                    break;
            }
            return rtn;
        }
        
        if (/v-gtel/.test(classNames)) { // 그룹 전화번호 체크 g-그룹번호 지정으로 그룹을 묶어줘야함

            var clazz = $(this).attr('class');

			var classnm = $(this).attr('class');
			var st = classnm.indexOf("g-");

            var groupName = "." + classnm.substr(st,4);
            var groupEmptyCount = 0;
            var groupEmpty = false;
            var groupCount = 0;
            var group = new Object();
            var emptyObject = null;
			var rtn = true;
			var isNotSelect = true;

            $(groupName).each(function(i, o) {
                groupCount++;
                group[$(this).attr('name')] = $(this).val();

                if ($(this).val() == "" || $(this).val().length == 0) {
                    if (emptyObject == null) {
                        emptyObject = o;
                    }
                }
                if ( $(this)[0].tagName == "SELECT" ) {
                    isNotSelect = false;
                }
            });

            for (var key in group) {
                if (group[key] == "" || group[key].length == 0) {
                    groupEmptyCount++;
                }
            }

            if (groupEmptyCount > 0) {
                if (groupCount != groupEmptyCount) {
                    alert(objName + "를 모두 입력하셔야 합니다.");
                    $(emptyObject).focus();
					rtn = false;
					test = false;
                    return false;
                }
            } else {
                //var pattern = /^[0-9]{9,11}$/;
			    var pattern = /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
                var val = "";

                // 2013-04-15 "-"을 넣어 체크
                for (var key in group) {
                    val += group[key]+"-";
                }
                if(val.length > 0)
                	val = val.substring(0, val.length-1);
                
                // 2013-04-15 select box가 존재해도 유효성 체크
                //if ( isNotSelect ) {
                    if (!pattern.test(val)) {
                        alert(objName + "는 형식이 올바르지 않습니다.");
                        $(o).focus();
					    rtn = false;
					    test = false;
                        return false;
                    }
               //}
            }
        
			return rtn;
        }
    });
    
    return test;
}

function juminChk(val1, val2)
{
	var pattern = /(^[0-9]{13}$)/;
	val = val1.val() + val2.val();

	if (!pattern.test(val)) {
		alert("주민등록번호를 13자리 숫자로 입력하셔야 합니다.");
		$(val1).focus();
		test = false;
		return false;
	} else {
		var sum_1 = 0;
		var sum_2 = 0;
		var at = 0;
		var juminno = val;
		sum_1 = (juminno.charAt(0) * 2) +
				(juminno.charAt(1) * 3) +
				(juminno.charAt(2) * 4) +
				(juminno.charAt(3) * 5) +
				(juminno.charAt(4) * 6) +
				(juminno.charAt(5) * 7) +
				(juminno.charAt(6) * 8) +
				(juminno.charAt(7) * 9) +
				(juminno.charAt(8) * 2) +
				(juminno.charAt(9) * 3) +
				(juminno.charAt(10) * 4) +
				(juminno.charAt(11) * 5);
		sum_2 = sum_1 % 11;

		if (sum_2 == 0)
			at = 10;
		else {
			if (sum_2 == 1)
				at = 11;
			else
				at = sum_2;
		}
		att = 11 - at;

		if (juminno.charAt(12) != att ||
			juminno.substr(2, 2) < '01' ||
			juminno.substr(2, 2) > '12' ||
			juminno.substr(4, 2) < '01' ||
			juminno.substr(4, 2) > '31' ||
			juminno.charAt(6) > 4) {
			alert("올바른 주민등록번호가 아닙니다.");
			$(val1).focus();
			test = false;
			return false;
		}
	}

	return true;

}

function cutStr(str,limit){  
	var tmpStr = str;  
	var byte_count = 0;  
	var len = str.length;  
	var dot = "";  
	for(i=0; i<len; i++){  
	  byte_count += chr_byte(str.charAt(i));   
	  if(byte_count == limit-1){  
		 if(chr_byte(str.charAt(i+1)) == 2){  
			tmpStr = str.substring(0,i+1);  
			dot = "...";  
		 } else {  
			if(i+2 != len) dot = "...";  
			tmpStr = str.substring(0,i+2);  
		 }  
		 break;  
	  } else if(byte_count == limit){  
		 if(i+1 != len) dot = "...";  
		 tmpStr = str.substring(0,i+1);  
		 break;  
	  }  
	}  
	return tmpStr+dot;  
//	return true;  
}  
  
function chr_byte(chr){  
   if(escape(chr).length > 4)  
      return 2;  
   else  
      return 1;  
}  

function isValidDate(dateStr) {
   var year = Number(dateStr.substr(0,4));  
   var month = Number(dateStr.substr(4,2));
   var day = Number(dateStr.substr(6,2));
 
   if (month < 1 || month > 12) return false;
   if (day < 1 || day > 31) return false;
   if ((month==4 || month==6 || month==9 || month==11) && day==31) return false

   if (month == 2) { // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) return false;
   }

   return true;
} 


function fnrrnCheck(rrn) // 주민등록번호유효성검사.  
{  
    var sum = 0;  
    if (rrn.length != 13) {  
        return false;  
    }  
    else if (rrn.substr(6, 1) != 1 && rrn.substr(6, 1) != 2 && rrn.substr(6, 1) != 3 && rrn.substr(6, 1) != 4) {  
        return false;  
    }  

    for (var i = 0; i < 12; i++) {  
        sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);  
    }  

    if (((11 - (sum % 11)) % 10) == Number(rrn.substr(12, 1))) {  
        return true;  
    }  
    return false;  
}  

function fnfgnCheck(rrn) // 외국인등록번호유효성검사.  
{  
    var sum = 0;  

    if (rrn.length != 13) {  
        return false;  
    }  
    else if (rrn.substr(6, 1) != 5 && rrn.substr(6, 1) != 6 && rrn.substr(6, 1) != 7 && rrn.substr(6, 1) != 8) {  
        return false;  
    }  

    if (Number(rrn.substr(7, 2)) % 2 != 0) {  
        return false;  
    }  

    for (var i = 0; i < 12; i++) {  
        sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);  
    }  

    if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(rrn.substr(12, 1))) {  
        return true;  
    }  

    return false;  
} 

function calcByte(str){	//문자길이체크 : 영문(1자), 국문(2자)
	var totCnt = 0;
	var tmpStr = new String(str);
	var strLength = tmpStr.length;
	var oneChar;
	
	for(var i=0 ; i<strLength; i++){
		oneChar = tmpStr.charAt(i);
		if (escape(oneChar).length > 4){
			totCnt += 2;
		}else{
			totCnt += 1;
		}
	}
	return totCnt;
}




/**
 * 이메일 형식을 확인한다.
 *
 */ 
function chkEmail(obj){
	 $re=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;                 
	 if($(obj).val()=='' || $(obj).val().length<6 || !$re.test($(obj).val())) {                    
		 return false;              
	} else {                    
		return true;                
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : 	: strValue				(문자열)
//결    과	: Boolean
//목    적 : 이메일주소 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : if ( uf_isEmail( form.email.value ) == false ) alert("잘못된 형식의 이메일");
//주의사항 : 
//			  1. 아이디부분 = 영문+숫자만+언더바+하이픈 허용 / 최소 3자리 이상 최대 15자리 까지 허용 {3,15}
//** ---------------------------------------------------------------------------
function uf_isEmail(strValue)
{
	//대채가능패턴모음
	//var pattern		= /[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*/;
	//var pattern		= /^([A-Za-z0-9_-]{4,15})(@{1})([A-Za-z0-9_-]{1,15})(.{1})([A-Za-z0-9]{2,10})(.{1}[A-Za-z]{2,10})?(.{1}[A-Za-z]{2,10})?$/;
	//var pattern		= /(^[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9\-]+[a-zA-Z0-9]+\.[a-zA-Z]+$)/;
	//var pattern		= /^(\w+)@(\w+)[.](\w+)[.](\w+)$/;
	//var pattern		= /^(\w+(?:\.\w+)*)@((?:\w+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	//var pattern		= /^([A-Za-z0-9]{4,15})(@{1})([A-Za-z0-9_-]{1,15})(.{1})([A-Za-z0-9]{2,4})(.{1}[A-Za-z]{2,4})?(.{1}[A-Za-z]{2,4})?$/;

	var pattern;

	var pattern			= /^([A-Za-z0-9_-]{3,15})(@{1})([A-Za-z0-9_-]{1,15})(.{1})([A-Za-z0-9]{2,10})(.{1}[A-Za-z]{2,10})?(.{1}[A-Za-z]{2,10})?$/;

	if ( (strValue.length == 0) || (!pattern.test(strValue)) )
	{
		return false;
	}

	return true;
}


function isValid_email( str )
{
     /* check whether input value is included space or not  */
     if(str == ""){
     	//alert("이메일 주소를 입력해 주세요.");
     	return false;
     }
     var retVal = checkSpace( str );
     if( retVal ) {
         //alert("이메일주소를 정확하게 입력해 주세요..");
         return false;
     }

     if( -1 == str.indexOf('.') ) {
     	//alert("이메일 주소를 정확하게 입력해 주세요.");
        return false;
     }

     /* checkFormat */
     var isEmail = /[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*/;
     if( !isEmail.test(str) ) {
         //alert("이메일 주소를 정확하게 입력해 주세요.");
         return false;
     }
     return true;
}


/**
 * 전화번호를 Mask 처리한다.
 *
 */ 
function telMask(oldtel){
	var tel = oldtel;
	if(tel == "") return tel;

	tel = removeNumberMask(tel);

	var DDD1 		= new Array("02");
	var DDD2 		= new Array("010","011","017","016","018","019"
													,"031","032","033"
													,"041","042","043"
													,"061","062","063","064"
													,"051","052","053","054","055"
													,"060","070","080"
													);
	var DDD3 		= new Array("0505","0130");												
	var DDD4 		= new Array("1588","1577","1544","1566","1644","1688","1599","1666"
													);
	
	var lstrThrNo 	= "";
	var lstrSecNo 	= "";

	if(tel.length < 7) return oldtel;

	lstrThrNo = tel.substring(tel.length -4);
	lstrSecNo = tel.substring(0,tel.length -4);

	//두자리 지역번호
	for(var i=0;i<DDD1.length;i++)
	{
		if(lstrSecNo.substring(0,2) == DDD1[i])
		{
			if(lstrSecNo.substring(2,lstrSecNo.length).length < 3 || lstrSecNo.substring(2,lstrSecNo.length).length > 4)
				return oldtel;
			else
				return DDD1[i] + "-" + lstrSecNo.substring(2,lstrSecNo.length) + "-" + lstrThrNo;
			break;
		}
	}
	
	//세자리 지역번호, 핸드폰
	for(var i=0;i<DDD2.length;i++)
	{
		if(lstrSecNo.substring(0,3) == DDD2[i])
		{
			if(lstrSecNo.substring(3,lstrSecNo.length).length < 3 || lstrSecNo.substring(3,lstrSecNo.length).length > 4)
				return oldtel;
			else			
				return DDD2[i] + "-" + lstrSecNo.substring(3,lstrSecNo.length) + "-" + lstrThrNo;
			break;
		}
	}
	
	//네자리 지역번호, 파워텔
	for(var i=0;i<DDD3.length;i++)
	{
		if(lstrSecNo.substring(0,4) == DDD3[i])
		{
			if(lstrSecNo.substring(4,lstrSecNo.length).length < 3 || lstrSecNo.substring(4,lstrSecNo.length).length > 4)
				return oldtel;
			else					
				return DDD3[i] + "-" + lstrSecNo.substring(4,lstrSecNo.length) + "-" + lstrThrNo;
			break;
		}
	}
	
	//대표번호
	if(lstrSecNo.length == 4)
	{
		for(var i=0;i<DDD4.length;i++)
		{
			if(lstrSecNo == DDD4[i])
			{				
				return DDD4[i] + "-" + lstrThrNo;
				break;
			}
		}
	}
	return oldtel;	
}


/**
 * 숫자외의 모든 문자를 제거한다.
 *
 */ 
function removeNumberMask(str){	
		var val = "";
		str = "" + str;
		if (str == null || str == "") return val;
		for (var i = 0; i < str.length; i++)
		{
			// 음수일 경우도 가져온다. 소수점도 포함
			if (isOnlyNumberic(str.charAt(i)) || (i == 0 && str.charAt(i) == "-") || str.charAt(i) == ".")
			{
				val += str.charAt(i);
			}
		}
		return val;	
}


/**
 * 숫자외의 모든 문자를 제거한다.
 *
 */ 
function removeMask(str){	
		var val = "";
		str = "" + str;
		if (str == null || str == "") return val;
		for (var i = 0; i < str.length; i++)
		{
			if (isOnlyNumberic(str.charAt(i)) )
			{
				val += str.charAt(i);
			}
		}
		return val;	
}


/**
 * 숫자만 있는지를 검색한다.
 *
 */ 
function isOnlyNumberic(string)
{
	var regExp 	= /[^\d]/i;
	var isVaild	= !(regExp.test(string));

	return isVaild;
}

//space 가 있으면 true, 없으면 false
function checkSpace( str )
{
     if(str.search(/\s/) != -1){
     	return true;
     } else {
        return false;
     }
}


/* 
제목 : 한글, 영어, 숫자만 입력 되도록 되는 스크립트(FF, IE) 
사용 예 
<input type="text" id='t1' value='한글만 입력' onfocus="this.value='';" onkeydown="return is_val('han',event);"/> 
<input type="text" id='t2' value='영어만 입력' style="ime-mode:disabled;" onfocus="this.value='';"  onkeydown="return is_val('eng',event);"/> 
<input type="text" id='t3' value='숫자만 입력' style="ime-mode:disabled;" onfocus="this.value='';"  onkeydown="return is_val('no',event);"/> 
<input type="text" id='t4' value='영어와 숫자만 입력' style="ime-mode:disabled;" onfocus="this.value='';" onkeydown="return is_val('engNo',event,this);"/> 
**style="ime-mode:disabled;" 를 입력하는 이유는 FF에서는 키를 누를 때 한글을 이벤트로 인식하지 못한다고 한다. 이를 방지하기 위함. 
*/ 
function fnSetInputKey() {
	$('.v-inputEng, .v-inputNum, .v-inputHan, .v-inputEngNum, .v-inputEmail').each(function(i, o) {
        var val = $(o).val();
        var classNames = $(o).attr('class');


        //var objName = typeof ($(o).attr('title')) != "undefined" ? $(o).attr('title') : "";
        
        if (/v-inputEng/.test(classNames)) { // 입력 값 체크 영문만
           $(o).live("keydown", function(event) {
        	   fnInputKeyEng(event, o);
           });
        }


        if (/v-inputNum/.test(classNames)) { // 입력 값 체크 숫자만
            $(o).live("keydown", function(event) {
         	   fnInputKeyNum(event, o);
            });
         }

        if (/v-inputHan/.test(classNames)) { // 입력 값 체크 한글만
            $(o).live("keydown", function(event) {
         	   fnInputKeyHan(event, o);
            });
         }

        if (/v-inputEngNum/.test(classNames)) { // 입력 값 체크 영문, 숫자만
            $(o).live("keydown", function(event) {
         	   fnInputKeyEngNum(event, o);
            });
         }
        
        if (/v-inputEmail/.test(classNames)) { // 입력 값 체크 영문,숫자,.(이메일)
            $(o).live("keydown", function(event) {
            	fnInputKeyEmail(event, o);
            });
         }
        
	});
}

function fnGetEvent(e) { 
//	 alert(e.key);
//	var keyCode = ('which' in event) ? e.which : e.keyCode;
//	 return keyCode;

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
}

function fnSetKeyClear(e) { 
	if (navigator.appName == 'Netscape') { 
		keyVal = e.which; //Netscape, CHROME 
	} else if (navigator.appName == 'Microsoft Internet Explorer'){ 
		keyVal = e.keyCode ; //MS 
	} 
	else{ 
		keyVal = e.which ; //OPERA 
	} 
	return keyVal; 
} 

// key 값 체크 하는 함수 type : han,eng,no 는 각각 한글 영어 숫자만을 입력받게 함 
// 허락하는 것은 backspace 8, tab 9, enter 13, shift 16, Ctrl 17, alt 18, home 36, end 35, up~down 37,38,39,40, 
//	delete 46, space 32 , F1~F12 112~123
//  한/영 전환키는 강제로 999로 매핑함
// http://protocolsofmatrix.blogspot.com/2007/09/javascript-keycode-reference-table-for.html 참조 
var gsKey= new Array(); 
gsKey= [8,9,13,16, 17, 18, 20,35,36,37,38,39,40,46, 112,113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 999]; 


/*
 * 입력 key중 
 * */
function fnInputKeyEng(/*keyEvent*/ e, /*input object*/ obj) {
	var keyVal=fnGetEvent(e); 
	for (var i=0; i<gsKey.length; i++) { 
		if( keyVal == gsKey[i]) return true; 
	} 
	if( 65 <= keyVal && keyVal <=90) return true; 
	else {
		event.KeyCode=0;
		event.cancelBubble=true;
		event.returnValue=false;
		alert("영문만 입력 가능합니다.");
		return false; 
	}

}

function fnInputKeyNum(/*keyEvent*/ e, /*input object*/ obj) {
	var keyVal=fnGetEvent(e); 
	for (var i=0; i<gsKey.length; i++) { 
		if( keyVal == gsKey[i]) return true; 
	} 
	if( (48 <= keyVal && keyVal <=57 && !e.shiftKey) || ( 96<=keyVal && keyVal <=105 ) ) return true; 
	else {
		event.KeyCode=0;
		event.cancelBubble=true;
		event.returnValue=false;
		alert("숫자만 입력 가능합니다.");
		return false; 
	}
}

function fnInputKeyHan(/*keyEvent*/ e, /*input object*/ obj) {
	/*	
	
	var keyVal=fnGetEvent(e); 
	for (var i=0; i<gsKey.length; i++) { 
		if( keyVal == gsKey[i]) return true; 
	} 
	
	var pattern;

	var oldVal		= $(obj).val();
	pattern = 	/[(ㄱ-ㅎ|ㅏ-ㅣ|가-힣)]g/;
	var newVal = oldVal.replace(pattern, ''); 
	var nnVal = pattern.exec($(obj).val());
	//$(obj).val().exec(, '');
	obj.value = newVal;
	
	//if(typeof(pattern.exec(oldVal).length) == 'undefine') return false;
	//$(obj).val(oldVal.replaceAll(/[^(ㄱ-ㅎ|ㅏ-ㅣ|가-힣)]/g,''));   
	//$(obj).val(pattern.replace(oldVal, ''));     
	//re			= /[^0-9]/gi;
//alert(pattern.exec(val));
	//alert(pattern.exec(oldVal));
	return;
	$(obj).val(pattern.exec(oldVal));     
	//alert($(obj).val()+"/"+val);
	return false;
	
     //alert ("The Unicode key code is: " + keyCode);
*/
     
	var keyVal=fnGetEvent(e); 
	for (var i=0; i<gsKey.length; i++) { 
		if( keyVal == gsKey[i]) return true; 
	} 
	if( keyVal==229 || keyVal==197) return true; 
	else {

		event.KeyCode=0;
		event.cancelBubble=true;
		event.returnValue=false;
		alert("한글만 입력 가능합니다.");
		return false; 
	}

}

function fnInputKeyEngNum(/*keyEvent*/ e, /*input object*/ obj) {
	var keyVal=fnGetEvent(e); 
	for (var i=0; i<gsKey.length; i++) { 
		if( keyVal == gsKey[i]) return true; 
	}
	if( 65 <= keyVal && keyVal <=90) return true; 
	else if( (48 <= keyVal && keyVal <=57 && !e.shiftKey) || ( 96<=keyVal && keyVal <=105 ) ) return true; 
	else {
		event.KeyCode=0;
		event.cancelBubble=true;
		event.returnValue=false;
		alert("숫자 또는 영문만 입력 가능합니다.");
		return false; 
	}

}

function fnInputKeyEmail(/*keyEvent*/ e, /*input object*/ obj) {
/*	
	var pattern = /[^(A-Za-z0-9.)]g/;
	//re			= /[^0-9]/gi;

	$(obj).val($(obj).val().replace(pattern, ''));     
	
	return;	
*/
	var keyVal=fnGetEvent(e); 
	for (var i=0; i<gsKey.length; i++) { 
		if( keyVal == gsKey[i]) return true; 
	}

	if( 65 <= keyVal && keyVal <=90) return true; 
	else if( (48 <= keyVal && keyVal <=57 && !e.shiftKey) || ( 96<=keyVal && keyVal <=105 ) ) return true; 
	else if( keyVal == 190 ) return true; 
	else if( keyVal == 189 ) return true; 
	else {

		event.KeyCode=0;
		event.cancelBubble=true;
		event.returnValue=false;
		alert("숫자 또는 영문만 입력 가능합니다.");
		return false; 
	}
}
