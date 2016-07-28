<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<%
//lnb영역 display 설정
String lnbHide  	= request.getParameter("lnbHide");
String lnbClass 	= "";
String lnbStyle		= "";

if("false".equals(lnbHide)) {
	lnbClass = "class=\"LnbNone\"";
	lnbStyle = "style=\"display: none;\" ";  
}

%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
<title>xxx</title>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/head.jsp" />
</head>
<body>
	<!-- wrap -->
	<div id="LblockWrapper"> 
	
	
		<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/top.jsp" />
		
		<!-- container -->
		<div id="LblockContainer" <%=lnbClass%>>
		
			<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx//common/decorator/left.jsp" />
			
			<div id="LblockBody" width="98%">
		
			<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/navigation.jsp" />
			<!-- contents -->
			<sitemesh:write property="body" />
			<!-- //contents -->
			</div>
		</div>
		<!--//container -->
		
		<jsp:directive.include file="/WEB-INF/jsp//kscc/xxx/common/decorator/bottom.jsp" />
	</div>
	<!-- //wrap -->
</body>
</html>