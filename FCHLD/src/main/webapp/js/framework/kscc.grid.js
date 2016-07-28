//*******************************************************************************************
// Jquery Grid function
//*******************************************************************************************

/**
 * [jqGrid] 항목숨기기 체크박스 체크된 값을 배열에 담기
 *
 * @param {String} checkName : 체크할 이름
 * @return {void}
 *
 * @constructor jysong 2013.09.30
 **/
var selectCol = [];
var nonSelectCol = [];
function fnComToggleHiddenCol( checkName ) {
    selectCol = [];
    nonSelectCol = [];
    if(checkName==""||checkName==undefined)
        checkName="colCheckbox";

    var id = $("[name="+checkName+"]").parent().prop("id");
    $("[name="+checkName+"]").each(function(){
        if ( $(this).is(":checked") ){
            selectCol.push( id+"_"+$(this).val() );
        } else {
            nonSelectCol.push( id+"_"+$(this).val() );
        }
    });
}

/**
 * [jqGrid] 항목숨기기 컬럼숨기기 / 취소 이벤트
 *
 * @param {String} btnId : 버튼아이디
 * @param {String} divId : 레이어아이디
 * @return {Boolean} true/false
 *
 * @constructor jysong 2013.09.30
 **/
function fnComHideShowBtn( btnId, divId ) {
    if(btnId==""||btnId==undefined)
        btnId="colShowBtn";
    if(divId==""||divId==undefined)
        divId="colHideOption";
    $(function() {
        var top  = $("#"+btnId).offset().top + $("#"+btnId).outerHeight();
        var left = $("#"+btnId).offset().left;

        var winWidth = $(window).width();
        var endPosition = winWidth - ($("#"+btnId).offset().left + $("#"+btnId).width());
        endPosition = winWidth - (endPosition + $("#"+divId).width());

        var calInputPosition = winWidth - left;
        if( $("#"+divId).width() >= calInputPosition  ){
            left = endPosition - 10;
        }
        $("#"+divId).css({"position":"absolute", "float":"left", "top" : top+4, "left": left });
        $("#"+divId).toggle(250);
    });
    return false;
}

/**
 * [jqGrid] 항목숨기기 적용버튼 클릭후 이벤트
 *
 * @param {String} tableId : 테이블아이디
 * @param {String} divId : 레이어아이디
 * @return {void}
 *
 * @constructor jysong 2013.09.30
 **/
function fnComItemHiding( tableId, divId ) {
    if(tableId==""||tableId==undefined)
        tableId = "gridList";
    if(divId==""||divId==undefined)
        divId = "colHideOption";
    var selCol = [];
    var nonCol = [];
    $.each(selectCol, function(i){
        if( this.split("_")[0] == divId ) selCol.push(this.replace(divId+"_",""));
    });
    $.each(nonSelectCol, function(i){
        if( this.split("_")[0] == divId ) nonCol.push(this.replace(divId+"_",""));
    });
    $("#"+tableId).jqGrid('showCol',nonCol);
    $("#"+tableId).jqGrid('hideCol',selCol);
    $("#"+divId).toggle(250);
    fnComUpdateSize(tableId);
}

/**
 * window의 크기 변경시 jqGrid의 폭도 변경되도록 resize이벤트에 핸들러 추가
 *
 * @param {String} jqGridId : 그리드아이디
 * @return {void}
 *
 * @constructor 이윤기 2013.09.25
 **/
function fnComBindEventResize( jqGridId ) {
    $(function() {
        $(window).bind('resize', function() {
            fnComUpdateSize(jqGridId);
        }).trigger('resize');
    });
}

/**
 * 그리드 사이즈 변경
 *
 * @param {String} jqGridId : 그리드아이디
 * @return {void}
 *
 * @constructor 이윤기 2013.09.25, 수정 jysong 2013.11.14
 **/
function fnComUpdateSize( jqGridId ) {
    if($("*").hasClass('ui-jqgrid')){
        var grids = $(".ui-jqgrid").toArray();
        for( var i=0; i < grids.length; i++){
            var gridId = $(grids[i]).prop("id").replace("gbox_", "");
            var gridValue = fnComGetGridValues(gridId);
            var autoResize = true;
            if( gridValue != undefined ) { autoResize = gridValue.autoResize; }
            if( autoResize ) {
                // 임의로 생성한 div로 가로 사이즈를 맞춤
                if( $("#blink_"+gridId).length != 0 ){
                    if( $("#blink_"+gridId).width() == 0 ){
                        var $curr = $("#gbox_"+gridId).parent();
                        var width = $curr.width();
                        if( (width == 0 || $curr.length == 0) && $(".ui-layout-center").length != 0 )
                            width = $(".ui-layout-center").width();
                        $("#"+gridId).jqGrid("setGridWidth", width);
                    } else {
                        $("#"+gridId).jqGrid("setGridWidth", $("#blink_"+gridId).width());
                    }
                } else {
                    $("<div id='blink_"+gridId+"' style='height:1px;' > </div>").insertBefore($(".ui-jqgrid"));
                    if( $("#blink_"+gridId).width() == 0 ){
                        var $curr = $("#gbox_"+gridId).parent();
                        var width = $curr.width();
                        if( width == 0 || $curr.length == 0 ) width = $(".ui-layout-center").width();
                        $("#"+gridId).jqGrid("setGridWidth", width);
                    } else {
                        $("#"+gridId).jqGrid("setGridWidth", $("#blink_"+gridId).width());
                    }
                }
            }
            // 헤더사이즈 조절
            fnComGridHeaderResize(gridId);
        }
    }
}

/**
 * [jqGrid] 그리드용 인자값들을 저장해둔 배열에서 그리드 아이디를 이용해 인자값을 가져온다.
 *
 * @param {String} gridId : 그리드아이디
 * @return {Array} array : 그리드 정보 배열
 *
 * @constructor jysong 2013.11.13
 **/
function fnComGetGridValues(gridId){
    // 반환할 그리드 인자값 배열
    var array = [];
    $.each(gridProp, function(i,value){
        if ( gridId == undefined ) {
            if( i == 0 ) {
                array.push({
                    url : value.url
                   ,gridId : value.gridId
                   ,mainId : value.mainId
                   ,pageId : value.pageId
                   ,rowsId : value.rowsId
                   ,totalId : value.totalId
                   ,paging : value.paging
                   ,customTotal : value.customTotal
                   ,autoResize : value.autoResize
                   ,pageInput : value.pageInput
                 });
            }
        } else {
            var gridIds = value.gridId;
            if( gridIds == gridId ) {
                array.push({
                   url : value.url
                  ,gridId : value.gridId
                  ,mainId : value.mainId
                  ,pageId : value.pageId
                  ,rowsId : value.rowsId
                  ,totalId : value.totalId
                  ,paging : value.paging
                  ,customTotal : value.customTotal
                  ,autoResize : value.autoResize
                  ,pageInput : value.pageInput
                });
            }
        }
    });
    return array[0];
}

/**
 * [jqGrid] 그리드를 최초로드
 *
 * (인자)
 * @param {String}  url       : json데이터를 가져올 서버 URL
 * @param {String}  gridId    : 그리드아이디
 * @param {String}  mainId    : 그리드에 사용할 메인아이디
 * @param {String}  pageId    : 현재페이지input ID
 * @param {String}  rowsId    : 한페이지에 보여줄 총 Row수 input ID
 * @param {String}  totalId   : 총 레코드 수 layer ID
 * @param {Object}  object    : 그리드의 각 필드 설정을 위한 colModel 배열
 * @param {Boolean} autoCheck : 자동으로 현재페이지id, 총Row수 Id, 총 레코드수 Id 생성 여부[true,false]
 * @param {Boolean} paging    : 페이징 유무 [true,false]
 * @return {void}
 *
 * @constructor jysong 2013.09.30
 */
