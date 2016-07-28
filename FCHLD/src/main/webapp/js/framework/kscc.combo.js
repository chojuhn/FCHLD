//*******************************************************************************************
// Combo
//*******************************************************************************************

/**
 * [AJAX] 공통코드 콤보 내용 조회
 *
 * <pre>
 * // id가 "selectID"인 select tag에 코드테이블의 그룹아이디가 "100"인 리스트를 들고와 콤보를 생성
 * fnComReadCombo( "100", "selectID" );
 * // 위의 예제와같이 콤보를 생성하는 것은 동일하나 select tag에서 selected된 선택항목을 기본으로 보여준다.
 * fnComReadCombo( "100", "selectID", "선택항목" );
 * // 상세코드 내용을 관리속성내용으로 구분하여 코드 항목을 선택적으로 보여준다.
 * fnComReadCombo( "100", "selectID", "선택항목", "10", "20");
 * fnComReadCombo( "100", "selectID", "선택항목", "10,11,12", "20,21,22");
 * </pre>
 *
 * @param {String} code - [필수] 공통코드. NSS_CODE_GROUP_SNR_DVS_CD와 같은 상수를 사용한다.
 * @param {String} id - [필수] select 태그 ID
 * @param {String} defValue - [선택] selected 항목 value
 * @param {String} mngAttrCtt1 - [선택] 관리속성내용1 (컴머로 구분지어 여러개의 값을 넘길 수 있다)
 * @param {String} mngAttrCtt2 - [선택] 관리속성내용2 (컴머로 구분지어 여러개의 값을 넘길 수 있다)
 * @param {Boolean} asyncReq - [선택] 동기/비동기 설정
 * @return {void}
 *
 * @constructor 이윤기 2013.08.27, 수정 jysong 2013.10.24, 조준희 2013.10.28
 **/
function fnComReadCombo( code, id, defValue, mngAttrCtt1, mngAttrCtt2, asyncReq) {
    if( mngAttrCtt1 == undefined ) mngAttrCtt1 = "";
    if( mngAttrCtt2 == undefined ) mngAttrCtt2 = "";
    if( asyncReq == undefined ) asyncReq = true; // default

    var param = "";
    if( mngAttrCtt1 == "" && mngAttrCtt2 == "" ) param = "codeGroup="+code;
    else param = "codeGroup="+code+"&mngAttrCtt1="+mngAttrCtt1+"&mngAttrCtt2="+mngAttrCtt2;

    $.ajax({
        type:"GET",
        url:KSCC_AJAX_READ_COMBO_CODE,
        data:param,
        async : asyncReq,
        success:function(xml){
            $(xml).find( "option" ).each(function(){
                var attrValue = "";
                $.each(this.attributes, function(i, attrib){
                    attrValue = attrib.value;
                });
                var str = $(this).text().replace(/(^\s*|\s*$)/g, '');
                $("#"+id).append("<option value='"+ attrValue +"'>"+ str +"</option>");
            });
            if( defValue != undefined && defValue != "" ){
                $("#"+id).val(defValue).attr("selected", "selected");
            }
        },
        error:function(xhr,status,error){
            alert(xhr.status);
            alert(status);
            alert(error);
        }
    });
}

/**
 * [AJAX] 체크박스 콤보 내용 조회
 *
 * <pre>
 * // id가 "selectID"인 select tag에 코드테이블의 그룹아이디가 "100"인 리스트를 들고와 콤보를 생성
 * fnComReadCheck( "100", "selectID" );
 * // 위의 예제와같이 콤보를 생성하는 것은 동일하나 select tag에서 selected된 선택항목을 기본으로 보여준다.
 * fnComReadCheck( "100", "selectID", "선택항목" );
 * // 상세코드 내용을 관리속성내용으로 구분하여 코드 항목을 선택적으로 보여준다.
 * fnComReadCheck( "100", "selectID", "선택항목", "10", "20");
 * fnComReadCheck( "100", "selectID", "선택항목", "10,11,12", "20,21,22");
 * </pre>
 *
 * @param {String} code - [필수] 공통코드. NSS_CODE_GROUP_SNR_DVS_CD와 같은 상수를 사용한다.
 * @param {String} id - [필수] select 태그 ID
 * @param {String} defValue - [선택] selected 항목 value, 여러개의 selected데이터도 받는다. "21,22,23,24" 와 같은 형태로 넘겨주면된다.
 * @param {String} mngAttrCtt1 - [선택] 관리속성내용1 (컴머로 구분지어 여러개의 값을 넘길 수 있다)
 * @param {String} mngAttrCtt2 - [선택] 관리속성내용2 (컴머로 구분지어 여러개의 값을 넘길 수 있다)
 * @param {Boolean} asyncReq - [선택] 동기/비동기 설정
 * @return {void}
 *
 * @constructor jysong 2013.10.24, 수정 조준희 2013.10.28
 **/
