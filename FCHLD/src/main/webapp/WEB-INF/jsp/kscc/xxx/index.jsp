<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
<title>Sample</title>
<%
String usrId ="";
    try{
        usrId = (String) session.getAttribute("loginId");
    }catch(Exception e){
        session.invalidate();
    }
%>
<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/head.jsp" />

<style type="text/css">
#LblockWrapper{
    background:#f1f1f1;
    width:100%;
    height:100%;
    padding-top:250px;
    }
#loginBlock{
    position:relative;
    width:690px;
    height:300px;
    background:#f9f9f9 url(<%=request.getContextPath()%><c:url value='/images/login/login_img.png'/>) no-repeat 30px 50px;
    border:1px solid #cacaca;
    border-top:2px solid #7783a7;
    margin:auto;
    color:#5d5d5d;
    }

#loginBlock h1.logo{
    position:absolute;
    top:-30px;
    left:0;
    }
#loginBlock p.logintitle{
    line-height:2;
    }
#loginBlock p.logintitle span {
    display:block;
    margin-top:6px;
    }
.loginRadio { margin:7px 0 10px 0;}
.loginRadio input { margin:-1px 2px 0 4px;}
.loginRadio label { padding-right:15px; font-weight:bold;}
#loginBlock .logincont{
    padding:70px 0 50px 280px;
    }
#loginBlock .loginarea{
    position:relative;
    margin-bottom:4px;
    }
#loginBlock .loginarea input.intext{
    border:1px solid #bdbdbd;
    padding:8px;
    margin-bottom:8px;
    width:200px;
    }
#loginBlock .loginarea .loginbtn{
    position:absolute;
    top:2px;
    left:230px;
    }
#loginBlock .l_footer{
    background:url(<%=request.getContextPath()%><c:url value='/images/login/login_footer.png'/>) no-repeat 0 0;
    position:absolute;
    padding-left:130px;
    top:310px;
    left:0;
    font-size:0.95em;
    letter-spacing:-1px;
    color:#898b8e;
}
</style>

</head>
<body>

    <div id="LblockWrapper">
        로그인완료 [id :  <%= usrId %>]
    </div>
</body>
</html>

