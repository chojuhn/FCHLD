//*******************************************************************************************
// Formatter function
//*******************************************************************************************

/**
 * jqGrid용 전화번호 정규식 포매팅. 032-1234-1234 or 032-123-1234 형태로 보여진다.
 *
 * @param {String} cellvalue : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} cellvalue : 셀 수정값
 *
 * @constructor jysong 2013.10.16
 **/
function fnComFormatGridPhone( cellvalue, options, rowObject ){
   if( cellvalue == null ) return "";
   if( ((cellvalue+"").replace(/-/g, '')).match("^<") ) return cellvalue;
   cellvalue = cellvalue.replace(/-/g, '');
   return cellvalue = $.trim(cellvalue).replace(/(^02|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
}

/**
 * 전화번호 정규식 포매팅. 032-1234-1234 or 032-123-1234 형태로 보여진다.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor jysong 2013.10.16
 **/
function fnComFormatPhone( value ){
   if( value == null ) return "";
   return value = $.trim(value).replace(/(^02|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
}

/**
 * 우편번호 정규식 포매팅.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor 조준희 2013.10.31
 **/
function fnComFormatZipCd( value ){
   if( value == null ) return "";
   if( ((value+"").replace(/-/g, '')).match("^<") ) return value;
   value = value.replace(/-/g, '');
   return value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
}

/**
 * 주민번호 정규식 포매팅.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor jysong 2013.11.12
 **/
function fnComFormatJuminNum( value ){
    if( value == null ) return "";
    if( ((value+"").replace(/-/g, '')).match("^<") ) return value;
    value = value.replace(/-/g, '');
    return value = value.replace(/(\d{6})(\d{7})/, '$1-$2');
}

/**
 * 사업자번호 정규식 포매팅.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor jysong 2013.11.15
 **/
function fnComFormatBizNum( value ){
    if( value == null ) return "";
    if( ((value+"").replace(/-/g, '')).match("^<") ) return value;
    value = value.replace(/-/g, '');
    return value = value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
}

/**
 * jqGrid용 날짜시간(Dtime:YYYYMMDDHH24MISS) 포매팅.
 *
 * @param {String} value : 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} value : 수정값
 *
 * @constructor 이윤기 2013.09.17, 수정 jysong 2014.01.15
 **/
function fnComFormatGridDTime( cellvalue, options, rowObject ) {
    if( cellvalue == null ) return "";
    if( ((cellvalue+"").replace(/-/g, '')).match("^<") ) return cellvalue;
    cellvalue = cellvalue.replace(/-/g, '');
    cellvalue = $.trim(cellvalue).substr(0,14);
    return cellvalue.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
}

/**
 * 날자시간(Dtime:YYYYMMDDHH24MISS) 포매팅.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor 이윤기 2013.09.17, 수정 jysong 2014.01.15
 **/
function fnComFormatDTime( value ) {
    if( value == null ) return "";
    value = $.trim(value).substr(0,14);
    return value.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
}

/**
 * jqGrid용 날자(Date:YYYYMMDD) 포매팅. YYYY-MM-DD 형태로 보여진다.
 *
 * @param {String} cellvalue : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} cellvalue : 셀 수정값
 *
 * @constructor 이규한 2013.10.17
 **/
function fnComFormatGridDate( cellvalue, options, rowObject ) {
    if( cellvalue == null ) return "";
    if( ((cellvalue+"").replace(/-/g, '')).match("^<") ) return cellvalue;
    cellvalue = cellvalue.replace(/-/g, '');
    cellvalue = cellvalue.substr(0,8);
    return cellvalue.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

/**
 * <pre>
 * jqGrid용 날자(Date:YYYYMM) 포매팅.
 * 6자리 이상의 데이터가 들어와도 6자리로 끊어서 YYYY-MM형태로 보여진다.
 * </pre>
 *
 * @param {String} cellvalue : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} cellvalue : 셀 수정값
 *
 * @constructor jysong 2013.11.12
 **/
function fnComFormatGridDateYYYYMM( cellvalue, options, rowObject ) {
    if( cellvalue == null ) return "";
    if( ((cellvalue+"").replace(/-/g, '')).match("^<") ) return cellvalue;
    cellvalue = cellvalue.replace(/-/g, '');
    cellvalue = cellvalue.substr(0,6);
    return cellvalue.replace(/(\d{4})(\d{2})/, '$1-$2');
}

/**
 * jqGrid용 타임(Date:HHMMSS) 포매팅.
 *
 * @param {String} cellvalue : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} cellvalue : 셀 수정값
 *
 * @constructor 이규한 2013.10.17
 **/
function fnComFormatGridTime( cellvalue, options, rowObject ) {
    if( cellvalue == null ) return "";
    if( ((cellvalue+"").replace(/:/g, '')).match("^<") ) return cellvalue;
    return cellvalue.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
}

/**
 * 날자(Date:YYYYMMDD) 포매팅. YYYY-MM-DD 형태로 보여진다
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor 이윤기 2013.09.30
 **/
function fnComFormatDate( value ) {
    if( value == null ) return "";
    return value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

/**
 * 날자(Date:YYYYMM) 포매팅. 6자리 이상의 데이터가 들어와도 6자리로 끊어서 YYYY-MM형태로 보여진다.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor jysong 2013.12.03
 **/
function fnComFormatDateYYYYMM( value ) {
    if( value == null ) return "";
    value = value.replace(/-/g, '');
    value = value.substr(0,6);
    return value.replace(/(\d{4})(\d{2})/, '$1-$2');
}

/**
 * 타임(Date:HHMMSS) 포매팅.
 *
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor jysong 2013.12.03
 **/
function fnComFormatTime( value ) {
    if( value == null ) return "";
    return value.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
}

/**
 * jqGrid용 숫자 포매팅(세자리마다 콤마).
 *
 * @param {String} cellvalue : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} cellvalue : 셀 수정값
 *
 * @constructor 이윤기 2013.09.17
 **/
function fnComFormatGridNumber( cellvalue, options, rowObject ) {
    if( cellvalue == null ) return "";
    if( ((cellvalue+"").replace(/,/g, '')).match("^<") ) return cellvalue;
    var ret = $.number(cellvalue, KSCC_MAX_FRACTIONAL_DIGIT_CNT);
    ret = ret.replace(/(\.[0-9]*[1-9]{1})[0]+$/, '$1').replace(/\.[0]+$/, '');
    return ret;
}

/**
 * 입력된 문자열이 숫자인지 판단
 *
 * @param {String} str : 입력값
 * @return {Boolean} true / false
 *
 * @constructor jysong 2013.10.30
 **/
function fnComIsNumber(str) {
    str += '';
    str = str.replace(/(^\s*|\s*$)/g, ''); // 좌우 공백 제거 정규식
    if (str == '' || isNaN(str)) return false;
    return true;
}

/**
 * 입력된 문자열이 영문자인지 판단
 *
 * @param {String} value : 입력값
 * @return {String} value : 판단결과(없으면 null)
 *
 * @constructor 이윤기 2013.11.19
 **/
function fnComIsAlphabet( value ) {
    if( ! value ) return false;
    var regEexp = RegExpUtil.getAlphabet();
    return value.match(regEexp);
}

/**
 * 입력된 문자열이 영문자+숫자인지 판단
 *
 * @param {String} value : 입력값
 * @return {String} value : 판단결과(없으면 null)
 *
 * @constructor 이윤기 2013.11.19
 **/
function fnComIsAlphaNumeric( value ) {
    if( ! value ) return false;
    var regEexp = RegExpUtil.getAlphaNumeric();
    return value.match(regEexp);
}

/**
 * 숫자 포매팅(세자리마다 콤마).
 *
 * @param {String} value : [필수] 처리할 문자열
 * @param {Integer} fracPrec : [선택] 소수점 이하 자리수. 기본값은 0.
 * @param {Boolean} boolRemoveZero : [선택] 소수점 이하 0 제거 여부. 기본값은 true(제거)
 * @return {String} value : 수정값
 * @example
 * var strFormat = fnComFormatNumber("224521"); // 결과 : 224,521
 * var strRate   = fnComFormatNumber("2174.5", 2, false); // 결과 : 2,174.50
 * @constructor 이윤기 2013.09.27
 **/
function fnComFormatNumber( value, fracPrec, boolRemoveZero ) {
    if( ! fracPrec ) fracPrec = 0;
    if( boolRemoveZero == null ) boolRemoveZero = true;
    value = (""+value).replace(/,/g, '').replace(/(^0+)([0-9]+$|[0-9]+\.[0-9]+)/, "$2"); // 왼쪽 0 제거
    var ret = $.number(value, fracPrec);
    if( boolRemoveZero == true || boolRemoveZero == "true" ) {
        ret = ret.replace(/(\.[0-9]*[1-9]{1})[0]+$/, '$1').replace(/\.[0]+$/, ''); // 오른쪽 0 제거
    }
    return ret;
}

/**
 * 카드번호 포매팅.
 *
 * @param {String} value : 입력값
 * @param {String} format : 포멧
 * @return {String} value : 수정값
 *
 * @constructor 이윤기 2013.10.30
 **/
function fnComFormatCard( value, format ) {
    if( value == null ) return "";
    var result = "";
    var len = value.length;
    if( ! format ) {
        format = "4444";
        if( len == 15 ) format = "4443";
    }

    for( var idx = 0; idx < format.length; idx++ ) {
        var partLen = parseInt(format.charAt(idx));
        if( isNaN(partLen) ) {
            alert(fnComGetMessage("M012"));
            return;
        }
        if( value.length > 0 ) {
            result += ( idx > 0 ? "-" : "") + value.substr(0, partLen);
            value = value.substr(partLen);
        }
    }
    return result + value;
}
/**
 * jqGrid용 카드번호 포매팅.
 *
 * @param {String} value : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} value : 셀 수정값
 *
 * @constructor 이윤기 2013.10.30
 **/
function fnComFormatGridCard( cellvalue, options, rowObject ) {
    return fnComFormatCard( cellvalue );
}

/**
 * jqGrid용 코드그룹 값 치환.
 *
 * <pre>
 * colModel의 jsonmap이나 name이 코드그룹이라고 가정하여, 유효값을 가지고 출력용 메시지를 찾아 치환한다.
 * </pre>
 *
 * @param {String} value : 셀 입력값
 * @param {Object} options : 그리드에서 보내는 옵션 오브젝트
 * @param {Object} rowObject : 그리드에서 보내는 로우 오브젝트
 * @return {String} value : 코드 매핑 메시지
 * @example
 * {name:"useYnNm", index:"USE_YN", jsonmap:"useYn", formatter:fnComFormatGridCode }
 * 이와 같이 colModel이 세팅되어 있고, 서버에서 "Y" 값이 조회되면, 코드그룹이 useYn이라고 판단하여 화면상에 "사용"을 출력
 * @constructor 이윤기 2013.09.17
 **/
function fnComFormatGridCode( cellvalue, options, rowObject ) {
    if( cellvalue == null ) return "";
    var type = options.colModel["jsonmap"] || options.colModel["name"];
    return fnComGetCodeMsg( type, cellvalue );
}

/**
 * jqGrid 코드그룹 값 치환을 위한 메시지 내용 리턴
 *
 * @param {String} codeGroup : 코드그룹
 * @param {String} value : 입력값
 * @return {String} resultMsg : 결과 메시지
 *
 * @constructor 이윤기 2013.09.17
 **/
function fnComGetCodeMsg( codeGroup, value ) {
    if( codeGroup == null || codeGroup.length == 0 ) return value;
    var msgMap = KSCC_CODE_MSG[codeGroup];
    var resultMsg = value;
    if( msgMap && msgMap[value] ) resultMsg = msgMap[value];
    return resultMsg;
}

/**
 * format 값에 따라 value 내에 있는 콤마, 하이픈 등을 제거한다.
 *
 * @param {String} format : 포멧
 * @param {String} value : 입력값
 * @return {String} value : 수정값
 *
 * @constructor 이윤기 2013.10.08
 **/
function fnComRemovePattern( format, value ) {
    if( ! format || ! value ) return value;
    value = ""+ value;
    if( format.match("^number") || format.match("^rate") ) {
        value = value.replace(/,/g, '');
    }
    else if( format.match("^date") || format.match("^phone") || format.match("^card") || format.match("^zip") || format.match("^jumin") || format.match("^biz") ) {
        value = value.replace(/-/g, '');
    }
    return value;
}

/**
 * input에 있는 문자열이 정해진 format에 맞는지 확인하고 결과 alert를 보낸다.
 *
 * @param {String} format : 입력포멧
 * @return {void}
 * @example
 * var format = "#";
 * $("#ID").fnComReadChkFmt(format);
 * format 에 들어갈 수 있는 값
 * 1) # : 문자 혹은 숫자
 * 2) h : 한글
 * 3) H : 한글(공백포함)
 * 4) A : 문자
 * 5) Z : 문자(공백포함)
 * 6) 0 : 숫자
 * 7) 9 : 숫자(공백포함)
 *
 * @constructor jysong 2013.10.29
 **/
$.fn.fnComReadChkFmt = function (format) {
    this.keyup(
        function(){
            var my_object = new dui.wv.type.formatValidator();
            my_object.initialize(format);
            var checkValue;
            var value = $(this).val();
            for( var i=0; i<value.length; i++){
                checkValue = my_object.validate(value[i]);
                if( !checkValue ){
                    alert(my_object.message); // 자체 메시지처리
                    $(this).val(""); // 전부날린다.
                    return;
                }
            }
        }
    );
};
