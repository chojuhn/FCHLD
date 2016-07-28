//*******************************************************************************************
// Constant
//*******************************************************************************************

/*** 데이터 상태 flag ***/
var KSCC_DATA_STAT_READ   = "R"; // 조회
var KSCC_DATA_STAT_ADD    = "C"; // 신규
var KSCC_DATA_STAT_UPDATE = "U"; // 수정
var KSCC_DATA_STAT_DELETE = "D"; // 삭제

/*** 공통 Map 키 ***/
var KSCC_MAPKEY_SCR_NAME        = "_kscc_scr_name"; // 화면명
var KSCC_MAPKEY_DATA            = "_kscc_data"; // 데이터
var KSCC_MAPKEY_CALLBACK_FUNC   = "_kscc_cb_func"; // 콜백함수명. head.jspf와 일치시켜야 함.
var KSCC_MAPKEY_CALLBACK_STRING = "_kscc_cb_string"; // 부모창에서 팝업에 넘겨줄 문자. 콜백시 되돌려준다. head.jspf와 일치시켜야 함.
var KSCC_RES_KEY_RESULT         = "ksccResultType";
var KSCC_RES_KEY_MSG            = "ksccMsg";
var KSCC_TOKEN_KEY              = "token";
var KSCC_RES_KEY_ERR_ST         = "ksccErrorSt";
var KSCC_RES_KEY_RESULT_SUCCESS = "S"; // 성공
var KSCC_RES_KEY_RESULT_ERROR   = "E"; // 오류

/*** Custom Event ***/
var KSCC_EVENT_DATE_PICKER = "ksccEvDatePicker"; // datePicker 값이 변경되거나 blur이벤트가 발생

/*** 메타에 정의되지 않은 코드에 대한 메시지 선언 ***/
var KSCC_CODE_MSG = {
    "useYn" : { "Y" : "사용", "N" : "미사용" }
};

// rate 형 숫자의 소수점 이하 자리수. 형변환시 기본값으로 사용
var KSCC_MAX_FRACTIONAL_DIGIT_CNT = 10;

// 그리드가 이미 시작된 것인지 확인하는 boolean
var isPopulated = false;

/*** jqgrid관련 ***/
var gridProp = [];
var sIcon = [];

/*** unload이벤트 관련 ***/
var orgTagValue = [];
var orgEachTagValue = [];

// 공통 메시지
var KSCC_MESSAGE_DATA = {
    M001:"날짜가 잘못 입력되었습니다.\n다시 입력해주세요.",
    M002:"최대 @자리수만큼 입력 가능합니다.\n(한글은 한자에 2자리수)",
    M003:"팝업을 해제해 주세요.",
    M004:"오즈 보고서 버튼에 정의된 인자 형식을 확인하세요!",
    M005:"데이터를 검색하십시오.",
    M006:"조회결과가 없습니다.",
    M007:"그리드ID나 table ID를 입력해 주십시오.",
    M008:"다운로드 버튼의 A 태그 ID를 입력해 주십시오.",
    M009:"서버 URL을 입력해 주십시오.",
    M010:"다운로드 버튼의 A태그 ID가 잘못 입력되었습니다.",
    M011:"먼저 데이터를 검색한 다음에 다운로드 버튼을 눌러주세요.",
    M012:"카드 포멧의 길이 인자가 잘못 입력되었습니다. 숫자만 입력 가능합니다.",
    M013:"콜백 함수 이름은 문자열로 넣어주십시오.",
    M014:"시스템 오류가 발생하였습니다.",
    M015:"시스템 오류가 발생하였습니다.\n\n@",
    M016:"로그인 정보가 존재하지 않습니다",
    M017:"파일 다운로드에 실패했습니다.",
    M018:"먼저 데이터를 검색한 다음에 다운로드 버튼을 눌러주세요.",
    M019:"@ 항목을 찾지 못함.",
    M020:"@ 태그를 찾지 못했습니다.",
    M021:"데이터 양이 많아 시간이 오래 걸릴 수 있습니다. 그래도 다운로드 하시겠습니까?",
    M022:"수정된 정보가 있습니다.\n페이지에서 나가시겠습니까?",
    M023:"데이터 건 수가 많아 엑셀로 다운로드 할 수 없습니다.\n조회 조건을 수정하여 @ 건 미만으로 줄인 후 다시 다운로드 해 주십시오.",
    M024:"웹 페이지 메시지"
};

