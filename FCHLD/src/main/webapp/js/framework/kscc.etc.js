/*******************************************************************************************
// Etc Function
//*******************************************************************************************

/**
 * 사용자 정의 alert
 *
 * @param {String} msg - 메시지내용
 * @return {void}
 * @example fnComCustomAlert("메시지입니다.");
 *
 * @constructor jysong 2013.12.24
 **/
function fnComCustomAlert(msg){
    var head = fnComGetMessage("M024");
    var domMessage =
        "<div id='domMessage' class='blockMsg'>"+
        "    <div class='ui-widget-header blockTitle'><center>"+head+"</center></div>"+
        "    <div class='alert_msg'><pre>"+msg+"</pre></div>"+
        "    <div class='LblockButton'><span class='Lbtn' onclick='fnComUnblockUI();'>"+
        "        <a href='javascript:;'>OK</a></span>" +
        "    </div>"+
        "</div>";
    $.blockUI({
         message: domMessage
        ,css: {border:'0px', cursor:null}
    });
}

/**
 * <pre>
 * 페이지 탭 중에서 disable되어있지 않은 첫번째 왼쪽 탭을 현재 탭으로 지정하고 열어준다.
 * 탭에 click이벤트를 bind하는 기능이 common.js에 존재하므로 CSS나 로직 변경이 있는 경우 같이 반영한다.
 * </pre>
 *
 * @param {String} tabDivId - 텝ID
 * @return {Boolean} true/false
 *
 * @constructor 이윤기 2013.09.27
 **/
function fnComOpenFirstEnabledTab( tabDivId ) {
    $("#"+ tabDivId +" li").each(function() {
        if( ! $(this).hasClass('Ldisable') ) {
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
        }
    });
}

function fnComEnableTab( tabId ) {
    $("#"+ tabId).removeClass("Ldisable");
}
function fnComDisableTab( tabId ) {
    $("#"+ tabId).addClass("Ldisable");
}

/**
 * <pre>
 * 팝업을 연다.
 *
 * callback위해선 fnComClosePopup와 함께 사용한다
 *
 * 2014.07.25 이윤기 : formId대신 데이터가 담긴 object를 넘길 수 있도록 기능 추가
 * </pre>
 *
 * @param {String} url - [필수] 화면 URL
 * @param {Object} option - [선택] window.open()으로 팝업을 열 때 사용할 옵션
 * @param {function} callBackFunc - [선택] 팝업이 닫힐 때 호출될 부모창의 콜백 함수명(문자형)
 * @param {String} callBackStr  - [선택] 팝업이 닫힐 때 콜백 함수 인자를 통해 받고 싶은 문자열. 한 화면에서 같은 팝업을 두 군데 이상의 위치에서 호출할 때, 콜백함수에서 호출자를 구분하기 위해 사용할 수 있음.
 * @param {String/Object} paramForm - [선택] 팝업 호출시 사용할 폼의 ID. 팝업으로 넘겨줄 인자가 있는 경우 입력한다. 혹은 Object를 넘겨줄 수도 있다.
 * @return {Object} popup - 팝업오브젝트
 * @example fnComOpenPopup("<c:url value='/nss/msr/stlmprmtmng/ReadPgmList.dev'/>", "height=350,width=250", "callBack1", "callBack2", "popup01");
 *
 * @constructor 이윤기 2013.08.29, 수정 jysong 2013.11(팝업 포지션 수정) 2014.05(토큰처리 위한 팝업 아이디 저장처리 추가)
 **/
function fnComOpenPopup( url, option, callBackFunc, callBackStr, paramForm ) {
    if( callBackStr == undefined ) callBackStr = "";

    if( callBackFunc && typeof(callBackFunc) == "function" ) {
        alert(fnComGetMessage("M013"));
        return;
    }
    var mapOpt = fnComConvertKeyValueToMap(option);
    var target = "popup";
    var width = 820;
    var height = 310;
    var otherSpecs = "";
    var formId = "";
    var isTempForm = false; // Form을 임시로 만들었는지 여부

    if( $.type(paramForm) == "string" ) {
        formId = paramForm;
    }

    for ( key in mapOpt ) {
        var keyTrim = $.trim(key);
        var valueTrim = $.trim(mapOpt[key]);
        if( keyTrim == "target" ) target = valueTrim;
        else if( keyTrim == "width" ) width = valueTrim;
        else if( keyTrim == "height" ) height = valueTrim;
        else {
            otherSpecs += ","+ keyTrim +"="+ valueTrim;
        }
    }

    // form ID 가 없으면 임시 폼 생성
    if( ! formId ) {
        formId = "_tempForm_com_popup";
        isTempForm = true;
        $("body").eq(0).prepend("<form id='"+ formId +"' method='post' />");
    }
    // 콜백함수명을 담은 hidden input 추가
    if( callBackFunc ) {
        $("#"+ formId).prepend("<input type='hidden' id='"+ KSCC_MAPKEY_CALLBACK_FUNC +"' name='"+ KSCC_MAPKEY_CALLBACK_FUNC +"' value='"+ callBackFunc +"' />");
        $("#"+ formId).prepend("<input type='hidden' id='"+ KSCC_MAPKEY_CALLBACK_STRING +"' name='"+ KSCC_MAPKEY_CALLBACK_STRING +"' value='"+ callBackStr +"' />");
    }
    // paramForm
    if( $.type(paramForm) == "object" ) {
        for( var key in paramForm ) {
            $("#"+ formId).prepend("<input type='hidden' name='"+ key +"' value='"+ paramForm[key] +"' />");
        }
    }

    // 화면 가운데로 이동
    var windowX = Math.ceil( (window.screen.width  - width) / 2 );
    var windowY = Math.ceil( (window.screen.height - height) / 2 );
    var specs = "width="+ width +",height="+ height +",top="+ windowY +",left="+ windowX + otherSpecs;

    // 빈 팝업 생성
    var popup = window.open("", target, specs);
    if( popup != undefined ){
        popup.focus();
    }

    // 폼의 원래값 보관
    var org = {};
    if( !isTempForm ){
        org["orgUrl"] = $("#"+formId).attr("action");
        org["orgTarget"] = $("#"+formId).attr("target");
    }

    // 팝업에 화면 로딩
    $("#"+ formId).attr("action", url).attr("target", target).submit();

    // 추가한 url, target 원복
    if( !isTempForm ){
        if( org.orgUrl != undefined ) $("#"+formId).attr("action", org.orgUrl);
        if( org.orgTarget != undefined ) $("#"+formId).attr("target", org.orgTarget);
    }

    // 임시 추가한 태그 삭제
    if( callBackFunc ) {
        $("#"+ KSCC_MAPKEY_CALLBACK_FUNC).remove();
        $("#"+ KSCC_MAPKEY_CALLBACK_STRING).remove();
    }
    if( isTempForm ) $("#"+ formId).remove();

    //공통 팝업 호출시 세션 타임 리셋!!
    try { fnSTimerReset(); } catch (e) {}

    return popup;
}

