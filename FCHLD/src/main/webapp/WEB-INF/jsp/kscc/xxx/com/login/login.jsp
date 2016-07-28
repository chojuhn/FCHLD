<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
<title>Sample</title>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/head.jsp" />

<style type="text/css">
#LblockWrapper {
    background:#f1f1f1;
    width:100%;
    height:100%;
    padding-top:250px; }    
#loginBlock{
    position:relative;
    width:690px;
    height:300px;
    background:#f9f9f9 url(<c:url value='/images/login/login_img.png'/>) no-repeat 30px 50px;
    border:1px solid #cacaca;
    border-top:2px solid #7783a7;
    margin:auto;
    color:#5d5d5d; }
#loginBlock h1.logo { position:absolute;top:-30px;left:0; }
#loginBlock p.logintitle{ line-height:2; }
#loginBlock p.logintitle span { display:block;margin-top:6px; }
.loginRadio { margin:7px 0 10px 0; }
.loginRadio input { margin:-1px 2px 0 4px; }
.loginRadio label { padding-right:15px; font-weight:bold; }
#loginBlock .logincont { padding:70px 0 50px 280px; }
#loginBlock .loginarea { position:relative; margin-bottom:4px; }
#loginBlock .loginarea input.intext { border:1px solid #bdbdbd;padding:8px;margin-bottom:8px;width:200px; }
#loginBlock .loginarea input.Ltext { border:1px solid #bdbdbd;padding:5px;margin-bottom:5px;width:200px; }
#loginBlock .loginarea .loginbtn { position:absolute;top:2px;left:230px; }
#loginBlock .Lbtn_save a {
    height: 20px;
    line-height: 22px;
    position: relative;
    display: inline-block;
    text-decoration: none !important;
    border: 1px solid #7b529d;
    white-space: nowrap;
    background: url(../images/btn_bg_save.gif) repeat-x;
    vertical-align: top; overflow: visible;
    color: #fff;
    padding: 0 11px 0 11px;
    background-position: left bottom;
    cursor: pointer; }    
#loginBlock .Lbtn_save a:hover, a:active { color: #fff72a; }
#loginBlock .l_footer {
    background:url(<c:url value='/images/login/login_footer.png'/>) no-repeat 0 0;
    position:absolute;
    padding-left:130px;
    top:310px;
    left:0;
    font-size:0.95em;
    letter-spacing:-1px;
    color:#898b8e; }
</style>

<script type="text/javascript" src="/js/security.js"></script>
<script type="text/javascript" >
$(document).ready(function() {
	$("#btnLogin").click(function() {
		$.ajax({
            url      : "login.ajax",
            type     : "post",
            dataType : "json",
            data     : $("#loginForm").serialize(),
            success  : function(json){
            	if(json.success == false) {
                    // 로그인 에러 메시지
                    if(json.msg != null){
                        alert(json.msg);
                    }
                    
                    // 비밀번호 변경
                    if(json.param != null && json.param == "pwRenew"){
                        $("#usrId").val(json.usrId);
                        $(".loginView").hide();
                        $(".pwdModView").show();
                    }
                    
                    // 로그인 정보 없음
                    if(json.param != null && json.param == "notLogin"){
                        alert(json.errCnt);
                    }
                    
                    if(json.returnUrl != null){
                        location.href = json.returnUrl;
                    }
                }
                if(json.success == true) {
                    location.href = json.returnUrl;
                }
            },
            error:function (e){
                alert("connection error");
            }
        });
	});
	
	$("#btnSave").on("click",(function() {
        if (fnChkPassword()) {
            $.ajax({
                url      : "/com/updateUsrPw.ajax",
                type     : "post",
                dataType : "json",
                async    : false,
                data     : { "usrId":$("#usrId").val(), "usrPw":$("#newPw").val() },
                success  : function(json){
                    if(json.msg != null){
                        alert(json.msg);
                    }
                    
                    if(json.returnUrl != null){
                        location.href = json.returnUrl;
                    }
                },
                error:function (e){
                    alert("connection error");
                }
            });
        }
    }));
});

//비밀번호 체크 로직
function fnChkPassword() {
	var regId = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[!@#$%^*+=-])(?=.*[a-zA-Z]).*$/;
	
    var usrId = $("#usrId").val();
    var newPw = $("#newPw").val();
    var conPw = $("#conPw").val();
    
    if ( !newPasswdValidation(newPw, conPw, usrId) ) return;

    return true;
}

</script>

</head>
<body>

    <div id="LblockWrapper">
        <form method="post" id="loginForm" name="loginForm" mathod="get">

        <div id="loginBlock">
            <h1 class="logo"><img src="<c:url value='/images/login/login_logo.png'/>" alt="Tmoney UnionPay | admin" /></h1>
            <div class="logincont loginView">
                <p class="logintitle">
                    <img src="<c:url value='/images/login/login_title.png'/>" alt="" /><br />
                    <span>소지하고 계신 아이디와 비밀번호를 입력하여 주십시오.</span>
                </p>
                <p class="loginRadio">
                </p>
                <div class="loginarea">
                    <input type="text" id="usrId" name="usrId" minlength="1" maxlength="18" value="" title="아이디" class="intext v-req v-len" placeholder="아이디"/>
                    <input type="password" type="password" id="usrPw" name="usrPw" minlength="1" maxlength="18" value="" title="비밀번호" class="intext v-req v-len" placeholder="비밀번호" />
                    <a href="javascript:;" id="btnLogin" class="loginbtn"><img src="<c:url value='/images/login/login_btn.png'/>" alt="" /></a>
                </div>
            </div>
            <div class="logincont pwdModView" style="display:none;">
                <p class="logintitle">
                    <img src="<c:url value='/images/login/login_title.png'/>" alt="" /><br />
                    <span><font color="red">비밀번호 변경 주기(90일)를 경과하였습니다. <br/>비밀번호를 변경하여 주십시오.</font></span>
                </p>
                <p class="loginRadio">
                </p>

                <div class="loginarea" >
                    <input type="password" id="newPw" name="newPw" minlength="1" maxlength="18" value="" title="신규 비밀번호" class="Ltext v-req v-len" placeholder="신규 비밀번호" />
                    <input type="password" id="conPw" name="conPw" minlength="1" maxlength="18" value="" title="신규 비밀번호 확인" class="Ltext v-req v-len" placeholder="신규 비밀번호 확인" />
                </div>

                <span class="Lbtn_save" style="padding:164px;"><a href="javascript:;" id="btnSave">확인</a></span>
            </div>
            <div class="l_footer">
                서울시 중구 남대문로 5가 581번지 서울시티타워10층 (주)한국스마트카드<br />
                버스·전철·충전·기타 가맹점 : 080-208-2992, 080-209-2992(주/야간), 택시가맹점 : 1644-1188(주간), 080-214-2992(야간)
            </div>
        </div>
        </form>
    </div>
</body>
</html>