/*******************************************************************************************
 * on Load 이벤트 처리자
 * 작성자 : jysong 2013.09.30
 *******************************************************************************************/

$(document).ready(function() {
    // datepicker 기본설정
    fnComDatePickerSetDefaults();
    // format 속성을 가진 input에 대해 패턴 처리
//    fnComSetPattern();
//    // format 속성을 가진 input에 대해 패턴 및 바인드 처리
//    fnComBindPattern();
//    // format 속성을 가진 td,th에 대해 패턴 처리
//    fnComFormat();
//    // 필수 항목 표시
//    fnComMarkRequired();
//    // 특정 class를 가진 input에 대해 입력키 관련 이벤트 처리자 지정
//    fnComAttachKeyEventHandler();
//    // 데브온 텝 대체
//    fnComInitTab();
//    // 테이블 hover시 Lhover 클래스 부여
//    fnComInitTable();
//    // 리스트 hover시 Lhover 클래스 부여
//    fnComInitList();
//    // 아이콘 호버 시 말풍선 지시문 나타내기
//    fnComCommentMouseover();
//    // select option 시/분/초 value 지정
//    fnComSelectTimeOption();
//    // 특정클래스에서 언로드 이벤트 입히기
//    fnComUnloadEvent();
//    // 세이메시지(서버에서 전달해준 메시지 값 처리. 원래는 쿠키와 함께 화면에 전달해주나, 쿠키 문제로 삭제)
//    fnComSaymessage();
});

/**
 * devonframework.front.taglib.saymessage(LSayMessage)
 **/
function fnComSaymessage() {
    if ($("#saymessage").length > 0) {
        var tagName = $("#saymessage")[0].tagName.toUpperCase();
        if( $("#saymessage").css("display") == "none" && tagName == "SPAN") {
            var msg = $("#saymessage").html().replace(/^\s*/ ,"").replace(/\s*$/ ,"");
            if (StringUtil.isNotNull(msg)) {
                window.setTimeout("alert(\""+ msg + "\")" , 10);
            }
        }
    }
}

/**
 * 공통 메시지 가져오기
 *
 * @param {String} msgId - 메시지ID
 * @param {String} avgs - Replace할 값
 * @return {String} msg - 메시지내용
 *
 * @constructor jysong 2014.03.26
 **/
function fnComGetMessage(msgId, avgs){
    var msg = KSCC_MESSAGE_DATA[msgId];
    if( avgs != undefined ) {
        msg = msg.replace("@",avgs);
    }
    return msg;
}

/**
 * 파일 다운로드 이벤트 핸들러
 *
 * @param {Object} object - 사용할 객체
 * @return {Boolean} true / false
 * @example var boolean = $("#ID").fnComFileDownloadEvent();
 *
 * @constructor jysong 2013.12.26
 **/
$.fn.fnComFileDownloadEvent = function(){
    var showOverflowMsg = $(this).data("showOverflowMsg");
    if( showOverflowMsg == "Y" ) {
        var overflowRowCnt = fnComFormatNumber($(this).data("overflowRowCnt"));
        // [오류] 데이터가 많아 엑셀로 다운로드 받을 수 없음.
        alert(fnComReplaceMsg(fnComGetMessage("M023"), overflowRowCnt));
        return false;
    }
    var showDelayMsg = $(this).data("showDelayMsg");
    if( showDelayMsg == "Y" ) {
        // [확인] 데이터 건 수가 많아 지연될 수 있습니다. 정말 다운 받으시겠습니까?
        if( ! confirm(fnComGetMessage("M021")) ) return false;
    }
    var href = $(this).prop('href');
    $.cookie("fileDownload", "true", { path:"/" });
    if( $.cookie('filedownloadck') != href ){
        $.fileDownload(href, {
            successCallback: function (url) {
                fnComUnblockUI();
            },
            prepareCallback: function (url) {
                fnComBlockUI();
                var expDate = new Date();
                expDate.setTime(expDate.getTime() + (5 * 1000));
                $.cookie("filedownloadck", href, { expires: expDate });
            },
            failCallback: function (responseHtml, url) {
                alert(fnComGetMessage("M017"));
                fnComUnblockUI();
            }
        });
    } else {
        if( $.cookie('filedownloadck') == href ){
            $(this).off("click", "a.ksccFileDownload");
        }
    }
    return false;
};

/**
 * 파일 다운로드 이벤트 핸들러 실행
 * 2013-12-26. jysong
 */
