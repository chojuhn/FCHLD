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
        fnComClosePopup();
    }

});

function fnUpload() {

    if (fnValidateFile(jQuery("#oUpdateFile01"), "선택한 파일이 없습니다.")) return false;

    var fileExt = fnComGetFileExt("oUpdateFile01").toLowerCase();

    if(fileExt != ".xls" && fileExt != ".xlsx"){
        alert(fnAlertReplaceMsg("@ 파일만 첨부할 수 있습니다.",["Microsoft 엑셀(Excel)"]));
        return false;
    }

    fnComSetPopupForm("uploadForm");
    fnComBlockUI("LblockBody_popup");
    jQuery("#uploadForm").attr("action", "<c:url value='/sample/sampleExcelUploadPopup.do'/>").submit();

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
    var fileName = "AmtTrnfCtTmpl.xls";
    location.href = "<c:url value="/nss/mso/farebaseinfmng/DownloadExlTmpl.ajax"/>?fileName="+fileName;
}
</script>
    <div id="LblockPageHeader_popUp">
        <div id="LblockPageTitle_popUp">
            <h1>샘플 엑셀업로드</h1>
        </div>
    </div>
    <div id="LblockBody_popup">

        <div id="LblockButton">
            <span onclick="fnExcelDownLoad(); return false;" class="LbtnIcon authE"><a href="#"><img src="<c:url value='/images/icon_down.gif'/>" alt="엑셀템플릿다운로드"/>엑셀템플릿다운로드</a></span>
            <span class="Lbtn_save authS" onclick="fnUpload(); return false;"><a href="#">저장</a></span>
        </div>

        <form name="uploadForm" id="uploadForm" method="post" enctype="multipart/form-data">
        <LTag:token name="token" />
        <input type="hidden" id="mode" name="mode" />
        <input type="hidden" id="hidPage" name="hidPage" value="<c:out value="${input.hidPage}" />" />
            <div id="divFileList" class="LblockDetail">
                <div>
                    <div>
                        <div>
                            <table summary="엑셀 업로드">
                                <caption>엑셀 업로드</caption>
                                <colgroup>
                                    <col style="width: 16%;" />
                                    <col />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th><label class="required">엑셀 업로드</label></th>
                                        <td>
                                            <input name="updateFile01" id="oUpdateFile01" class="file" type="file" style="width: 95%;" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <!-- 페이지 지시문 시작 -->
        <div class="LblockCommentBox">
            <ul>
                <li>[도움말]</li>
                <br/>
                <li>※ 주의 </li>
                <li>  이 작업은 파일의 크기에 따라 처리시간이 오래 걸릴 수 있으니, 처리가 완료될때까지 잠시만 기다려 주시기 바랍니다</li>
                <br/>
                <li>※ MS 엑셀 파일이 갖춰야할 조건 </li>
                <li>  1) 파일의 형식은 반드시 "Microsoft Excel 통합 문서" 이어야 합니다.</li>
                <li>  2) 엑셀 버전은 반드시 Excel 2003 이상 버전이여야 합니다.</li>
                <li>  3) 반드시 제공하는 템플릿 파일을 이용해야 하며, 템플릿 파일 미 이용시 등록되지 않습니다.</li>
                <li>  4) 템플릿의 사용예시를 반드시 준수하시길 바랍니다.</li>
            </ul>
        </div>
        <!-- 페이지 지시문 끝 -->
    </div>
    <div class="Popup_bottom">
        <div id="LblockButton">
            <span class="Lbtn_close" onclick="window.close(); return false;"><a href="#"><img src="<c:url value='/images/icon_close.gif'/>" alt="닫기" />닫기</a></span>
        </div>
    </div>