function fnComInitGrid( url, gridId, mainId, pageId, rowsId, totalId, object, autoCheck, paging ) {
     $.each(object.colModel, function(i) {
         if( this.sortable != false ){
             object.colNames[i] = "<span class='sortText'>"+object.colNames[i]+"</span>";
         }
     });
     // 그리드 총계 구하는 옵션값
     var customTotal = "";
     if( object.customTotal != undefined ){
         customTotal = object.customTotal;
     }
     // 그리드 리사이즈 여부 옵션값
     var autoResize = true;
     if( object.autoResize != undefined ){
         autoResize = object.autoResize;
     }
     // 그리드 페이징 인풋 박스로 이동 옵션값
     var pageInput = false;
     if( object.pageInput != undefined ){
         pageInput = object.pageInput;
     }
     isPopulated = true;
     if( paging == undefined ) paging = true;
     // 그리드 사이즈 조절 꼼수용 div객체 ie7때문에 div사이에 반드시 공백(" ")을 넣어줘야 본 div의 사이즈를 읽어들인다.
     if( $("blink_"+gridId).length == 0 ) $("<div id='blink_"+gridId+"' style='height:1px;' > </div>").insertBefore($("#"+gridId));
     gridProp = $.grep(gridProp, function (value) {
         return value.gridId != gridId;
     });
     // 그리드용 인자값을 자동 세팅하길 원한다면
     if( autoCheck == true ) {
         var htmlcode = "";
         htmlcode += "<input type='hidden' id='"+gridId+"_page' name='"+gridId+"_page' value='1' />";
         if( object.rowListName != false ) htmlcode += "<h2>목록</h2>";
         htmlcode += "<select id='"+gridId+"_rows' id='"+gridId+"_rows'></select>건/페이지 ";
         htmlcode += "총 <label id='"+gridId+"_total'></label>건";
         if( htmlcode != "" ){
             var divPage = $("<div id='LblockPageSubtitle_"+gridId+"' class='LblockPageSubtitle' />");
             if( $("#LblockPageSubtitle_"+gridId).length == 0 ) divPage.html(htmlcode).insertBefore($("#"+gridId));
             else $("#LblockPageSubtitle_"+gridId).html(htmlcode);
         }
         // 그리드용 인자값 자동 세팅
         gridProp.push({
             url : url
            ,gridId : gridId
            ,mainId : mainId
            ,pageId : gridId+"_page"
            ,rowsId : gridId+"_rows"
            ,totalId : gridId+"_total"
            ,paging : paging
            ,customTotal : customTotal
            ,autoResize : autoResize
            ,pageInput : pageInput
        });
        gridCombo(gridId);
     } else {
         // 그리드용 인자값 세팅
         gridProp.push({
             url : url
            ,gridId : gridId
            ,mainId : mainId
            ,pageId : pageId
            ,rowsId : rowsId
            ,totalId : totalId
            ,paging : paging
            ,customTotal : customTotal
            ,autoResize : autoResize
            ,pageInput : pageInput
        });
        gridCombo(gridId);
     }
     $('#'+gridId).jqGrid(
         $.extend( fnComSetGridOptionRequest(gridId), object )
     );
}

/**
 * [jqGrid] 페이지당 행 수 콤보 내용 생성
 *
 * @param {String} gridId : 그리드아이디
 * @return {void}
 *
 * @constructor jysong 2013.11.13
 **/
function gridCombo(gridId){
    var gridValue = fnComGetGridValues(gridId);
    var $rowsSelect = $("#"+gridValue.rowsId);
    if( $rowsSelect != null && $rowsSelect.prop("type") == "select-one" ) {
        var paramRows = $rowsSelect.text();
        if( ! paramRows || paramRows.length == 0 ) paramRows = "15";
        var rowPerPage = parseInt(paramRows);
        $rowsSelect.find("option").remove();
        var newOptionHtml = "<option value='10'>10</option><option value='15'>15</option><option value='20'>20</option><option value='30'>30</option><option value='50'>50</option>";
        $rowsSelect.append(newOptionHtml);
        if( rowPerPage > 0 ) { // rows 값이 있는 경우 해당 옵션 선택
            $rowsSelect.find("option").removeAttr("selected");
            $rowsSelect.find("option[value="+ rowPerPage +"]").attr("selected", "selected");
        }
        $rowsSelect.change(function() {
            fnComReadGridList(1, null,gridId);
        });
    }
}

/**
 * [jqGrid] 기본 옵션 설정
 *
 * @param {String} gridId : 그리드아이디
 * @return {void}
 *
 * @constructor jysong 2013.09.30, 수정 jysong 2013.11.13
 **/
function fnComSetGridOptionRequest( gridId ) {
    var gridValue = fnComGetGridValues(gridId);
    var rowsVal = -1;
    if( gridValue.paging != false ) rowsVal = $("#"+gridValue.rowsId).val();
    return {
          mtype      : "POST"
        , url        : gridValue.url
        , datatype   : "json"
        , rowNum     : rowsVal
        , jsonReader : {
            root        : "rows",
            page        : "page",
            total       : "total",
            records     : "records",
            repeatitems : false,
            id          : gridValue.mainId
        }
        , beforeRequest: fnComBlockUI
        , loadError    : fnComJqGridEventLoadError
        , loadonce     : false
        , loadComplete : function(data) { fnComJqGridEventLoadComplete(gridValue.gridId, data); }
        , gridComplete : function() { fnComJqGridEventGridComplete(gridValue.gridId); }
        , page         : $("#"+gridValue.pageId).val()
        , pager        : "#"+ gridValue.gridId +"_nav"
        , autowidth    : gridValue.autoResize
        , height       : "100%"
        , viewrecords  : true
        , sortable     : true
        , gridview     : true
        , altRows      : true
        , altclass     : "evenRow"
        , loadui       : "disable"
        , autoencode   : true
    };
}

/**
 * [jqGrid] 그리드 Load Complete 이벤트 핸들러
 *
 * @param {String} gridId : 그리드아이디
 * @param {Object} data : Json결과 data
 * @return {void}
 *
 * @constructor jysong 2013.09.30, 수정 jysong 2013.11.13
 **/
function fnComJqGridEventLoadComplete( gridId, data ) {
	
    var gridValue = fnComGetGridValues(gridId);
    if( gridValue.paging == false ){
        var datatype = $("#"+gridId).jqGrid('getGridParam','datatype');
        if( datatype == "local" ) {
            var noResultMsg = fnComGetMessage("M005");
            var htmlcode = "<div id='NoResult_"+gridId+"' class='NoResult'><table><tr><th class='Lfirst'>"+noResultMsg+"</th></tr></table></div>";
            $("#"+gridId+"_nav").remove();
            $("<div id='"+gridId+"_nav'>").html(htmlcode).insertAfter($("#rs_m"+gridId));
        } else {
            var records = parseInt($("#"+gridId).getGridParam("records"));
            if( records == 0 ) {
                var noResultMsg = fnComGetMessage("M006");
                var htmlcode = "<div id='NoResult_"+gridId+"' class='NoResult'><table><tr><th class='Lfirst'>"+noResultMsg+"</th></tr></table></div>";
                $("#"+gridId+"_nav").remove();
                $("<div id='"+gridId+"_nav'>").html(htmlcode).insertAfter($("#rs_m"+gridId));
            } else {
                $("#"+gridId+"_nav").hide();
            }
        }
    } else {
        fnComGetPageHtml(gridValue.gridId, $("#"+ gridValue.rowsId).val(), true);
    }
    $("#"+ gridValue.totalId).html(fnComFormatNumber(parseInt($("#"+ gridValue.gridId).getGridParam("records"))));
    // 그리드 리사이즈
    fnComBindEventResize(gridValue.gridId);
    // 그리드 헤더 사이즈 조절(2단 헤더 사용시에만 적용된다)
    fnComGridHeaderResize(gridValue.gridId);
    // 그리드 총계함수 추가
    if( gridValue.customTotal != "" ){
        fnComGridAddRowSum(gridValue.gridId,gridValue.customTotal[0],gridValue.customTotal[1],gridValue.customTotal[2],gridValue.customTotal[3]);
    }
    // 개별 화면에 fnGridLoadComplete 함수가 구현되어 있으면 호출
    try{ fnGridLoadComplete(gridValue.gridId, gridValue.rowsId, gridValue.totalId, data); } catch(e) {}
    
    // BlockUI 언블록 처리
    fnComUnblockUI();
}

/**
 * [jqGrid] 그리드 Grid Complete 이벤트 핸들러
 *
 * @param {String} gridId : 그리드아이디
 * @return {void}
 *
 * @constructor 이윤기 2013.10.07
 **/
function fnComJqGridEventGridComplete( gridId ) {
    var gridValue = fnComGetGridValues(gridId);
    fnComJqGridSetHeight(gridValue.gridId);
    // 개별 화면에 fnGridGridComplete 함수가 구현되어 있으면 호출
    try{ fnGridGridComplete(gridValue.gridId, gridValue.rowsId, gridValue.totalId); } catch(e) {}
}

