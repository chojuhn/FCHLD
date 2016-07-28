//*******************************************************************************************
// Date function
//*******************************************************************************************

/*** Custom Event ***/
var KSCC_EVENT_DATE_PICKER = "ksccEvDatePicker"; // datePicker 값이 변경되거나 blur이벤트가 발생

/*
 * 데이트피커 공휴일 설정
 * 작성자 : jysong 2014.03.21
 */
var holidays = [
{date:"0101",title:"신정",year:""},
{date:"0301",title:"삼일절",year:""},
{date:"0301",title:"삼일절",year:""},
{date:"0405",title:"식목일",year:""},
{date:"0505",title:"어린이날",year:""},
{date:"0606",title:"현충일",year:""},
{date:"0815",title:"광복절",year:""},
{date:"1003",title:"개천절",year:""},
{date:"1009",title:"한글날",year:""},
{date:"1225",title:"크리스마스",year:""},
{date:"0208",title:"설날",year:"2005"},{date:"0209",title:"설날",year:"2005"},{date:"0210",title:"설날",year:"2005"},{date:"0128",title:"설날",year:"2006"},
{date:"0129",title:"설날",year:"2006"},{date:"0130",title:"설날",year:"2006"},{date:"0217",title:"설날",year:"2007"},{date:"0218",title:"설날",year:"2007"},
{date:"0219",title:"설날",year:"2007"},{date:"0206",title:"설날",year:"2008"},{date:"0207",title:"설날",year:"2008"},{date:"0208",title:"설날",year:"2008"},
{date:"0125",title:"설날",year:"2009"},{date:"0126",title:"설날",year:"2009"},{date:"0127",title:"설날",year:"2009"},{date:"0213",title:"설날",year:"2010"},
{date:"0214",title:"설날",year:"2010"},{date:"0215",title:"설날",year:"2010"},{date:"0202",title:"설날",year:"2011"},{date:"0203",title:"설날",year:"2011"},
{date:"0204",title:"설날",year:"2011"},{date:"0122",title:"설날",year:"2012"},{date:"0123",title:"설날",year:"2012"},{date:"0124",title:"설날",year:"2012"},
{date:"0209",title:"설날",year:"2013"},{date:"0210",title:"설날",year:"2013"},{date:"0211",title:"설날",year:"2013"},{date:"0130",title:"설날",year:"2014"},
{date:"0131",title:"설날",year:"2014"},{date:"0201",title:"설날",year:"2014"},{date:"0218",title:"설날",year:"2015"},{date:"0219",title:"설날",year:"2015"},
{date:"0220",title:"설날",year:"2015"},{date:"0207",title:"설날",year:"2016"},{date:"0208",title:"설날",year:"2016"},{date:"0209",title:"설날",year:"2016"},
{date:"0917",title:"추석",year:"2005"},{date:"0918",title:"추석",year:"2005"},{date:"0919",title:"추석",year:"2005"},{date:"1005",title:"추석",year:"2006"},
{date:"1006",title:"추석",year:"2006"},{date:"1007",title:"추석",year:"2006"},{date:"0924",title:"추석",year:"2007"},{date:"0925",title:"추석",year:"2007"},
{date:"0926",title:"추석",year:"2007"},{date:"0913",title:"추석",year:"2008"},{date:"0914",title:"추석",year:"2008"},{date:"0915",title:"추석",year:"2008"},
{date:"1002",title:"추석",year:"2009"},{date:"1003",title:"추석",year:"2009"},{date:"1004",title:"추석",year:"2009"},{date:"0921",title:"추석",year:"2010"},
{date:"0922",title:"추석",year:"2010"},{date:"0923",title:"추석",year:"2010"},{date:"0911",title:"추석",year:"2011"},{date:"0912",title:"추석",year:"2011"},
{date:"0913",title:"추석",year:"2011"},{date:"0929",title:"추석",year:"2012"},{date:"0930",title:"추석",year:"2012"},{date:"1001",title:"추석",year:"2012"},
{date:"0918",title:"추석",year:"2013"},{date:"0919",title:"추석",year:"2013"},{date:"0920",title:"추석",year:"2013"},{date:"0907",title:"추석",year:"2014"},
{date:"0908",title:"추석",year:"2014"},{date:"0909",title:"추석",year:"2014"},{date:"0926",title:"추석",year:"2015"},{date:"0927",title:"추석",year:"2015"},
{date:"0928",title:"추석",year:"2015"},{date:"0914",title:"추석",year:"2016"},{date:"0915",title:"추석",year:"2016"},{date:"0916",title:"추석",year:"2016"},
{date:"0515",title:"석가탄신일",year:"2005"},{date:"0505",title:"석가탄신일",year:"2006"},{date:"0524",title:"석가탄신일",year:"2007"},{date:"0512",title:"석가탄신일",year:"2008"},
{date:"0502",title:"석가탄신일",year:"2009"},{date:"0521",title:"석가탄신일",year:"2010"},{date:"0510",title:"석가탄신일",year:"2011"},{date:"0528",title:"석가탄신일",year:"2012"},
{date:"0517",title:"석가탄신일",year:"2013"},{date:"0506",title:"석가탄신일",year:"2014"},{date:"0525",title:"석가탄신일",year:"2015"},{date:"0514",title:"석가탄신일",year:"2016"}
];