$(document).on("click", "a.ksccFileDownload", $(this).fnComFileDownloadEvent);

/**
 * IE6 CSS 이미지 재요청 버그 대처코드
 */
try {
    document.execCommand("BackgroundImageCache", false, true);
} catch(ignored) {}

/*******************************************************************************************
 * Common Function
 *******************************************************************************************/

/**
 * 아이콘 호버 시 말풍선 지시문 나타내기
 *
 * @return {void}
 * @constructor 디자인팀 2013.10.25
 **/
function fnComCommentMouseover(){
    if( $(".commentMouseover").length > 0 && $(".commentHover").length > 0 ){
        $(".commentMouseover").hover(
             function(){
                $(this).find(".commentHover").removeClass("Lnodisplay");
             }
            ,function(){
                $(this).find(".commentHover").addClass("Lnodisplay");
             }
        );
    }
}

/**
 * select option 시/분/초 value 지정
 *
 * @return {void}
 * @constructor 디자인팀 2013.10.25
 **/
function fnComSelectTimeOption(){
    if( $(".cnt24").length > 0 ){
        for (var i = 0; i < 24; i++ ) {
            if( i < 10 ) i = "0" + i;
            option = $("<option/>").attr("value", i).html(i);
            option.appendTo($(".cnt24"));
        }
    }
    if( $(".cnt60").length > 0 ){
        for (var i = 0; i <= 59; i++ ) {
            if( i < 10 ) i = "0" + i;
            option = $("<option/>").attr("value", i).html(i);
            option.appendTo($(".cnt60"));
        }
    }
}

/**
 * 특정클래스에서 언로드 이벤트 입히기
 *
 * @return {void}
 * @constructor jysong 2013.11.12
 **/
function fnComUnloadEvent(){
    if( $(".LcheckUnload").length > 0 && $(".LcheckUnload").length > 0 ){
        // 언로드 데이터 저장
        $(".LcheckUnload").fnComHanAlphaNumOnlyForUnload();
        // 언로드 이벤트 실행
        fnComUnloadEvt();
        // submit는 통과하도록 이벤트 remove
        /*$("form").on("submit.ksccCommon", function() {
            fnComUnloadEvtRemove();
        });*/
        // a tag는 통과하도록 이벤트 remove
        /*$("a").on("click.ksccCommon", function() {
            fnComUnloadEvtRemove();
        });*/
    }
}

/**
 * 언로드 처리시 기존값과 비교하기 위한 값을 배열에 저장한다.
 *
 * @param {Object} object - 사용할 객체
 * @return {void}
 * @example var boolean = $("#ID").fnComHanAlphaNumOnlyForUnload();
 *
 * @constructor jysong 2013.11.12, 수정 jysong 2014.02.27
 **/
$.fn.fnComHanAlphaNumOnlyForUnload = function(){
    return this.each(function(){
        var tag = $(this);
        var tagName = tag[0].tagName.toUpperCase();
        // 테그 아이디를 구한다
        var tagId = $(this).attr("id");
        // INPUT나 SELECT나 TEXTAREA 테그가 아닐 경우
        if( tagName != "INPUT" && tagName != "SELECT" && tagName != "TEXTAREA" ) {
            // 기존 전역 배열에 같은 폼아이디 정보가 있으면 삭제한다.
            orgTagValue = $.grep(orgTagValue, function (value) {
                return value.tagId != tagId;
            });
            // 전역 배열에 폼아이디 및 데이터 저장
            var vo = fnComSerialize(tagId);
            var orgValue = fnComMakeQueryString(vo);
            orgTagValue.push({
                 tagId : tagId
                ,orgTagValue : orgValue
            });
        } else {
            var orgValue = $(this).val();
            // 기존 전역 배열에 같은 테그아이디 정보가 있으면 삭제한다.
            orgEachTagValue = $.grep(orgEachTagValue, function (value) {
                return value.tagId != tagId;
            });
            // 전역 배열에 테그아이디 및 데이터 저장
            orgEachTagValue.push({
                tagId : tagId
               ,orgTagValue : orgValue
            });
        }
        // 언로드 이벤트 실행
        fnComUnloadEvt();
    });
};

