/**
 *  common.js version 1.0
 *
 * AUTHORS LIST       E-MAIL
 * jaehyun lim    jhylim@lgcns.com
 */
var _topMenu, _leftMenu, _leftMenuHtml, _slideMenu;
function changeLeftMenuStyle(aEvent) {
	_leftMenu.innerHTML = _leftMenuHtml;
	var menuObj = "";

	if(aEvent) menuObj = aEvent.target;
	else menuObj = event.srcElement;

	var changeEls = document.getElementById("LblockLeftMenuStyle").getElementsByTagName("img");
	for(var i=0;i<changeEls.length; i++) {
		if (changeEls[i] == menuObj) {
			switch (i) {
				case 0:
					_leftMenu.className = "LslideMenu";
					break;
				case 1:
					_leftMenu.className = "LtreeMenu";
					break;
			}
		}
	}
	initLeftMenu();
}

function initPage() {
	initTopMenu();
	initLeftMenu();

	var LblockLeftMenuStyle = document.getElementById("LblockLeftMenuStyle");
	if (LblockLeftMenuStyle) {
		var changeEls = document.getElementById("LblockLeftMenuStyle").getElementsByTagName("img");
		for (var i = 0; i < changeEls.length; i++) {
			changeEls[i].onclick = changeLeftMenuStyle;
		}
	}
	initTab();
	initTable();
	initList();
	try {
		initTreeBlock();
	} catch(e) {}
	initLocal();
}
var initLocal = function() {};
function initTopMenu() {
	var root = document.getElementById("LblockTopMenu");
	if (!root || !dui.hhmenu) return;
	_topMenu = new dui.hhmenu.HHMenu();
	_topMenu.init(root.getElementsByTagName("ul")[0]);
	//_topMenu.setCurrent(1,1);
}

function initLeftMenu() {
	_leftMenu = D$("LblockLeftMenu");
	if (!_leftMenu) return;
	_leftMenuHtml = _leftMenu.innerHTML;
	if (_leftMenu.hasClassName("LslideMenu")) initSlideMenu();
	else if (_leftMenu.hasClassName("LtreeMenu")) initTreeMenu();
}

function initSlideMenu() {
	var root = _leftMenu.getElementsByTagName("ul")[0];
	_slideMenu = dui.SlideMenu.makeSlideMenu(root, true, true); // 메뉴가 별도의 프레임일 경우 (xxx, true, xxx) , 다른걸 열면 이전게 자동으로 닫히는 경우 (xxx, xxx, true)
}

function initTreeMenu() {
treeMenu = new dui.tree.Tree();
	treeMenu.imagePath = "../images/treemenu_images/";
	treeMenu.enableMoveNode(false);
	var root = document.getElementById("LblockLeftMenu").getElementsByTagName("ul")[0];
	treeMenu.init(root);
	//var selectedNode = treeMenu.selectNode("0>1>1");
}

function initTab() {
	// 2013.9.26 이윤기. dui.Tab을 사용하지 않음
	//if (dui && dui.Tab) dui.Tab.initPage();

	// <li /> 태그에 click 이벤트 핸들러 추가.
	// 탭을 누르면 li a[href]에 ID가 세팅된 div를 보여주고 나머지는 숨긴다.
	// 탭 관련 함수는 kscc.common.js에도 존재하므로 CSS나 로직 변경이 있는 경우 같이 반영한다.
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
		return false;
	});
}

function initTreeBlock() {
	if (!dui.tree) return;
	var treeBlocks = document.getElementsByClassName("LblockTree");
	for (var i=0; i<treeBlocks.length; i++) {
	var tree = new dui.tree.Tree();
		tree.imagePath = "../images/tree_images/";
		tree.enableMoveNode(false);
		var root = treeBlocks[i].getElementsByTagName("ul")[0];
		tree.init(root);
	}
}

function initTable() {
	var listTables = document.getElementsByClassName("LblockListTable");
	for (var i=0; i<listTables.length; i++) {
		styleListTable(listTables[i]);
	}
}

function initList() {
	var lists = document.getElementsByTagName("ul");
	for (var i=0; i<lists.length; i++) {
		styleList(lists[i]);
	}
}