/**
 * [jqGrid] 페이지 네비게이터 생성
 *
 * @param {String} gridId : 그리드아이디
 * @param {String} pageRows : 페이지당 로우수
 * @param {Boolean} boolUsePaging : 페이징사용여부
 * @return {String} htmlcode : 만들어진 네비게이션 스트링
 *
 * @constructor jysong 2013.09.30, 수정 jysong 2013.11.13
 **/
function fnComGetPageHtml( gridId, pageRows, boolUsePaging ) {
    var gridValue = fnComGetGridValues(gridId);
    if( boolUsePaging == null ) boolUsePaging = true;
    var pageLink = 10; // 페이지 링크 열수
    var records = parseInt($("#"+gridId).getGridParam("records")); // 총 레코드수
    var curPage = parseInt($("#"+gridId).getGridParam("page"))-1; // 현재 페이지값(편의상 -1한다)
    var pageCount = ( records != 0 ? (parseInt((records - 1) / pageRows) + 1) : 0); // 전체 페이지수
    var prevPage = parseInt(curPage/pageLink)*pageLink; // 이전 페이지
    var htmlcode = "";
    // html삽입
    if( records != 0 ) {
        // 페이징을 사용하는 경우
        if( $("#NoResult_"+gridId).length != 0 ) $("#NoResult_"+gridId).hide();
        if( boolUsePaging ) {
            htmlcode +="<div class='LblockPaging'><ul>";
            if( pageCount > 10 && curPage+1 > 10 ) {
                if (curPage >= pageLink) {
                    htmlcode +="<li class='Lbegin'><span class='pagePreNext'><a href='#' onclick='fnComReadGridList(1, null, \""+gridId+"\"); return false;'>1 page</a></span></li> "; //가장 처음페이지로 이동하는 태그
                    htmlcode +="<li class='Lprevious'><span class='pagePreImg' style='cursor:pointer;' onclick='fnComReadGridList("+prevPage+", null, \""+gridId+"\"); return false;'></span></li>"; // prev 페이지로 이동하는 테그
                } else {
                    htmlcode +="<li class='Lbegin'><span class='pagePreNext'>1 page</span></li>";
                    htmlcode +="<li class='Lprevious'><span class='pagePreImg'></span></li>";
                }
            }
            for (var  i = prevPage; i < pageCount && i < prevPage+pageLink; i++) {
                if ( curPage == i ) htmlcode +="<li><span>"+(i+1)+"</span></li>";
                else htmlcode +="<li><span><a href='#' onclick='fnComReadGridList("+(i+1)+", null, \""+gridId+"\"); return false;'>"+(i+1)+"</a></span></li>";
            }
            var lastCount = pageCount-(prevPage+pageLink);
            if( pageCount > 10 && curPage+1 != pageCount && lastCount > 0 ) {
                if (curPage < parseInt(pageCount/pageLink)*pageLink) {
                    htmlcode +="<li class='Lnext'><span class='pageNextImg' style='cursor:pointer;' onclick='fnComReadGridList("+(prevPage+pageLink+1)+", null, \""+gridId+"\"); return false;'></span></li>"; //next페이지로 이동하는 태그
                    htmlcode +="<li class='Lend'><span class='pagePreNext'><a href='#' onclick='fnComReadGridList("+pageCount+", null, \""+gridId+"\"); return false;'>"+fnComFormatNumber(pageCount)+" page</a></span></li>"; // last 페이지로 이동하는 태그
                } else {
                    htmlcode +="<li class='Lnext'><span class='pageNextImg'></span></li>"; //마지막 페이지에서는 next페이지로 이동하는 태그는 A태그가 없음
                    htmlcode +="<li class='Lend'><span class='pagePreNext'>"+fnComFormatNumber(pageCount)+" page</span></li>"; // last 페이지로 이동하는 태그
                }
            }
            htmlcode +="</ul></div>";
        }
    } else {
        var datatype = $("#"+gridId).jqGrid('getGridParam','datatype');
        var noResultMsg = fnComGetMessage("M006");
        // 데이터 타입이 local이라는 것은 그리드 최초 로드시 아예 검색하지 않았다는 의미이다.
        if( datatype == "local" ) noResultMsg = fnComGetMessage("M005");
        if( boolUsePaging ) htmlcode += "<div id='NoResult_"+gridId+"' class='NoResult'><table><tr><td class='Lfirst'>"+noResultMsg+"</td></tr></table></div>";
        else htmlcode += "<div id='NoResult_"+gridId+"' class='NoResult'><table><tr><td class='Lfirst'>"+noResultMsg+"</td></tr></table></div><div class='LblockPaging' />";
        if( $("#NoResult_"+gridId).length == 0 ) {
            $(htmlcode).insertAfter($("#"+gridId));
        } else {
            $("#NoResult_"+gridId+" .Lfirst").html(noResultMsg);
            $("#NoResult_"+gridId).show();
        }
        // 처리 후 네비게이션 입력
        if( boolUsePaging ) htmlcode = "<div class='LblockPaging'><ul><li class='Lfirst'><span>1</span></li></ul></div>";
    }
    // 그리드 마지막에 페이지 네비게이션 입력
    if( boolUsePaging ) {
        if( $("#"+gridId+"_nav").length == 0 ) {
            $("<div id='"+gridId+"_nav'>").html(htmlcode).insertAfter($("#rs_m"+gridId));
        } else {
            $("#"+gridId+"_nav").remove();
            $("<div id='"+gridId+"_nav'>").html(htmlcode).insertAfter($("#rs_m"+gridId));
        }
    }

    // pageInput이 true이면 페이징에 페이징인풋을 직접 입력 받을 수 있는 input박스 및 버튼을 보이도록 처리한다.
    try { if( gridValue.pageInput ) fnComSetGridPageInput(gridId); } catch(e) {}

    return htmlcode;
}

/**
 * [jqGrid] 페이지 네비게이터 관련함수 : 페이지 네비게이터에서만 사용하는 함수
 *
 * @param {String} gridId : 그리드아이디
 * @param {String} curPage : 현재페이지
 * @return {void}
 *
 * @constructor jysong 2014.05.26
 **/
function fnComSetGridPageInput(gridId){
    var curPage = $("#"+gridId).getGridParam("page");    
    var pbtn = "<input type='text' id='"+gridId+"_pgInput' name='"+gridId+"_pgInput' class='Ltext' style='width:20px;text-align:center;ime-mode:disabled;' value='"+ curPage +"' /> "
             + "<span class='Lbtn3' style='display: inline;'><a href='javascript:;' id='"+gridId+"_pgButton'>이동</a></span>";
    $("#"+gridId+"_nav .LblockPaging ul").append(pbtn);

    $("#"+gridId+"_pgButton").click(function(e) {
        fnComReadGridList($("#"+gridId+"_pgInput").val(), null, gridId);        
    });
    $("#"+gridId+"_pgInput").focus(function() {
        var browserinfo = fnComBrowserCheck();
        if( browserinfo.match("^MSIE") ){
            $(this).select();
        }
    });
    $("#"+gridId+"_pgInput").keydown(function(e) {
        $(this).fnComRegExpHangulForChrome(e);
        fnComFilterKeyEvent(e, "number");
        var key = e.charCode || e.keyCode || 0;
        if(key === 13) {
            fnComReadGridList($(this).val(), null, gridId);
            return false;
        }
    });
}

/**
 * [jqGrid] 그리드 높이 변경
 *
 * @param {String} gridId : 그리드아이디
 * @param {Integer} targetHeight : 높이값
 * @return {void}
 * 
 * @constructor 이윤기 2013.10.07
 **/
function fnComJqGridSetHeight( gridId, targetHeight ) {
    if( targetHeight ) {
        $("#"+gridId).jqGrid('setGridHeight', targetHeight);
        return;
    }
    // div.jqGridContainer 안에 jqGrid가 들어있는 경우, Container의 높이에 맞춰 jqGrid 높이 조절
    var $parent = $("#gbox_"+gridId).parent();
    if( $parent.hasClass('jqGridContainer') ) {
        var records = parseInt($("#"+gridId).getGridParam("records"));
        if( records == 0 ) {
            $("#"+gridId).jqGrid('setGridHeight', '100%');
        } else {
            // 부모레이어 높이 - 헤더부 높이 - (CHECK : 하단의 pager 크기가 변경되는 경우 같이 수정해 줘야 함)
            var maxHeight = $parent.height() - $parent.find("div.ui-jqgrid-hdiv").height() - 34;
            var currHeight = $parent.find("table.ui-jqgrid-btable").height(); // 현재 그리드의 데이터 부 높이
            if( currHeight > maxHeight ) {
                $("#"+gridId).jqGrid('setGridHeight', maxHeight);
            } else if( currHeight < maxHeight ) {
                $("#"+gridId).jqGrid('setGridHeight', '100%');
            }
        }
    }
}

