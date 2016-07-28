// tree obj
var dTreeCategory = null;
var gHgrnCdSeq = "";
var gCdSeq = "";

/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	
	// 전체열기
	$("#btnAllOpen").on("click",(function() {  
		dTreeCategory.openAll();
	}));
	// 전체닫기
	$("#btnAllClose").on("click",(function() {  
		dTreeCategory.closeAll();
	}));
	
	setDisplayMode("READ");
	btnSearch();
});


/**
 * 카테고리 전체 조회
 */
function btnSearch() {
	ComUtil.postAjaxData('/mktp/adhub/selectCategoryInfoList.json', 'form1', 'btnSearchCallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 카테고리 조회 call back
 * @param data
 */
function btnSearchCallBack(data) {

	dTreeCategory = new dTree('dTreeCategory');

	dTreeCategory.add(0,-1,"카테고리정보");
	
	if ( data.RESULT_LIST.length > 0)
	{				
		for(var i=0; i<data.RESULT_LIST.length; i++)
		{
			dTreeCategory.add(data.RESULT_LIST[i].cdSeq, data.RESULT_LIST[i].hgrnCdSeq, data.RESULT_LIST[i].cdNm,"javascript:btnCategoryInfoClick('" + data.RESULT_LIST[i].hgrnCdSeq + "','" + data.RESULT_LIST[i].cdSeq + "')","","_self");

		}

		document.getElementById("dtree").innerHTML = dTreeCategory;

		dTreeCategory.closeAll();

		if(gCdSeq != "") 
		{
			dTreeCategory.openTo(gCdSeq, true);
			btnCategoryInfoClick(gHgrnCdSeq, gCdSeq);
		} else {
			dTreeCategory.openTo(data.RESULT_LIST[0].cdSeq, true);
			btnCategoryInfoClick(data.RESULT_LIST[0].hgrnCdSeq, data.RESULT_LIST[0].cdSeq);
		}

	}
	else
	{
		dTreeCategory.add(1,0,"등록된 항목이 없습니다.","","","");
		
		document.getElementById("dtree").innerHTML = dTreeCategory;

		dTreeCategory.closeAll();

//		btnInit_Click();
	}	
}

/**
 * 카테고리 트리 클릭 이벤트
 * @param hgrnCdSeq
 * @param cdSeq
 */
function btnCategoryInfoClick(hgrnCdSeq, cdSeq)
{
	setDisplayMode("READ");
	//공통에서 제공하는 ajax 처리 함수 호출
	ComUtil.postAjaxData('/mktp/adhub/selectCategoryInfo.json', {searchCdSeq: cdSeq}, 'btnCategoryInfoClickCallBack', true, '조회 중 입니다.' );
}

/**
 * 카테고리 정보 조회 call back
 * @param data
 */
function btnCategoryInfoClickCallBack(data) {
	ComUtil.clearForm("form1");
	ComUtil.setFormData("form1", data.RESULT_DATA);
	gHgrnCdSeq  = data.RESULT_DATA.hgrnCdSeq;
	gCdSeq 		= data.RESULT_DATA.cdSeq;
}


/**
 * 상위 카테고리 등록 click
 */
function btnMhrkInsertClick() {
	ComUtil.clearForm("form1");
	$("input[name=mhrkCd]").val("ROOT");
	$("input[name=mhrkCdNm]").val("ROOT");
	$("input[name=hgrnCd]").val("ROOT");
	$("input[name=hgrnCdNm]").val("ROOT");
	
	$("input[name=cd]").attr("class", "input_esst v-req");
	$("input[name=cd]").attr("readonly", false);
	
	$("select[name=useYn]").val("Y");
	setDisplayMode("UPDATE");
}

/**
 * 하위 카테고리 등록 click
 */
function btnInsertClick() {
	var mhrkCd 		= $("input[name=mhrkCd]").val();
	var mhrkCdNm 	= $("input[name=mhrkCdNm]").val();
	var hgrnCd 		= $("input[name=cd]").val();
	var hgrnCdNm 	= $("input[name=cdNm]").val();

	ComUtil.clearForm("form1");
	if(mhrkCd== "ROOT") {
		$("input[name=mhrkCd]").val(hgrnCd);
		$("input[name=mhrkCdNm]").val(hgrnCdNm);
	} else {
		$("input[name=mhrkCd]").val(mhrkCd);
		$("input[name=mhrkCdNm]").val(mhrkCdNm);
	}
	$("input[name=hgrnCd]").val(hgrnCd);
	$("input[name=hgrnCdNm]").val(hgrnCdNm);
	
//	$("input[name=cd]").attr("class", "input_esst v-req");
//	$("input[name=cd]").attr("readonly", false);
//	$("input[name=cd]").attr("style", "visibility:hidden");

	setDisplayMode("UPDATE");
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
	if($("input[name=cdSeq]").val() != "") {
		if ( confirm("삭제 하시겠습니까?") )
		{
			ComUtil.postAjaxData("/mktp/adhub/deleteCategoryInfo.json", 'form1', 'btnDeleteClickCallBack', true, '처리 중 입니다.' );		
		}
	}	
}

/**
 * 삭제 callback
 */
function btnDeleteClickCallBack() {
	gHgrnCdSeq = "";
	gCdSeq = "";
	btnSearch();	
}


/**
 * 저장 버튼 click
 */
function btnSaveClick() {
	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	$("input[name=cd]").val(" ");
	var result = validate();

	if ( result )
	{
		if ( confirm("저장 하시겠습니까?") )
		{
			if($("input[name=cdSeq]").val() == "") {
				// 신규 저장
				ComUtil.postAjaxData("/mktp/adhub/insertCategoryInfo.json", 'form1', 'btnSaveClickCallBack', true, '처리 중 입니다.' );		
			} else {
				// 수정 저장
				ComUtil.postAjaxData("/mktp/adhub/updateCategoryInfo.json", 'form1', 'btnSaveClickCallBack', true, '처리 중 입니다.' );		
			}
		}
	}	
}

/**
 * 저장 call back
 */
function btnSaveClickCallBack(data) {
	gHgrnCdSeq  = data.RESULT_DATA.hgrnCdSeq;
	gCdSeq 		= data.RESULT_DATA.cdSeq;
	btnSearch();
}

/**
 * 취소 버튼 click
 */
function btnCancelClick() {
	$("#dtree").find(".nodeSel").trigger("click");
	btnCategoryInfoClick(gHgrnCdSeq, gCdSeq);

}

/**
 * 화면 상태를 제어한다.
 */
function setDisplayMode(mode) {
	switch(mode) {
		case "INSERT":
			ComUtil.setDisableObj("cd", false);			
		case "UPDATE":
			
			ComUtil.setDisableObj("cd", false);			
			ComUtil.setDisableObj("cdNm", false);			
			ComUtil.setDisableObj("etc1Cd", false);			
			ComUtil.setDisableObj("etc2Cd", false);			
			ComUtil.setDisableObj("sortSeq", false);			
			ComUtil.setDisableObj("useYn", false);			
			
			ComUtil.setDisableBtn("btnMhrkInsert"	, true);
			ComUtil.setDisableBtn("btnInsert"		, true);
			ComUtil.setDisableBtn("btnUpdate"		, true);
			ComUtil.setDisableBtn("btnDelete"		, true);
			
			ComUtil.setDisableBtn("btnSave"			, false);
			ComUtil.setDisableBtn("btnCancel"		, false);

			break;
		case "READ":
			
			ComUtil.setDisableObj("cd"			, true);			
			ComUtil.setDisableObj("cdNm"		, true);			
			ComUtil.setDisableObj("etc1Cd"		, true);			
			ComUtil.setDisableObj("etc2Cd"		, true);			
			ComUtil.setDisableObj("sortSeq"		, true);			
			ComUtil.setDisableObj("useYn"		, true);			
		
			ComUtil.setDisableBtn("btnMhrkInsert"	, false);
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


