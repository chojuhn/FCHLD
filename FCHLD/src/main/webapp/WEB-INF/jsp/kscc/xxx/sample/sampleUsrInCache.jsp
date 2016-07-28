<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<script src="<c:url value='/js/usr/sampleEhcache.js'/>" ></script>

    <div class="LblockSearch">
        <div><div><div>
            <form id="form1" name="form1" method="post">
                <input type="hidden"  id="currentPage" 	  name="currentPage"	value="${employeeV.currentPage}" />	<!-- 현재 페이지 번호 -->
                <input type="hidden"  id="pageSize"       name="pageSize" 		value="${employeeV.pageSize}"    />	<!-- 페이지 사이즈 -->
                <input type="hidden"  id="searchMbrMngNo" name="searchMbrMngNo"	/>	<!-- 회원관리번호 -->
                <table summary="">
                    <caption></caption>
                    <colgroup>
                    <col width="12%" />
                    <col width="20%" />
                    <col width="12%" />
                    <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><label for="id">번호</label></th>
                            <td><input type="text" class="Ltext v-len" id="num" name="num" size="20" minlength="4" title="번호" value="${employeeV.num}" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="image" class="Limage" id="btnSearch" name="btnSearch" src="<c:url value='/images/btn_search.gif'/>" />
            </form>
        </div></div></div>
    </div>

    <div id="LblockListTable01" class="LblockListTable">
        <div class="Lwrapper">
            <div class="LblockPageSubtitle">
                <div class="LblockListInfo">
                    <form action="" method="get">
                        <select class="ListCombo" id="searchPageSize" name="searchPageSize">
                             <option value="10" >10</option>
                             <option value="15" >15</option>
                             <option value="20" >20</option>
                             <option value="30" >30</option>
                             <option value="50" >50</option>
                        </select>
                        <c:if test="${empty paginationInfo}">
                        <span class="Ltotal">건/페이지 (총 0건)</span>
                        </c:if>
                        <c:if test="${not empty paginationInfo}">
                        <span class="Ltotal">건/페이지 (총 ${paginationInfo.totalRecordCount}건)</span>
                        </c:if>
                    </form>
                </div>
                <div id="LblockSubbutton01" class="LblockSubbutton">
                    <span class="LbtnIcon"><a href="javascript:;" id="btnCache" name="btnCache">캐쉬사용자등록</span>
                </div>
            </div>
            <!--// SubTitle & Buttons end -->
            <!--// List Table start -->
                <table summary="">
                    <caption></caption>
                    <colgroup>
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="Lfirst">아이디</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:if test="${not empty resultList}">
                        <c:forEach var="result" items="${resultList}" varStatus="status">
                            <c:choose>
                                <c:when test="${status.count%2 eq 0}">
                                    <tr class="Leven" onclick="javascript:;return false;" style="cursor:pointer;">
                                </c:when>
                                <c:otherwise>
                                    <tr onclick="javascript:;return false;" style="cursor:pointer;">
                                </c:otherwise>
                            </c:choose>
                                <td class="Lfirst Lleft"><a href="#">${result.num}</a></td>
                                <td class="Llast">${result.name}</td>
                            </tr>
                        </c:forEach>
                        </c:if>
                        <c:if test="${empty resultList}">
                            <tr>
                                <td colspan="10" class="Lfirst">검색결과가 없습니다.</td>
                            </tr>
                        </c:if>
                    </tbody>
                </table>
                </div>
        <!--// List Table end -->
        <!--// Paging start -->
        <c:if test="${not empty resultList}">
            <c:if test="${paginationInfo != null}">
            <div class="LblockPaging">
                <ul>
                    <ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="paginationClick" />
                </ul>
            </div>
            </c:if>
        </c:if>
        <!--// Paging end -->
    </div>

