<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<script type="text/javascript" language="javascript">
/* 엑셀 팝업화면 오픈 */
function fnOpenExcelPup() {
    fnComOpenPopup("<c:url value='/sample/sampleExcelPopup.do'/>", "height=670", "fnExcelCallBack", null, "");
}

/* 팝업에서 호출될 callback 함수 */
function fnExcelCallBack() {
    alert("callback");
}

/* 엑셀다운로드 버튼 클릭 ============================================================================*/
function fnExcelDownLoad() {
     $("input[name=currentPage]").val(1);
     $("input[name=pageSize]").val($("select[name=searchPageSize]").val());

     $("#form1").attr("action", "<c:url value='/sample/sampleExcelDownload.do'/>").submit();
}
</script>
    <div class="LblockSearch">
        <div><div><div>
            <form id="form1" name="form1" method="post">
                <input type="hidden"  id="currentPage" 	  name="currentPage"	value="${usrMngV.currentPage}" />	<!-- 현재 페이지 번호 -->
                <input type="hidden"  id="pageSize"       name="pageSize" 		value="${usrMngV.pageSize}"    />	<!-- 페이지 사이즈 -->
                <input type="hidden"  id="searchMbrMngNo" name="searchMbrMngNo"	/>	<!-- 회원관리번호 -->
                <table summary="">
                    <caption></caption>
                    <colgroup>
                    <col width="12%" />
                    <col width="20%" />
                    <col width="12%" />
                    <col width="20%" />
                    <col width="12%" />
                    <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th><label for="id">아이디</label></th>
                            <td><input type="text" class="Ltext v-len" id="id" name="id" size="20" minlength="4" title="아이디" value="${usrMngV.id}" /></td>
                            <th><label for="name">이름</label></th>
                            <td colspan="3"><input type="text" class="Ltext v-len" id="userName" name="userName" size="20" minlength="2" title="이름" value="${usrMngV.userName}" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="image" class="Limage" id="btnSearch" name="btnSearch" src="<c:url value='/images/btn_search.gif'/>" />
            </form>
        </div></div></div>
    </div>

    <div class="LblockCommentBox other" style="display:none;">
        <ul>
            <li>※ 회원ID, 휴대폰번호 기준으로 검색하지 않을 경우 등록일자 및 타 조건을 필수로 설정해야 합니다.(등록일자 외 타 조건 단독 설정 불가)</li>
            <li>※ 등록일자 검색 시 등록 기간은 6개월 이내로 설정해야 합니다.</li>
            <li>※ 엑셀 다운로드 시 로딩 시간이 오래 걸릴 수 있으니 <span class="txt_red01">00000</span>건 이하의 데이터만 출력하는 것을 권장합니다.</li>
        </ul>
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
                    <span class="LbtnIcon"><a href="javascript:;" id="btnExcel" name="btnExcel" onclick="fnOpenExcelPup();"><img src="<c:url value='/images/icon_up.gif'/>" alt="엑셀다운로드"/>엑셀업로드</a></span>
                    <span class="LbtnIcon"><a href="javascript:;" id="btnExcel" name="btnExcel" onclick="fnExcelDownLoad();"><img src="<c:url value='/images/icon_down.gif'/>" alt="엑셀다운로드"/>엑셀다운로드</a></span>
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
                            <th>부서</th>
                            <th>직급</th>
                            <th class="Llast">이메일</th>
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
                                <td class="Lfirst Lleft"><a href="#">${result.id}</a></td>
                                <td>${result.userName}</td>
                                <td>${result.deptName}</td>
                                <td class="Lleft">${result.position}</td>
                                <td class="Llast">${result.emailAddr}</td>
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

