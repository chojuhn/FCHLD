<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<script type="text/javascript" >
/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
	
	// jqGrid 초기화
    fnComInitGrid(
          ""
        , "jqList"
        , "rownum"
        , "hidPage"
        , "gridRow"
        , "totalRecords"
        , fnColModel()
        );

    // 윈도우 사이즈 조절에 따라 그리드 사이즈 조절
    fnComBindEventResize("jqList");    
	
});

function fnColModel() {
    return {
        colNames : ["아이디","이름","직급","부서","이메일"]
        , colModel : [
                     { name:"num",       index:"NUM",       align:"center", sortable:true,  jsonmap:"num",       width:40 }
                   , { name:"name",      index:"NAME",      align:"center", sortable:true,  jsonmap:"name",      width:40 }
                   , { name:"birthdate", index:"BIRTHDATE", align:"left",   sortable:false, jsonmap:"birthdate", width:50 }
                   , { name:"telephone", index:"TELEPHONE", align:"left",   sortable:false, jsonmap:"telephone", width:35 }
                   , { name:"address",   index:"ADDRESS",   align:"left",   sortable:false, jsonmap:"address",   width:100}
        ]
        , datatype     : "local"
        , rowNum       : 10
        , multiselect  : false
    };
}

function fnSearchOption() {
    return {
          url : "<c:url value='" + rootContextPath + "/sample/sampleEmployeeJqgrid.ajax' />"
        , mtype : 'POST'
        , postData : {
              "num"   : $("#num").val()
            , "name"  : $("#name").val()

        }
        , datatype : "json"
    };
}

function fnReadListPage(targetPage) {
    fnComReadGridList(targetPage, fnSearchOption());
}

/* 그리드 로딩후 호출되는 함수 */
function fnGridLoadComplete(gridId){
    //엑셀다운로드
    fnComSetExcelDownload( gridId, "excelDownLoad", "<c:url value='/sample/sampleEmployeeJqgridExcel.ajax'/>");
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
	var result = validate();
	if ( result ) {		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());

		$("form[name=form1]").attr("action", rootContextPath + "/sample/sampleEmployee.do");
		$("form[name=form1]").submit();
	} 
}

</script>

    <div class="LblockSearch">
        <div><div><div>
            <form id="form1" name="form1" method="post">
                <input type="hidden"  id="hidPage"        name="hidPage"        value="${employeeV.page}"/>
                <input type="hidden"  id="currentPage" 	  name="currentPage"	value="${employeeV.currentPage}" />	<!-- 현재 페이지 번호 -->
                <input type="hidden"  id="pageSize"       name="pageSize" 		value="${employeeV.pageSize}"    />	<!-- 페이지 사이즈 -->
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
                            <td><input type="text" class="Ltext v-len" id="name" name="name" size="20" minlength="4" title="아이디" value="${usrMngV.id}" /></td>
                            <th><label for="name">이름</label></th>
                            <td colspan="3"><input type="text" class="Ltext v-len" id="name" name="name" size="20" minlength="2" title="이름" value="${usrMngV.userName}" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="image" class="Limage" id="btnSearch" name="btnSearch" onclick="fnReadListPage(1);return false;" src="<c:url value='/images/btn_search.gif'/>" />
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
    
    <div class="LblockPageSubtitle" class="LblockPageSubtitle">
        <div class="LblockListInfo">
            <form>
                <select id="gridRow" name="gridRow"><c:out value="${input.hidListRows}" /></select>건/페이지
                <span class="Ltotal">(총 <label id="totalRecords"></label>건)</span>
            </form>
        </div>
        <div class="LblockSubbutton">
            <span class="LbtnIcon authE"><a href="#" id="excelDownLoad" class="ksccFileDownload"><img src="<c:url value='/images/icon_down.gif'/>" alt="엑셀다운로드"/>엑셀다운로드</a></span>
        </div>
    </div>

    <!-- jquery grid 시작 -->
    <table id="jqList"></table>    
    <!-- jquery grid 종료 -->