/**
 * 팝업을 닫는다.
 *
 * <pre>
 * callback위해선 fnComClosePopup와 함께 사용한다
 * </pre>
 *
 * @param {String} param     : [선택] 부모창에 넘겨줄 값
 * @param {String} pageName  : [선택] 팝업의 화면명
 * @param {String} funcName  : [선택] 닫기 전에 호출할 부모창 쪽 함수명(문자열).
 * @param {Boolean} boolClose : [선택] 팝업을 닫을 것인지 여부. 기본은 true.
 * @return {void}
 *
 * @constructor 이윤기 2013.08.29
 **/
function fnComClosePopup( param, pageName, funcName, boolClose ) {
    if( ! funcName ) funcName = KSCC_PAGEVAR_CALLBACK_FUNC_NAME;
    if( ! pageName ) pageName = $("#LblockPageTitle").text();
    if( boolClose == undefined ) boolClose = true;

    if( funcName && opener ) {
        var parameter = {};
        parameter[KSCC_MAPKEY_SCR_NAME]        = pageName; // 화면명
        parameter[KSCC_MAPKEY_CALLBACK_STRING] = KSCC_PAGEVAR_CALLBACK_STRING;
        parameter[KSCC_MAPKEY_DATA]            = param;
        // 부모창 함수 호출
        try {
            opener[funcName](parameter);
        } catch(e) {
            // 팝업이 뜬 상태로 부모창을 전환한 후 팝업에서 부모창 함수를 호출하면 에러가 발생할 수 있다.
            // 이러한 오류는 무시
        }
    }
    if( boolClose ) {
        window.close();
    }
}

/**
 * 팝업에서 재조회가 일어나는 경우, 공통인자를 들고다니기 위해 폼에 hidden input을 생성
 *
 * @param {String} formId : [필수] 팝업에서 서버를 갈 때 사용하는 form ID
 * @return {void}
 *
 * @constructor 이윤기 2013.09.05
 **/
function fnComSetPopupForm( formId ) {
    if( KSCC_PAGEVAR_CALLBACK_FUNC_NAME.length > 0 ) {
        $("#"+ formId).prepend("<input type='hidden' name='"+ KSCC_MAPKEY_CALLBACK_FUNC +"' value='"+ KSCC_PAGEVAR_CALLBACK_FUNC_NAME +"' />");
    }
    if( KSCC_PAGEVAR_CALLBACK_FUNC_NAME.length > 0 ) {
        $("#"+ formId).prepend("<input type='hidden' name='"+ KSCC_MAPKEY_CALLBACK_STRING +"' value='"+ KSCC_PAGEVAR_CALLBACK_STRING +"' />");
    }
}

/**
 * 폼에 [메뉴ID] 항목 추가
 *
 * @param {String} formId - [필수] 메뉴를 눌러서 진입한 첫 페이지에서 다른 화면으로 전환할 때 사용하는 form ID
 * @return {void}
 *
 * @constructor 이윤기 2013.09.12
 **/
function fnComAddMenuId( formId ) {
    var menuId = $("#pageMenuId").val();
    $("#"+ formId).prepend('<input type="hidden" name="menuId" value="'+ menuId +'" />');
}

/**
 * msg 가 공통메세지 코드 값에 해당될 경우 kscc.message.js 에 정의 되어 있는 값을 반환한다.
 *
 * @param {String} msg - 메시지
 * @return {String} msg - 메시지
 *
 * @constructor 이주희 2014.03.04
 **/
function fnReplaceMsg(msg){
    if(msg.indexOf("yyz.")>-1){
        try {
        var msgVal = "MSG_"+msg.toUpperCase().replace(/\./gi,"_");
        var repMsg = eval(msgVal);
        msg = repMsg;
        } catch(ignored) {}
    }
    return msg;
}

/**
 * ajax 서버 호출 성공시 공통 처리
 *
 * @param {Object} data - ajax결과 데이터
 * @param {String} status - ajax status
 * @param {String} xhr - ajax xhr
 * @return {void}
 *
 * @constructor 이윤기 2013.10.31, 수정 jysong 2014-04-01~
 **/
function fnComHandleAjaxResultSuccess( data, status, xhr ) {
    if( data != null ) {
        fnComGetTokenResult(data);
        var msg = data[KSCC_RES_KEY_MSG];
        if( msg && msg.length > 0 && msg != undefined ) {
            alert(msg);
        }
    }
    $.unblockUI();
}

/**
 * 토큰처리 관련 공통 함수
 *
 * @param {Object} data - ajax결과 데이터
 * @return {void}
 *
 * @constructor jysong 2014.03.21
 **/
