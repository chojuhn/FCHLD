    /***********************************************************************************************************
     * Font Size Control Function
    ************************************************************************************************************/
    var _CFontSize = 9;
    var _CLineHeight = -1;
    function fnSetFontSize(SizeFlag, fSize, lHeight) {
        if(typeof fSize!='undefined' && typeof lHeight!='undefined' && fSize &&lHeight ){
            _CFontSize = Number(fSize);
            _CLineHeight = Number( lHeight);
        }
        objL = document.getElementById("west-content");
        obj = document.getElementById("LblockBody");
        if (SizeFlag == '+') {
            if (_CFontSize<13) {
                _CFontSize = _CFontSize + 1;
                _CLineHeight = parseInt(_CFontSize*1.5);
             }
            obj.style.fontSize = _CFontSize + "pt";
            obj.style.lineHeight = _CLineHeight + "pt";
            objL.style.fontSize = _CFontSize + "pt";
            objL.style.lineHeight = _CLineHeight + "pt";
        } else if (SizeFlag == "-") {
            if (_CFontSize>7) {
                _CFontSize = _CFontSize - 1;
                _CLineHeight = parseInt(_CFontSize*1.5);
            }
            obj.style.fontSize = _CFontSize + "pt";
            obj.style.lineHeight = _CLineHeight + "pt";
            objL.style.fontSize = _CFontSize + "pt";
            objL.style.lineHeight = _CLineHeight + "pt";
        }
    }


    /*************************************************************************************************************
     * 연계 시스템 오픈
     ************************************************************************************************************/
    $(document).ready(function(){
        $(".LblockTopCombo").change(function() {
    	    var url = $(this).val();
    	    var target = "_blank";
    	    if (url != ""){
        	    $(".LblockTopCombo option").each(function(i, val){
    	    	    if(url == $(this).val()) {
    		    	    target = $(this).attr("target");
    		        }
        	    });
        	    _fn_ComboMove(url, target);
        	}
       });
    });
/************************************************************************************************************
    추가 공통 성격의 Script Function..
************************************************************************************************************/

