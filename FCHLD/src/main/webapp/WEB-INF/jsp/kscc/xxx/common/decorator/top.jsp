<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kscc.framework.session.SessionV" %>
<%@ page import="kscc.framework.menu.MenuListV" %>
<%@ page import="kscc.framework.contants.Constants" %>
<%
    SessionV userSession = new SessionV();
    try{
        userSession = (SessionV)session.getAttribute(Constants.SESSION);
    }catch(Exception e){
        session.invalidate();
        e.printStackTrace();
    }
%>

        <!-- header -->
        <div id="LblockHeader">
            <div id="LblockHeaderIn">
                <div id="LblockTopLogo">
                    <a href="<c:url value='/common/main.do'/>" ><img src="<c:url value='/images/Top_logo_temporary.png'/>" alt="한국스마트카드 마케팅 플랫폼" /></a>
                </div>
                <div id="LblockWelcome">
                    <strong>품질/통합시험팀</strong> | <strong class="name">홍길동</strong><span></span>
                    <a href="/com/logout.do;" id="LblockLogout"></a>
                </div>
            </div>
            <ul id="LblockGnb">
            <li id="menu-0"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM001', '/member/integrationMemberInfo.do', 'MKPM001001001');">회원 관리</a></li>

            <li id="menu-1"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM002', '/point/aggregateMonth.do', 'MKPM002001001');">T-money 포인트관리</a></li>

            <li id="menu-2"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM003', '/adhub/getListAd.do', 'MKPM003001001');">광고Hub</a></li>

            <li id="menu-3"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM004', '/shopping/category/main.do', 'MKPM004001001');">쇼핑Hub</a></li>

            <li id="menu-4"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM005', '/appchanneling/appChannelingList.do', 'MKPM005001001');">앱 채널링 관리</a></li>

            <li id="menu-5"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM006', '/mtmoney/adminnotice/main.do', 'MKPM006001001');">모바일3.0 전시관리</a></li>

            <li id="menu-6"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM007', '/mtmoney/adminnotice/main.do?appDvsCd=cal', 'MKPM007001001');">T캘린더 전시관리</a></li>

            <li id="menu-7"><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM008', '/system/apiManagementInfo.do', 'MKPM008001001');">시스템관리</a></li>
            </ul>
        </div>
        <!-- //header -->