/**
 * 웹브라우져 언로드 이벤트
 *
 * <pre>
 * [자동실행] 웹브라우져 언로드 이벤트. html tag(form의 경우 form 하위의 모든 테그)의
 * class에 LcheckUnload가 있을 경우 적용됨. 주로 textarea등에 키입력 이벤트가 발생하면
 * 웹브라우저를 닫을 때 "수정된 정보가 있으니페이지에서 나가시겠습니까?"는 메시지 출력
 * </pre>
 *
 * @param {String} msg - 입력메시지
 * @return {Boolean, String} - true/false or 출력 메시지
 *
 * @constructor jysong 2013.11.12, 수정 jysong 2014.02.27
 **/
function fnComUnloadEvt(msg) {
    if( msg == undefined ) msg = fnComGetMessage("M022");
    window.onbeforeunload = function(e){
        var check = false;
        $.each(orgTagValue, function(i,value){
            var vo = fnComSerialize(value.tagId);
            var chgValue = fnComMakeQueryString(vo);
            // 같지 않다면
            if( value.orgTagValue != chgValue ){
                check = true;
                return false;
            }
        });
        $.each(orgEachTagValue, function(i,value){
            var chgValue = $("#"+value.tagId).val();
            // 같지 않다면
            if( value.orgTagValue != chgValue ){
                check = true;
                return false;
            }
        });
        if( check ){
            e = e || window.event;
            if(e) {
                e.returnValue = msg;
                $.unblockUI();
            }
            return msg;
        }
    };
}

/**
 * 웹브라우져 언로드 이벤트 삭제
 *
 * <pre>
 * form.submit() 등과 같은 이벤트 발생시 본 함수를 실행시켜 처리한다.
 * (jQuery submit일때는 이미 bind 처리되어있으며, 비동기 업로드시의
 * submit은 다른 로직이라 안해줘도 됨) 페이지에서 나가시겠습니까?"는
 * 메시지를 던지는 언로드 이벤트를 없앤다.
 * </pre>
 *
 * @return {void}
 * @constructor jysong 2014.02.27
 **/
function fnComUnloadEvtRemove() {
    window.onbeforeunload = function(e){};
}

/**
 * 데브온 텝 대체
 *
 * <pre>
 * <li /> 태그에 click 이벤트 핸들러 추가. 탭을 누르면 li a[href]에
 * ID가 세팅된 div를 보여주고 나머지는 숨긴다.
 * </pre>
 *
 * @return {void}
 * @constructor jysong 2013.10.15
 **/
function fnComInitTab() {
    $(".LblockTab li").bind('click', function() {
        if( $(this).hasClass("Ldisable") ) return false;
        var $myAnchor = $(this).find('a');
        var myLink = $myAnchor.attr('href');
        $(this).closest('div').find('li').removeClass('Lcurrent');
        $(this).addClass('Lcurrent');
        $(this).closest('div').find('a[href]').each(function() {
            var href = $(this).attr('href');
            if( href && href.startsWith("#") && href.length > 1 ) {
                if( href != myLink ) {
                    $("#"+ href.substr(1)).hide(0);
                } else {
                    $("#"+ href.substr(1)).show(0);
                }
            }
        });
        fnComUpdateSize();
        return false;
    });
}

/**
 * 테이블 hover시 Lhover 클래스 부여
 *
 * @return {void}
 * @constructor 디자인팀 2013.10.25
 **/
function fnComInitTable() {
    var listTables = document.getElementsByClassName("LblockListTable");
    styleListTable = function(listTableBlock) {
        var table = listTableBlock.getElementsByTagName("table")[0];
        var trArr = table.getElementsByTagName("tr");
        for (var i=0; i<trArr.length; i++) {
            dui.CB.addEventHandler(D$(trArr[i]), "mouseover", function () { this.addClassName("Lhover");}.bind(trArr[i]) );
            dui.CB.addEventHandler(trArr[i], "mouseout", function () { this.removeClassName("Lhover");}.bind(trArr[i]) );
        }
    };
    for (var i=0; i<listTables.length; i++) {
        styleListTable(listTables[i]);
    }
}

/**
 * 리스트 hover시 Lhover 클래스 부여
 *
 * @return {void}
 * @constructor 디자인팀 2013.10.25
 **/
function fnComInitList() {
    var lists = document.getElementsByTagName("ul");
    styleList = function(list) {
        var items = list.getElementsByTagName("li");
        for (var i=0; i<items.length; i++) {
            dui.CB.addEventHandler(D$(items[i]), "mouseover", function () { this.addClassName("Lhover");}.bind(items[i]) );
            dui.CB.addEventHandler(items[i], "mouseout", function () { this.removeClassName("Lhover");}.bind(items[i]) );
        }
    };
    for (var i=0; i<lists.length; i++) {
        styleList(lists[i]);
    }
}