/**
  * [jqGrid] 그리드 리로드
 *
 * @param {String} page : 페이지값
 * @param {Object} options : 옵션 오브젝트
 * @param {String} gridId : 그리드아이디
 * @return {void}
 * 
 * @constructor jysong 2013.09.30, 수정 jysong 2013.11.13
 **/
function fnComReadGridList( page, options, gridId ) {
    var gridValue = fnComGetGridValues(gridId);
    // 그리드 총계함수 추가
    if( gridValue.customTotal != "" ){
        $("#"+gridValue.gridId).jqGrid( "delRowData", gridValue.gridId+"TotalCount" );
    }

    $("#"+gridValue.pageId).val(page);
    $("#"+gridValue.gridId).setGridParam(
        $.extend(
           ( options == null ? {} : options )
           ,{  page : $("#"+gridValue.pageId).val()
              ,rowNum : $("#"+gridValue.rowsId).val()
              ,loadComplete : function(data) {fnComJqGridEventLoadComplete(gridValue.gridId, data); }
            }
        )
    );
    $('#'+gridValue.gridId).trigger("reloadGrid");
}

/**
 * [jqGrid] 에디트 상태를 포함한 그리드 로우 데이터를 긁어온다.
 * 
 * <pre>
 * (보통은 <input />을 들고오나 이것을 변형시켜줌). 사용자가 그리드 포메터등
 * 을 사용하여 input박스를 임의로 생성했다면 해당 input박스에 반드시 class로 
 * [custom-editable]를 주어야만 본 함수에서 로우데이터를 읽어올 수 있다.
 * </pre>
 *
 * @param {String} grida : 그리드 아이디
 * @param {String} rowid : 로우 아이디
 * @return {Object} tmp : 처리 결과 오브젝트
 * 
 * @constructor jysong 2013.09.30
 **/
function fnComGetEditRowData( grida, rowid ) {

    if( grida.lastIndexOf("#", 0) === 0 ) {
        grida = $(grida);
    } else {
        grida = $("#"+grida);
    }
    var nm, tmp = {}, tmp2 = {}, editable, ind;
    ind = grida.jqGrid("getInd", rowid, true);
    if( ind === false ) { return success; }
    editable = $(ind).attr("editable");
        var cm;
        var colModel = grida.jqGrid("getGridParam","colModel") ;
        $("td", ind).each(function(i) {
            cm = colModel[i];
            nm = cm.name;
            // 커스텀 input값 추가
            if( $("input", this).hasClass('custom-editable') || (editable === "1" && nm != 'cb' && nm != 'subgrid' && cm.editable === true && nm != 'rn' && !$(this).hasClass('not-editable-cell')) ) {
                // 커스텀 input값 추가
                if( $("input", this).hasClass('custom-editable') ){
                    cm.edittype = $("input", this).prop("type");
                }
                switch( cm.edittype ) {
                    case "checkbox":
                        var cbv = ["Yes","No"];
                        if( cm.editoptions ) {
                            cbv = cm.editoptions.value.split(":");
                        }
                        tmp[nm] = $("input",this).is(":checked") ? cbv[0] : cbv[1];
                        break;
                    case 'text':
                    case 'password':
                    case 'textarea':
                    case "button" :
                        tmp[nm] = $("input, textarea", this).val();
                        break;
                    case 'select':
                        if( ! cm.editoptions.multiple ) {
                            tmp[nm] = $("select option:selected", this).val();
                            tmp2[nm] = $("select option:selected", this).text();
                        } else {
                            var sel = $("select", this), selectedText = [];
                            tmp[nm] = $(sel).val();
                            if( tmp[nm] ) { tmp[nm]= tmp[nm].join(","); } else { tmp[nm] = ""; }
                            $("select option:selected", this).each(
                                function( i, selected ) {
                                    selectedText[i] = $(selected).text();
                                }
                            );
                            tmp2[nm] = selectedText.join(",");
                        }
                        if( cm.formatter && cm.formatter == 'select' ) { tmp2 = {}; }
                        break;
                }
            // 모든 cell의 데이터를 가져오고 싶다고해서 추가하였으나... 원래 취지에는 맞지 않는다.
            } else {
                var rowdata = grida.getRowData(rowid);
                tmp[nm] = rowdata[nm];
            }
        });

    return tmp;
}

/**
 * [jqGrid] 그리드의 로우가 Edit모드일때(input text값 등으로 보일때) 특정(rowId) 로우의 특정(cellId) 셀의 값을 가지고 온다.
 * 
 * @param {String} rowId : 로우 아이디
 * @param {String} cellId : 셀 아이디
 * @return {String} val : 셀 변경값
 * 
 * @constructor jysong 2013.10.18
 **/
function fnComGetEditCell( rowId, cellId ) {
    var cell = $('#' + rowId + '_' + cellId);
    var val = cell.val();
    return val;
}

/**
 * jqGrid 내의 특정 항목의 index no. 반환
 * 
 * @param {String} gridId : [필수] jqGrid ID
 * @param {String} name : [필수] 항목명. jqGrid colModel에 선언한 name을 입력.
 * @return {Integer} index : 인덱스 번호
 * @example var snrNmIdx = fnComGetGridIndex( 'jqList', 'snrNm' );
 * @constructor 이윤기 2013.10.18
 **/
function fnComGetGridIndex( gridId, name ) {
    var index = -1;
    var $th = $("#"+ gridId +"_"+ name);
    if( $th ) {
        index = $th.index();
    }
    return index;
}

/**
 * 열에 중복되는 값을 공백으로 바꿔주는 함수
 * 
 * @param {String} gridId : [필수] 그리드아이디
 * @param {String} iCol : [필수] 컬럼아이디 (배열로 받을 수도 있다)
 * @return {void}
 * @example
 * fnGridGridComplete함수에 정의해서 사용합니다.
 * function fnGridGridComplete(){
 *     fnGridCellDup("gridList1","joblevelCodeName"); or fnGridCellDup("gridList1",["skillCodeName","joblevelCodeName"]);
 * }
 * @constructor jysong 2013.11.25
 **/
function fnGridCellDup(gridId, iCol){
    if( iCol instanceof Array ){
    } else if( typeof iCol == 'string' ){
        var iColArr = []; iColArr.push(iCol); iCol = iColArr;
    }
    var ids = $("#"+gridId).jqGrid('getDataIDs');
    var value = "";
    for( var j=0; j < iCol.length; j++) {
        for ( var i = 0; i < ids.length; i++) {
            var rowdata = $("#"+gridId).getRowData(ids[i]);
            if( value == rowdata[iCol[j]] ) {
                $("#"+gridId).setCell(ids[i], iCol[j], " ");
            }
            value = rowdata[iCol[j]];
        }
    }
}

/**
 * 그리드의 td에 id를 만들어주는 함수, fnGridCellRowMerge와 함께 사용하는 함수입니다.
 * 
 * @return {String} 생성된ID 스트링
 * @example
 * colModel에 아래와 같이(cellattr:makeId) 추가를 하시면 됩니다.
 * {name:"skillCodeName", index:"skillCodeName", align:"center", width:"17%",  sortable:false, cellattr:fnMakeId },
 * @constructor jysong 2013.11.25
 **/
function fnMakeId(rowId, tv, rawObject, cm, rdata) {
    return "id='" + cm.name + "_" + rowId + "'";
}

/**
 * <pre>
 * 그리드의 row에 중복된 내용들을 확인하여 합쳐주는 기능을 하는 함수입니다.
 * colModel에 fnMakeId 함수로 td의 id가 정의되어 있어야 사용이 가능합니다.
 * </pre>
 *
 * @param {String} gridId : [필수] 그리드아이디
 * @param {String} iCol : [필수] 컬럼아이디 (배열로 받을 수도 있다)
 * @return {void}
 * @example
 * fnGridGridComplete함수에 아래와 같이 정의해서 사용합니다.
 * function fnGridGridComplete(){
 *     fnGridCellRowMerge("gridList1","skillCodeName"); or fnGridCellRowMerge("gridList1",["skillCodeName","joblevelCodeName"]);
 * }
 * @constructor jysong 2013.11.25, 수정 jysong 2013.05.29
 **/
