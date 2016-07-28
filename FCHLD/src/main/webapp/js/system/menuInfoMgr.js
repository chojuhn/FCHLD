// tree obj
var dTreeMenu = null;
var gHgrnMenuSeq = "";
var gMenuSeq = "";


/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	
	// 전체열기
	$("#btnAllOpen").on("click",(function() {  
		dTreeMenu.openAll();
	}));
	// 전체닫기
	$("#btnAllClose").on("click",(function() {  
		dTreeMenu.closeAll();
	}));
	
	setDisplayMode("READ");
	btnSearch();
});


/**
 * 코드 전체 조회
 */
function btnSearch() {
	ComUtil.postAjaxData('/mktp/system/selectMenuInfoList.json', 'form1', 'btnSearchCallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 메뉴 조회 call back
 * @param data
 */
function btnSearchCallBack(data) {

	dTreeMenu = new dTree('dTreeMenu');

	dTreeMenu.add(0,-1,"메뉴정보");
	
	if ( data.RESULT_LIST.length > 0)
	{
		for(var i=0; i<data.RESULT_LIST.length; i++)
		{
			dTreeMenu.add(data.RESULT_LIST[i].menuSeq, data.RESULT_LIST[i].hgrnMenuSeq, data.RESULT_LIST[i].menuNm,"javascript:btnMenuInfoClick('" + data.RESULT_LIST[i].hgrnMenuSeq + "','" + data.RESULT_LIST[i].menuSeq + "')","","_self");
		}

		document.getElementById("dtree").innerHTML = dTreeMenu;
		dTreeMenu.closeAll();
		
		if(gMenuSeq != "") 
		{
			dTreeMenu.openTo(gMenuSeq, true);
			btnMenuInfoClick(gHgrnMenuSeq, gMenuSeq);
		} else {
			dTreeMenu.openTo(data.RESULT_LIST[0].menuSeq, true);
			btnMenuInfoClick(data.RESULT_LIST[0].hgrnMenuSeq, data.RESULT_LIST[0].menuSeq);
		}
	}
	else
	{
		dTreeMenu.add(1,0,"등록된 항목이 없습니다.","","","");
		
		document.getElementById("dtree").innerHTML = dTreeMenu;

		dTreeMenu.closeAll();

//		btnInit_Click();
	}	
}

/**
 * 메뉴 트리 클릭 이벤트
 * @param hgrnMenuSeq
 * @param menuSeq
 */
function btnMenuInfoClick(hgrnMenuSeq, menuSeq)
{
	setDisplayMode("READ");
	//공통에서 제공하는 ajax 처리 함수 호출
	ComUtil.postAjaxData('/mktp/system/selectMenuInfo.json', {searchMenuSeq: menuSeq}, 'btnMenuInfoClickCallBack', true, '조회 중 입니다.' );
}

/**
 * 메뉴 정보 조회 call back
 * @param data
 */
function btnMenuInfoClickCallBack(data) {
	ComUtil.clearForm("form1");
	ComUtil.setFormData("form1", data.RESULT_DATA);
	gHgrnMenuSeq 	= data.RESULT_DATA.hgrnMenuSeq;
	gMenuSeq 		= data.RESULT_DATA.menuSeq;
}


/**
 * 상위메뉴 등록 click
 */
function btnHgrnInsertClick() {
	ComUtil.clearForm("form1");
	$("input[name=hgrnMenuId]").val("ROOT");
	$("input[name=hgrnMenuNm]").val("ROOT");

	$("select[name=useYn]").val("Y");
	setDisplayMode("INSERT");
}

/**
 * 하위메뉴 등록 click
 */
function btnInsertClick() {
//	if($("input[name=hgrnMenuId]").val() != "ROOT") {
//		alert("상위 메뉴 선택 후 하위메뉴 추가 버튼을 클릭하세요.");
//		return;
//	}
	var hgrnMenuId 	= $("input[name=menuId]").val();
	var hgrnMenuNm		= $("input[name=menuNm]").val();

	ComUtil.clearForm("form1");
	$("input[name=hgrnMenuId]").val(hgrnMenuId);
	$("input[name=hgrnMenuNm]").val(hgrnMenuNm);
	
	$("select[name=useYn]").val("Y");
	setDisplayMode("INSERT");
	
}

/**
 * 수정 버튼 click
 */
function btnUpdateClick() {
	setDisplayMode("UPDATE");	
}

/**
 * 삭제 버튼 click
 */
function btnDeleteClick() {
	if($("input[name=menuSeq]").val() != "") {
		if ( confirm("삭제 하시겠습니까?") )
		{
			ComUtil.postAjaxData("/mktp/system/deleteMenuInfo.json", 'form1', 'btnDeleteClickCallBack', true, '처리 중 입니다.' );		
		}
	}	
}

/**
 * 삭제 callback
 */
function btnDeleteClickCallBack() {
	gHgrnMenuSeq 	= "";
	gMenuSeq 		= "";
	btnSearch();	
}


/**
 * 저장 버튼 click
 */
function btnSaveClick() {
	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	var result = validate();
	if ( result )
	{
		if ( confirm("저장 하시겠습니까?") )
		{
			if($("input[name=menuSeq]").val() == "") {
				// 신규 저장
				ComUtil.postAjaxData("/mktp/system/insertMenuInfo.json", 'form1', 'btnSaveClickCallBack', true, '처리 중 입니다.' );		
			} else {
				// 수정 저장
				ComUtil.postAjaxData("/mktp/system/updateMenuInfo.json", 'form1', 'btnSaveClickCallBack', true, '처리 중 입니다.' );		
			}
		}
	}	
}

/**
 * 저장 call back
 */
function btnSaveClickCallBack(data) {
	gHgrnMenuSeq 	= data.RESULT_DATA.hgrnMenuSeq;
	gMenuSeq 		= data.RESULT_DATA.menuSeq;
	btnSearch();
}


/**
 * 취소 버튼 click
 */
function btnCancelClick() {
	$("#dtree").find(".nodeSel").trigger("click");
	btnMenuInfoClick(gHgrnMenuSeq, gMenuSeq);

}


/**
 * 화면 상태를 제어한다.
 */
function setDisplayMode(mode) {
	switch(mode) {
		case "INSERT":
		case "UPDATE":
			
			ComUtil.setDisableObj("menuId"			, false);			
			ComUtil.setDisableObj("menuNm"			, false);			
			ComUtil.setDisableObj("menuTypCd"		, false);			
			ComUtil.setDisableObj("menuUrl"			, false);			
			ComUtil.setDisableObj("menuImgUrl"		, false);			
			ComUtil.setDisableObj("sortSeq"			, false);			
			ComUtil.setDisableObj("useYn"			, false);			
			
			ComUtil.setDisableBtn("btnHgrnInsert"	, true);
			ComUtil.setDisableBtn("btnInsert"		, true);
			ComUtil.setDisableBtn("btnUpdate"		, true);
			ComUtil.setDisableBtn("btnDelete"		, true);
			
			ComUtil.setDisableBtn("btnSave"			, false);
			ComUtil.setDisableBtn("btnCancel"		, false);

			break;
		case "READ":
			
			ComUtil.setDisableObj("menuId"			, true);			
			ComUtil.setDisableObj("menuNm"			, true);			
			ComUtil.setDisableObj("menuTypCd"		, true);			
			ComUtil.setDisableObj("menuUrl"			, true);			
			ComUtil.setDisableObj("menuImgUrl"		, true);			
			ComUtil.setDisableObj("sortSeq"			, true);			
			ComUtil.setDisableObj("useYn"			, true);			
		
			ComUtil.setDisableBtn("btnHgrnInsert"	, false);
			ComUtil.setDisableBtn("btnInsert"		, false);
			ComUtil.setDisableBtn("btnUpdate"		, false);
			ComUtil.setDisableBtn("btnDelete"		, false);
			
			ComUtil.setDisableBtn("btnSave"			, true);
			ComUtil.setDisableBtn("btnCancel"		, true);

			break;
		default:
			break;		
	}	
}