/**
 * 특정 class를 가진 input에 대해 입력키 관련 이벤트를 바인드.
 *
 * <pre>
 * [최초 자동 실행처리]
 * 한글만 영문만 숫자만 입력 가능하도록 키입력 이벤트 처리 한 것.
 * input 테그에 class로 다음과 같이 입력해주면 된다.
 *
 * 1. 번호만 : class='ksccNumber'
 * 2. 소수점 포함 번호만 : class='ksccRate'
 * 3. 알파벳만 : class='ksccAlpha'
 * 4. 알파벳+숫자 : class='ksccAlphaNumeric'
 * </pre>
 *
 * @return {void}
 * @constructor 이윤기 2013.11.19, 수정(크롬관련 수정) jysong 2014.02.13
 **/
function fnComAttachKeyEventHandler( parentId ) {
    $parent = ( parentId ? $("#"+ parentId) : $("body") );

    $parent.find("input.ksccNumber").each(function() {
       $(this).css("ime-mode", "disabled");
       $(this).keydown(function(e) {
           $(this).fnComRegExpHangulForChrome(e);
           fnComFilterKeyEvent(e, "number");
       });
    });
    $parent.find("input.ksccRate").each(function() {
        $(this).css("ime-mode", "disabled");
        $(this).keydown(function(e) {
            $(this).fnComRegExpHangulForChrome(e);
            fnComFilterKeyEvent(e, "rate");
        });
    });
    $parent.find("input.ksccAlpha").each(function() {
        $(this).css("ime-mode", "disabled");
        $(this).keydown(function(e) {
            $(this).fnComRegExpHangulForChrome(e);
            fnComFilterKeyEvent(e, "alpha");
        });
    });
    $parent.find("input.ksccAlphaNumeric").each(function() {
        $(this).css("ime-mode", "disabled");
        $(this).keydown(function(e) {
            $(this).fnComRegExpHangulForChrome(e);
            fnComFilterKeyEvent(e, "alphaNumeric");
        });
    });
    $parent.find("input.ksccTableName").each(function() {
        $(this).css("ime-mode", "disabled");
        $(this).css("text-transform", "uppercase");
        $(this).val($(this).val().toUpperCase()); // uppercase 처리(style은 실데이터 적용안됨)
        $(this).keydown(function(e) {
            $(this).fnComRegExpHangulForChrome(e);
            fnComFilterKeyEvent(e, "tableName");
        });
        $(this).keyup(function(e) {
            // uppercase 처리(style은 실데이터 적용안됨)
            var keyCode = e.keyCode || e.which;
            if( !(keyCode == 8 || keyCode == 9 || keyCode == 13 || keyCode == 46 || keyCode == 16 || ( keyCode >= 35 && keyCode <= 37 ) || keyCode == 39) ) {
                this.value = this.value.toLocaleUpperCase();
            }
        });
    });
}

/**
 * 한글제거 정규식
 *
 * <pre>
 * 한글제거 정규식. 크롬에서는 keyCode이벤트로 한글입력을 막을 방법이
 * 없음으로 본 함수를 사용한다.(크롬에서 연타를 하면 입력이되는 문제를 막음)
 * </pre>
 *
 * @param {Object} object - 사용할 객체
 * @param {event} event - 윈도우 이벤트(window.event)
 * @return {void}
 * @example $("#ID").fnComRegExpHangulForChrome(e);
 *
 * @constructor jysong 2014.02.13
 **/
$.fn.fnComRegExpHangulForChrome = function(event) {
    var browserInfo = fnComBrowserCheck();
    if( browserInfo.match("^Chrome") ) {
        // 달력 등에서 전체 반전 후 숫자를 입력 할 때에 반전된 내용 삭제가 안되는 문제로 아래를 추가함.
        var keyCode = event.keyCode || event.which;
        if( keyCode != 229 ){
        } else {
            var _value = this.val().replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
            this.val(_value);
        }
    }
};