function fnComGetTokenResult( data ) {
    if( data != null ) {
        var token = data[KSCC_TOKEN_KEY];
        if( token != undefined && token && token.length > 0 ) {
            var tokenField = "token";
            if( $("[name='devon.token.field']").length > 0 ){
                tokenField = $("[name='devon.token.field']").val();
            }
            if( $("[name='"+tokenField+"']").length > 0 ){
                $("[name='"+tokenField+"']").val(token);
            }
        }
    }
}

/**
 * 팝업 호출시 존재하지 않는 팝업 오브젝트 삭제
 *
 * @param {Object} popupArrObj - [필수] 팝업오브젝트배열
 * @return {Object} popupArrObj - 팝업오브젝트배열
 *
 * @constructor jysong 2014.04.30
 **/
function fnComPopUpArrayDelete(popupArrObj){
    $.each(popupArrObj, function(){
        var pop = "";
        try{
            pop = $(this.popupObject.document);
        } catch(e) {
            if( pop == "" ){
                var popupids = this.popupId;
                popupArrObj = $.grep(popupArrObj, function (value) {
                    return value.popupId != popupids;
                });
            }
        }
    });
    return popupArrObj;
}

/**
 * 팝업에서 생성된 토큰을 전체 팝업과 opener와 공유
 *
 * @param {String} param : [선택] 토큰
 * @return {void}
 *
 * @constructor jysong 2014.04.30
 **/
function fnComSetAjaxToken(token){
    var check = false;
    if( token != undefined && token && token.length > 0 ) check = true;
    var openers = null;
    $(function() {
       try { openers = opener; } catch(e) {}
       // 팝업일때
       if( openers ) {
           opener.popupArray = fnComPopUpArrayDelete(opener.popupArray);
           if( !check ) {
               var tokenField = "token";
               if( $("[name='devon.token.field']").length > 0 ){
                   tokenField = $("[name='devon.token.field']").val();
               }
               if( $("[name='"+tokenField+"']").length > 0 ){
                   $("[name='"+tokenField+"']").val(token);
               }
           }
           try { opener.fnComSetAjaxToken(token); } catch(e) {}

       // 팝업이아닐때
       } else {
           popupArray = fnComPopUpArrayDelete(popupArray);
           // opener 토큰 처리
           if( check ) {
               var tokenField = "token";
               if( $("[name='devon.token.field']").length > 0 ){
                   tokenField = $("[name='devon.token.field']").val();
               }
               if( $("[name='"+tokenField+"']").length > 0 ){
                   $("[name='"+tokenField+"']").val(token);
               }
           }
           // 팝업이 있을경우 토큰처리
           $.each(popupArray, function(){
               var pop = $(this.popupObject.document);
               try {
                   if( check ) {
                       if( $("[name='token']", pop).length > 0 ){
                           $("[name='token']", pop).val(token);
                       }
                   }
               } catch(e) {}
           });
       }
    });
}

/**
 * jqGrid ajax 서버 호출 실패시 공통 처리
 *
 * @param {String} xhr : ajax xhr
 * @param {String} status : ajax status
 * @param {String} error : ajax error
 * @return {void}
 *
 * @constructor 이윤기 2013.10.31, 수정 jysong 2014.01.21
 **/
function fnComJqGridEventLoadError(xhr, status, error) {
    var msg = xhr.responseText;
    // 토큰키여부 파악
    var data = null;
    if( msg.indexOf("sessionTokenIdValue") != -1 ){
        data = $.parseJSON(msg.replace(/\\/g, "\\\\"));
    }
    if( data != null ) {
        msg = data["exceptionMsg"];
        var tokenField = "token";
        if( $("[name='devon.token.field']").length > 0 ){
            tokenField = $("[name='devon.token.field']").val();
        }
        if( $("[name='"+tokenField+"']").length > 0 ){
            var token = data["sessionTokenIdValue"];
            if( token != undefined && token && token.length > 0 ) {
                $("[name='"+tokenField+"']").val(token);
            }
        }
    }
    // 메시지처리
    if( msg.length > 1500 || msg.toUpperCase().indexOf("<BODY") != -1  ) {
        alert(fnComGetMessage("M014"));
    } else {
        msg = fnReplaceMsg(msg);
        alert(fnComGetMessage("M015",msg.replace(/\\n/g, "\n")));
        if(msg.indexOf(fnComGetMessage("M016"))>=0){
            document.location = KSCC_CONTEXT_PATH+"/index.dev";
        }
    }
    $.unblockUI();
}

/**
 * ajax 서버 호출 실패시 공통 처리
 *
 * @param {String} xhr : ajax xhr
 * @param {String} status : ajax status
 * @param {String} error : ajax error
 * @return {void}
 *
 * @constructor 이윤기 2013.10.31, 수정 jysong, leejh 2014.04
 **/
function fnComHandleAjaxResultError( xhr, status, error ) {
    var msg = xhr.responseText;
    // 토큰키여부 파악
    var data = null;
    if( msg.indexOf("sessionTokenIdValue") != -1 ){
        data = $.parseJSON(msg.replace(/\\/g, "\\\\"));
    }
    if( data != null ) {
        msg = data["exceptionMsg"];
        if( $("[name='devon.token.field']").length > 0 ){
            tokenField = $("[name='devon.token.field']").val();
        }
        if( $("[name='"+tokenField+"']").length > 0 ){
            var token = data["sessionTokenIdValue"];
            if( token != undefined && token && token.length > 0 ) {
                $("[name='"+tokenField+"']").val(token);
            }
        }
    }
    // 메시지처리
    if( msg.length > 1500 || msg.toUpperCase().indexOf("<BODY") != -1  ) {
        alert(fnComGetMessage("M014"));
    } else {
        msg = fnReplaceMsg(msg);
        alert(fnComGetMessage("M015",msg.replace(/\\n/g, "\n")));
        if(msg.indexOf(fnComGetMessage("M016"))>=0){
            document.location = KSCC_CONTEXT_PATH+"/index.dev";
        }
    }
    $.unblockUI();
}

