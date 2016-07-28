
/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	$(document).on("keydown",(function() {
		ComUtil.setClearBackSpace();
	}));	// history.back() 방지
	
	$("#btnLogin").on("click",(function() {  
		btnLoginClick();
	}));

	$("#userPwd").on("keydown",(function(event) {
		if(event.which == 13){
		 btnLoginClick();
		}
	}));
	
	$('input[name=userId]').focus();
	//enter key
	$('input[name=userNm]').on('keydown',function(event) {
		if(ComUtil.getKeyEvent(event) == 13){
			$("#btnLogin").trigger("click");
		}
	});	
});

/**
 * 로그인 버튼 클릭시
 */
function btnLoginClick() {
	//공통에서 제공하는 폼 컨트롤 체크 함수 호출
	result = validate();

	if ( result )
	{
		ComUtil.postAjaxData('/mktp/common/loginAction.json', 'form1', 'btnLoginClickCallBack', true, '처리 중 입니다.', '13000' );
	}
}

/**
 * 로그인 callback
 */
function btnLoginClickCallBack(data)
{
	window.location.href = "/mktp/common/main.do";
}


