<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<!--
<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>http://
-->
<%@include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp" %>
<script src="<c:url value='/js/usr/usrRgst.js' />" ></script>

	<form:form name="mainForm" id="mainForm" method="post" commandName="mainForm">
    <div id="LblockBodyMain">

        <div id="LblockPageSubtitle02" class="LblockPageSubtitle">
			<h2>기본정보</h2>
        <div id="LblockButton">
            <span class="Lbtn_save authS" onclick="fnSaveRailStn(); return false;"><a href="#">저장</a></span>
            <span class="Lbtn_bar"><img src="<c:url value='/images/img_bar.gif' />" alt="버튼 구분선"/></span>
            <span class="Lbtn authR" onclick="fnGoList(); return false;"><a href="#">목록</a></span>
        </div>

		</div>
            <div id="LblockDetail01" class="LblockDetail">
                <cfn:token name="token" />
                <table summary="기본정보">
                    <caption>기본정보</caption>
                    <colgroup>
                        <col style="width: 16%;" />
                        <col style="width: 34%;" />
                        <col style="width: 16%;" />
                        <col style="width: 34%;" />
                    </colgroup>
                    <tbody>

                        <tr>
                            <th width="100"><label for="userName" class="required">이름</label></th>
                            <td width="220">
                                <form:input class="Ltext WV:이름:true:maxLength=10" path="userName" maxlength="10"/><form:errors path="userName" />
                            </td>
                            <th width="100"><label for="deptName" class="required">부서명</label></th>
                            <td>
                                <form:input class="Ltext WV:부서명:true:maxLength=20" path="deptName" maxlength="20" /><form:errors path="deptName" />
                            </td>
                        </tr>
                        <tr>
                            <th width="100"><label for="tropId" class="required">직급</label></th>
                            <td>
	                            <form:select path="position" class="WV:직급:true:maxLength=10" style="width: 156px;">
	                                <option value="">선택</option>
	                                <option value="사장">사장</option>
									<option value="상무">상무</option>
									<option value="전무">전무</option>
									<option value="부장">부장</option>
									<option value="차장">차장</option>
									<option value="과장">과장</option>
									<option value="대리">대리</option>
									<option value="사원">사원</option>
									<option value="사원">선임</option>
									<option value="기타">기타</option>

	                            </form:select>
		                    </td>

                            <th><label for="lineCd" class="required">이메일</label></th>
                            <td>
                                <form:input class="Ltext WV:이메일:true:maxLength=40" path="emailAddr" maxlength="40" /><form:errors path="emailAddr" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
    </form:form>