/**
 * <pre>
 * "3.2" 와 같이 Oracle의 숫자형 정밀도 값이 들어오면
 * [3,2] 와 같이 정수부, 소수부 길이가 담긴 배열을 반환
 * </pre>
 *
 * @param {String} prec : 입력값
 * @return {Array} [deciPrec, fracPrec]
 *
 * @constructor 이윤기 2013.09.24
 **/
function fnComGetNumberLength( prec ) {
    var deciPrec = 0; // 정수부
    var fracPrec = 0; // 소수부
    if( prec ) {
        var _pos = prec.indexOf(".");
        if( _pos >= 0 ) {
            deciPrec = prec.substr(0, _pos);
            fracPrec = prec.substr(_pos + 1);
        } else {
            deciPrec = prec;
        }
    }
    return [deciPrec, fracPrec];
}

/**
 * <pre>
 * 화면 항목 값 validation
 * 내부적으로 dui_webvalidator.js에서 제공하는 기능을 사용한다.
 * </pre>
 *
 * @param {String} rootTagId : 검증할 input을 감싸고 있는 부모 태그의 ID
 * @param {Object} checkRule : 검증 룰을 담고 있는 java object
 * @return {Array} [deciPrec, fracPrec]
 * @example
 * if( fnComValidate("listForm", {
 *        "calRgspCd" : "WV:지역:true:"
 *      , "snrDvsCd"  : "WV:구분:true:"
 *      , "snrNm"     : "WV:시나리오명:true:maxByteLength=60"
 *      , "snrDesc"   : "WV:시나리오:true:maxByteLength=500"
 * })) return false;
 * @constructor 이윤기 2013.10.07
 **/
function fnComValidate( rootTagId, checkRule ) {
    var NO_PROBLEM = false;
    var IS_ERROR = true;

    if( ! checkRule ) return NO_PROBLEM;

    for( id in checkRule ) {
        $("#"+id).addClass(checkRule[id]);
    }

    var boolValResult = dui.wv.validate($("#"+ rootTagId));

    for( id in checkRule ) {
        $("#"+id).removeClass(checkRule[id]);
    }

    if( ! boolValResult ) return IS_ERROR;

    return NO_PROBLEM;
}

/**
 * jQuery BlockUI 적용
 *
 * @param {String} id : 적용할 레이어ID
 * @param {function} msgFunc : 실행될 함수
 * @return {void}
 * @constructor 이윤기 2013.10.04
 **/
function fnComBlockUI( id, msgFunc ) {
    var $ctrl = ( id == null ? $("body") : $("#"+ id) );
    if( ! msgFunc ) msgFunc = fnComGetBlockMsg;
    if(id!=null){
        $ctrl.block(msgFunc());
    }else{
        $.blockUI(msgFunc());
    }
}

function fnComUnblockUI() {
   $.unblockUI();
}

function fnComGetBlockMsg() {
    var msg = "<img src='"+ KSCC_CONTEXT_PATH +"/images/loading.gif' width='250px' height='35px' />";
    if( $("#loadingMsessage").length > 0 ){
        msg = $("#loadingMsessage").html();
    }
    return {
        message : msg
        , css : { width: '250px', height:'35px' }
        , overlayCSS: { backgroundColor: '#FFF', opacity: .7 }
    };
}

/**
 * Form을 동적으로 생성하여 서버로 전송한다. input 태그가 format 속성을 가지고 있는 경우, value 내의 콤마나 하이픈 등을 제거하여 서버로 보낸다.
 *
 * @param {String} tagId : 테그ID
 * @param {String} url : URL
 * @return {void}
 * @constructor 이윤기 2013.10.08
 **/
function fnComSubmit( tagId, url ) {
    var tempFormId = '_ksccHiddenTempForm';
    var $orgForm = $("#"+ tagId);
    var $newForm = $("<form id='"+ tempFormId +"' method='post' />");
    $("#"+ tempFormId).remove(); // 기존 임시 폼 삭제
    $.each($orgForm.get(0).attributes, function() {
        if( this.specified && this.name.toUpperCase() != "ID" ) {
            $newForm.attr(this.name, this.value);
        }
    });
    $newForm.prependTo($("body")); // 폼생성
    $orgForm.find("input,select,textarea").each(function() {
        var tag = $(this);
        var tagName = tag[0].tagName.toUpperCase();
        if( tagName == "TEXTAREA" ) {
            var $newTA = $(this).clone().removeAttr("id").css("display", "none");
            $newTA.appendTo($newForm);
        } else if( tagName == "SELECT" ) {
            var $newInput = $("<input />").attr({type:"hidden", name:$(this).attr("name")}).val($(this).val());
            $newInput.appendTo($newForm);
        } else if( tagName == "INPUT" ) {
            var type = $(this).attr('type');
            if( type && type.toUpperCase() == "BUTTON" ) {
                return true;
            } else if( type && type.toUpperCase() == "RADIO" ) {
                if( ! $(this).is(":checked") ) return true;
                var $newInput = $("<input />").attr({type:"hidden", name:$(this).attr("name")}).val($(this).val());
                $newInput.appendTo($newForm);
            } else if( type && type.toUpperCase() == "CHECKBOX" ) {
                if( ! $(this).is(":checked") ) return true;
                var $newInput = $("<input />").attr({type:"hidden", name:$(this).attr("name")}).val($(this).val());
                $newInput.appendTo($newForm);
            } else {
                var newValue = fnComRemovePattern( $(this).attr("format"), $(this).val() );
                var $newInput = $("<input />").attr({type:"hidden", name:$(this).attr("name")}).val(newValue);
                $newInput.appendTo($newForm);
            }
        }
    });
    $newForm.attr("action", url).submit();
}

/**
 * jqGrid 셀에 들어갈 버튼 HTML 생성
 *
 * @param {String} msg : 테그ID
 * @param {String} strEvent : URL
 * @return {String} span으로 구성된 리턴 값
 * @constructor 이윤기 2013.09.23
 **/