/**
 * 달력 기본 설정
 *
 * @return {void}
 * @constructor jysong 2013.11.01
 **/
function fnComDatePickerSetDefaults(){
    // 한글 설정
    $.datepicker.setDefaults(
        $.datepicker.regional['ko'] = {
            closeText: '',
            prevText: '이전달',
            nextText: '다음달',
            currentText: '오늘',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNames: ['일','월','화','수','목','금','토'],
            dayNamesShort: ['일','월','화','수','목','금','토'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            weekHeader: 'Wk',
            dateFormat: 'yy-mm-dd',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '년'
        }
    );

    // 기본 설정
    $.datepicker.setDefaults({
        showButtonPanel: true,
        closeText : "",
        dateFormat: 'yy-mm-dd',
        beforeShowDay: function (date) {
            var result, hTitle="", hYear="";
            var thisYear = $.datepicker.formatDate("yy", date);
            var thisMMDD = $.datepicker.formatDate("mmdd", date);
            // 공휴일 찾아 입력 세팅
            var holiday = $.grep(holidays, function(obj){
                return (obj.date == thisMMDD && (obj.year == thisYear || obj.year == "") );
            });
            if( holiday.length > 0 ){
                $.each(holiday, function(){
                    hTitle += (hTitle==""?"":"\n")+this.title;
                    hYear = this.year;
                });
            }
            // 주말처리
            switch (date.getDay()) {
                case 0: // 일요일 일 때
                    result = [true, "oddsun"];
                    break;
                case 6: // 토요일 일 때
                    result = [true, "oddsat"];
                    break;
                default:
                    result = [true, ""];
                    break;
            }
            // 휴일일때
            if (hTitle) {
                if(thisYear == hYear || hYear == "") {
                    result = [true, "oddsun", hTitle];
                }
            }
            return result;
        },
        changeYear: true,
        changeMonth: true,
        showMonthAfterYear: true,
        showOn: "both",
        beforeShow: function (input, inst) {
            $(this).focus(function() {
                var value = $(this).val();
                $(this).attr("maxlength", 8);
                value = value.replace(/-/g, '');
                $(this).val(value);
                // 브라우저별 사이즈 변경 코드 입력
                var browserinfo = fnComBrowserCheck();
                // 포커스시 선택반전 : IE일때에는 focus에도 넣어줘야한다.(크롬 파폭은 포커스시 반전됨)
                if( browserinfo.match("^MSIE") ){
                    $(this).select();
                }
            });
            $(this).css("ime-mode", "disabled");
            $(this).keydown(function(e) {
                $(this).fnComRegExpHangulForChrome(e);
                fnComFilterKeyEvent(e, "number");
            });
            if( $(this).val().length >= 8 )
                $(this).datepicker('setDate', fnComFormatDate($(this).val()));
        },
        onClose: function(dateText, inst) {
            var value = $(this).val();
            value = value.replace(/[-]/g, '');
            $(this).val(fnComFormatDate(value));
        }
    });
}

/**
 * 두개의 달력 생성
 *
 * @param {String} div1_text : 첫번째 달력 입력용 input id
 * @param {String} div2_text : 두번째 달력 입력용 input id
 * @return {void}
 * @example fnComInitTwoCalendar( "date1", "date1" );
 *
 * @constructor jysong 2013.09.30
 **/
function fnComInitTwoCalendar( div1_text, div2_text ) {
    var evtClick1 = 0;
    var evtClick2 = 0;

    // 브라우저별 사이즈 변경 코드 입력
    var browserinfo = fnComBrowserCheck();
    if( browserinfo.match("^Firefox") ){
        $( "#"+div1_text ).attr("size","11");
        $( "#"+div2_text ).attr("size","11");
    } else {
        $( "#"+div1_text ).attr("size","10");
        $( "#"+div2_text ).attr("size","10");
    }

    // 벨리데이션 공통화를 위해 hasDatepicker를 얹혀준다.
    $( "#"+div1_text ).addClass("hasDatepicker");
    $( "#"+div2_text ).addClass("hasDatepicker");

    // 달력레이어와 버튼이미지를 생성한다.
    var div1 = div1_text+"_div";
    var div2 = div2_text+"_div";
    var button1_id = div1+"_btn";
    var button2_id = div2+"_btn";
    var cenLayer = div1_text+"_lay";
    var xbutton = div1_text+"_xbtn";

    // 달력레이어로 사용될 div를 바디에 append한다. data-checkid는 두개이상 그리드의 중앙레이어 조절을 위한 코드임
    $('body').append("<div id='"+div1+"' style='z-index:100' class='hideClsChk' data-checkid='"+div1+","+div2+","+cenLayer+"' />");
    $('body').append("<div id='"+div2+"' style='z-index:100' class='hideClsChk' data-checkid='"+div1+","+div2+","+cenLayer+"' />");

    $('body').append("<div id='"+cenLayer+"' class='datePickerDash'><div>~</div></div>");
    $('body').append("<label id='"+xbutton+"' class='datePickerCloseBtn' />");

    // 버튼을 위의 달력레이어 바로 옆에 append한다.
    var btn1 = $("<span id="+button1_id+" />").addClass("ui-datepicker-trigger");
    $("<a href='javascript:;' tabindex='-1' />").append(btn1).insertAfter($("#"+div1_text));
    var btn2 = $("<span id="+button2_id+" />").addClass("ui-datepicker-trigger");
    $("<a href='javascript:;' tabindex='-1' />").append(btn2).insertAfter($("#"+div2_text));

    $("#"+div1_text+", #"+div2_text)
        .css("ime-mode", "disabled")
        .keydown(function(e) {
            fnComFilterKeyEvent(e, "number");
        })
        .on("blur", function(e) {
            // 2014.07.25 이윤기 : Custom Event 발생
            $(this).trigger(KSCC_EVENT_DATE_PICKER, [ this.id, $(this).val().replace(/-/g, '') ]);
        });

    // 첫번째 달력을 설정한다.
    $( "#"+div1 ).datepicker( {
        onSelect: function(dateText, inst) {
            $("#"+div1_text).val(dateText);
            var compare1 = dateText.replace(/-/g, '');
            var compare2 = $("#"+div2_text).val().replace(/-/g, '');
            if( compare1 <= compare2 || $("#"+div2_text).val() == "" ) {
                evtClick1++;
                if( evtClick1 > 0 && evtClick2 > 0 ){
                    evtClick1 = 0; evtClick2 = 0;
                    $( "#"+div1 ).hide();
                    $( "#"+div2 ).hide();
                    $( "#"+xbutton ).hide();
                    $( "#"+cenLayer ).hide();
                }
            } else {
                evtClick1 = 0;
                $("#"+div1_text).val("");
            }
            // 2014.07.25 이윤기 : Custom Event 발생
            $("#"+div1_text).trigger(KSCC_EVENT_DATE_PICKER, [ div1_text, $("#"+div1_text).val().replace(/-/g, '') ]);
        }
    }).hide();

    // 두번째 달력을 설정한다.
    $( "#"+div2 ).datepicker( {
        onSelect: function(dateText, inst) {
            $("#"+div2_text).val(dateText);
            var compare1 = dateText.replace(/-/g, '');
            var compare2 = $("#"+div1_text).val().replace(/-/g, '');
            if( compare1 >= compare2 ) {
                evtClick2++;
                if( evtClick1 > 0 && evtClick2 > 0 ){
                    evtClick1 = 0; evtClick2 = 0;
                    $( "#"+div1 ).hide();
                    $( "#"+div2 ).hide();
                    $( "#"+xbutton ).hide();
                    $( "#"+cenLayer ).hide();
                }
            } else {
                evtClick2 = 0;
                $("#"+div2_text).val("");
            }
            // 2014.07.25 이윤기 : Custom Event 발생
            $("#"+div2_text).trigger(KSCC_EVENT_DATE_PICKER, [ div2_text, $("#"+div2_text).val().replace(/-/g, '') ]);
        }
    }).hide();

    // 클릭이벤트를 입력받을 버튼이나 인풋값들을 지정한다.
    var click_obj = "#"+div1_text+","+"#"+div2_text;
    if( button1_id != "" ) click_obj += ",#"+button1_id;
    if( button2_id != "" ) click_obj += ",#"+button2_id;

    // 클릭이벤트
    $(click_obj).click(function(e) {
        $( ".hideClsChk").hide();
        $( ".datePickerDash" ).hide();
        $( ".monthPicker" ).hide();
        $( ".datePickerCloseBtn" ).hide();

        if( $("#"+div1_text).val().length >= 8 )
            $("#"+div1).datepicker('setDate', fnComFormatDate($("#"+div1_text).val()));
        if( $("#"+div2_text).val().length >= 8 )
            $("#"+div2).datepicker('setDate', fnComFormatDate($("#"+div2_text).val()));

        var top  = $("#"+div1_text).offset().top + $("#"+div1_text).outerHeight();
        var left = $("#"+div1_text).offset().left;
        var left2= left + $("#"+div1).outerWidth();

        var div1Height = parseInt($("#"+div1).outerHeight());
        var div2Height = parseInt($("#"+div2).outerHeight());
        $("#"+cenLayer).css("width", $("#"+div1).outerWidth()*2+23);
        $("#"+cenLayer).css("height", (div2Height>div1Height?div2Height:div1Height)+5);

        // div1_text의 위치대로 포지션을 이동하는 코드
        var winWidth = $( window ).width();
        var endPosition = winWidth - ($("#"+div2_text).offset().left + $("#"+div2_text).width());
        endPosition = winWidth - (endPosition + $("#"+cenLayer).width());
        var calInputPosition = winWidth - left;
        if( $("#"+cenLayer).width() >= calInputPosition  ){
            left = endPosition + 25;
            left2 = endPosition + $("#"+div1).outerWidth() + 25;
        }

        $("#"+cenLayer).css({"position":"absolute", "float":"left", "top" : top, "left": left });
        $("#"+div1    ).css({"position":"absolute", "float":"left", "top" : top+5, "left": left+5});
        $("#"+div2    ).css({"position":"absolute", "float":"left", "top" : top+5, "left": left2+20});
        $("#"+xbutton ).css({"position":"absolute", "top" : top+14, "left": left + $("#"+div1).outerWidth()*2 });

        $("#"+div1).toggle( "fade", 300);
        $("#"+div2).toggle( "fade", 300);
        $("#"+cenLayer).toggle("fade",300);
        $("#"+xbutton).toggle("fade",300);
        // 클릭시 선택반전
        $(this).select();

        return false;
    });

    $(click_obj).blur(function() {
        var value = $(this).val();
        value = value.replace(/[-]/g, '');
        $(this).val(fnComFormatDate(value));
    });

    $(click_obj).focus(function() {
        var value = $(this).val();
        $(this).attr("maxlength", 8);
        value = value.replace(/-/g, '');
        $(this).val(value);
        // 포커스시 선택반전 : IE일때에는 focus에도 넣어줘야하며 focus에만 있어도 된다.(크롬 파폭은 포커스시 반전되며 focus에만 넣는다도 되진 않는다.)
        if( browserinfo.match("^MSIE") ){
            $(this).select();
        }
    });

    // 닫히는 옵션(blur 에 넣어서는 안먹음 인라인 달력에서는 이렇게 별도로 써야함)
    $(document).on("click keydown", function(e) {
        var keyCheck = false;
        var key = $.ui.keyCode;
        var keyCode = e.keyCode || e.which;
        switch( keyCode ) {
            case key.TAB:
                keyCheck = true;break;
            case key.ESCAPE:
                keyCheck = true;break;
            default:break;
        }
        var elem = $(e.target);
        if( keyCheck ||
            (elem.attr('type') == "text" && (elem.attr("id") != div1_text) && (elem.attr("id") != div2_text)) ||
            !elem.hasClass("hasDatepicker") &&
            !elem.hasClass("ui-datepicker") &&
            !elem.hasClass("ui-icon") &&
            !elem.hasClass("ui-datepicker-next") &&
            !elem.hasClass("ui-datepicker-prev") &&
            !(elem.attr("id") == div1_text) &&
            !(elem.attr("id") == div2_text) &&
            !((button1_id == "") ? false : (elem.attr("id") == button1_id)) &&
            !((button2_id == "") ? false : (elem.attr("id") == button2_id)) &&
            !$(elem).parents(".ui-datepicker").length) {
                $( ".hideClsChk").hide();
                $( ".datePickerDash" ).hide();
                $( ".datePickerCloseBtn" ).hide();
        }
    });
}

/**
 * 월 달력
 *
 * @param {Object} Object - 사용할 객체
 * @param {String} dateValue - 외부입력 년달(yyyymm)
 * @example
 * $("#test").monthpicker(); => "test" id값을 가지는 input값(text type)
 * $("#test").monthpicker("2013-11"); => "test" id값을 가지는 input값(text type), 기본날짜를 2013년 11월로 세팅
 * @return {void}
 *
 * @constructor jysong 2013.10.25
 **/
$.fn.monthpicker = function(dateValue) {
     var pickerName = this.attr("id");

    // 브라우저별 사이즈 변경 코드 입력
    var browserinfo = fnComBrowserCheck();
    if( browserinfo.match("^Firefox") ) this.attr("size","8");
    else this.attr("size","7");

    // 벨리데이션 공통화를 위해 hasDatepicker를 얹혀준다.
    this.addClass("hasDatepicker");

    var pickerDiv = pickerName+"_div";
    var button_id = pickerName+"_btn";
    var xbutton = pickerName+"_xbtn";
    var drawYear = new Date().getFullYear();
    var drawMonth = new Date().getMonth()+1; // 기본적으로 getMonth는 -1된 값을 가져온다.

    var inputVal = this.val();
    inputVal = inputVal.replace(/-/g, '');
    if( inputVal != undefined && inputVal != "" && inputVal.length >= 6 ) {
        drawYear = parseInt(inputVal.substring(0,4));
        drawMonth = parseInt(inputVal.substring(4,6));
    }

    var _dateValue = ( dateValue ? dateValue.replace(/-/g, '') : '' );
    if( _dateValue.length >= 6 ) {
        this.val(fnComFormatDateYYYYMM(_dateValue.substr(0,6)));
        drawYear = parseInt(_dateValue.substring(0,4));
        drawMonth = parseInt(_dateValue.substring(4,6));
    }

    // +10년 -10년 설정하는 부분
    var years = "c-10:c+10".split(':');
    var thisYear = new Date().getFullYear();
    var determineYear = function(value) {
        var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
                   (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
                   parseInt(value, 10)));
        return (isNaN(year) ? thisYear : year);
    };

    var year = determineYear(years[0]);
    var endYear = Math.max(year, determineYear(years[1] || ''));
    var yearshtml = "<select id='"+pickerName+"_year' name='"+pickerName+"_year' class='monthPicker_Year'>";
    for (; year <= endYear; year++) {
        yearshtml += '<option class="monthPicker_Year" value="' + year + '"' +
            (year == drawYear ? ' selected="selected"' : '') +
            '>' + year + '</option>';
    }
    yearshtml += "</select>";

    var htmlcode = "";
    htmlcode +="<div class='monthPicker' id='" + pickerDiv + "' style='display:none'>";
    htmlcode +="    <div class='monthpickerTop'>";
    htmlcode +="     <div class='yearSelect'>";
    htmlcode += yearshtml; // select tag
    htmlcode +="    </div>";
    htmlcode +=" </div>";
    htmlcode +=" <div class='monthpickerBottom' >";
    htmlcode +="     <table width='179' cellspacing='0' cellpadding='0'>";
    htmlcode +="       <tr>";
    for (var i=1; i<=12; i++) {
        htmlcode +="         <td name='"+pickerName+"_mon'><a href='javascript:;'>"+i+"월</a></td>";
        if( i==4 || i==8 ) {
            htmlcode +="</tr><tr>";
        }
    }
    htmlcode +="       </tr>";
    htmlcode +="     </table>";
    htmlcode +=" </div>";
    htmlcode +="</div>";

    // 달력 월 매핑
    var _pickerChangeClass = function(value) {
        $(".monthpickerBottom [name='"+pickerName+"_mon']").each(function(index){
            if( index+1 == value ){
                $(this).addClass("monthSelected");
            } else {
                $(this).removeClass("monthSelected");
            }
        });
    };

    _pickerChangeClass(drawMonth);

    $('body').append(htmlcode);
    $('body').append("<label id='"+xbutton+"' class='datePickerCloseBtn' />");
    var btn = $("<span id="+button_id+" />").addClass("ui-datepicker-trigger");
    this["after"]($("<a href='javascript:;' tabindex='-1' />").append(btn));

    // 년 셀렉트 박스 바꿀 때마다 달력 년 매핑
    $("#"+pickerName+"_year").change(function(){
        drawYear = $(this).val();
    });

    // 클릭이벤트
    $(".monthpickerBottom [name='"+pickerName+"_mon']").click(function(index) {
        var mon = $(this).text().replace("월","");
        if( parseInt(mon) < 10 ) mon = "0"+mon;
        $("#"+pickerName).val(drawYear+"-"+mon);
        // 2014.07.25 이윤기 : Custom Event 발생
        $("#"+pickerName).trigger(KSCC_EVENT_DATE_PICKER, [ pickerName, drawYear + mon ]);
    });

    $("#"+pickerName).blur(function() {
            var value = $(this).val();
            value = value.replace(/[-]/g, '').replace(/(\d{4})(\d{2})/, '$1-$2');
            $(this).val(value);
            // 2014.07.25 이윤기 : Custom Event 발생
            $(this).trigger(KSCC_EVENT_DATE_PICKER, [ this.id, $(this).val().replace(/-/g, '') ]);
            // 2014.07.25 이윤기 : 레이어 안의 연도 콤보 값도 변경
            drawYear = value.substr(0, 4);
        }).focus(function() {
            var value = $(this).val();
            $(this).attr("maxlength", 6);
            value = value.replace(/-/g, '');
            $(this).val(value);
            // 포커스시 선택반전 : IE일때에는 focus에도 넣어줘야하며 focus에만 있어도 된다.(크롬 파폭은 포커스시 반전되며 focus에만 넣는다도 되진 않는다.)
            if( browserinfo.match("^MSIE") ){
                $(this).select();
            }
        }).css("ime-mode", "disabled")
        .keydown(function(e) {
            fnComFilterKeyEvent(e, "number");
        });

    $("#"+pickerName+","+"#"+button_id).click(function(e) {
        $( ".hideClsChk").hide();
        $( ".datePickerDash" ).hide();
        $( ".monthPicker" ).hide();
        $( ".datePickerCloseBtn" ).hide();

        var $input = $("#"+pickerName);

        if( inputVal ) {
            drawYear = parseInt($input.val().substring(0,4));
            drawMonth = parseInt($input.val().substring(4,6));
        }
        // 인풋박스에 입력된 값으로 년월 세팅
        $("#"+pickerName+"_year").val(drawYear);
        _pickerChangeClass(drawMonth);

        var top  = $("#"+pickerName).offset().top + $("#"+pickerName).outerHeight();
        var left = $("#"+pickerName).offset().left;
        $("#"+pickerDiv ).css({"position":"absolute", "float":"left", "top" : top, "left": left});
        $("#"+xbutton ).css({"position":"absolute", "top" : top+10, "left": $("#"+pickerName).offset().left + $("#"+pickerDiv).outerWidth()-22 });

        $("#"+pickerDiv).toggle("fade", 300);
        $("#"+xbutton).toggle("fade",300);

        // 클릭시 선택반전
        $input.select();

        return false;
    });

    // 닫히는 옵션(blur 에 넣어서는 안먹힘)
    $(document).on("click keydown", function(e) {
        var keyCheck = false;
        var key = $.ui.keyCode;
        var keyCode = e.keyCode || e.which;
        switch( keyCode ) {
            case key.TAB:
                keyCheck = true;break;
            case key.ESCAPE:
                keyCheck = true;break;
            default:break;
        }
        var elem = $(e.target);
        if( keyCheck ||
            !elem.hasClass("monthPicker") &&
            !elem.hasClass("monthpickerBottom") &&
            !elem.hasClass("monthPicker_Year") &&
            !elem.hasClass("yearSelect") &&
            !(elem.attr("id") == pickerName) &&
            !((button_id == "") ? false : (elem.attr("id") == button_id)) ) {
                $(".monthPicker").hide();
                $(".datePickerCloseBtn").hide();
        }
    });
};