function fnComReadCheck( code, id, defValue, mngAttrCtt1, mngAttrCtt2, asyncReq) {
    if( mngAttrCtt1 == undefined ) mngAttrCtt1 = "";
    if( mngAttrCtt2 == undefined ) mngAttrCtt2 = "";
    if( asyncReq == undefined ) asyncReq = true; // default

    var param = "";
    if( mngAttrCtt1 == "" && mngAttrCtt2 == "" ) param = "codeGroup="+code;
    else param = "codeGroup="+code+"&mngAttrCtt1="+mngAttrCtt1+"&mngAttrCtt2="+mngAttrCtt2;

    $.ajax({
        type:"GET",
        url:KSCC_AJAX_READ_COMBO_CODE,
        data:param,
        async : asyncReq,
        success:function(xml){
            var arr = "";
            if( defValue != undefined && defValue != "" ) arr = defValue.split(",");
            $(xml).find( "option" ).each(function(){
                var attrValue = "";
                $.each(this.attributes, function(i, attrib){
                    attrValue = attrib.value;
                });
                var str = $(this).text().replace(/(^\s*|\s*$)/g, '');
                $("."+id).append("<input id='"+id+attrValue+"' name='"+id+"' type='checkbox' value='"+ attrValue +"'><label for='"+id+attrValue+"'>"+ str +"</label></input>");
                if( arr.length > 1 ){
                    for( var i=0; i<arr.length; i++){
                        if( arr[i] == attrValue )
                            $("input[name='"+id+"']").filter("input[value='"+arr[i]+"']").prop("checked", true);
                    }
                }
            });
            if( defValue != undefined && defValue != "" )
                $("input[name='"+id+"']").filter("input[value='"+defValue+"']").prop("checked", true);
        },
        error:function(xhr,status,error){
            alert(xhr.status);
            alert(status);
            alert(error);
        }
    });
}

/**
 * [AJAX] 라디오버튼 콤보 내용 조회
 *
 * <pre>
 * // id가 "selectID"인 select tag에 코드테이블의 그룹아이디가 "100"인 리스트를 들고와 콤보를 생성
 * fnComReadRadio( "100", "selectID" );
 * // 위의 예제와같이 콤보를 생성하는 것은 동일하나 select tag에서 selected된 선택항목을 기본으로 보여준다.
 * fnComReadRadio( "100", "selectID", "선택항목" );
 * // 상세코드 내용을 관리속성내용으로 구분하여 코드 항목을 선택적으로 보여준다.
 * fnComReadRadio( "100", "selectID", "선택항목", "10", "20");
 * fnComReadRadio( "100", "selectID", "선택항목", "10,11,12", "20,21,22");
 * </pre>
 *
 * @param {String} code - [필수] 공통코드. NSS_CODE_GROUP_SNR_DVS_CD와 같은 상수를 사용한다.
 * @param {String} id - [필수] select 태그 ID
 * @param {String} defValue - [선택] selected 항목 value
 * @param {String} mngAttrCtt1 - [선택] 관리속성내용1 (컴머로 구분지어 여러개의 값을 넘길 수 있다)
 * @param {String} mngAttrCtt2 - [선택] 관리속성내용2 (컴머로 구분지어 여러개의 값을 넘길 수 있다)
 * @param {Boolean} asyncReq - [선택] 동기/비동기 설정
 * @return {void}
 *
 * @constructor jysong 2013.10.24, 수정 - 조준희 2013.10.28
 **/
function fnComReadRadio( code, id, defValue, mngAttrCtt1, mngAttrCtt2, asyncReq) {
    if( mngAttrCtt1 == undefined ) mngAttrCtt1 = "";
    if( mngAttrCtt2 == undefined ) mngAttrCtt2 = "";
    if( asyncReq == undefined ) asyncReq = true; // default

    var param = "";
    if( mngAttrCtt1 == "" && mngAttrCtt2 == "" ) param = "codeGroup="+code;
    else param = "codeGroup="+code+"&mngAttrCtt1="+mngAttrCtt1+"&mngAttrCtt2="+mngAttrCtt2;

    $.ajax({
        type:"GET",
        url:KSCC_AJAX_READ_COMBO_CODE,
        data:param,
        async : asyncReq,
        success:function(xml){
            $(xml).find( "option" ).each(function(){
                var attrValue = "";
                $.each(this.attributes, function(i, attrib){
                    attrValue = attrib.value;
                });
                var str = $(this).text().replace(/(^\s*|\s*$)/g, '');
                $("."+id).append("<input id='"+id+attrValue+"' name='"+id+"' type='radio' value='"+ attrValue +"'><label for='"+id+attrValue+"'>"+ str +"</label></input>");
            });
            if( defValue != undefined && defValue != "" ){
                $("input[name='"+id+"']").filter("input[value='"+defValue+"']").prop("checked", true);
                //$("#"+id).val(defValue).attr("selected", "selected");
            }
        },
        error:function(xhr,status,error){
            alert(xhr.status);
            alert(status);
            alert(error);
        }
    });
}