function fnComMakeHtmlRowButton( msg, strEvent ) {
    return "<span class='Lbtn3' "+ strEvent +"><a href='#'>"+ msg +"</a></span>";
}

function fnComNVL( string, ifNull, ifNotNull ) {
    return ( string == null || string.length == 0 ? ( ifNull == null ? "" : ifNull ) : ( ifNotNull == null ? string : ifNotNull ) );
}

function fnComTrim( str ) {
    return str.replace(/(^\s*|\s*$)/g, '');
}

/**
 * 이벤트의 target 을 얻어옴.(Cross-Browser)
 *
 * @param {event} e : [필수] event
 * @return {Object} target : 이벤트 target Object
 * @constructor 이윤기 2013.08.27
 **/
function fnComGetEventTarget( e ) {
    var target = null;
    var event = e;
    if (!e) return null; // null이 오면 null 반환
    if (event.target) target = event.target;
    else if (event.srcElement) target = event.srcElement;
    if (target.nodeType == 3) // defeat Safari bug
        target = target.parentNode;
    return target;
}

/**
 * key=value,key=value,... 형식의 문자열을 받아 Map으로 변환
 *
 * @param {String} str : 문자열
 * @param {String} delimeter : 구분자
 * @return {Map} map : 맵
 * @constructor 이윤기 2013.08.29
 **/
function fnComConvertKeyValueToMap( str, delimeter ) {
    if( ! str ) return {};

    var deli = delimeter; // 토큰별 구분자
    var tokenDeli = "="; // 하나의 토큰 내에서의 구분자
    var map = {};

    if( ! deli ) {
        var listDeli = [',', ';'];
        for( var i = 0; i < listDeli.length; i++ ) {
            if( str.indexOf(listDeli[i]) >= 0 ) {
                deli = listDeli[i];
                break;
            }
        }
    }
    var listTokenDeli = ['=',':','-','_','.','/'];
    for( var i = 0; i < listTokenDeli.length; i++ ) {
        if( str.indexOf(listTokenDeli[i]) >= 0 ) {
            tokenDeli = listTokenDeli[i];
            break;
        }
    }

    var arr = str.split(deli);
    for( var i = 0, len = arr.length; i < len; i++ ) {
        var idxEqual = arr[i].indexOf(tokenDeli);
        if( idxEqual < 0 ) continue;
        var key = arr[i].substr(0, idxEqual);
        var value = arr[i].substr(idxEqual + 1);
        map[key] = value;
    }
    return map;
}

/**
 * [jqGrid] serializeObject 함수
 * <pre>
 * 참고 : 함수 실행시 모든 date함수와 input format에 해당 되어있는 값에 정규식으로 마이너스와 컴머등을 제거
 * </pre>
 *
 * @param {Object} object - 사용할 객체
 * @return {Object} objectData : 재작업된 오브젝트 데이터
 * @constructor jysong 2013.09.30, 수정 이윤기 2013.10.30
 **/