function fnGridCellRowMerge(gridId, iCol){
    var ids = $("#"+gridId).getDataIDs();
    var length = ids.length;
    if( $.type(iCol) === "string" ) {
       iCol = [iCol];
    }
    for (var i = 0; i < length; i++) {
       var before = $("#"+gridId).jqGrid("getRowData", ids[i]);
       var rowspanCnt = 1;
       for (var j = i + 1; j < length; j++) {
           var end = $("#"+gridId).jqGrid("getRowData", ids[j]);
           var check = true;
           // 행의 모든 값을 체크한다. 하나라도 다르면 false로 break건다
           for( var a=0; a < iCol.length; a++) {
               var beforeVal = before[iCol[a]];
               var endVal = end[iCol[a]];
               // 공백및 null, undefined체크. 하나라도 null이며 공백이면 false.
               if( !beforeVal || !endVal ) {
                   check = false;
                   break;
               }
               // 두 값이 같지 않은 경우에서
               if ( beforeVal != endVal ) {
                   // 두 값중 어느 하나라도 input으로 시작하지 않는 경우에만 false
                   if( !beforeVal.toLowerCase().match("^<input") || !endVal.toLowerCase().match("^<input") ) {
                       check = false;
                       break;
                   }
               }
           }
           // 두 행이 모두 같으며, 모두 공백이 아닐경우
           if( check ) {
               rowspanCnt++;
               for( var x=0; x < iCol.length; x++) {
                   // rowspan을 위해 컬럼을 비운다
                   $("#"+gridId).setCell(ids[j], iCol[x], "", { display: "none" });
               }
           } else {
               rowspanCnt = 1;
               break;
           }
           // rowspan을 한다.
           for( var x=0; x < iCol.length; x++) {
               $("#"+iCol[x]+"_"+ids[i]).attr("rowspan", rowspanCnt);
           }
       }
    }
}

/**
 * <pre>
 * 기본적으로 fnGridCellRowMerge와 동일한 기능을 하나 fnGridCellRowMerge의 경우
 * "행 기준"으로 각각의 라인을 끊어주나 본 함수는 행과는 무관하게 "열 기준"으로 라인을 끊어준다.
 * 즉 fnGridCellRowMerge에서 iCol값으로 배열이 아닌 한개만 받는 것을 여러번 실행시켜주는
 * 것과 동일한 행위를 한다. 현재 본 함수를 사용하고 있는 곳은 없으나 추후 사용을 위해 함수를 제공한다.
 * </pre>
 * 
 * @param {String} gridId : [필수] 그리드아이디
 * @param {String} iCol : [필수] 컬럼아이디 (배열로 받을 수도 있다)
 * @return {void}
 * @example
 * fnGridGridComplete함수에 아래와 같이 정의해서 사용합니다.
 * function fnGridGridComplete(){
 *     fnGridCellRowMergeForRowFirst("gridList1",["skillCodeName","joblevelCodeName"]);
 * }
 * @constructor jysong 2014.06.20
**/
function fnGridCellRowMergeForRowFirst(gridId, iCol){
    var ids = $("#"+gridId).getDataIDs();
    var length = ids.length;
    if( $.type(iCol) === "string" ) {
       iCol = [iCol];
    }
    for( var z=0; z < iCol.length; z++) {
        for (var i = 0; i < length; i++) {
           var before = $("#"+gridId).jqGrid("getRowData", ids[i]);
           var rowspanCnt = 1;
           for (var j = i + 1; j < length; j++) {
               var end = $("#"+gridId).jqGrid("getRowData", ids[j]);
               var beforeVal = before[iCol[z]];
               var endVal = end[iCol[z]];
               // 두 값이 모두 같으며, 모두 공백이 아닐경우
               if (beforeVal == endVal && (beforeVal != "" && endVal != "") ) {
                   rowspanCnt++;
                   $("#"+gridId).setCell(ids[j], iCol[z], "", { display: "none" });
               } else {
                   rowspanCnt = 1;
                   break;
               }
               $("#"+iCol[z]+"_"+ids[i]).attr("rowspan", rowspanCnt);
           }
        }
    }
}

/**
 * <pre>
 * 그리드의 row에 중복된 내용들을 확인하여 합쳐주는 기능을 하는 함수입니다.
 * colModel에 fnMakeId 함수로 모든 td의 id가 정의되어 있어야 사용이 가능합니다.
 * 주) fnGridCellRowMerge와는 다르게 가로로 colspan함으로 어떤 td가 합쳐질지 
 * 모름으로 모든 td에 id가 정의되어야 합니다
 * </pre>
 *
 * @param {Object} object : [필수]옵션 오브젝트
 * @return {void}
 * @example
 * // 옵션 오브젝트를 생성하고
 * var options = {
 *       startColName:"usrPw" //: 그리드에서 중복 합칠 시작점
 *     , endColName:"chngDt"  //: 그리드에서 중복 합칠 종료점
 * };
 * // fnGridGridComplete함수에 아래와 같이 정의해서 사용합니다.
 * function fnGridGridComplete(){
 *     fnGridCellColMerge("gridList1", options);
 * }
 * @constructor jysong 2013.12.20
 **/
function fnGridCellColMerge(gridId, options){
    var ids = $("#"+gridId).jqGrid('getDataIDs');
    var column = $("#"+gridId).jqGrid('getGridParam','colModel');
    var columnNames = [];
    for( var i=0; i< column.length; i++ ){
        columnNames.push(column[i].name);
    }
    colNum = function(colName){
        for( var i=0; i< columnNames.length; i++ )
            if( columnNames[i] == colName ) return i;
        return "notExist";
    };
    for( var i=0; i<ids.length; i++){
         var rowdata = $("#"+gridId).getRowData(ids[i]);
         var start = colNum(options.startColName);
         var end = colNum(options.endColName);
         if( start != "notExist" && end != "notExist" ) {
             var arrColNames = [];
             var arrColSpanNum = [];
             var value = "", firstName = "", count = 1;
             for( var j=start; j<=end; j++ ) {
                 if( value == rowdata[columnNames[j]] ) {
                     if( firstName == "" ) {
                         firstName = columnNames[j-1];
                         arrColNames.push(firstName);
                     }
                     $("#"+gridId).setCell(ids[i], columnNames[j], "", { display: "none" });
                     count++;
                     if( j == end ){
                         if( count != 1 ) arrColSpanNum.push(count);
                     }
                 } else {
                     firstName = "";
                     if( count != 1 ) {
                         arrColSpanNum.push(count);
                         count = 1;
                     }
                 }
                 value = rowdata[columnNames[j]];
             }
             for (var x=0; x<arrColNames.length; x++ ){
                 $("#"+arrColNames[x]+"_"+ids[i]).attr("colspan", arrColSpanNum[x]);
             }
         }
    }
}

/**
 * :와 ;로 구분된 스트링값을 배열로 생각해서 값을 매핑해 보여주는 포메터
 *
 * <pre>
 * 본 함수를 그리드 에디트타입이 selectbox인 곳에 사용하지 마세요.
 * formatter:'select' 하나 추가하시면 자동으로 selectbox의 value값과
 * 화면에 보여지는 값과 매핑됩니다.
 * </pre>
 *
 * @param {String} cellvalue : [필수] 찾을 값
 * @param {String} arrayData : [필수] 입력스트링 ex)"0:일;1:월;2:화;3:수;4:목;5:금;6:토"
 * @return {Array} 값을 새로 매핑한 결과값
 * @example
 * // 절대로 selectbox용이 아닙니다.
 * var hldyDvsCd = "0:일;1:월;2:화;3:수;4:목;5:금;6:토";
 * {  name:"skillCodeName",  formatter:function(cellvalue){ return fnComGridSelectKeyVal(cellvalue, hldyDvsCd); }
 * @constructor jysong 2013.12.02
 **/
function fnComGridSelectKeyVal(cellvalue, arrayData){
    arrayData = arrayData.split(";");
    var result = "";
    $.each(arrayData, function(i) {
        var arr = this.split(":");
        if( arr[0] == cellvalue ){
            result = arr[1];
        }
    });
    return result;
}

/**
 * jqGrid] 그리드 헤더 사이즈 조절(2~3단 헤더 사용시에만 적용된다)
 *
 * @param {String} gridId : [필수] 그리드아이디
 * @return {void}
 * @constructor jysong 2013.12.09
 **/