/**
 * 키 이벤트 필터 처리
 *
 * <pre>
 * fnComAttachKeyEventHandler 함수와 혼용해 사용하는 함수로
 * 특정 키코드가 들어 올 때 해당 키코드를 막아주는 역활을 한다.
 * </pre>
 *
 * @param {event} event - 윈도우 이벤트(window.event)
 * @param {String} availKeyType - 키타입
 * @return {void}
 * @example fnComFilterKeyEvent(event, "numeric");
 *
 * @constructor jysong 2013.11.19
 **/
function fnComFilterKeyEvent( event, availKeyType ) {
    event = event || window.event;
    var keyCode = event.keyCode || event.which;
    // Backpace, Tab, Delete, Shift, Home, End, 좌우방향 키는 무시하지 않음
    if( keyCode == 8 || keyCode == 9 || keyCode == 13 || keyCode == 46 || keyCode == 16 || ( keyCode >= 35 && keyCode <= 37 ) || keyCode == 39 ) {
    // ctrl A C V 허가
    } else if( event.ctrlKey && ( keyCode == 65 || keyCode == 67 || keyCode == 86 ) ) {
    // 그외
    } else {
        var doBlock = false;
        switch( availKeyType.toLowerCase() ) {
        case "number" :
        case "numeric" :
            doBlock = ! ( keyCode >= 48 && keyCode <= 57 && !event.shiftKey
                    || keyCode >= 96 && keyCode <= 105 );
            break;
        case "rate" :
            doBlock = ! ( keyCode >= 48 && keyCode <= 57 && !event.shiftKey
                    || keyCode == 110 || keyCode == 190
                    || keyCode >= 96 && keyCode <= 105 );
            break;
        case "alpha" :
        case "alphabet" :
            doBlock = ! ( keyCode >= 65 && keyCode <= 90 );
            break;
        case "alphanumeric" :
            doBlock = ! ( keyCode >= 65 && keyCode <= 90
                    || keyCode >= 96 && keyCode <= 105
                    || keyCode >= 48 && keyCode <= 57 && !event.shiftKey );
            break;
        case "tablename" :
            var browserInfo = fnComBrowserCheck();
            if( browserInfo.startsWith("Firefox") ) {
                doBlock = ! ( keyCode >= 65 && keyCode <= 90
                        || event.shiftKey && keyCode == 173
                        || keyCode >= 48 && keyCode <= 57 && !event.shiftKey
                        || keyCode >= 96 && keyCode <= 105 );
            } else {
                doBlock = ! ( keyCode >= 65 && keyCode <= 90
                        || event.shiftKey && keyCode == 189
                        || keyCode >= 48 && keyCode <= 57 && !event.shiftKey
                        || keyCode >= 96 && keyCode <= 105 );
            }
            break;
        }

        if( doBlock ) {
            event.returnValue = false;
            if (event.preventDefault) {
                event.preventDefault();
            }
        }
    }
}

/**
 * 패턴 변경
 *
 * <pre>
 * html 바디의 모든 input값에 format으로 되어 있는 경우 본 함수 실행시
 * input값의 패턴 자동 변경(콤머, 카드번호, 날짜 등에 사용가능)
 * </pre>
 *
 * @return {void}
 * @constructor jysong 2013.11.12
 **/
function fnComSetPattern() {
    $("body").find("input[format]").each(function(idx){
        var format = $(this).attr("format");
        if( format == null ) return true;
        formatLC = format.toLowerCase();
        value = $(this).val();
        if( formatLC.startsWith("number") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val($.number(value));
            }
        }
        else if( formatLC.startsWith("rate") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                var map = fnComConvertKeyValueToMap(format);
                var prec = map["rate"]; // 5.2 같은 Oracle 정밀도 값
                if( prec ) {
                    $(this).val(fnComFormatNumber(value, fnComGetNumberLength(prec)[1]));
                } else {
                    $(this).val(fnComFormatNumber(value, KSCC_MAX_FRACTIONAL_DIGIT_CNT));
                }
            }
        }
        else if( formatLC.startsWith("time") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatTime(value));
            }
        }
        else if( formatLC.startsWith("date") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatDate(value));
            }
        }
        else if( formatLC.startsWith("mdate") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatDateYYYYMM(value));
            }
        }
        else if( formatLC.startsWith("card") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                var map = fnComConvertKeyValueToMap(format);
                var lenPatterns = map["card"];
                $(this).val(fnComFormatCard(value, lenPatterns));
            }
        }
        else if( formatLC.startsWith("phone") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatPhone(value));
            }
        }
        else if( formatLC.startsWith("zip") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatZipCd(value));
            }
        }
        else if( formatLC.startsWith("jumin") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatJuminNum(value));
            }
        }
        else if( formatLC.startsWith("biz") ) {
            var value = $(this).val();
            if( value != null && value.length > 0 ) {
                $(this).val(fnComFormatBizNum(value));
            }
        }
    });
}

