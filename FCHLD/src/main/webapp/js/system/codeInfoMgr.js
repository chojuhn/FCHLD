// tree obj
var dTreeCode = null;
var gHgrnCdSeq = "";
var gCdSeq = "";

/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	
	// 전체열기
	$("#btnAllOpen").on("click",(function() {  
		dTreeCode.openAll();
	}));
	// 전체닫기
	$("#btnAllClose").on("click",(function() {  
		dTreeCode.closeAll();
	}));
	
	setDisplayMode("READ");
	btnSearch();
});


/**
 * 코드 전체 조회
 */
function btnSearch() {
	ComUtil.postAjaxData('/mktp/system/selectCodeInfoList.json', 'form1', 'btnSearchCallBack', true, '처리 중 입니다.', '13000' );
}

/**
 * 코드 조회 call back
 * @param data
 */
function btnSearchCallBack(data) {

	dTreeCode = new dTree('dTreeCode');

	dTreeCode.add(0,-1,"코드정보");
	
	if ( data.RESULT_LIST.length > 0)
	{				
		for(var i=0; i<data.RESULT_LIST.length; i++)
		{
			dTreeCode.add(data.RESULT_LIST[i].cdSeq, data.RESULT_LIST[i].hgrnCdSeq, data.RESULT_LIST[i].cdNm,"javascript:btnCodeInfoClick('" + data.RESULT_LIST[i].hgrnCdSeq + "','" + data.RESULT_LIST[i].cdSeq + "')","","_self");

		}

		document.getElementById("dtree").innerHTML = dTreeCode;

		dTreeCode.closeAll();

		if(gCdSeq != "") 
		{
			dTreeCode.openTo(gCdSeq, true);
			btnCodeInfoClick(gHgrnCdSeq, gCdSeq);
		} else {
			dTreeCode.openTo(data.RESULT_LIST[0].cdSeq, true);
			btnCodeInfoClick(data.RESULT_LIST[0].hgrnCdSeq, data.RESULT_LIST[0].cdSeq);
		}

	}
	else
	{
		dTreeCode.add(1,0,"등록된 항목이 없습니다.","","","");
		
		document.getElementById("dtree").innerHTML = dTreeCode;

		dTreeCode.closeAll();

//		btnInit_Click();
	}	
}

/**
 * 코드 트리 클릭 이벤트
 * @param hgrnCdSeq
 * @param cdSeq
 */
function btnCodeInfoClick(hgrnCdSeq, cdSeq)
{
	setDisplayMode("READ");
	//공통에서 제공하는 ajax 처리 함수 호출
	ComUtil.postAjaxData('/mktp/system/selectCodeInfo.json', {searchCdSeq: cdSeq}, 'btnCodeInfoClickCallBack', true, '조회 중 입니다.' );
}

/**
 * 코드 정보 조회 call back
 * @param data
 */
function btnCodeInfoClickCallBack(data) {
	ComUtil.clearForm("form1");
	ComUtil.setFormData("form1", data.RESULT_DATA);
	gHgrnCdSeq  = data.RESULT_DATA.hgrnCdSeq;
	gCdSeq 		= data.RESULT_DATA.cdSeq;
}


/**
 * 상위 코드 등록 click
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
	setDisplayMode("INSERT");
}

/**
 * 하위 코드 등록 click
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
	
	$("input[name=cd]").attr("class", "input_esst v-req");
	$("input[name=cd]").attr("readonly", false);
	
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
	if($("input[name=cdSeq]").val() != "") {
		if ( confirm("삭제 하시겠습니까?") )
		{
			ComUtil.postAjaxData("/mktp/system/deleteCodeInfo.json", 'form1', 'btnDeleteClickCallBack', true, '처리 중 입니다.' );		
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
	var result = validate();

	if ( result )
	{
		if ( confirm("저장 하시겠습니까?") )
		{
			if($("input[name=cdSeq]").val() == "") {
				// 신규 저장
				ComUtil.postAjaxData("/mktp/system/insertCodeInfo.json", 'form1', 'btnSaveClickCallBack', true, '처리 중 입니다.' );		
			} else {
				// 수정 저장
				ComUtil.postAjaxData("/mktp/system/updateCodeInfo.json", 'form1', 'btnSaveClickCallBack', true, '처리 중 입니다.' );		
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
	btnCodeInfoClick(gHgrnCdSeq, gCdSeq);

}

/**
 * 화면 상태를 제어한다.
 */
function setDisplayMode(mode) {
	switch(mode) {
		case "INSERT":
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