// 테이블 hover시 Lhover 클래스 부여
function styleListTable (listTableBlock) {
	try {
		var table = listTableBlock.getElementsByTagName("table")[0];
		var trArr = table.getElementsByTagName("tr");
		for (var i=0; i<trArr.length; i++) {
			dui.CB.addEventHandler(D$(trArr[i]), "mouseover", function () { this.addClassName("Lhover");}.bind(trArr[i]) );
			dui.CB.addEventHandler(trArr[i], "mouseout", function () { this.removeClassName("Lhover");}.bind(trArr[i]) );
		}
		
	} catch(e) {}
}

// 리스트 hover시 Lhover 클래스 부여
function styleList (list) {
	var items = list.getElementsByTagName("li");
	for (var i=0; i<items.length; i++) {
		dui.CB.addEventHandler(D$(items[i]), "mouseover", function () { this.addClassName("Lhover");}.bind(items[i]) );
		dui.CB.addEventHandler(items[i], "mouseout", function () { this.removeClassName("Lhover");}.bind(items[i]) );
	}
}

//조회조건이 4행 이상인 경우 버튼 클릭시 모두 나타내기
function spreadInquiry() {

	var chImage = $("#LblockSearch a img.Limage2");
	var hiddenConds = $('#LblockSearch table tr.hideNshow');

	if(hiddenConds.hasClass('Lnodisplay')){
		$(chImage).addClass('Limage3');
		$(hiddenConds).removeClass('Lnodisplay');

		} else {
		$(chImage).removeClass('Limage3');
		$(hiddenConds).addClass('Lnodisplay');
	}
}




// IE6 CSS 이미지 재요청 버그 대처코드
try {
	document.execCommand("BackgroundImageCache", false, true);
} catch(ignored) {}


function doSomething() {}

// 2014-10-15 화면 초기화 막음 sjjeong
dui.CB.addEventHandler(window, "load", initPage);


//조회조건이 4행 이상인 경우 버튼 클릭시 모두 나타내기
function spreadInquiry() {

	var chImage = $("#LblockSearch a img.Limage2");
	var hiddenConds = $('#LblockSearch table tr.hideNshow');

	if(hiddenConds.hasClass('Lnodisplay')){
		$(chImage).addClass('Limage3');
		$(hiddenConds).removeClass('Lnodisplay');

		} else {
		$(chImage).removeClass('Limage3');
		$(hiddenConds).addClass('Lnodisplay');
	}
}

//아이콘 호버 시 말풍선 지시문 나타내기 추가_이현현
$(function() {
	$(".commentMouseover").hover(
		function(){
			$(this).find(".commentHover").removeClass("Lnodisplay");
		}, function(){
			$(this).find(".commentHover").addClass("Lnodisplay");
		}
	);
});

//select 값 input text 전달
function comboToText(el){
	el.next("input").value = el.options[el.selectedIndex].value;
}

//select option 시/분/초 value 지정
$(function() {
	for (var i=1; i<=24; i++) {
		if(i<10) i = "0" + i;
		option = $("<option/>").attr("value", i).html(i);
		option.appendTo($(".cnt24"));
	}
	for (var i=0; i<=59; i++) {
		if(i<10) i = "0" + i;
		option = $("<option/>").attr("value", i).html(i);
		option.appendTo($(".cnt60"));
	}
});
/**
 * 메뉴 클릭시
 * menuTypCd	: 메뉴 유형(DIR, URL)
 * mhrkMenuId	: 최상위 메뉴ID
 * menuUrl		: 이동 메뉴 URL
 * selMenuId	: 선택된 메뉴ID
 */
function menuClick(menuTypCd, mhrkMenuId, menuUrl, selMenuId) {
	if(menuTypCd == "URL") {
		var frm = document.createElement('form');
		var o = document.createElement('input');
		o.setAttribute('type', 'hidden');
		o.setAttribute('name', "mhrkMenuId");
		o.setAttribute('value', mhrkMenuId);
		frm.appendChild(o);
		o = document.createElement('input');
		o.setAttribute('type', 'hidden');
		o.setAttribute('name', "menuId");
		o.setAttribute('value', selMenuId);
		frm.appendChild(o);	
		
		frm.setAttribute('name', "menuForm" );
		frm.setAttribute('action', menuUrl);
		frm.setAttribute('method', 'post');
		frm.setAttribute('target', "");
		document.body.appendChild(frm);
		
		frm.submit();
	}
}

function btnLogout() {
	if ( confirm("로그아웃 하시겠습니까?") )
	{
		window.location.href = "/mktp/common/logoutAction.do";	
	}

}