/**
 * 다건의 코드를 출력하고 선택할 수 있는 레이어 팝업을 생성한다.
 *
 * 작성자 : 이윤기 2014.04.04
 *
 * (인자)
 * @param {Object} Object
 * [id] - [필수] input 태그의 ID
 * [codeList] - [필수] 출력할 목록 데이터를 담은 javascript 개체. { "1" : { "code" : "105", "value" : "마을버스" }, "2" : { "code" : "120", "value" : "지선버스" }, ... } 형식으로 넘겨야 한다.
 * [hiddenId] - [선택] 선택한 값을 저장할 hidden input의 ID. 값을 안 넘기면 id 값을 이용해 자동으로 생성한다. hidden input 태그가 없으면 동적으로 생성한다.
 * [name] - [선택] 서버로 넘길 항목명. hidden input의 name값이 된다.
 * [width] - [선택] 레이어 팝업의 폭
 * [height] - [선택] 레이어 팝업의 높이
 * [codeName] - [선택] codeList로 넘긴 json에서 코드의 키값. 기본값은 "code"
 * [labelName] - [선택] codeList로 넘긴 json에서 레이블의 키값. 기본값은 "value"
 * [selectAllTextType] - [선택] 'count' 이면 모두 선택한 경우 "xxx 외 n 건"이라고 보여주고 'text' 이면 "전체"로 보여준다. 기본값은 'text'이다.
 * [initValue] - [선택] 선택할 값 목록을 배열로 넘긴다. 'all'을 넘기면 전체를 선택한다. 'none'을 넘기면 하나도 선택하지 않는다.
 *
 * @return {void}
 *
 * @constructor 이윤기 2014.04.04
 */
function fnComMComboInit( param ) {
    var inputId = param["id"];
    var inputName = param["name"] || inputId;
    var hiddenInputId = param["hiddenId"] || inputId +"_hidden";
    var width = param["width"] || 250;
    var height = param["height"] || 360;
    var codeName = param["codeName"] || "code";
    var labelName = param["labelName"] || "value";
    var selectAllTextType = param["selectAllTextType"] || 'text'; // 'count' or 'text'
    var codeList = param["codeList"];
    var initValue = param["initValue"];
    var divId = inputId +"_layerPup";
    // HTML 조립
    var divHtml = '<div id="'+ divId +'" class="ui-widget-content ui-corner-all"'
        +' style="width: '+ width +'px; height: '+ height +'px; position: absolute; z-index:1; padding: 0.4em; display:none;"'
        +' selectAllTextType="'+ selectAllTextType +'"'
        +' hiddenInputId="'+ hiddenInputId +'">'
        +'<div style="overflow-y: auto; overflow-x: hidden; height: '+ (height - 40) +'px; margin-bottom: 10px;">';

    $.each(codeList, function(idx) {
        var thisCbId = inputId +"CbItems_"+ this[codeName];
        divHtml += '<input type="checkbox" id="'+ thisCbId +'" name="'+ inputId +'CbItems" value="'+ this[codeName] +'"'
            +' onclick="fnComMComboSelect(\''+ inputId +'\');" />'
            +'<label for="'+ thisCbId +'">'+ this[labelName] +'</label><br />';
    });

    divHtml += '</div>\n<center>\n'
        +'<span class="Lbtn"><a onclick="fnComMComboSelect(\''+ inputId +'\', \'all\'); return false;" href="#">전체선택</a></span>\n'
        +'<span class="Lbtn"><a onclick="fnComMComboSelect(\''+ inputId +'\', \'clear\'); return false;" href="#">초기화</a></span>\n'
        +'<span class="Lbtn"><a onclick="fnComMComboToggle(\''+ inputId +'\'); return false;" href="#">닫기</a></span>\n'
        +'</center></div>';
    // 레이어를 body에 붙임
    $(divHtml).appendTo($("body"));
    // 선택 값을 저장할 hidden input 생성
    $hidInput = $("#"+ hiddenInputId);
    if( $hidInput.length == 0 ) {
        var hidHtml = '<input id="'+ hiddenInputId +'" name="'+ inputName +'" type="hidden" />';
        $(hidHtml).appendTo($("#"+ inputId).parent());
    }
    // 체크박스 초기화
    if( initValue ) {
        fnComMComboSelect( inputId, initValue );
    }
}