function fnComGridHeaderResize(gridId){
    if( $("#gbox_"+gridId+" .jqg-first-row-header").length > 0 ){
        var arr = [];
        $("#"+gridId+" .jqgfirstrow").find("td").each(function(i){
            arr.push($(this).css("width"));
            $last = $(this);
        });
        $("#gbox_"+gridId+" .jqg-first-row-header").find("th").each(function(i){
            $(this).css("width",arr[i]);
        });
     }
}

/**
 * <pre>
 * [jqGrid] 그리드 헤더 3단처리 : 반드시 그룹헤더를 한번 만들고 나서 본 함수를 실행시키도록 한다.
 * 주의 : secondRowspan 는 2단부터 rowspan을 하는 것이 아닙니다.
 *        1단을 rowspan 처리하는데 3단은 남겨두고 1단과 2단만 rowspan합니다.
 *        (이벤트 및 table계산상의 문제로 2단부터 rowspan 처리는 불가함)
 *        순번이 있을경우 순번의 name값은 "rn"임으로 이역시 반드시 입력해줘야한다.
 * </pre>
 *
 * @param {Object} object : [필수] 입력 오브젝트(예제참고)
 * @return {Boolean} true/false
 * @example
 *  $("#gridList2").fnComGridGroupHeaders({
 *           firstRowspan : ["rn","num","telephone","birthdate"] // 1단만 있는 것들 배열
 *          ,secondRowspan : ["skillCodeName"] // 1단+2단 rowspan할 것들 배열로서 3단째의 컬럼들을 입력합니다.
 *                                             // 1단 위주로 처리됨으로 제일 앞단에 있는 컬럼만 입력해도 됩니다.
 *          ,thirdRowspan : ["skillName"] // 2단+3단 rowspan할 것들 배열로서 3단째의 컬럼들을 입력합니다.
 *                                        // 단, 본 기능 사용시. 그리드 헤드에서 width 조절이 불가합니다.
 *          ,secondColspan : ["name1","name2"] // 2단째 colspan할 것들 배열
 *          ,secondColspanNumber : ["2","3"] // 2단째 colspan의 값 배열
 *          ,secondColspanText : ["이단텍스트1", "이단텍스트2"] // 2단째 colspan한 후의 공간에 넣을 텍스트
 *  });
 * @constructor jysong 2013.12.16
 **/
$.fn.fnComGridGroupHeaders = function(options) {
    // 각 단수는 위에서 아래의 순서이다.
    var id = this.prop("id");
    var column = $("#"+id).jqGrid('getGridParam','colModel');
    var columnNames = [];
    var columnNamesOrg = [];
    for( var i=0; i< column.length; i++ ){
        if (column[i].hidden != true) columnNames.push(column[i].name);
    }
    columnNamesOrg = columnNames;

    // 3단만 있는 것 rowspan할 것
    for( var i=0; i<options.firstRowspan.length; i++ ){
        $("#"+id+"_"+options.firstRowspan[i]).attr("rowSpan","3");
        // 삭제
        columnNames = $.grep(columnNames, function(value) {
            return value != options.firstRowspan[i];
        });
    }

    // 1+2단 rowspan할 것
    var secondRowspan = function(value){
        if( options.secondRowspan == undefined ) return false;
        for( var i=0; i<options.secondRowspan.length; i++ ){
            if( value == options.secondRowspan[i] )
                return true;
        }
        return false;
    };

    // 2+3단 rowspan할 것
    var thirdRowspan = function(value){
        if( options.thirdRowspan == undefined ) return false;
        for( var i=0; i<options.thirdRowspan.length; i++ ){
            if( value == options.thirdRowspan[i] )
                return true;
        }
        return false;
    };

    // 2단째 colspan할 것
    var secondColspan = function(value){
        if( options.secondColspan == undefined ) return false;
        for( var i=0; i<options.secondColspan.length; i++ ){
            if( value == options.secondColspan[i] )
                return true;
        }
        return false;
    };

    var $trin = $('<tr class="ui-jqgrid-labels jqg-second-after-row-header" role="rowheader" />');
    var $secondRow = $("#gbox_"+id+" .jqg-second-row-header").find("th");
    var colArray = [];
    var idx = 0;
    $.each($secondRow, function(){
        var ids = $(this).prop("id");
        var displayCheck = $(this).css("display");
        var colNm = "colums";
        var colspanNum = 0;
        if( ids == "" ) {
            colspanNum = $(this).attr("colspan");
            for( var i=0; i<colspanNum; i++ ){
                if( displayCheck != "none" ) colArray.push(colNm+idx);
            }
            if( displayCheck != "none" ) idx++;
        } else {
            if( displayCheck != "none" ) colArray.push(ids);
        }
    });

    for( var i=0; i<columnNamesOrg.length; i++ ){
        // 1단 rowspan 처리. 3단은 남겨두고 1단과 2단만 rowspan한다
        if( secondRowspan(columnNamesOrg[i]) ){
            var colHeaderNum = parseInt(colArray[i].replace("colums",""));
            $("#gbox_"+id+" .ui-th-column-header").eq(colHeaderNum).attr("rowspan","2");
        }
    }

    var check = 0;
    for( var i=0; i<columnNames.length; i++ ){
        // 2+3단 rowspan
        if( thirdRowspan(columnNames[i]) ){
            var html = $("#"+id+"_"+columnNames[i]).html();
            var $cols = $("#"+id+"_"+columnNames[i]).clone(true);
            $cols.attr("rowspan","2");
            $trin.append($cols);
            $("#"+id+"_"+columnNames[i]).remove();
        }
        
        // 2단째 colspan
        if( secondColspan(columnNames[i]) ){
            var spanNumber = 2;
            if( options.secondColspanNumber != undefined ) spanNumber = options.secondColspanNumber[check];
            $trin.append($("<TH role=columnheader id="+id+"_name class='ui-state-default ui-th-column-header ui-th-ltr' style='border-top-color: currentColor; border-top-width: 0px; border-top-style: none;' colspan='"+spanNumber+"' />")
                         .html(options.secondColspanText[check]));
            check++;
        }
    }
    $("#gbox_"+id+" .jqg-second-row-header").after($trin);
};

/**
 * [jqGrid] 그리드 json데이터 계산하기. fnComGridAddRowSum에서 사용하는 서브함수
 *
 * @param {Object} data : [필수] 그리드 json데이터
 * @param {String} colums : [필수] 컬럼들
 * @param {String} columMath : [선택] 계산식
 * @return {Array} 계산된 결과값 배열
 * @constructor jysong 2013.12.27
 **/
function fnComGridRowMath(data, colums, columMath){
    var ln = data.length;
    var arr = [];
    if (ln && ln>0){
        var columsArr = colums.split(",");
        for( var i=0; i<columsArr.length; i++){
            var columMathArr = columMath.split(",");
            var j = 0, sum = 0, len = 0;
            while(j<ln){
                var val = data[j][columsArr[i]];
                v = parseFloat(val);
                if(!isNaN(v)) {
                    sum += v;
                    len++;
                }
                j++;
            }
            var ret = "";
            switch(columMathArr[i]){
                case 'sum': ret = sum; break;
                case 'avg': ret = sum/len; break;
            }
            arr.push(ret);
        }
    }
    return arr;
}

/**
 * <pre>
 * [jqGrid] 그리드 json데이터 합계구하여 그리드에 addline. [loadonce : true]인 경우에만
 * 적용 할 수 있다.("getGridParam", "data")가 이때에만 먹힌다. 
 * java의 biz단에서는 LCommonDao의 executeQuery() 메소드를 사용해서 모든 데이터를 들고
 * 와야 한다. 때문에 소규모 시스템 소규모 데이터에 대한 계산만 가능하다.(데이터가 많을
 * 경우 클라이언트 PC에 무리)
 * </pre>
 *
 * @param {String} gridId : [필수] 그리드아이디
 * @param {String} colums : [필수] 컬럼(항목)
 * @param {String} columMath : [필수] 항목계산식
 * @param {String} columValues : [선택] 특정항목 내용입력
 * @param {String} upAndDown : [선택] 계산결과 배치위치(first / last)
 * @param {String} columMath : [선택] 계산식
 * @return {Array} 계산된 결과값 배열
 *
 * @example
 * // colModel에 다음 두 항목이 있어야 한다.
 * ,loadonce : true
 * ,customTotal : ["num,num2","sum,avg","name:<b>총계</b>,skillCodeName:총계2","last"]
 * @constructor jysong 2013.12.27
 **/