/**
 * Datepicker 달력의 날짜값 벨리데이션 체크(전체 체크)
 *
 * <pre>
 * 현재 이것을 안써도 된다. input에 class를 달아줘도 되도록 데브온 웹벨리데이터를 수정하였다.
 * </pre>
 *
 * @param {String} msg - 메시지스트링
 * @return {void}
 *
 * @constructor jysong 2013.10.29
 **/
function fnComDateValCheck(msg) {
    if( msg=="" || msg==undefined ) msg = "날짜값";
    if( $(".hasDatepicker").length > 0 ){
        $(".hasDatepicker").addClass("WV:"+msg+":true:");
    }
}

/**
 * 두개 날짜값 비교
 *
 * <pre>
 * (주의 : 두 값이 모두 id이거나 value이어야만 한다.)
 * </pre>
 *
 * @param {String} date1 - 첫번째 날짜값이 들어있는 id or value값
 * @param {String} date2 - 두번째 날짜값이 들어있는 id or value값
 * @example
 * id로 매핑 : fnComCompareDateChk("datepicker01", "datepicker02");
 * value으로 매핑 : fnComCompareDateChk("2013-01-01", "2013-01-31");
 * @return {Boolean} true/false
 *
 * @constructor jysong 2013.10.30
 **/
function fnComCompareDateChk(date1, date2){
    if( date1=="" || date1==undefined || date2=="" || date2==undefined ) return false;
    var compare1, compare2;
    if( $("#"+date1).length > 0 && $("#"+date2).length > 0 ){
        compare1 = $("#"+date1).val().replace(/-/g, '');
        compare2 = $("#"+date2).val().replace(/-/g, '');
    } else {
        compare1 = date1.replace(/-/g, '');
        compare2 = date2.replace(/-/g, '');
        if( !fnComIsNumber(compare1) && !fnComIsNumber(compare1) ) return false;
    }
    if( compare1 <= compare2 ) return true;
    return false;
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
 * 일자 시분초 입력용 input, select 화면 컨트롤 값을 초기화한다.
 *
 * 작성자 : 이윤기 2014.01.17
 */
function fnResetHHMMSS( id ) {
    var $dateInput = $("#"+ id);
    if( $dateInput ) {
        $dateInput.val("");
        if( $dateInput.hasClass("hasDatepicker") ) {
            $("#"+ id +"_div").datepicker('setDate', "");
        }
    }
    $("#"+ id +"HH, #"+ id +"MM, #"+ id +"SS").val("");
    $("#"+ id +"HH").prev("select").val("");
    $("#"+ id +"MM").prev("select").val("");
    $("#"+ id +"SS").prev("select").val("");
}

/**
 * 일자 시분초 입력용 input, select 화면 컨트롤에 값을 세팅하거나 초기화한다.
 *
 * 작성자 : 이윤기 2014.01.17
 *
 * (인자)
 * id : [필수] 일자 입력용 input 태그의 ID
 * value : [선택] 시간(6자리) or 일시
 *
 * (예제)
 * - id가 adptDate인 datePicker에 일자를 세팅하고, id가 adptDateHH, adptDateMM, adptDateSS인 input에 시분초를 세팅한다.
 *     fnNssSetHHMMSS( 'adptDate', '${input.adptDtm}' );
 * - 등록을 위해 일자를 지우고 시분초에 초기값 00을 세팅한다.
 *     fnNssSetHHMMSS( 'adptDate' );
 */
function fnSetHHMMSS( id, value ) {
    if( value ) {
        if( value.length <= 6 ) {
            $("#"+ id +"HH").val(value.substr(0, 2));
            $("#"+ id +"MM").val(value.substr(2, 2));
            $("#"+ id +"SS").val(value.substr(4, 2));
            $("#"+ id +"HH").prev("select").val(value.substr(0, 2));
            $("#"+ id +"MM").prev("select").val(value.substr(2, 2));
            $("#"+ id +"SS").prev("select").val(value.substr(4, 2));
        }
        if( value.length > 8 ) {
            var $dateInput = $("#"+ id);
            if( $dateInput ) {
                $dateInput.val(fnComFormatDate(value.substr(0, 8)));
                if( $dateInput.hasClass("hasDatepicker") ) {
                    $("#"+ id +"_div").datepicker('setDate', fnComFormatDate(value.substr(0, 8)));
                }
            }
            $("#"+ id +"HH").val(value.substr(8, 2));
            $("#"+ id +"MM").val(value.substr(10, 2));
            $("#"+ id +"SS").val(value.substr(12, 2));
            $("#"+ id +"HH").prev("select").val(value.substr(8, 2));
            $("#"+ id +"MM").prev("select").val(value.substr(10, 2));
            $("#"+ id +"SS").prev("select").val(value.substr(12, 2));
        }
    } else {
        $("#"+ id +"HH").val("00");
        $("#"+ id +"MM").val("00");
        $("#"+ id +"SS").val("00");
        $("#"+ id +"HH").prev("select").val("00");
        $("#"+ id +"MM").prev("select").val("00");
        $("#"+ id +"SS").prev("select").val("00");
        var $dateInput = $("#"+ id);
        if( $dateInput ) {
            $dateInput.val("");
            if( $dateInput.hasClass("hasDatepicker") ) {
                $("#"+ id +"_div").datepicker('setDate', "");
            }
        }
    }
}