/**
 * Tag Value 포멧 변경
 *
 * <pre>
 * [특정 태그 하위]에 format 속성이 지정되어 있는 태그가 있는 경우 패턴 처리
 * </pre>
 *
 * @return {void}
 * @constructor 이윤기 2013.09.24, 수정 jysong 2013.11.12 우편번호, 주민번호, 전화번호 추가
 **/
function fnComFormat() {
    $("body").find("td[format],th[format],span[format]").each(function(idx){
        var format = $(this).attr("format");
        if( format == null ) return true;
        formatLC = format.toLowerCase();
        value = $(this).text();

        if( formatLC.startsWith("number") ) {
            $(this).text(fnComFormatNumber(value));
        }
        else if( formatLC.startsWith("rate") ) {
            $(this).text(fnComFormatNumber(value, KSCC_MAX_FRACTIONAL_DIGIT_CNT));
        }
        else if( formatLC.startsWith("time") ) {
            $(this).text(fnComFormatTime(value));
        }
        else if( formatLC.startsWith("dtime") ) { // 본 함수에만 존재
            $(this).text(fnComFormatDTime(value));
        }
        else if( formatLC.startsWith("date") ) {
            $(this).text(fnComFormatDate(value));
        }
        else if( formatLC.startsWith("mdate") ) {
            $(this).text(fnComFormatDateYYYYMM(value));
        }
        else if( formatLC.startsWith("code") ) { // 본 함수에만 존재
            var map = fnComConvertKeyValueToMap(format);
            $(this).text(fnComGetCodeMsg(map["code"], value));
        }
        else if( formatLC.startsWith("card") ) {
            var map = fnComConvertKeyValueToMap(format);
            $(this).text(fnComFormatCard(value, map["card"]));
        }
        else if( formatLC.startsWith("phone") ) {
            $(this).text(fnComFormatPhone(value));
        }
        else if( formatLC.startsWith("zip") ) {
            $(this).text(fnComFormatZipCd(value));
        }
        else if( formatLC.startsWith("jumin") ) {
            $(this).text(fnComFormatJuminNum(value));
        }
        else if( formatLC.startsWith("biz") ) {
            $(this).text(fnComFormatBizNum(value));
        }
    });
}

/**
 * 테그에 바인드시 패턴 변경
 *
 * <pre>
 * html 바디의 모든 input값에 format으로 되어 있는 경우 본 함수 실행시
 * 해당 input으로 focus이동하면 input값의 패턴 자동 변경(콤머, 카드번호,
 * 날짜 등에 사용가능)
 * </pre>
 *
 * @return {void}
 * @constructor jysong 2013.11.12
 **/
