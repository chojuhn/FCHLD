/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    
	// 목록으로 버튼
	$("#btnList").on("click",(function() {  
		btnListClick();
	}));

	
});

/**
 * windwo unload 시 
 */
$(window).unload(function(){
	ComUtil.fnComClosePopup();
	
});


/**
 * 목록 버튼 Click
 */
function btnListClick()
{
	$("form[name=form1]").attr("action", "/mktp/member/app05MemberInfo.do");
	$("form[name=form1]").submit();
}