$.fn.serializeObject = function() {
    var arrayData, objectData;
    var $form = this;
    arrayData = this.serializeArray();
    objectData = {};
    $.each(arrayData, function() {
        var value;
        if (this.value != null) {
            var tag = $form.find("*[name='"+ this.name +"']");
            var format = "";
            var isDatePicker = false;
            if( tag.length > 0 ) {
                format = tag.eq(0).attr("format");
                isDatePicker = tag.eq(0).hasClass("hasDatepicker");
            }
            if( format == "" ) {
                value = this.value;
            } else {
                value = fnComRemovePattern(format, this.value);
            }
            if( isDatePicker ) {
                value = fnComRemovePattern("date", value);
            }
        } else {
            value = '';
        }
        if (objectData[this.name] != null) {
            if (!objectData[this.name].push) {
                objectData[this.name] = [ objectData[this.name] ];
            }
            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });

    return objectData;
};

/**
 * 메시지 문자열 내의 @ 문자 위치에 인자로 넘어온 token들을 삽입
 *
 * @param {String} msg - 메시지
 * @param {String} tokens - 토큰값
 * @return {Object} objectData : 재작업된 오브젝트 데이터
 * @example
 * fnComReplaceMsg("@ 없습니다.", "요령이"); // "요령이 없습니다."
 * fnComReplaceMsg("@ 없습니다. (@)", ["자료가", "고객번호:4428"]); // "자료가 없습니다. (고객번호:4428)"
 *
 * @constructor 이윤기 2013.10.30
 **/
function fnComReplaceMsg( msg, tokens ) {
    if( ! tokens ) return msg;
    if( ! tokens.push ) tokens = [tokens];
    for( var idx = 0; idx < tokens.length; idx++ ) {
        var atPos = msg.indexOf("@");
        if( atPos < 0 ) break;
        msg = msg.replace(/@/, tokens[idx]);
    }
    return msg;
}

/**
 * 파일 확장자를 체크하여 사용할 수 있는 파일인지 검증한다.
 *
 * @param {String} id : 객체 아이디
 * @return {Boolean} checkFile : 파일체크결과값
 *
 * @constructor jysong 2013.10.18
 **/
function fnComFileCheck(id){
    var nameArray = [".jsp",".js",".jspf",".class",".java",".exe",".com",".bat",".cmd",".sh",".sql",".asp",".php"];
    var checkFile = true;
    var arrayCheck = function(nameArray, fileExt) {
        var check = true;
        $.each(nameArray, function() {
            if (this == fileExt) check = false;
        });
        return check;
    };
    $("input:file").each(function (i) {
        if ($(this).is("#"+id)) {
            var file = $(this).val();
            if( file == "" ) {
                checkFile = false;
            } else {
                var fileExt = "";
                while (file.indexOf("\\") != -1) {
                    file = file.slice(file.indexOf("\\") + 1);
                    //파일명에 "."이 포함되어있을 경우를 위해 마지막 확장자만 가져온다
                    fileExt = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
                }
                // 경로를 못들고오는 경우(파이어폭스일경우)
                if( fileExt == "" ) fileExt = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
                // 확장자를 체크한다.
                checkFile = arrayCheck(nameArray, fileExt);
            }
        }
    });
    return checkFile;
}

/**
 * 파일 확장자를 가져온다.
 *
 * @param {String} id : 객체 아이디
 * @return {String} fileExt : 파일 확장자 스트링
 *
 * @constructor jysong 2013.10.18
 **/
function fnComGetFileExt(id){
    var file = $("#"+id).val();
    var fileExt = "";
    while (file.indexOf("\\") != -1) {
        file = file.slice(file.indexOf("\\") + 1);
        fileExt = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
    }
    // 경로를 못들고오는 경우(파이어폭스일경우)
    if( fileExt == "" ) fileExt = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
    return fileExt;
}

/**
 * 조회조건이 4행 이상인 경우 버튼 클릭시 모두 나타내기
 *
 * @return {void}
 * @constructor 디자인팀 2013.10.25
 **/
function spreadInquiry() {
    var chImage = $("#LblockSearch a img.Limage2");
    var hiddenConds = $("#LblockSearch table tr.hideNshow");
    if(hiddenConds.hasClass("Lnodisplay")){
        $(chImage).attr("src", KSCC_IMAGE_PATH+"btn_searchDetailUp.gif");
        $(chImage).addClass("Limage3");
        $(hiddenConds).removeClass("Lnodisplay");
    } else {
        $(chImage).attr("src", KSCC_IMAGE_PATH+"btn_searchDetail.gif");
        $(chImage).removeClass("Limage3");
        $(hiddenConds).addClass("Lnodisplay");
    }
}

/**
 * select 값 input text 전달
 *
 * @param {Object} 테그 객체
 * @return {void}
 * @constructor 디자인팀 2013.10.25
 **/
function comboToText(el){
    el.next("input").value = el.options[el.selectedIndex].value;
}

/**
 * 입력 String 값의 byte길이를 리턴하는 함수
 *
 * @param {String} str 입력스트링
 * @return {void}
 * @constructor jysong 2013.10.29
 **/
function fnComGetByteLength(str) {
    var len = 0;
    if ( str == null ) return 0;
    // 개행문자를 로컬에서 어떤식으로 보내더라도 서버에서 \r\n으로 받음으로 정확한 사이즈 체크를 위함
    str = String(str).replace(/\r\n/g, "\n").replace(/\n/g, "\r\n").replace(/^\s+/, '').replace(/\s+$/, '');
    for(var i=0; i < str.length; i++) {
        var ch = escape(str.charAt(i));
        if( ch.length == 1 ) len++;
        else if( ch.indexOf("%u") != -1 )  len += 2;
        else if( ch.indexOf("%") != -1 ) len += ch.length/3;
    }
    return len;
}

/**
 * 입력 String 값을 byte로 읽어 byte단위로 잘라 리턴하는 함수
 *
 * @param {String} str : 입력 String
 * @param {String} max : 자를 위치(길이)
 * @return {String} str : 자른 문자열
 * @constructor jysong 2013.10.29
 **/
function fnComCutByteLength(str, max) {
    var len = 0;
    if ( str == null ) return "";
    for (var i=0; i < str.length; i++) {
        var ch = escape(str.charAt(i));
        if( ch.length == 1 ) len++;
        else if( ch.indexOf("%u") != -1 )  len += 2;
        else if( ch.indexOf("%") != -1 ) len += ch.length/3;
        if ( len > max ) {
            return str.substring(0, i);
        }
    }
    return str;
}

/**
 * textArea에 number line속성을 만들어준다.
 *
 * @param {Object} object : 사용할 객체
 * @param {Object} option : 옵션 오브젝트
 * @return {void}
 * @example
 * html : <textarea id="test" rows="30" cols="120">텍스트 속성</textarea>
 * $(function() {
 *    $("#test").fnComTextareaLineNumber();
 *    // [선택옵션] selectedLine : 선택된 라인 색상 변경(현재설정 red) : 색상설정은 base.css에 포함되어있음 디자인 팀에 문의 변경
 *    $("#test").fnComTextareaLineNumber( {selectedLine: 1} );
 * });
 * @constructor jysong 2013.11.19
 **/
(function($) {
    $.fn.fnComTextareaLineNumber = function(options) {
        var opts = $.extend({}, $.fn.fnComTextareaLineNumber.defaults, options);
        var fillOutLines = function(codeLines, h, lineNo){
            while ( (codeLines.height() - h ) <= 0 ){
                if ( lineNo == opts.selectedLine )
                    codeLines.append("<div class='lineno lineselect'>" + lineNo + "</div>");
                else
                    codeLines.append("<div class='lineno'>" + lineNo + "</div>");
                lineNo++;
            }
            return lineNo;
        };

        return this.each(function() {
            var lineNo = 1;
            var textarea = $(this);

            textarea.attr("wrap", "off");
            textarea.css({resize:'none'});
            var originalTextAreaWidth   = textarea.outerWidth();

            textarea.wrap("<div class='linedtextarea'></div>");
            var linedTextAreaDiv    = textarea.parent().wrap("<div class='linedwrap' style='width:" + originalTextAreaWidth + "px'></div>");
            var linedWrapDiv            = linedTextAreaDiv.parent();

            linedWrapDiv.prepend("<div class='lines' style='width:50px'></div>");

            var linesDiv    = linedWrapDiv.find(".lines");
            linesDiv.height( textarea.height() + 6 );

            linesDiv.append( "<div class='codelines'></div>" );
            var codeLinesDiv    = linesDiv.find(".codelines");
            lineNo = fillOutLines( codeLinesDiv, linesDiv.height(), 1 );

            if ( opts.selectedLine != -1 && !isNaN(opts.selectedLine) ){
                var fontSize = parseInt( textarea.height() / (lineNo-2) );
                var position = parseInt( fontSize * opts.selectedLine ) - (textarea.height()/2);
                textarea[0].scrollTop = position;
            }

            var sidebarWidth = linesDiv.outerWidth();
            var paddingHorizontal = parseInt( linedWrapDiv.css("border-left-width") ) + parseInt( linedWrapDiv.css("border-right-width") ) + parseInt( linedWrapDiv.css("padding-left") ) + parseInt( linedWrapDiv.css("padding-right") );
            var linedWrapDivNewWidth = originalTextAreaWidth - paddingHorizontal;
            var textareaNewWidth = originalTextAreaWidth - sidebarWidth - paddingHorizontal - 20;

            textarea.width( textareaNewWidth );
            linedWrapDiv.width( linedWrapDivNewWidth );

            // 스크롤 부분
            textarea.scroll( function(tn){
                var domTextArea     = $(this)[0];
                var scrollTop       = domTextArea.scrollTop;
                var clientHeight    = domTextArea.clientHeight;
                codeLinesDiv.css( {'margin-top': (-1*scrollTop) + "px"} );
                lineNo = fillOutLines( codeLinesDiv, scrollTop + clientHeight, lineNo );
            });

            // 리사이즈 부분
            textarea.resize( function(tn){
                var domTextArea = $(this)[0];
                linesDiv.height( domTextArea.clientHeight + 6 );
            });

        });
    };
    $.fn.fnComTextareaLineNumber.defaults = {
    selectedLine: -1,
    selectedClass: 'lineselect'
  };
})($);

/**
 * 모바일 접근 여부 확인 함수
 *
 * @return {Boolean} 모바일 여부 true/false
 * @constructor 이주희 2013.12.06
 **/
function fnComIsMobile(){
    var mobileKeyWords = new Array("iPhone","iPod","BlackBerry","Android","Windows CE","LG","MOT","SAMSUNG", "SonyEricsson");
    var isMobile = false;
    for(var word in mobileKeyWords){
        if(navigator.userAgent.match(mobileKeyWords[word] != null)){
            isMobile = true;
        }
    }
    return isMobile;
}

/**
 * InternetVersion Check function
 *
 * @return {String} rv 버전정보
 * @constructor 이주희 2013.12.06
 **/
function fnComGetInternetVersion(ver) {
    var rv = -1; // 오류시 리턴되는 값
    var ua = navigator.userAgent;
    var re = null;
    if(ver == "MSIE"){
        re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    } else {
        re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
    }
    if (re.exec(ua) != null){
        rv = parseFloat(RegExp.$1);
    }
    return rv;
}

/**
 * 브라우저 종류 및 버전확인
 *
 * @return {String} 브라우저 종류 값
 * @constructor 이주희 2013.12.06
 **/
function fnComBrowserCheck(){
    var browserinfo = "";
    var ver = 0; // 브라우저  버전정보
    if(navigator.appName.charAt(0) == "N" && !navigator.userAgent.match('Trident/7.0')){
        if(navigator.userAgent.indexOf("Chrome") != -1){
            ver = fnComGetInternetVersion("Chrome");
            browserinfo = "Chrome"+ver;
        } else if(navigator.userAgent.indexOf("Firefox") != -1){
            ver = fnComGetInternetVersion("Firefox");
            browserinfo="Firefox"+ver;
        } else if(navigator.userAgent.indexOf("Safari") != -1){
            ver = fnComGetInternetVersion("Safari");
            browserinfo="Safari"+ver;
        }
    } else if(navigator.appName.charAt(0) == "M"){
        ver = fnComGetInternetVersion("MSIE");
        browserinfo="MSIE"+ver;
    } else if(navigator.userAgent.match('Trident/7.0') == 'Trident/7.0') {
        browserinfo="MSIE11";
    }
    return browserinfo;
}

/**
 * 파일 비동기 다운로드 함수
 *
 * @param {String} url : 주소
 * @param {String} formId : 폼아이디
 * @return {void}
 * @constructor jysong 2014.01.08
 **/
function fnComfileDownLoad(url, formId){
    var href = url + $.param($("#"+formId).serializeObject());
    $.cookie("fileDownload", "true", { path:"/" });
    if( $.cookie('filedownloadck') != href ){
        $.fileDownload(url, {
            httpMethod: "POST",
            data: $("#"+formId).serializeObject(),
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
    }
}

/**
 * 데이터가 없는 경우 엑셀다운로드 링크에 넣어줄 함수
 *
 * @param {event} event 윈도우 이벤트
 * @return {void}
 * @constructor 이윤기 2014.02.24
 **/
function fnComLinkExcelDownloadNoData( event ) {
    alert(fnComGetMessage("M018"));
}

/**
 * object를 가지고 Query String 생성
 *
 * @param {String} vo vo오브젝트
 * @return {Array} 리턴 배열
 * @example { test1 : "val1", test4 : "some" } 이 있을 때 "test1=val1&test4=some" 문자열을 반환한다.
 * @constructor 이윤기 2014.02.24
 **/
function fnComMakeQueryString( vo ) {
    var result = [];
    if( ! vo ) return "";
    $.each(vo, function(key) {
        result.push(key +"="+ vo[key]);
    });
    return result.join("&");
}

/**
 * <pre>
 * { name1 : id1, name2 : id2, ... }
 * 형식의 룰을 넘기면
 * { name1 : val(id1), name2 : val(id2), ... }
 * 형식의 Object를 반환한다. 이때 id(n)이 input의 ID인 경우 format속성에 따른 값의 unformat도 처리해준다.
 * </pre>
 *
 * @param {Object} oRule 입력오브젝트
 * @return {Object} newObj 변환된 오브젝트
 * @constructor 이윤기 2014.02.24
 **/
function fnComMakeVO( oRule ) {
    var newObj = {};
    $.each( oRule, function(key) {
        var $tag = $("#"+ oRule[key]);
        if( $tag.length == 0 ) {
            newObj[key] = fnComGetMessage("M019",oRule[key]);
            return true;
        }
        var format = $tag.attr("format");
        var isDatePicker = $tag.hasClass("hasDatepicker");
        if( format ) {
            newObj[key] = fnComRemovePattern( format, $tag.val() );
        } else if( isDatePicker ) {
            newObj[key] = fnComRemovePattern( "date", $tag.val() );
        } else {
            newObj[key] = $tag.val();
        }
    });
    return newObj;
}

/**
 * container의 ID를 받아서 하위 입력항목들을 object로 만들어 반환
 *
 * @param {String} tagId 테그아이디
 * @return {Object} result { name1 : val1, name2 : val2, ... }
 * @example var postData = fnComSerialize("divSearch");
 * @constructor 이윤기 2014.02.24
 **/
function fnComSerialize( tagId ) {
    var result = {};
    $parentTag = $("#"+ tagId);
    if( $parentTag.length == 0 ) {
        alert(fnComGetMessage("M020",tagId));
        return result;
    }
    $parentTag.find("input, select, textarea").each(function() {
        var tag = $(this);
        var attrName = tag.attr("name");
        if( ! attrName ) return true; // name 속성이 없으면 값 세팅 안 함
        var tagName = tag[0].tagName.toUpperCase();
        if( tagName == "TEXTAREA" ) {
            result = fnComAppendDataToMap( result, attrName, $(this).val());
        } else if( tagName == "SELECT" ) {
            result = fnComAppendDataToMap( result, attrName, $(this).val());
        } else if( tagName == "INPUT" ) {
            var isDatePicker = tag.hasClass("hasDatepicker");
            var type = $(this).attr('type');
            if( type && type.toUpperCase() == "BUTTON" ) {
                return true;
            } else if( type && type.toUpperCase() == "RADIO" ) {
                if( ! $(this).is(":checked") ) return true;
                result = fnComAppendDataToMap( result, attrName, $(this).val());
            } else if( type && type.toUpperCase() == "CHECKBOX" ) {
                if( ! $(this).is(":checked") ) return true;
                var prevVal = result[attrName];
                if( ! prevVal ) prevVal = [];
                prevVal.push($(this).val());
                result[attrName] = prevVal;
            } else if( isDatePicker ) {
                var newValue = fnComRemovePattern( "date", $(this).val() );
                result = fnComAppendDataToMap( result, attrName, newValue);
            } else {
                var newValue = fnComRemovePattern( $(this).attr("format"), $(this).val() );
                result = fnComAppendDataToMap( result, attrName, newValue);
            }
        }
    });
    return result;
}

/**
 * 맵의 특정 key값에 새로운 값을 추가한다.
 *
 * <pre>
 * key가 맵에 아직 없었다면 단일 문자열로 맵에 값을 추가하고
 * key가 이미 존재했었다면 기존 값과 새로운 값을 합쳐서 Array로 만들어 맵에 넣는다.
 * </pre>
 *
 * @param {Map} map 입력 맵
 * @param {String} key 키값
 * @param {String} data 데이터
 * @return {Map} 리턴되는 맵
 * @constructor 이윤기 2014.03.10
 **/
function fnComAppendDataToMap( map, key, data ) {
    var prevValue = map[key];
    if( prevValue == undefined ) {
        map[key] = data;
    } else {
        if( prevValue.push ) {
            prevValue.push(data);
            map[key] = prevValue;
        } else {
            map[key] = [ prevValue, data ];
        }
    }
    return map;
}

/**
 * QueryString(aaa=111&bbb=222...)을 Unserialize하는 함수
 *
 * @param {String} param 입력스트링
 * @return {Object} Unserialize된 데이터
 * @constructor jysong 2014.03.18
 **/
function fnComQueryStringToHash(param) {
    var params = {};
    var pairs = param.split('&');
    for (var i=0; i<pairs.length; i++) {
        var pair = pairs[i].split('=');
        var accessors = [];
        var name = decodeURIComponent(pair[0]), value = decodeURIComponent(pair[1]);
        name = name.replace(/\[([^\]]*)\]/g, function(k, acc) { accessors.push(acc); return ""; });
        accessors.unshift(name);
        var o = params;
        for (var j=0; j<accessors.length-1; j++) {
            var acc = accessors[j];
            var nextAcc = accessors[j+1];
            if (!o[acc]) {
                if ((nextAcc == "") || (/^[0-9]+$/.test(nextAcc))){
                    o[acc] = [];
                } else {
                    o[acc] = {};
                }
            }
            o = o[acc];
        }
        acc = accessors[accessors.length-1];
        if (acc == "")
            o.push(value);
        else
            o[acc] = value;
    }
    return params;
}

/**
 * QueryString을 fnComQueryStringToHash함수와 toJSON함수를 사용하여 json으로 변경해준다.
 *
 * @return {String} Json String
 * @constructor jysong 2014.03.18
 **/
function fnComQueryStringToJson(param){
    return $.toJSON(fnComQueryStringToHash(param));
}

/**
 * 팝업 아이디를 저장하기 위한 함수(토큰값을 각 팝업 및 오프너에 전달을 위함)
 *
 * @param {String} popupId : [필수] 팝업아이디
 * @param {Object} popupObject : [필수] 팝업 오브젝트
 * @return {void}
 * @constructor jysong 2014.05.08
 **/
function fnComPopupIdSave(popupId, popupObject){
    try {
        // 중복 삭제
        popupArray = $.grep(popupArray, function (value) {
            return value.popupId != popupId;
        });
        // 팝업 아이디 저장
        popupArray.push({
            popupId:popupId,
            popupObject:popupObject
        });
    } catch(e){
    }
}
