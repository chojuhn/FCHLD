<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<script type="text/javascript" language="javascript">
/* onLoad */
$(function() {
    var mode = "<c:out value="${mode}" />";
    var msg = "<c:out value="${msg}" />";

    if(msg.length > 0){
        alert(msg);
    }

    if(mode == "SUCCESS"){
        alert(msg);
    }

});

/* 엑셀 팝업화면 오픈 */
function fnUploadFile() {

    if (fnValidateFile(jQuery("#fileNm"), "선택한 파일이 없습니다.")) return false;

    var fileExt = fnComGetFileExt("fileNm").toLowerCase();

    if(fileExt != ".xls" && fileExt != ".xlsx"){
        alert(fnAlertReplaceMsg("@ 파일만 첨부할 수 있습니다.",["Microsoft 엑셀(Excel)"]));
        return false;
    }

    fnComBlockUI();
    jQuery("#mainForm").attr("action", "<c:url value='/sample/sampleFileUpload.do'/>").submit();

}

/* 팝업에서 호출될 callback 함수 */
function fnExcelCallBack() {
    alert("callback");
}

function fnValidateFile(object, message) {
    if (object.val() == "") {
        alert(message);
        return true;
    }
    return false;
}

/* 엑셀다운로드 버튼 클릭 ============================================================================*/
function fnExcelDownLoad() {
    // 파일명
    location.href = "<c:url value="/sample/readUserExcel.do"/>?fileName="+fileName;
    $("form[name=form1]").submit();
}

function fnDownloadFile() {
    alert("download");
    var fileId = "F0001";
    // 파일명
    location.href = "<c:url value="/sample/sampleFileDownload.do"/>?fileId="+fileId;
    //$("form[name=form1]").submit();
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


    <div id="LblockButton">
        <span class="Lbtn_save" onclick="fnUploadFile();return false;"><a href="#">저장</a></span>
        <span class="Lbtn_bar"><img src="<c:url value='/images/img_bar.gif'/>" alt="버튼 구분선"/></span>
        <span class="LbtnIcon" onclick="fnDownloadFile(); return false;"><a href="#" id="btnFile" name="btnFile">파일다운로드</a></span>
    </div>

    <form id="mainForm" name="mainForm" method="post" enctype="multipart/form-data">
    <LTag:token name="token" />
    <input type="hidden" id="errorMessage" name="errorMessage" value="<c:out value="${errorMessage}"/>"/>
        <div class="LblockDetail">
            <table summary="첨부파일">
                <caption>첨부파일</caption>
                <colgroup>
                    <col width="16%">
                    <col width="100%">
                 </colgroup>
                <tbody>
                  <tr>
                    <th><label for="fileNm">첨부파일</label></th>
                      <td>
                         <input type="text" id="grpNcsRgt" name="grpNcsRgt" class="Ltext readonly"  readonly="readonly" style="width: 80%;" />
                         <div class="file_input_div">
                              <span class="Lbtn3"><a href="#">파일첨부</a></span>
                              <input name="fileNm" id="fileNm" type="file" class="file_input_hidden" style="width: 100%; cursor: pointer;" onchange="document.getElementById('grpNcsRgt').value = this.value" />
                         </div>
                     </td>
                </tr>
                </tbody>
            </table>
        </div>
    </form>

