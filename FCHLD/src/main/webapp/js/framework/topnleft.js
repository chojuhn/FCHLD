    var outerLayout;	        // Layout 전역변수
    var LeftFavoTreeSet;
    var LeftHistTreeSet;
    var isOpenWest = true; // Left(West) Layout Open 여부 초기변수
    var _v_tabIndex;
    var _v_menuId;
    var _v_defineId;
    var _v_do_init_event = false;
    var _v_west_panel_size = 260;
    var _v_north_panel_size = 71;
    /**************************************************************************************************************************************
    *  Admin Menu Tree, Left Menu Tree Setting Info & addHoverDom, removeHoverDom 선언
    *------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    var AdminMenuTreeSet = {
            view: { dblClickExpand: false, selectedMulti: false, showIcon:false, showLine: true
                      , removeHoverDom: removeHoverDom},
            data: { simpleData: {enable:true,idKey: "id",pIdKey: "pId",rootPId: ""}},
            callback: {
                onClick: function(e,treeId, treeNode) {
                        var zTree = $.fn.zTree.getZTreeObj("admin-menu-tree");
                        fnExpandProcess(treeNode);
                        zTree.expandNode(treeNode);
                        fnChangeLocation(treeNode.id, treeNode.menuid,treeNode.action,"_self",  "n", treeNode.menuattrval);
                    },
                beforeExpand: fnExpandProcess
            }
        };

    var LeftMenuTreeSet = {
        view: { dblClickExpand: false, selectedMulti: false, showIcon:false, showLine: true
                  , addHoverDom: addHoverDom
                  , removeHoverDom: removeHoverDom},
        data: { simpleData: {enable:true,idKey: "id",pIdKey: "pId",rootPId: ""}},
        callback: {
            onClick: function(e,treeId, treeNode) {
                    fnAllLayerClose();//첫화면 설정, Admin 등의  Layer 페이지 close
                    var zTree = $.fn.zTree.getZTreeObj("left-menu-tree");
                    fnExpandProcess(treeNode);
                    zTree.expandNode(treeNode);
                    fnChangeLocation(treeNode.id, treeNode.menuid,treeNode.action,"_self",  "n", treeNode.menuattrval);
                }
            ,beforeExpand: fnExpandProcess
        }
    };
    function addHoverDom(treeId, treeNode) {
         if (treeNode.isParent) return;
         if ($("#diyBtn_"+treeNode.id).length>0) return;
         var aObj = $("#" + treeNode.tId+"_a");
         var editStr = "<span id='diyBtn_"+treeNode.id+"' style='position:absolute; right:4px;'><img src='"+KSCC_IMAGE_PATH+"menu_popup.gif' title='"+treeNode.name+"' style='padding-top:3px'></span>";
         aObj.append(editStr);
         var btn = $("#diyBtn_"+treeNode.id);
         if (btn) btn.bind("click", function(){
             fnChangeLocation(treeNode.id, treeNode.menuid,treeNode.action, "_blank","y", treeNode.menuattrval);
             return false;
         });
    }
    function removeHoverDom(treeId, treeNode) {
        if (treeNode.isParent) return;
        $("#diyBtn_"+treeNode.id).unbind().remove();
    }

    /**************************************************************************************************************************************
    *   Top Area & Left Area 내의 Layout 및 메뉴 Tree의 초기화 Function
    *   document 의 load가 종료되기 전 호출되므로 $(function(){}, $(document).ready() 구문보다 먼저 실행된다.
    *------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    /**************************************************************************************************************************************
     *  Tab (메뉴, 즐겨찾기, 히스토리) Select Event Binding
     *  DropDown Menu Event Binding
     *----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnTopnLeftInit(tabIndex, menuId, defineId, scrnNm){
        _v_tabIndex = tabIndex;
        _v_menuId = menuId;
        _v_defineId =  defineId;

         //tab select event bind
         $('#tabs').tabs({
             select: function(event, ui) { // select event
                var tab_index = ui.index;
                 if(tab_index ==0){
                     $(".btn_menu a").removeClass("tab_menu_non");$(".btn_menu a").addClass("tab_menu_cur");
                     $(".btn_favorite a").removeClass("tab_favo_cur");$(".btn_favorite a").addClass("tab_favo_non");
                     $(".btn_history a").removeClass("tab_hist_cur");$(".btn_history a").addClass("tab_hist_non");
                 }else if(tab_index ==1){
                     $(".btn_menu a").removeClass("tab_menu_cur");$(".btn_menu a").addClass("tab_menu_non");
                     $(".btn_favorite a").removeClass("tab_favo_non");$(".btn_favorite a").addClass("tab_favo_cur");
                     $(".btn_history a").removeClass("tab_hist_cur");$(".btn_history a").addClass("tab_hist_non");
                     fnFavoriteTabProcess(menuId);
                 }else if(tab_index ==2){
                     $(".btn_menu a").removeClass("tab_menu_cur");$(".btn_menu a").addClass("tab_menu_non");
                     $(".btn_favorite a").removeClass("tab_favo_cur");$(".btn_favorite a").addClass("tab_favo_non");
                     $(".btn_history a").removeClass("tab_hist_non");$(".btn_history a").addClass("tab_hist_cur");
                     fnHistoryTabProcess();
                 }
             }
         });
         //drop-down menu event bind
         $(".ui-layout-north").mouseleave(function(){runEffect("drop-all",false); return false;});
         $(".ui-layout-west").mouseenter(function(){runEffect("drop-all",false); return false;});
         $(".ui-layout-center").mouseenter(function(){runEffect("drop-all",false); return false;});

         // layout constructor
        outerLayout = $('body').layout({
            west__size:                         _v_west_panel_size
          , west__spacing_open:           0
          , west__initClosed:                 false  //초기 오픈상태 (true:close, false:open)
          , west__contentSelector:        ".west-content"
          , west__togglerLength_open:   0           // HIDE the toggler button
          , west__togglerLength_closed:-1            // "100%" OR -1 = full width of pane
          , west__resizable:                  false
          , west__slidable:                    false
          , north__size:                        _v_north_panel_size
          , north__spacing_open:          0           // cosmetic spacing
          , north__togglerLength_open:  0           // HIDE the toggler button
          , north__togglerLength_closed:-1          // "100%" OR -1 = full width of pane
          , north__resizable:                  false
          , north__slidable:                    false
          , north__contentSelector:        ".north-content"
          , north__fxName:                    "none"
          , north__showOverflowOnHover:   false
          , stateManagement__enabled:	true
          , center__onresize: function ( pane, $pane, paneState, paneOptions ) { fnComUpdateSize(); }
          });
        // Left Menu Tree constructor
        $.fn.zTree.init($("#left-menu-tree"), LeftMenuTreeSet, LEFT_MENU_NODE);
        var treeMenu = $.fn.zTree.getZTreeObj("left-menu-tree");

        var menuViewType = $("#actionchange input[name=menu_view_type]").attr('value');
        //alert(menuViewType);
        if(menuViewType=="tree"){
            $("#left-menu-tree").attr("id","left-menu-tree");
            $("#LblockLeftMenuStyle").find("a:nth-child(2) img").attr("src",KSCC_IMAGE_PATH+"treeMenu_selected.gif");
            //fnNodeIdChg(left-menu-tree);
        }else{
            $("#left-menu-tree").attr("id","left-menu-acco");
            $("#LblockLeftMenuStyle").find("a:first-child img").attr("src",KSCC_IMAGE_PATH+"slideMenu_selected.gif");
        }

        // stateManagement__enabled:true 셋팅으로 인해 layout size 의 변경이 발생할 수 있다.
        // west panel 의 size 가 10 이하의 경우는 발생해선 안되므로 초기화한다.
        var hasOpener = false;
        try {
        	if(opener && opener._v_west_panel_size){
        		hasOpener = true;
            }
        } catch (e) {}
        if(outerLayout.state.west.size<10 && !hasOpener) {
        	outerLayout.sizePane('west',_v_west_panel_size);
        	outerLayout.sizePane('north',_v_north_panel_size);
        }

        //menu tree 의  open 상태 동기화
        // 메뉴가 접힌 상태에서 메뉴관련 이벤트 처리시 접힌 상태의 외곡발생 Layout의 size를 판단하여 분기처리
        if(outerLayout.state.west.size>100){
            var openIds = $("#actionchange input[name=open_menu_ids]").attr("value").split(",");
            for(var idx=0; idx<openIds.length; idx++){
                treeMenu.expandNode(treeMenu.getNodeByParam("id", openIds[idx]));
            }
            // Left Menu Initialize
            if(tabIndex==0){
                treeMenu.selectNode(treeMenu.getNodeByParam("menuid", menuId));
            }
          }else{
            //layout 의 stateManagement__enabled 설정에 따라 초기값 변경
            _v_do_init_event = true;
            isOpenWest = false;
             $(".btn_menu_close a").css("background-image","url("+KSCC_IMAGE_PATH+"btn_menu_open.gif)");
             $(".btn_menu_close a img").attr("alt","메뉴열기");
         }
        //tab activating befor page view
        if(!tabIndex||tabIndex=='null') tabIndex=0;
        if(typeof tabIndex == "string" && tabIndex.match("2")) tabIndex=2;
        $( "#tabs" ).tabs({ active: tabIndex });
        //메뉴검색 input  객체의 Enter Event 처리
        $("#menuSrchKey").keypress(function(e) {
            if (e.keyCode == 13) {    _fn_OpenMenuSrchPopup(); return false;}
        });
        //<title></title> 태그 내 화면명 삽입
        document.title = scrnNm;
        //drop-down menu evnet function call
        fnSetDropDownEvent();
    }

    // Admin Menu 초기화 (권한이 있는 사용자의 경우에만 초기화 합니다.)
    function adminMenuInit(){
        // Admin Menu Tree constructor
        $.fn.zTree.init($("#admin-menu-tree"), AdminMenuTreeSet, ADMIN_MENU_NODE);
        $("#admin-menu-tree").attr("id","left-menu-acco");
        //$("#LblockLeftCommonTitle").find("a:first-child img").attr("src",KSCC_IMAGE_PATH+"slideMenu_selected.gif");
    }

    /**************************************************************************************************************************************
     *  Left Layer 접힘/펼침 Event 처리
     *----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function clickEventChg(tabName){
        fnAllLayerClose();//첫화면 설정, Admin 등의  Layer 페이지 close
        if(tabName=='open-close'){
            if(isOpenWest){
                outerLayout.sizePane('west',26);
                isOpenWest = false;
                $(".btn_menu_close a").css("background-image","url("+KSCC_IMAGE_PATH+"btn_menu_open.gif)");
                $(".btn_menu_close a img").attr("alt","메뉴열기");
                $(".btn_menu_close a img").attr("title","메뉴열기");
            }else{
                outerLayout.sizePane('west',_v_west_panel_size);
                isOpenWest = true;
                $(".btn_menu_close a").css("background-image","url("+KSCC_IMAGE_PATH+"btn_menu_close.gif)");
                $(".btn_menu_close a img").attr("alt","메뉴닫기");
                $(".btn_menu_close a img").attr("title","메뉴닫기");

                //메뉴가 닫힌 상태에서 전환된 경우 메뉴의 초기화가 진행되지 않을 수 있으므로 초기설정 진행
                if(_v_do_init_event){
                    var treeMenu = $.fn.zTree.getZTreeObj("left-menu-tree");
                    var openIds = $("#actionchange input[name=open_menu_ids]").attr("value").split(",");
                    for(var idx=0; idx<openIds.length; idx++){
                        treeMenu.expandNode(treeMenu.getNodeByParam("id", openIds[idx]));
                    }
                    //tab activating befor page view
                    var tabIndex = _v_tabIndex;
                    if(!tabIndex||tabIndex=='null') tabIndex=0;
                    if(typeof tabIndex == "string" && tabIndex.match("2")) tabIndex=2;
                    $( "#tabs" ).tabs({ active: tabIndex });

                    // Left Menu Initialize
                    if(tabIndex==0){
                        treeMenu.selectNode(treeMenu.getNodeByParam("menuid", _v_menuId));
                    }else if(_v_tabIndex==1){
                        var treeFavo = $.fn.zTree.getZTreeObj("left-favo-tree");
                        treeFavo.selectNode(treeFavo.getNodeByParam("id", _v_defineId));
                        treeFavo.setting.async.enable = false;
                     }else if( typeof _v_tabIndex =="string" && _v_tabIndex.match("2")){
                         var treeHist = $.fn.zTree.getZTreeObj("left-hist-tree");
                         treeHist.selectNode(treeHist.getNodeByParam("menuid", _v_menuId));
                         treeHist.setting.async.enable = false;
                     }
                    _v_do_init_event = false;
                }
            }
        }else{
            openWestPane();
        }
    }

    function openWestPane(){
    	if(! isOpenWest){
            outerLayout.sizePane('west',_v_west_panel_size);
            isOpenWest = true;
            $(".btn_menu_close a").css("background-image","url("+KSCC_IMAGE_PATH+"btn_menu_close.gif)");
            $(".btn_menu_close a img").attr("alt","메뉴닫기");
            $(".btn_menu_close a img").attr("title","메뉴닫기");
    	}
    }

    /**************************************************************************************************************************************
     *  초기화면 설정버튼 관련 Function
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    //첫화면 설정 팝업 토글
    function homeSetPopupToggle() {
    	var hasNoDispClass = $("#LblockHomeSettingPopup").hasClass("Lnodisplay");
        fnAllLayerClose();
        openWestPane();
        if(hasNoDispClass){
        	$("#LblockHomeSettingPopup").removeClass("Lnodisplay");
        }else{
        	$("#LblockHomeSettingPopup").addClass("Lnodisplay");
        }
        //$("#LblockHomeSettingPopup").toggleClass("Lnodisplay");
    }
    //첫화면 설정 팝업 닫기
    function homeSetPopupClose() {
        $("#LblockHomeSettingPopup").addClass("Lnodisplay");
    }

    //관리자메뉴 팝업 토글
    function adminMenuPopupToggle(){
        var hasNoDispClass = $("#LblockCommonSearchPopup").hasClass("Lnodisplay");
        fnAllLayerClose();
        openWestPane();
        if(hasNoDispClass){
        	$("#LblockCommonSearchPopup").removeClass("Lnodisplay");
        }else{
        	$("#LblockCommonSearchPopup").addClass("Lnodisplay");
        }
        //$("#LblockCommonSearchPopup").toggleClass("Lnodisplay");
    }

  //관리자메뉴 팝업 닫기
    function adminMenuPopupClose(){
    	openWestPane();
         $("#LblockCommonSearchPopup").addClass("Lnodisplay");
    }

    function fnAllLayerClose(){
         $("#LblockCommonSearchPopup").addClass("Lnodisplay");
         $("#LblockHomeSettingPopup").addClass("Lnodisplay");
    }


    /**************************************************************************************************************************************
     *  Tab (즐겨찾기, 히스토리)  Data Loading Function
     *  $("#tabs") 의 select event 에서 호출
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnFavoriteTabProcess(menuId){
        if( $.fn.zTree.getZTreeObj("left-favo-tree")) return false;
        LeftFavoTreeSet = {
                view: { dblClickExpand: false, selectedMulti: false, showIcon:false, showLine: true
                          , addHoverDom: addHoverDom
                          , removeHoverDom: removeHoverDom},
                    data: { simpleData: {enable:true,idKey: "id",pIdKey: "pId",rootPId: ""},
                              key :{title:"title"}
                             },
                     callback: {
                         onClick: function(e,treeId, treeNode) {
                                 fnAllLayerClose();//첫화면 설정, Admin 등의  Layer 페이지 close
                                 var zTree = $.fn.zTree.getZTreeObj("left-favo-tree");
                                 zTree.expandNode(treeNode);
                                 fnChangeLocation(treeNode.id, treeNode.menuid,treeNode.action,treeNode.target,'n', treeNode.menuattrval);
                             },
                          onAsyncSuccess:fnASyncTreeInitialize
                     },
                    async: {
                        enable: true,
                        url:KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/readFvrt.ajax"
                    }
                };
        $.fn.zTree.init($("#left-favo-tree"), LeftFavoTreeSet);
    }
    var _v_historyViewType = "today";
    function fnHistoryTabProcess(viewtype, sorttype){
        if(!viewtype){
            if(_v_tabIndex && _v_tabIndex!="null" && typeof _v_tabIndex =="string"){
                var vtype = _v_tabIndex.substring(1);
                viewtype = vtype.substring(0,vtype.indexOf("_"));
                sorttype = vtype.substring(vtype.indexOf("_")+1);
            }
            if( $.fn.zTree.getZTreeObj("left-hist-tree")) return false;
        }
        if(!sorttype) sorttype="cnt";
        if(viewtype=="viewtype" ||  viewtype=="null"|| !viewtype || viewtype.length<1 ){
            if(_v_historyViewType.indexOf("_")>0){
                viewtype = _v_historyViewType.substring(0,_v_historyViewType.indexOf("_"));
            }else{
                viewtype = _v_historyViewType;
            }
        }

        $("#_id_his_today").removeClass("Lcurrent"); $("#_id_his_yesterday").removeClass("Lcurrent"); $("#_id_his_week").removeClass("Lcurrent");
        $("#_id_his_"+viewtype).addClass("Lcurrent");
        if(sorttype=="cnt"){
            $("#viewtype_cnt").css("font-weight","bold");
            $("#viewtype_dtm").css("font-weight","normal");
        }else{
            $("#viewtype_cnt").css("font-weight","normal");
            $("#viewtype_dtm").css("font-weight","bold");
        }
        _v_historyViewType = viewtype+"_"+sorttype;
        LeftHistTreeSet = {
                    view: { dblClickExpand: false, selectedMulti: false, showIcon:false, showLine: true
                          , addHoverDom: addHoverDom
                          , removeHoverDom: removeHoverDom},
                    data: { simpleData: {enable:true,idKey: "id",pIdKey: "pId",rootPId: ""}},
                    callback: {
                          onClick: function(e,treeId, treeNode) {
                                fnAllLayerClose();//첫화면 설정, Admin 등의  Layer 페이지 close
                                fnChangeLocation(treeNode.id, treeNode.menuid,treeNode.action,treeNode.target,'n', treeNode.menuattrval);
                            },
                            onAsyncSuccess:fnASyncTreeInitialize
                    },
                    async: {
                        enable: true,
                        url:KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/readVstHstr.ajax",
                        otherParam:{"viewtype":viewtype, "sorttype":sorttype}
                    }
                };
        $.fn.zTree.init($("#left-hist-tree"), LeftHistTreeSet);
    }
    function fnASyncTreeInitialize(){
        if(outerLayout.state.west.size>100){
            if($.fn.zTree.getZTreeObj("left-favo-tree")){
                var treeMenu = $.fn.zTree.getZTreeObj("left-favo-tree");
                treeMenu.setting.async.enable = false;
            }
            if(!_v_tabIndex || _v_tabIndex == "null") _v_tabIndex=$( "#tabs"  ).tabs( "option", "active" );
            if(_v_tabIndex==1){
                var treeMenu = $.fn.zTree.getZTreeObj("left-favo-tree");
                 var openIds = $("#actionchange input[name=open_favo_ids]").attr("value").split(",");
                 for(var idx=0; idx<openIds.length; idx++){
                     treeMenu.expandNode(treeMenu.getNodeByParam("id", openIds[idx]));
                 }
                 treeMenu.selectNode(treeMenu.getNodeByParam("id", _v_defineId));
                 treeMenu.setting.async.enable = false;
             }else if( typeof _v_tabIndex =="string" && _v_tabIndex.match("2")){
                 var treeMenu = $.fn.zTree.getZTreeObj("left-hist-tree");
                 treeMenu.selectNode(treeMenu.getNodeByParam("menuid", _v_menuId));
                 treeMenu.setting.async.enable = false;
             }
        }
    }
    /**************************************************************************************************************************************
    *  파라미터에 해당하는 ztree 객체의 모든 노드를 확장/축소
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    var isMenuTreeExpandAll = false;
    function fnExpandTree(objName){
        var tgtTree = $.fn.zTree.getZTreeObj(objName);
        if(!isMenuTreeExpandAll){
            tgtTree.expandAll(true);
            isMenuTreeExpandAll = true;
        }else{
            tgtTree.expandAll(false);
            isMenuTreeExpandAll = false;
        }
    }
    /**************************************************************************************************************************************
    * Left Tree Menu의 모드가 트리/아코디언에 따라 확장 스타일을 변경한다.
     * 아코디언 모드의 경우 모든 확장트리를 축소한 후 선택한 노드만 확장한다.
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnExpandProcess(treeNode){
        if(!treeNode.menuid){
            var nodeIdStr =$('#LblockLeftMenu ul').attr('id');
             if(nodeIdStr=="left-menu-acco"){
                 $.fn.zTree.getZTreeObj("left-menu-tree").expandAll(false);
             }
        }
    }
    /**************************************************************************************************************************************
     * Tree 구조의 메뉴와  아코디언 구조의 메뉴 스위치
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnNodeIdChg(chg_id_str){
        var nodeIdStr =$('.LblockLeftMenu ul').attr('id');
        //alert(chg_id_str +" | "+nodeIdStr+" | "+(nodeIdStr=="left-menu-tree"));
        if(nodeIdStr=="left-menu-tree"){
            $("#left-menu-tree").attr("id",chg_id_str);
        }else{
            $("#left-menu-acco").attr("id",chg_id_str);
        }
        if(chg_id_str=="left-menu-acco") {
            $("#LblockLeftMenuStyle").find("a:first-child img").attr("src",KSCC_IMAGE_PATH+"slideMenu_selected.gif");
            $("#LblockLeftMenuStyle").find("a:nth-child(2) img").attr("src",KSCC_IMAGE_PATH+"treeMenu.gif");
        }else{
            $("#LblockLeftMenuStyle").find("a:first-child img").attr("src",KSCC_IMAGE_PATH+"slideMenu.gif");
            $("#LblockLeftMenuStyle").find("a:nth-child(2) img").attr("src",KSCC_IMAGE_PATH+"treeMenu_selected.gif");
        }
        if(nodeIdStr=="left-menu-tree"){
            $("#left-menu-tree").attr("id",chg_id_str);
        }else{
            $("#left-menu-acco").attr("id",chg_id_str);
        }

    }

    /**************************************************************************************************************************************
     * 업무영역의 화면의 popup 을 위해 재 호출 했을 경우 Top & Left Pane의 사이즈를 1로 설정하여
     * 보이지 않는 시각효과를 제공한다.
     * pane size 의 최소값은 1
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnContentLayoutExpand(){
        outerLayout.options.stateManagement.enabled = false;
        outerLayout.sizePane('west',1);
        outerLayout.sizePane('north',1);
        outerLayout.options.stateManagement.enabled = true;
    }

    /**************************************************************************************************************************************
     * DropDown Menu Event 정의
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function runEffect(whois, show) {
        var effector = $( whois );
        var otherEffector = $(".LblockTopMenuSub");
        if(whois =='drop-all') {
            otherEffector.hide("blind",300);
        }else{
            if(show){
                otherEffector.hide("blind",1);
                outerLayout.allowOverflow('north');
                effector.show( 'blind', "", 300);

            }else{
                effector.hide( 'blind', 1);
            }
        }
    };

    //타블릿 용 drop-down Effect
    function runEffectT(whois, show) {
    	var subIdx = parseInt(whois.replace("#drop-menu",""));
    	var effector = $( whois );
        var otherEffector = $(".LblockTopMenuSub_T");
        if(show){
        	if(subIdx>6){
        		 $(".LblockTopMenuSub_T").css("left","527px");
        	}else{
        		$(".LblockTopMenuSub_T").css("left","");
        	}
            otherEffector.hide("blind",1);
            $( ".third_depth" ).css("display","none");
            $( ".third_first" ).css("display","inline");
            outerLayout.allowOverflow('north');
            effector.show( 'blind', "", 300);
        }else{
            effector.hide( 'blind', 1);
        }
    };
  //타블릿 용 3depth Effect
    function viewEffectT(whois){
        var effector = $( whois );
        var otherEffector = $(".third_depth");
        otherEffector.css("display","none");
        effector.css("display","inline");
        $(".Tcurrent").removeClass("Tcurrent");
        $(whois+"_li").addClass("Tcurrent");
    }
    /**************************************************************************************************************************************
     * Left Tab 내에서의 메뉴 이동을 위한 Function
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnMChg(menu_id, action, attrval){
    	fnChangeLocation(menu_id,menu_id,action,'_self',  'n', attrval, 'top');
    }

    function fnChangeLocation(define_id, menuid, action,  target, ispop, menuattrval, which){
        if(action){
            var activetabindex = $( "#tabs" ).tabs( "option", "active" );
            // 필수항목
            $("#actionchange input[name=define_id]").attr('value',define_id);
            $("#actionchange").attr("action",action);
            $("#actionchange input[name=menu_id]").attr('value',menuid);
            $("#actionchange input[name=menu_attr_val]").attr('value',menuattrval);
            $("#actionchange input[name=tabindex]").attr('value',activetabindex);
            $("#actionchange input[name=f_size]").attr('value',_CFontSize);
            $("#actionchange input[name=l_height]").attr('value',((_CLineHeight<0)?"":_CLineHeight));
            $("#actionchange input[name=open_menu_ids]").attr('value',fnOpenMenuIdStr());
            $("#actionchange input[name=open_favo_ids]").attr('value',fnOpenFavoIdStr());
            //오픈된 즐겨찾기 메뉴 파라미터 추가

            var menuViewTypeID =$('.LblockLeftMenu ul').attr('id');
            var menuViewType = "acco";
            if(menuViewTypeID == "left-menu-tree"){
                menuViewType = "tree";
            }
            $("#actionchange input[name=menu_view_type]").attr('value',menuViewType);

            if(activetabindex==2){ //history tab 인 경우 오늘 어제 일주일의 viewtype 정보를 함께 셋!!
                $("#actionchange input[name=tabindex]").attr('value',activetabindex+_v_historyViewType);
            }
            if(which && which=='top'){
                //탑메뉴 클릭인 경우 tabIndex 초기화
                $("#actionchange input[name=tabindex]").attr('value',0);
            }
            // 선택항목
            if(target && target.length>4)    	$("#actionchange").attr("target",target);
            if(ispop && ispop.length>0)	    	$("#actionchange input[name=ispop]").attr('value',ispop);
            //if(target=="_self")  fnComBlockUI();
            //alert(target+"  "+ispop+"  "+(target=="_blank" && ispop=="y"));
            if(target=="_blank" && ispop=="y"){
                //메뉴내 팝업 버튼 클릭의 경우  화면 가운데로 이동
                var windowX = Math.ceil( (window.screen.width  - 1000) / 2 );
                var windowY = Math.ceil( (window.screen.height - 700) / 2 );
                var specs = "resizable=yes,width=1000,height=700,top="+ windowY +",left="+ windowX;
                var pop = "";
                // 빈 팝업 생성
                pop = window.open("", menuid, specs);
                // 팝업 아이디 저장
                fnComPopupIdSave(menuid, pop);
                // 타겟 지정
                $("#actionchange").attr("target",menuid);
                // 세션 타이머 리셋
                fnSTimerReset();
            }
            $("#actionchange").submit();
        }
    }

    /**************************************************************************************************************************************
     * 현재의 Left Menu Tree 내에서 확장된 Node의 ID 문자열을 반환
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function  fnOpenMenuIdStr(){
        var retStr = "";
        var treeMenu = $.fn.zTree.getZTreeObj("left-menu-tree");
        var nodes = treeMenu.getNodes();
        for(var idx=0; idx<nodes.length; idx++){
            if(nodes[idx].open){
                retStr += nodes[idx].id+",";
            }
        }
        return retStr.substring(0,retStr.length-1);
    }

    function  fnOpenFavoIdStr(){
        var retStr = "";
        var treeFavo = $.fn.zTree.getZTreeObj("left-favo-tree");
        if(treeFavo){
            var nodes = treeFavo.getNodes();
            for(var idx=0; idx<nodes.length; idx++){
                if(nodes[idx].open){
                    retStr += nodes[idx].id+",";
                }
            }
        }
        return retStr.substring(0,retStr.length-1);
    }

    /**************************************************************************************************************************************
     * 현재의 Left Menu Tree 내에서 확장된 Node의 ID 문자열을 반환
     -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    function fnSetDropDownEvent(){
        $("a[id^='bmenu-btn']").mouseenter(function(){
            runEffect("#drop-menu"+this.id.replace("bmenu-btn",""),true);
        });
        $("a[id^='drop-menu']").mouseleave(function(){
            runEffect("#drop-menu"+this.id.replace("bmenu-btn",""),false);
        });
    }


