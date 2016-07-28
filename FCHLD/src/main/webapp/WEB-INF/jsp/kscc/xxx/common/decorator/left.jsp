<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="kscc.framework.session.SessionV" %>
<%@ page import="kscc.framework.menu.MenuListV" %>
<%@ page import="kscc.framework.contants.Constants" %>

            <!--  left -->
            <div id="LblockLeft" >
                <a href="#" id="LnbHide">레프트메뉴 숨김/펼쳐보기</a>
                <div id="LblockCont" >
                    <div id="LblockLeftTitle">
                        <h1>회원 관리</h1>
                    </div>
                    <div id="LblockLeftMenu">
                        <ul id="LblockLnb">
                            <li><a href="javascript:;" class="hasChild">통합회원정보</a>
                                <ul><li><a href="javascript:;" onclick="javascript:menuClick('URL', 'MKPM001', '/member/integrationMemberInfo.do', 'MKPM001001001');">통합회원정보</a></li></ul>
                            </li>
                            <li><a href="javascript:;" class="hasChild">샘플화면</a>
                                <ul>
                                    <li><a href="/sample/sampleFile.do">파일업로드/다운로드</a></li>
                                    <li><a href="/sample/sampleExcel.do">엑셀업로드/다운로드</a></li>
                                    <li><a href="/sample/sampleCsv.do">CSV 다운로드</a></li>
                                    <li><a href="/sample/sampleCalendar.do">달력</a></li>
                                    <li><a href="/sample/sampleEmail.do">이메일</a></li>
                                    <li><a href="/sample/sampleChart.do">Chart</a></li>
                                    <li><a href="/sample/sampleTree.do">Tree</a></li>
                                    <li><a href="/sample/sampleUsrInCache.do">ehcache</a></li>
                                    <li><a href="/sample/sampleDrag.do">dragable</a></li>
                                    <li><a href="/sample/sampleEmployee.do">사용자 리스트 (ORACLE)</a></li>
                                    <li><a href="/sample/sampleEmployeeJqgrid.do">Jqgrid</a></li>
                                    <li><a href="/com/login.do">Login</a></li>
                                    <li><a href="/com/readUserList.do">사용자 리스트(관리자)</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <!--  //left -->

<script type="text/javascript">
//<![CDATA[

$(function(){
    // lnb영역 display 설정이 hide 이면 설정값을 저장한다.
    // form에 강제로 lnb display 상태를 넣어준다.
    $("form").each( function(){
        if($(this).find($("input[name=lnbHide]")).size() == 0) {
            try {
                var o = document.createElement('input');
                o.setAttribute('type', 'hidden');
                o.setAttribute('name', "lnbHide");
                o.setAttribute('value', $('#LblockCont').is(':visible'));
                this.appendChild(o);
            } catch(e) { }
        } else {
            $(this).find($("input[name=lnbHide]")).val($('#LblockCont').is(':visible'));
        }
    });

    $('#LblockGnb').menuModel1({hightLight:{level_1:1},target_obj:'#LblockHeader',showOps:{visibility:'visible'},hideOps:{visibility:'hidden'}});
    $('#LblockLnb').menuModel2({hightLight:{level_1:1,level_2:1,level_3:0},target_obj:'',showOps:{display:'block'}, hideOps:{display:'none'}});

    leftcon();
});
//]]>
</script>