function _fn_ComboMove(url, target){
    var _target = top.window.open(url, target);
    _target.focus();
}

 /**
  * 공통버튼 click event 처리
  * 작성자 : 이주희 - 2013.11.14
  * (인자)
  * btn : click type
  * menuId : 현 메뉴 ID
  */
 function _fn_CommonBtnAction(btn, menuId, menuNm, scrnId){
     var url;

    if(btn=='favo'){
        url = KSCC_CONTEXT_PATH+"/bcs/yys/scrncmn/addFvrtForm.dev?menuId="+menuId+"&menuNm="+encodeURI(menuNm);
        fnComOpenPopup(url, "target=sc_favorite, width=400, height=540, location =no");
    }else if(btn=='prnt'){
    	_fn_printScrn(menuId);
    }else if(btn=='memo'){
       url = KSCC_CONTEXT_PATH+"/bcs/yys/scrncmn/ReadMemoForm.dev?menuId="+menuId;
       fnComOpenPopup(url, "target=sc_memo, width=900, height=600, location =no");
    }else if(btn=='qna'){
        url = KSCC_CONTEXT_PATH+"/bcs/yys/scrncmn/ReadScrnErrUpdMttr.dev?menuId="+menuId+"&scrnId="+scrnId;
        fnComOpenPopup(url, "target=sc_qna, width=500, height=600, location =no");
    }else if(btn=='help'){
        //url = KSCC_CONTEXT_PATH+"/frameSet.dev";
    	url = KSCC_CONTEXT_PATH+"/PDFServlet.do?menu_id="+menuId;
        //fnComOpenPopup(url, "target=sc_qna, width=500, height=580, location =no");
    	  //메뉴내 팝업 버튼 클릭의 경우  화면 가운데로 이동
        var windowX = Math.ceil( (window.screen.width  - 760) / 2 );
        var windowY = Math.ceil( (window.screen.height - 840) / 2 );
        var specs = "resizable=yes,width=760,height=840,top="+ windowY +",left="+ windowX;
        // 빈 팝업 생성
        var helpPop = window.open("", menuId+"_help", specs);
        var docTitle = $("#LblockPageTitle h1").text();
        var docPath = $("#LblockPageLocation span").text();
        helpPop.document.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>\n");
        helpPop.document.write("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko'>\n");
        helpPop.document.write("<head><title>"+docTitle+" 도움말</title>");
        helpPop.document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\""+KSCC_CONTEXT_PATH+"/css/import.css\" />\n");
        helpPop.document.write("<style>html, body{height: 100%; overflow:hidden;}</style>");
        helpPop.document.write("<script>function fnClose() {   window.close();     return false;     }</script> \n");
        helpPop.document.write("</head><body>\n");
        helpPop.document.write("<div id=\"LblockPageHeader_popUp\">\n");
        helpPop.document.write("<div id=\"LblockPageTitle_popUp\">\n");
        helpPop.document.write("<h1>"+docTitle+"</h1>\n");
        helpPop.document.write("<div style=\"position:absolute;text-align:right;top:12px;width:95%;\"><span>"+docPath+"</span></div>\n");
        helpPop.document.write("</div>\n");
        helpPop.document.write("</div>\n");
        helpPop.document.write("<div id=\"LblockBody_popup\"    style='height:91%;padding:0;'>\n");
        helpPop.document.write("<iframe width='100%' height='100%' frameborder='0' name=\"pdf\" src=\""+url+"\"/></iframe>\n");
        helpPop.document.write("</div>\n");
        helpPop.document.write("<div class=\"Popup_bottom\">\n");
        helpPop.document.write("<div id=\"LblockButton\">\n");
        helpPop.document.write("<span onclick=\"fnClose();\" class=\"Lbtn_close\"><a href=\"#\"><img src=\""+KSCC_CONTEXT_PATH+"/images/icon_close.gif\" />닫기</a></span>\n");
        helpPop.document.write("</div>\n");
        helpPop.document.write("</div>\n");
        helpPop.document.write("</body>\n");
        helpPop.document.write("</html>\n");
        helpPop.document.close();
    }
 }

 /**************************************************************************************************************************************
  * 첫화면 설정 정보 저장 처리 function
  * 기본화면(D), 최종화면(L), 현재화면(C)
  ***************************************************************************************************************************************/
 function _fn_setFrstScrn(){
      fnComBlockUI();
      AjaxUtil.ajaxPOST(KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/saveIntlScrnInf.ajax"
            , {   "intlScrnDvvl" : $("#frstscrnslct option:selected").val()
              }
            , function( data, status, xhr ) {
                fnComUnblockUI();
                var resultType = data[KSCC_RES_KEY_RESULT];
                if( resultType == KSCC_RES_KEY_RESULT_SUCCESS ) {
                    alert('저장되었습니다. ');
                }else{

                }
                homeSetPopupClose();
          }
      );
 }

 /**************************************************************************************************************************************
  *  즐겨찾기 팝업 Open
  ***************************************************************************************************************************************/
 function _fn_fvrtEnvrSet(){

     var url = KSCC_CONTEXT_PATH+"/bcs/yyl/favorite/FvrtEnvrSetForm.dev";
        fnComOpenPopup(url, "width=800, height=730, location=no, target=fvrtEnvrSet");
     }


 /**************************************************************************************************************************************
  * 공통버튼 Print 구현 function
  ***************************************************************************************************************************************/
function _fn_printScrn(menuId){

    var windowX = Math.ceil( (window.screen.width  - 1000) / 2 );
    var windowY = Math.ceil( (window.screen.height - 700) / 2 );
    var specs = "resizable=yes,width=1000,height=700,top="+ windowY +",left="+ windowX;
    // 빈 팝업 생성
    printpop = window.open("", menuId+"_p", specs);
    printpop.document.open();
    printpop.document.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
    printpop.document.write("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko'>");
    printpop.document.write("<link rel='stylesheet' type='text/css' href='"+KSCC_CONTEXT_PATH+"/css/jquery-ui-1.9.2.custom.css' />");
    printpop.document.write("<link rel='stylesheet' type='text/css' href='"+KSCC_CONTEXT_PATH+"/css/import.css' />");
    printpop.document.write("<link rel='stylesheet' type='text/css' href='"+KSCC_CONTEXT_PATH+"/css/shuttle.css' />");
    printpop.document.write("<link rel='stylesheet' type='text/css' href='"+KSCC_CONTEXT_PATH+"/css/ui.jqgrid.custom.css' />");
    printpop.document.write("<link rel='stylesheet' type='text/css' href='"+KSCC_CONTEXT_PATH+"/css/ztree.css' />");
    printpop.document.write("<link rel='stylesheet' type='text/css' href='"+KSCC_CONTEXT_PATH+"/css/topnleft.css' />");
    printpop.document.write("<head><title>"+$(document).attr("title")+"</title></head>");
    printpop.document.write("<body>");
    var commBtn = $("#LblockCommonBtn").html();
    if(commBtn){
        $("#LblockCommonBtn").remove();
        printpop.document.write($("#LblockBody").html());
        $(".LblockHeaderAlign").prepend(" <div id=\"LblockCommonBtn\">  "+commBtn+"</div>");
    }else{
        printpop.document.write($("#LblockBody").html());
    }
    printpop.document.write("</body></html>");
    printpop.document.close();
    printpop.print(); printpop.close();

}