/**
 * 레이어 팝업을 보이거나 숨긴다.
 *
 * @param {String} id - [필수] input 태그의 ID
 * @return {Boolean} true/false
 *
 * @constructor 이윤기 2014.04.04
 */
function fnComMComboToggle( id ) {
    var divId = id +"_layerPup";
    // 레이어 위치 계산
    var top  = $("#"+ id).offset().top + $("#"+ id).outerHeight();
    var left = $("#"+ id).offset().left;

    var winWidth = $(window).width();
    var endPosition = winWidth - ( $("#"+ id).offset().left + $("#"+ id).width() );
    endPosition = winWidth - ( endPosition + $("#"+ divId).width() );

    var calInputPosition = winWidth - left;
    if( $("#"+ divId).width() >= calInputPosition ) {
        left = endPosition - 10;
    }
    $("#"+ divId).css({"position":"absolute", "float":"left", "top" : top+4, "left": left });
    // 레이어 Show/Hide
    $("#"+ divId).toggle(250);
    return false;
}

/**
 * 레이어 팝업을 보이거나 숨긴다.
 *
 * @param {String} id - [필수] input 태그의 ID
 * @param {String} type
 * [필수] 배열이나 문자열을 넘겨서 어떤 값을 선택할지 알려준다.
 * 배열 : 선택할 값들을 나열
 * 문자열 : 모두 선택이면 'all', 모두 미선택이면 'none'
 * @return {void}
 *
 * @constructor 이윤기 2014.04.04
 */
function fnComMComboSelect( id, type ) {
    var divId = id +"_layerPup";
    var $div = $("#"+ divId);
    var $checkbox = $div.find(":checkbox");
    if( $.type(type) == "array" ) {
        $checkbox.each(function() {
            if( StringUtil.contains(type, $(this).val()) ) {
                $(this).prop("checked", true);
            }
        });
    }
    else {
        type = ( type ? type.toLowerCase() : '' );
        if( type == "all" ) {
            $checkbox.prop("checked", true);
        }
        else if( type == "clear" || type == "none" ) {
            $checkbox.prop("checked", false);
        }
    }
    var $checked = $div.find(":checked");
    var $input = $("#"+ id);
    var selectAllTextType = $div.attr("selectAllTextType").toLowerCase();
    var hiddenInputId = $div.attr("hiddenInputId");
    var checkboxCnt = $checkbox.length;
    var checkedCnt = $checked.length;
    var firstLabel = "";
    var hiddenValue = "";
    $checked.each(function(idx) {
        if( idx == 0 ) firstLabel = $checked.eq(0).next().text();
        hiddenValue += ( idx > 0 ? "," : "" ) + $(this).val();
    });
    var countLabel = firstLabel + ( checkedCnt < 2 ? "" : " 외 "+ (checkedCnt - 1) +"건" );
    // hidden input에 선택값 입력
    $("#"+ hiddenInputId).val(hiddenValue);
    // 화면에 선택값 텍스트 출력
    if( checkedCnt == 0 ) {
        $input.val("");
    }
    else if( checkboxCnt == checkedCnt ) {
        if( selectAllTextType == "text" ) {
            $input.val("전체");
        }
        else if( selectAllTextType == "count" ) {
            $input.val(countLabel);
        }
    }
    else {
        $input.val(countLabel);
    }
}

/**
 * 레이어 팝업에서 선택된 값들을 얻어온다.
 *
 * <pre>
 * 콤마로 구분된 문자열 형식으로 반환된다.
 * </pre>
 *
 * @param {String} id - [필수] input 태그의 ID
 * @return {String} 선택된 값
 * @example "105,120,120,121"
 * @constructor 이윤기 2014.04.04
 */
function fnComMComboGetValue( id ) {
    var divId = id +"_layerPup";
    var $div = $("#"+ divId);
    var hiddenInputId = $div.attr("hiddenInputId");
    return $("#"+ hiddenInputId).val();
}

/**
 * 레이어 팝업을 닫는다.
 *
 * @param {String} id - [필수] input 태그의 ID
 * @return {void}
 * @constructor 이윤기 2014.04.04
 */
function fnComMComboClose( id ) {
    var divId = id +"_layerPup";
    $("#"+ divId).hide();
}
