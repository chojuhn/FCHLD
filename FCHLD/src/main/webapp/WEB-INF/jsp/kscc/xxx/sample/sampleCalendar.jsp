<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<script src="<c:url value='/js/usr/readUsrList.js'/>" ></script>
<script type="text/javascript" language="javascript">
/* onLoad */
$(document).ready(function() {
    var searchStartTime = fnComFormatDate(DateUtil.addDate("d", -7, sysdateYMD));  //수집시작일
    var searchEndTime = sysdateYMD; //수집종료일

    $("#srcRgtDtmFrom").val(fnComFormatDate(searchStartTime));
    $("#srcRgtDtmTo").val(fnComFormatDate(searchEndTime));

    fnComInitTwoCalendar("srcRgtDtmFrom","srcRgtDtmTo");

    $("#srcAdptDtm").datepicker();

    if( "<c:out value="${input.srcAdptDtm}" />".length == 0 ) {
        if ("<c:out value="${input.mode}" />".length == 0) {
            $("#srcAdptDtm").val(fnComFormatDate(sysdateYMD));
        }
    } else {
        fnSetHHMMSS( "srcAdptDtm" );
    }

});

/* 검색내용 삭제 */
function fnInputClear( val ) {
    if ( val == 'K' ) {
        $("#srcMntnCd, #srcMntnNm").val('');
    } else {
        fnResetHHMMSS("srcAdptDtm");
    }
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
                            <th><label><span>*</span>등록일자</label></th>
                            <td>
                                <input type="text" class="Ltext" id="srcRgtDtmFrom" name="srcRgtDtmFrom" value="<c:out value='${input.hidSrcRgtDtmFrom}' />" format="date" size="10" /> ~ <input type="text" class="Ltext" id="srcRgtDtmTo" name="srcRgtDtmTo" value="<c:out value='${input.hidSrcRgtDtmTo}' />" format="date" size="10" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div></div></div>
    </div>

    <div class="LblockSearch">
        <div><div><div>
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
                            <th><label>적용일시</label></th>
                        <td>
                            <input class="Ltext" id="srcAdptDtm" name="srcAdptDtm" size="10" />
                            <select class="textCombobox cnt24" onchange="comboToText(this)"></select>
                            <input id="srcAdptDtmHH" name="srcAdptDtmHH" type="text" class="LtextTime" maxlength="2" />시
                            <select class="textCombobox cnt60" onchange="comboToText(this)"></select>
                            <input id="srcAdptDtmMM" name="srcAdptDtmMM" type="text" class="LtextTime" maxlength="2" />분
                            <input id="srcAdptDtmSS" name="srcAdptDtmSS" type="hidden" value="00" class="LtextTime" maxlength="2" />
                            <span class="Lbtn3"><a href="#" onclick="fnInputClear( 'D' ); return false;"><img src='<c:url value='/images/btn_del.gif'/>' alt="삭제" /></a></span>
                        </td>
                        </tr>
                    </tbody>
                </table>
        </div></div></div>
    </div>


    <div class="LblockCommentBox other" style="display:none;">
        <ul>
            <li>※ 회원ID, 휴대폰번호 기준으로 검색하지 않을 경우 등록일자 및 타 조건을 필수로 설정해야 합니다.(등록일자 외 타 조건 단독 설정 불가)</li>
            <li>※ 등록일자 검색 시 등록 기간은 6개월 이내로 설정해야 합니다.</li>
            <li>※ 엑셀 다운로드 시 로딩 시간이 오래 걸릴 수 있으니 <span class="txt_red01">00000</span>건 이하의 데이터만 출력하는 것을 권장합니다.</li>
        </ul>
    </div>