/**************************************************************************************************************************************
 * 메뉴검색 function
 ***************************************************************************************************************************************/
function _fn_OpenMenuSrchPopup() {
    var url = KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/menuSrchForm.dev";
    /*
     if(menuSchKey.length<1){
        alert("메뉴 검색어를 입력하세요");
        return false;
    }*/
    fnComOpenPopup(url, "height=709", "_fn_SrchMenuCallBack","","menuSrchForm");
}
function _fn_SrchMenuCallBack(param){
     var data = param[KSCC_MAPKEY_DATA];
     fnChangeLocation(data["define_id"],data["menuId"],data["action"],"_self",data["ispop"],data["menuattrval"]);
}

/**************************************************************************************************************************************
 * 시스템 바로가기  function (TABLET)
 ***************************************************************************************************************************************/
function _fn_SystemLinkLayer() {

   if($("#LblockSystemLink_Layer").hasClass("Lnodisplay")){
	   outerLayout.allowOverflow('north');
	   $("#LblockSystemLink_Layer").removeClass("Lnodisplay");
   }else{
	   $("#LblockSystemLink_Layer").addClass("Lnodisplay");
   }
}


/**************************************************************************************************************************************
 * 타사용자 검색 function
 ***************************************************************************************************************************************/
function _fn_OpenOtherAcntSrchPopup() {
    var url = KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/othrAcntSrchForm.dev";
    fnComOpenPopup(url, "height=720, resizable=yes","_fn_InitLocation");
}

/**************************************************************************************************************************************
 * 타사용자 Logout function
 ***************************************************************************************************************************************/
function _fn_OtherAcntLogout(userId) {
     fnComBlockUI();
    AjaxUtil.ajaxPOST(KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/othrAcntLogout.ajax"
            , {   "userId" : userId }
            , function( data, status, xhr ) {
                fnComUnblockUI();
                var resultType = data[KSCC_RES_KEY_RESULT];
                if( resultType == KSCC_RES_KEY_RESULT_SUCCESS ) {
                   alert("타 사용자 로그아웃 되었습니다.");
                   _fn_InitLocation( );
                }else{
                    alert('타 사용자 로그아웃 실패!!. ');
                }
          }
      );
}


/**************************************************************************************************************************************
 * location reload
 ***************************************************************************************************************************************/
function _fn_InitLocation(){
    $("#actionchange").attr("action",KSCC_CONTEXT_PATH+"/index.dev");
    $("#actionchange").submit();
}

/**************************************************************************************************************************************
 * Button 권한 Control
 ***************************************************************************************************************************************/
    $(document).ready(function() {
        if(typeof srcAuthorizedDvvl=='undefined' || typeof userAuthorizedDvvl=='undefined' ) return false;
        var srcAuthArr = srcAuthorizedDvvl.split("");
        for(var idx=0; idx<srcAuthArr.length; idx++){
            if(userAuthorizedDvvl.indexOf(srcAuthArr[idx])<0){
                $(".auth"+srcAuthArr[idx]).css("display","none");
            }
        }
        var userAuthArr = userAuthorizedDvvl.split("");
        for(var idx=0; idx<userAuthArr.length; idx++){
            $(".auth"+userAuthArr[idx]).css("display","inline");
        }
    });

    /**************************************************************************************************************************************
     * fnTitleReplace
     ***************************************************************************************************************************************/
    function fnScrnNmReplace(repStr){
        var tgtStr = $("#LblockPageTitle > h1").text();
        $("#LblockPageTitle > h1").text( tgtStr.replace("@", repStr));
        document.title = tgtStr.replace("@", repStr);
    }
    // 표준 Pop 페이지의 타이틀 Replace
    function fnScrnNmReplacePop(repStr){
        var tgtStr = $("#LblockPageTitle_popUp > h1").text();
        $("#LblockPageTitle_popUp > h1").text( tgtStr.replace("@", repStr));
        document.title = tgtStr.replace("@", repStr);
    }

    /**************************************************************************************************************************************
     *  팝업페이지의 경우 Title 동기화
     ***************************************************************************************************************************************/
    $(document).ready(function() {
        var tgtStr = $("#LblockPageTitle_popUp > h1").text();
        if(tgtStr && tgtStr.length>0){
            document.title = tgtStr;
        }
    });