function fnComBindPattern() {
    $("body").find("input[format]").each(function(idx){
        var format = $(this).attr("format");
        if( format == null ) return true;
        var formatLC = format.toLowerCase();
        if( formatLC.startsWith("number") ) { // 숫자형 --------------------------------------------------
            $(this).blur(function() {
                $(this).val(fnComFormatNumber($(this).val()));
            });
            $(this).focus(function() {
                var value = $(this).val();
                var map = fnComConvertKeyValueToMap($(this).attr("format"));
                var prec = map["number"];
                if( prec ) {
                    $(this).attr("maxlength", prec);
                }
                value = value.replace(/,/g, '');
                $(this).val(value);
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("rate") ) { // 비율 --------------------------------------------------
            $(this).blur(function() {
                var value = $(this).val();
                var map = fnComConvertKeyValueToMap($(this).attr("format"));
                var prec = map["rate"]; // 5.2 같은 Oracle 정밀도 값
                value = value.replace(/,/g, '');
                if( prec ) {
                    var arrLen = fnComGetNumberLength(prec);
                    var valuePointPos = value.indexOf(".");
                    if( valuePointPos > -1 ) {
                        var valueDecimal = value.substr(0, valuePointPos);
                        if( valueDecimal.length > arrLen[0] ) {
                            valueDecimal = valueDecimal.substr(valueDecimal.length - arrLen[0], valueDecimal.length);
                        }
                        value = valueDecimal + value.substr(valuePointPos);
                    } else {
                        if( value.length > arrLen[0] ) {
                            value = value.substr(value.length - arrLen[0], value.length);
                        }
                    }
                    $(this).val(fnComFormatNumber(value, arrLen[1]));
                } else {
                    $(this).val(fnComFormatNumber(value, KSCC_MAX_FRACTIONAL_DIGIT_CNT));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                var map = fnComConvertKeyValueToMap($(this).attr("format"));
                var prec = map["rate"]; // 5.2 같은 Oracle 정밀도 값
                if( prec ) {
                    var arrPrec = fnComGetNumberLength(prec);
                    $(this).attr("maxlength", parseInt(arrPrec[0]) + parseInt(arrPrec[1]) + 1);
                }
                value = value.replace(/,/g, '');
                $(this).val(value);
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("time") ) { // 시간
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[:]/g, '');
                    $(this).val(fnComFormatTime(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 6);
                if( value != null && value.length > 0 ) {
                    value = value.replace(/:/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("date") ) { // 일자 --------------------------------------------------
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatDate(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 8);
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("mdate") ) { // 년월만
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatDateYYYYMM(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 6);
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("card") ) { // 카드번호 --------------------------------------------------
            $(this).blur(function() {
                var value = $(this).val();
                var map = fnComConvertKeyValueToMap($(this).attr("format"));
                var lenPatterns = map["card"]; // 4444 와 같이 하이픈으로 구분되는 숫자의 개수 값
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatCard(value, lenPatterns));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                var map = fnComConvertKeyValueToMap($(this).attr("format"));
                var lenPatterns = map["card"]; // 4444 와 같이 하이픈으로 구분되는 숫자의 개수 값
                if( lenPatterns ){
                    var maxLen = 0;
                    for( var idx = 0; idx < lenPatterns.length; idx++ ) {
                        maxLen += parseInt(lenPatterns.charAt(idx));
                    }
                    $(this).attr("maxlength", maxLen);
                }
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("phone") ) {
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatPhone(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("zip") ) {
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatZipCd(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 6);
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("jumin") ) {
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatJuminNum(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 13);
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
        else if( formatLC.startsWith("biz") ) {
            $(this).blur(function() {
                var value = $(this).val();
                if( value != null && value.length > 0 ) {
                    value = value.replace(/[-]/g, '');
                    $(this).val(fnComFormatBizNum(value));
                }
            });
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 10);
                if( value != null && value.length > 0 ) {
                    value = value.replace(/-/g, '');
                    $(this).val(value);
                }
                this.selectionStart = this.selectionEnd = this.value.length; // 커서를 맨 끝으로
            });
        }
    });
}

/**
 * 특정 태그에 class="required" 항목이 있는 경우 필수값 표시를 해준다.
 *
 * @return {void}
 * @constructor 이윤기 2013.09.25
 **/
function fnComMarkRequired() {
  $("body .required").each(function (i) {
    var labels = $("<label>").addClass("th_essential").html("*"); // 색상이 아닌 class로 처리할때
    labels.insertBefore($(this)); // 앞에다 놓을때
    $(this).removeClass("required");
    return;
  });
}

/**
 * BlockUI 기본설정
 *
 * @return {void}
 * @constructor jysong 2014.01.17
 **/
function fnComBlockSetDefaults(){
    $.blockUI.defaults.css = {
            padding:        0,
            margin:         0,
            width:          '30%',
            top:            '40%',
            left:           '35%',
            textAlign:      'center',
            color:          '#000',
            border:         '0px',
            backgroundColor:'#fff',
            cursor:         'wait'
    };
}

/**
 * 메시지 문자열 내의 @ 문자 위치에 인자로 넘어온 token들을 삽입
 *
 * 작성자 : 이윤기 - 2013.10.30
 *
 * (예제)
 * fnNssReplaceMsg("@ 없습니다.", "요령이"); // "요령이 없습니다."
 * fnNssReplaceMsg("@ 없습니다. (@)", ["자료가", "고객번호:4428"]); // "자료가 없습니다. (고객번호:4428)"
 */
function fnAlertReplaceMsg( msg, tokens ) {
    if( ! tokens ) return msg;
    if( ! tokens.push ) tokens = [tokens];
    for( var idx = 0; idx < tokens.length; idx++ ) {
        var atPos = msg.indexOf("@");
        if( atPos < 0 ) break;
        msg = msg.replace(/@/, tokens[idx]);
    }
    return msg;
}