function fnComGridAddRowSum(gridId, colums, columMath, columValues, upAndDown){
    if( StringUtil.isNull(colums) ) return;
    if( StringUtil.isNull(upAndDown) ) upAndDown = "last";

    var data = $("#"+gridId).jqGrid("getGridParam", "data");
    data = $.grep(data, function (value) {
        return value._id_ != gridId+"TotalCount";
    });

    var sum = fnComGridRowMath(data, colums, columMath);
    var option = {};
    var colNameArr = colums.split(",");
    for( var i=0; i<colNameArr.length; i++){
        option[colNameArr[i]] = "<b>"+sum[i]+"</b>";
    }
    var columValueArr = columValues.split(",");
    for( var i=0; i<columValueArr.length; i++){
        var carr = columValueArr[i].split(":");
        option[carr[0]] = "<b>"+carr[1]+"</b>";
    }

    // 총계라인을 더해준다.
    $("#"+gridId).jqGrid( "addRowData" ,gridId+"TotalCount", option, upAndDown);
    // 번호를 다시 매긴다.
    var ids = $("#"+gridId).jqGrid('getDataIDs');
    if( upAndDown == "first" ) {
        for ( var i = 0; i < ids.length; i++) {
            var rn = $("#"+gridId).getCell(ids[i], "rn");
            if( upAndDown == "first" && i == 0 ) $("#"+gridId).setCell(gridId+"TotalCount", "rn", " ");
            else $("#"+gridId).setCell(ids[i], "rn", parseInt(rn)-1);
        }
    } else {
        $("#"+gridId).setCell(gridId+"TotalCount", "rn", " ");
    }
}

/**
 * [jqGrid] 그리드 로우 addClass 처리
 *
 * @param {Object} option : [필수] 인자값 오브젝트(예제참조)
 * @return {void}
 * @example
 *  // 옵션에서는 편의에 따라 upAndDown , rowId , rowValue중 어느것 하나이상 사용하시면 된다.
 *  $("#gridList").fnComGridRowAddClass({
 *           rowClass : "TotalRow" // 입력할 클래스(생략하면 표준 클래스 동작)
 *          ,upAndDown : ["up"] // up or down 입력(둘다입력가능). 통계등에서 사용할 때에 리스트의 상단이나 하단에 class를 입력 할 수 있다.
 *          ,rowId : ["102210", "102211", "102212"] // 별도로 class를 적용할 rowId를 배열로 입력한다.[생략가능]
 *           // 설명 : "name"필드의 값이 "소계"일 경우 색상을 변경한다.
 *           // row안의 값이 입력된 문자(아래예처럼 통계 등일 때)와 동일할 경우 색상을 변경해준다.
 *          ,rowValue : ["name:소계", "mycol:통계"] // ,rowValue : ["name:소계:SubtotalRow", "mycol:통계:TotalRow"] 와 같이 별도 클래스를 입력 할 수도 있습니다.
 *          // ( 문자대신 null이라고 입력시 공백들에 클래스 부여합니다 ), rowValue:"allrow" 라고 주시면 모든 로우에 rowClass에 반영된 클래스가 부여됩니다.
 *          // rowClass에 클래스 반영을 안하고 rowValue:"allrow" 라고 주시면 hand(손모양) 포인터 클래스를 기본으로 줍니다.
 *  });
 * @constructor jysong 2014.01.14
 **/
$.fn.fnComGridRowAddClass = function(options) {
    var rowClass = "TotalRow";
    // 클래스 입력 안하면 기본 클래스 입력
    if( options.rowClass != undefined ) rowClass = options.rowClass;
    var ids = this.getDataIDs();
    var lastId = ids[ids.length-1];
    var column = this.jqGrid('getGridParam','colModel');
    if( options.upAndDown != undefined ) {
        for( var i=0; i < options.upAndDown.length; i++ ){
            for( var j=0; j < column.length; j++ ){
                if( options.upAndDown[i] == "up" ) {
                    this.setCell(ids[0], column[j].name, "", rowClass);
                } else if( options.upAndDown[i] == "down" ) {
                    this.setCell(lastId, column[j].name, "", rowClass);
                }
            }
        }
    }
    if( options.rowId != undefined ) {
        for( var i=0; i < options.rowId.length; i++ ){
            for( var j=0; j < column.length; j++ ){
                this.setCell(options.rowId[i], column[j].name, "", rowClass);
            }
        }
    }
    // 모든 로우에 클래스 부여
    if( options.rowValue != undefined ) {
        if( $.type(options.rowValue) === "string" ){
            if( options.rowClass == undefined ) {
                rowClass = "hand";
            }
            if( options.rowValue == "allrow" ){
                for( var i=0; i < ids.length; i++ ){
                    for( var j=0; j < column.length; j++ ){
                        this.setCell(ids[i], column[j].name, "", rowClass);
                    }
                }
            }
        } else {
            var ids = this.jqGrid('getDataIDs');
            for ( var i=0; i < ids.length; i++) {
                for( var j=0; j < options.rowValue.length; j++ ){
                    var check = false;
                    var cellValue = this.getCell(ids[i], options.rowValue[j].split(":")[0]);
                    var checkValue = options.rowValue[j].split(":")[1];
                    if( cellValue != undefined ){
                        if( cellValue.indexOf(checkValue) != -1 ) check = true;
                        if( cellValue == "" && checkValue == "null" ) check = true;
                    }
                    if( check ){
                        for( var k=0; k < column.length; k++ ){
                            if( options.rowValue[j].split(":")[2] != undefined ) {
                                rowClass = options.rowValue[j].split(":")[2];
                            } else {
                                rowClass = "TotalRow";
                            }
                            this.setCell(ids[i], column[k].name, "", rowClass);
                        }
                    }
                }
            }
        }
    }
};

/**
 * <pre>
 * 엑셀 다운로드, 리포트 등 그리드에 관련된 다운로드 버튼의 링크 생성
 * 이 함수를 호출할 타이밍은
 *    1) 화면이 열릴 때
 *    2) 검색 버튼으로 목록 조회가 정상적으로 완료된 직후(보통 callback 함수에서 호출)
 * </pre>
 *
 * @param {String} gridId      : [필수] jqGrid의 ID. (html이라면 table 태그의 ID)
 * @param {String} excelLinkId : [필수] 엑셀다운로드 버튼의 A 태그의 ID ( class="ksccFileDownload" 가 추가되어야 한다 )
 * @param {String} url         : [필수] 서버 URL
 * @param {String} param       : [선택] 검색 조건값(그리드에 전달된 파라메터를 그대로 전달하려고 한다면 입력하지 않는다.)
 * @param {Object} option      : [선택] 추가적인 옵션을 object 형태로 전달할 수 있다.(예제참조)
 * @return {void}
 * @example
 * (option 에 들어갈 Object)
 * delayMsgRowCnt : 데이터 양이 많아서 시간이 오래 걸린다는 확인창을 띄울 기준 건 수를 넘긴다.
 * showOverflowMsg : 데이터 양이 많아서 엑셀로 다운로드 받을 수 없다는 메시지를 보여줄 지 여부. 'Y'를 넘기면 건 수를 확인하여 오류 메시지를 출력한다.
 * overflowRowCnt : 엑셀 다운 불가 기준 건 수. 기본값은 65,000.
 * showOverflowMsg 옵션을 'Y'로 넘길 때만 사용된다.
 *
 * (예제별 인자)
 *
 * 예제1) id 직접입력. 서버로 전달할 파라미터 값을 이름 변경하여 전달
 * 예제2) 검색조건 영역을 감싸는 태그의 ID 전달
 * 예제3) "aaa=4&bbb=7&ccc=test" 형태의 리턴값이 있는 함수를 전달
 * 예제4) 그리드 파라메터 전달
 *
 * (주의사항) 본 함수가 사용될 A테그는 프로젝트 표준대로 span으로 쌓여 있어야 하며, onclick이벤트 등은 없어야 합니다.
 *
 * (예제1) : <input id='param1' /> <input id='param2' /> 와 같이 있을 때  param1을 myParam1으로 이름 변경하여 서버에 전달.
 *  function fnGridLoadComplete( gridId ) {
 *      fnComSetExcelDownload( gridId, "excelLink", "<c:url value='/sample.ajax'/>",
 *                             { "param1" : "myParam1"
 *                             , "param2" : "myParam2" }
 *      );
 *  }
 * (예제2) fnComSetExcelDownload( gridId, "excelLink", "<c:url value='/sample.ajax'/>", "searchArea" );
 *
 * (예제3) 본 예제에는 인자값에 function(){} 라고 입력했으나 직접 만든 함수를 입력하셔야 합니다.
 *     fnComSetExcelDownload( gridId, "excelLink", "<c:url value='/sample.ajax'/>", function(){} );
 *
 * (예제4) 파라메터 인자값이 없을 경우 그리드에 전달된 파라메터값이 전부 서버로 전송된다.
 *     fnComSetExcelDownload( gridId, "excelLink", "<c:url value='/sample.ajax'/>" );
 * @constructor 이윤기 2014.02.24, 수정 jysong 2014.02.26
 **/
