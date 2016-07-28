var KSCC_CLIENT_SESSION_TIME = 1800;
var KSCC_COUNTDOWN_SECOND = 30;
var KSCC_CLIENT_SESSION_MINUTE = parseInt(KSCC_CLIENT_SESSION_TIME/60);
var _v_globalTimer;       // 전역 타이머 변수
var _v_globalTimeOut;
var _v_totalSessionTime_local = KSCC_CLIENT_SESSION_TIME;
var _v_countDownSec_local = KSCC_COUNTDOWN_SECOND;			// 자동 로그아웃 대기시간 [시스템환경변수:30(초)]

// 초기화
$(function(){
    _fn_setCountFormat();
    _fn_startCount();
    //$(document).bind('keydown.atimeout', function(e){ if(e.which == 19){ __clickYes(); } });	// pause key 이벤트시 연장처리
});

//ajax처리시 시간설정 초기화 하는 로직 추가
$.ajaxSetup({
    complete:function(){
        try {
            if(opener){
            	opener.fnSTimerReset();
            }else{
            	fnSTimerReset();
            }
        } catch (e) {}
    }
});

/**
  * 변수 초기화
  * __totalSessionTime : 총 세션시간(마지막 카운트 30초 외 모듈 실행시 5초 지연포함)
  */
 function _fn_initialize() {
       _v_totalSessionTime_local = KSCC_CLIENT_SESSION_TIME;
     _v_countDownSec_local = KSCC_COUNTDOWN_SECOND;;
     _fn_setCountFormat();
 }

 /**
  * 현재시간 포멧
  */
 /*
 function _fn_setCountFormat() {
     var time=_v_totalSessionTime_local;
     var min, sec;
     var display_time_min_o = $('#_id_timeout');	// topgnb 세션타임아웃 분 표시 영역

     if(display_time_min_o.length > 0 && time >= 0) {
         sec=time%60;
         if(time<60){
            min=0;
         }else{
            min=(time-sec)/60;
         }
         if(min<10){	min="0"+min; }
         if(sec<10){	sec="0"+sec; }

         $(display_time_min_o).html( min+":"+sec );
     }
 }
 */

 function _fn_setCountFormat() {
     var time=_v_totalSessionTime_local;
     var hour, min, sec;
     var display_time_min_o = $('#_id_timeout');	// topgnb 세션타임아웃 분 표시 영역

     if(display_time_min_o.length > 0 && time >= 0) {
    	 //30분 이내의 초기값으로 설정된 단말운영 외 시스템(정산, 카드, 단말인증, 단말카드요금) 적용
    	 if(KSCC_CLIENT_SESSION_TIME<=1800){
             sec=time%60;
             if(time<60){
                min=0;
             }else{
                min=(time-sec)/60;
             }
             if(min<10){	min="0"+min; }
             if(sec<10){	sec="0"+sec; }
             $(display_time_min_o).html( min+":"+sec );
    	 }else{
    		 // 4시간으로 셋팅된 단말운영의 경우 적용
    		 if(time<60){
                 //1분 이내의 잔여시간이 남은경우 00:00(분:초)
    		     sec=time%60;
                 if(time<60){ min=0;
                 }else{ min=(time-sec)/60;
                 }
                 if(min<10){	min="0"+min; }
                 if(sec<10){	sec="0"+sec; }
                 $(display_time_min_o).html( min+":"+sec );
    		 }else{
    			 //1분 이상이 남은 경우는 00:00(시:분)
    			 min = parseInt(time/60);
                 hour = parseInt(min/60);
                 if(hour>0) min = min-(hour*60);
                 if(time<3600) hour =0;
    			 if(hour<10){	hour="0"+hour; }
                 if(min<10){	min="0"+min; }
                 $(display_time_min_o).html( hour+":"+min );
    		 }
    	 }
     }
 }

 /**
  * 타이머 발생함수
  * 1초마다 __countTimeOut() 함수를 호출한다
  */
 function _fn_startCount() {
      clearInterval(_v_globalTimer);
    //clearInterval(_v_globalTimer2);
     _v_globalTimer = setInterval("_fn_countTimeOut();",1000);
     //_v_globalTimer2 = setInterval("_fn_countDownStart();", KSCC_CLIENT_SESSION_TIME * 1000+1000);
 }


 /**
  * 1초마다 _v_totalSessionTime_local 값을 감소시키며
  * 0 초가 됐을때 타이머를 중지시키고
  * 30초를 카운트하는 함수(__countDown30Sec)를 호출한다
  */
 function _fn_countDownStart() {
    _fn_sessionTimerPopup();  //세션종료 경고창 팝업레이어 호출
    _fn_setCountFormat();
    clearInterval(_v_globalTimer);
   //clearInterval(_v_globalTimer2);
    _fn_countDown30Sec();
    //window.setTimeout("callFocus();", 1 );
 }

 /**
  * 세션 타임아웃 총시간이 0초가 되면,
  * 자동 로그아웃 안내 및 자동 로그아웃 대기시간 이후에 로그아웃 처리
  */

 function _fn_countTimeOut() {
     _v_totalSessionTime_local--;
      _fn_setCountFormat();
      if(_v_totalSessionTime_local<1) _fn_countDownStart();
 }

 /**
  * 로그아웃 안내 화면을 띄우고
  * 30초를 카운트 하는 타이머 발생 함수를 호출한다.
  */
 function _fn_countDown30Sec() {
         try {
             _v_totalSessionTime_local= 0;
             _fn_setCountFormat();
             //_v_globalTimer = setInterval("_fn_countTimeOut();",1000);
             _v_globalTimer = setInterval("_fn_countDown();",1000);
        }
         catch(E) {}
     }

 /**
  * 로그아웃 안내 화면에 30초 카운트를 표시하며
  * 0초가 됐을시 타이머를 종료
  */
 function _fn_countDown() {
    try {
        $('#_id_countdown').html( _v_countDownSec_local );	// 자동 로그아웃 까지 남은시간 표시
         if(_v_countDownSec_local == 0) {
             clearInterval(_v_globalTimer);
             $("#sessionTimer").removeClass("sessionExtend");

             //타임아웃을 띄우기 전 명시적 로그아웃 호출
             AjaxUtil.ajaxPOST(KSCC_CONTEXT_PATH+"/system/logout.dev", {},function( data, status, xhr ) { });


             _fn_sessionTimerPopup();
         }
         _v_countDownSec_local--;
    }
     catch(E) {}
 }

 /**
  * 로그아웃 안내 화면에서 '예'를 클릭했을시 세션을 연장하고
  * 처음부터 다시 카운트를 할 수 있도록 초기화한다
  */
 function _fn_extensionTime() {
         clearInterval(_v_globalTimer);
         _fn_initialize();
         AjaxUtil.ajaxPOST(KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/extsSess.ajax", {},function( data, status, xhr ) { });
         _fn_startCount();
 }
/**
 * Session Timer Reset!!
 */
 function fnSTimerReset(){
     clearInterval(_v_globalTimer);
     _fn_initialize();
     _fn_startCount();
}


 /**************************************************************************************************************************************
  *  세션타이머 관련 Function
  ***************************************************************************************************************************************/
 //세션타이머_이현현S
 function _fn_sessionTimerPopup() {
     //애니메이션 효과
     $('#session_mask').fadeIn(500);
     if($("#sessionTimer").hasClass("sessionExtend")) {
        $(".sessionTimerContent").html("<div><p>시스템 종료 남은 시간 : <span class='point' id='_id_countdown'>"+KSCC_COUNTDOWN_SECOND+"</span><span class='point'>초</span></p>"+
    			                                       "<p>로그인 후 약 "+KSCC_CLIENT_SESSION_MINUTE+"분 동안 시스템 사용이 없어 시스템이 종료됩니다."+
    			                                       " 사용 시간을 연장하시겠습니까?</p></div><center><span onclick='_fn_sessionExpand()' class='Lbtn'><a href='#'>사용시간 연장</a></span></center>");
     }else{
    	 $(".sessionTimerContent").html("<div><p>시스템 대기 시간이 <span class='point'>종료</span> 되었습니다.</p>"+
                 "<p>로그인 후 약 "+KSCC_CLIENT_SESSION_MINUTE+"분 동안 시스템 사용이 없어 시스템이 종료되었습니다."+
                 " 재 접속 후 사용하시기 바랍니다.</p></div><center><span onclick='_fn_sessionOut()' class='Lbtn'><a href='#'> 확인 </a></span></center>");
     };
     $("#sessionTimer").removeClass("Lnodisplay");
 }
 function _fn_sessionTimerPopupClose() {
     $("#sessionTimer").addClass("Lnodisplay");
 }


 /**
  * 로그아웃 안내 화면에서 '예'를 클릭했을시 세션을 연장하고
  * 처음부터 다시 카운트를 할 수 있도록 초기화한다
  */
 function _fn_sessionExpand() {
    try {
        $('#session_mask').hide();
         clearInterval(_v_globalTimer);
         clearTimeout(_v_globalTimeOut);
         _fn_initialize();
          AjaxUtil.ajaxPOST(KSCC_CONTEXT_PATH+"/bcs/yyl/commonarea/extsSess.ajax", {}, function( data, status, xhr ) { });
        _fn_startCount();
          $("#sessionTimer").addClass("Lnodisplay");
    }
     catch(E) {}
 }

 /**
  * 로그아웃 안내 화면에서 '확인'를 클릭했을시 명시적인 로그아웃 프로세스를 진행한다.
  */
 function _fn_sessionOut() {
     document.location = KSCC_CONTEXT_PATH+"/system/logout.dev";
 }