function fnComSetExcelDownload( gridId, excelLinkId, url, param, option ) {
    var delayMsgRowCnt = null; // 데이터가 많아서 오래 걸린다는 메시지를 보여줄 기준 건 수
    var overflowRowCnt = null; // 데이터가 많아서 엑셀로는 다운로드 받을 수 없다는 메시지를 보여줄 기준 건 수
    var showOverflowMsg = null;
    if( $.type(gridId) == "object" ) {
        var objParam = gridId;
        gridId = objParam["gridId"];
        excelLinkId = objParam["excelLinkId"];
        url = objParam["url"];
        param = objParam["param"];
        delayMsgRowCnt = objParam["delayMsgRowCnt"];
        showOverflowMsg = objParam["showOverflowMsg"];
        overflowRowCnt = objParam["overflowRowCnt"];
    }
    if( $.type(option) == "object" ) {
        delayMsgRowCnt = option["delayMsgRowCnt"];
        showOverflowMsg = option["showOverflowMsg"];
        overflowRowCnt = option["overflowRowCnt"];
    }
    overflowRowCnt = overflowRowCnt || 65000;
    var isJqGrid = fnComIsJqGrid(gridId);

    if( ! gridId ) {
        alert(fnComGetMessage("M007"));
        return;
    }
    if( ! excelLinkId ) {
        alert(fnComGetMessage("M008"));
        return;
    }
    if( ! url ) {
        alert(fnComGetMessage("M009"));
        return;
    }
    var $excelLink = $("#"+ excelLinkId);
    if( $excelLink.length == 0 ) {
        alert(fnComGetMessage("M010"));
        return;
    }
    // 건 수가 많다는 메시지 출력 여부 설정
    $excelLink.data("showDelayMsg", "");
    if( delayMsgRowCnt && isJqGrid ) {
        var gridRowCnt = $('#'+ gridId).getGridParam('records');
        if( gridRowCnt >= delayMsgRowCnt ) {
            $excelLink.data("showDelayMsg", "Y");
        }
    }
    // 건 수가 많아 엑셀로 다운로드 받을 수 없다는 메시지 출력 여부 설정
    $excelLink.data("showOverflowMsg", "");
    if( showOverflowMsg && showOverflowMsg.toLowerCase() == "y" && isJqGrid ) {
        var gridRowCnt = $('#'+ gridId).getGridParam('records');
        if( gridRowCnt >= overflowRowCnt ) {
            $excelLink.data("showOverflowMsg", "Y");
            $excelLink.data("overflowRowCnt", overflowRowCnt);
        }
    }
    // 이벤트 초기화
    $excelLink.closest("span").off("click.nssCommon");
    // 목록에 데이터가 없으면
    if( fnComGetTableRowCnt(gridId) == 0 ) {
        $excelLink.attr("href", "#");
        $excelLink.closest("span").on("click.nssCommon", function(event) {
            event.stopPropagation();
            event.preventDefault();
            fnComLinkExcelDownloadNoData();
        });
        return;
    }
    // 목록이 jqGrid인 경우 page번호가 1이 아니면 url을 수정하지 않는다.
    // 단, 화면이 처음 열렸을 때 페이지 번호가 1 이 아닌 경우를 처리하기 위해 href의 길이가 1 보다 큰지 체크한다.
    if( $excelLink.attr("href").length > 1 && gridProp && isJqGrid ) {
        var pageNoId = null;
        $.each(gridProp, function(idx) {
            var thisGridId = gridProp[idx]["gridId"];
            if( thisGridId != gridId ) return true;
            pageNoId = gridProp[idx]["pageId"];
        });
        if( pageNoId ) {
            var pageNo = $("#"+ pageNoId).val();
            if( pageNo != "1" ) return;
        }
    }
    // 다운로드 버튼의 링크 변경
    var excelUrl = url;
    if( param ) {
        if( $.type(param) === "function" ) {
            excelUrl += "?"+ param();
        } else if( $.type(param) === "string" ) {
            var vo = fnComSerialize(param);
            excelUrl += "?"+ fnComMakeQueryString(vo);
        } else {
            var vo = fnComMakeVO(param);
            excelUrl += "?"+ fnComMakeQueryString(vo);
        }
    } else {
        excelUrl += "?"+ $("#"+gridId).fnComGetGridParam();
    }
    $excelLink.attr("href", excelUrl);
}

/**
 * gridId로 행의 개수 얻어오기
 *
 * @param {String} gridId : [필수] 그리드아이디
 * @return {Integer} 행의 갯수
 * @constructor 이윤기 2014.02.24
 **/
function fnComGetTableRowCnt( gridId ) {
    if( fnComIsJqGrid(gridId) ) {
        return $("#"+ gridId).jqGrid("getGridParam", "reccount");
    } else {
        return $("#"+ gridId).find("tbody tr").length;
    }
}

/**
 * gridId로 해당 테이블이 jqGrid인지 여부 확인
 *
 * @param {String} gridId : [필수] 그리드아이디
 * @return {Integer} 행의 갯수
 * @constructor 이윤기 2014.02.24
 **/
function fnComIsJqGrid( gridId ) {
    return $("#"+ gridId).hasClass("ui-jqgrid-btable");
}

/**
 * <pre>
 * [jqGrid] 그리드에서 서버로 전송한 파라메터를 "test1=val1&test4=some" 와 같은
 * 문자열로 반환한다. 엑셀다운로드 등에서 그리드 파라메터 값을 전달하기 위해 개
 * 별적으로 사용한다.
 * </pre>
 *
 * @param {Boolean} dataCheck : 
 * [필수] 엑셀 다운로드용 파라메터 전달을 위한 데이터체크 true/false fnComSetExcelDownload
 * 함수를 사용하지 않고 url에 링크를 달아 처리 하고자 한다면 본 인자값에 true를 넣어준다.
 * @return {String} 결과 쿼리스트링
 * @example 
 * // 데이터 체크를 한 뒤에 결과값을 반환한다.
 * $("#gridList").fnComGetGridParam(true);
 * $("#gridList").fnComGetGridParam();
 * @constructor jysong 2014.02.26
 **/
$.fn.fnComGetGridParam = function(dataCheck) {
    // 데이터 체크를 한다.
    if( dataCheck ){
        var datatype = this.getGridParam("datatype");
        var records = parseInt(this.getGridParam("reccount"));
        if( datatype == "local" || records == 0 ) {
            alert(fnComGetMessage("M011"));
            return "";
        }
    }
    var postData = this.getGridParam("postData");
    var param = "";
    $.each(postData, function(key, value) {
        if( param != "" ) param += "&";
        param += key+"="+encodeURIComponent(value);
    });
    return param;
};

/**
 * <pre>
 * [jqGrid] 그리드에서 헤더값에 대각선이 필요한 경우 본 함수를 colNames 에 사용한다.
 * ie10이상, chrome, firefox, safari만 지원된다.(css3문제로 ie 7,8,9 지원안됨)
 * </pre>
 *
 * @param {String} leftmsg : 좌측 하단 메시지
 * @param {String} rightmsg : 우측 상단 메시지
 * @param {String} height : 높이(입력하지 않으면 기본 35)
 * @return {String} 생성된 리턴 스트링
 * @example
 * //아래와 같이  colNames에 직접 입력한다.
 * colNames:["이름", fnComDiagonalLine("좌측하단메시지", "우측상단메시지"), "나이"]
 * @constructor jysong 2014.03.31
 **/
function fnComDiagonalLine(leftmsg, rightmsg, height){
    if( height == undefined ) height = "35";
    return '<div class="diagonalLineX" style="height:'+height+'px;"><span style="float:right;">'+leftmsg+'</span><br /><span style="float:left;">'+rightmsg+'</span></div>';
}
