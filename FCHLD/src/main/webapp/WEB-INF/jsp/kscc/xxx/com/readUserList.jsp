<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<%
// Session 값은 공통헤더에서 선언하고, 등록하도록 한다. 여기서는 테스트 용도로 사용하였고,
// 개발자는 여기서 usrId 를 가져오면 안된다. 
String usrId ="";
    try{
        usrId = (String) session.getAttribute("loginId");
    }catch(Exception e){
        session.invalidate();
    }
%>
<script type="text/javascript" src="/js/security.js"></script>
<script type="text/javascript">

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
        colNames : ["선택", "사용자ID","사용자명","부서명","사용유무","오류건수", "최근로그인", "최초등록일시", "최종변경자", "최종변경일시"]
        , colModel : [
					{ name:"select", align:"center", sortable:false, width:"30"
					    , formatter:function( value, option ) {
					        return "<input type='radio' id='radio_"+ option["rowId"] +"' name='listRadio' value='"+ option["rowId"] +"' />";
					  } }
                   , { name:"usrId",      index:"USR_ID",      align:"center", sortable:true,  width:40 }
                   , { name:"usrNm",      index:"USR_NM",      align:"center", sortable:true,  width:40 }
                   , { name:"dprtNm",     index:"DPRT_NM",     align:"left",   sortable:false, width:40 }
                   , { name:"useYn",      index:"USE_YN",      align:"center", sortable:false, width:30 }
                   , { name:"lgnErrNcnt", index:"LGN_ERR_NCNT",align:"center", sortable:false, width:30 }
                   , { name:"lstLgnDtm",  index:"LST_LGN_DTM", align:"center", sortable:false, width:100, formatter:fnComFormatGridDTime }
                   , { name:"regDt",      index:"REG_DT",      align:"center", sortable:false, width:100, formatter:fnComFormatGridDTime }
                   , { name:"chngUsrId",  index:"CHNG_USR_ID", align:"center",   sortable:false, width:40 }
                   , { name:"chngDt",     index:"CHNG_DT",     align:"center", sortable:false, width:100, formatter:fnComFormatGridDTime }
                   , { name:"usrPw",      hidden:true }
        ]
        , datatype     : "local"
        , rowNum       : 10
        , multiselect  : false
        , onCellSelect : fnSelectedCell
    };
}

function fnSearchOption() {
    return {
          url : "<c:url value='" + rootContextPath + "/com/readUserList.ajax' />"
        , mtype : 'POST'
        , postData : {
              "usrId" : $("#srchUsrId").val()
            , "usrNm" : $("#srchUsrNm").val()

        }
        , datatype : "json"
    };
}

function fnReadListPage(targetPage) {
    fnComReadGridList(targetPage, fnSearchOption());
}

/* 목록 셀 클릭 이벤트 처리자 */
function fnSelectedCell( rowid, iCol, cellcontent, e ) {
    var rowData = $('#jqList').jqGrid('getRowData', rowid);

    $("#radio_"+ rowid).prop("checked", true);

    // 하단 상세부로 선택된 데이터 복사
    $("#hidMode").val( KSCC_DATA_STAT_UPDATE );
    $("#usrId")  .val( rowData["usrId"] );
    $("#usrNm")  .val( rowData["usrNm"] );
    $("#dprtNm") .val( rowData["dprtNm"] );
    $("#useYn")  .val( rowData["useYn"] );
    $("#lgnErrNcnt") .val( rowData["lgnErrNcnt"] );
   
}

/* 신규 */
function fnNew() {
    $("#hidMode").val(KSCC_DATA_STAT_ADD);
    $("#usrId").val( "" );
    $("#usrNm").val( "" );
    $("#dprtNm").val( "" );
    $("#usrPw").val( "" );
    $("#lgnErrNcnt").val( "0" );

    fnSetUpdatable();
    $("usrId").focus();
}

/* 하단 상세부를 수정 상태로 전환 */
function fnSetUpdatable() {
    $("#usrId").removeClass("readonly").prop("readonly", false).focus();
}

/* 저장 */
function fnSave() {
	
	if (!fnRadioCheck()) {
		return;
	}
    // 버튼이 비활성 상태이면 아무 것도 안 함
    if( $("#btnSave").hasClass("Lbtn_save_disable") ) {
        return;
    }
    
    if (KSCC_DATA_STAT_ADD == $("#hidMode").val()) {
    	if ( !newPasswdValidation($("#usrPw").val(), $("#usrPwCfm").val(), "<%=usrId%>") ) return;
    }

    if( ! confirm("저장하시겠습니까?") ) return; // 저장하시겠습니까?

    var postData = $("#detailForm").serializeObject();

    fnComBlockUI();
    AjaxUtil.ajaxPOST(
        "<c:url value='/com/updateUserInfo.ajax' />"
        , postData
        , function( data ) {
            fnComUnblockUI();
            if( data[KSCC_RES_KEY_RESULT] == KSCC_RES_KEY_RESULT_SUCCESS ) {
            	alert("정상");
            	fnReadListPage(1);
            } else {
            	alert("비정상");
            }
          }
        );
}

/* 비밀번호변경 */
function fnUpdateUsrPwInfo() {
    
	if (!fnRadioCheck()) {
        return;
    }
	
	$("#hidMode").val( KSCC_DATA_STAT_UPDATE );
    
    if ( !newPasswdValidation($("#usrPw").val(), $("#usrPwCfm").val(), "<%=usrId%>") ) return;

    if( ! confirm("비밀번호를 변경하시겠습니까?") ) return; // 저장하시겠습니까?

    var postData = $("#detailForm").serializeObject();

    fnComBlockUI();
    AjaxUtil.ajaxPOST(
        "<c:url value='/com/updateUsrPwInfo.ajax' />"
        , postData
        , function( data ) {
            fnComUnblockUI();
            if( data[KSCC_RES_KEY_RESULT] == KSCC_RES_KEY_RESULT_SUCCESS ) {
                alert("정상 처리 되었습니다.");
                fnReadListPage(1);
            } else {
            	if(data["msg"] != null){
                    alert(data["msg"]);
                }
            }
          }
        );
}

//비밀번호 체크 로직
function fnChkPassword() {
    var regId = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[!@#$%^*+=-])(?=.*[a-zA-Z]).*$/;
    
    var usrPw = $("#usrPw").val();
    
    if(!regId.test(usrPw)) {
        alert('비밀번호 형식이 잘못되었습니다.\n'
                +'(영문, 숫자, 특수문자를 혼합하여 8 ~ 20자 이내)');
        return;
    }
  
    return true;
}

function fnRadioCheck() {
	var $selRadio = $("#jqList :checked");
    if( $selRadio.length == 0 ) {
        alert("먼저 사용자를 체크해주세요.");
        return false;
    } else {
    	return true;
    }
}

</script>

    <div class="LblockSearch">
        <div><div><div>
            <form id="form1" name="form1" method="post">
                <input type="hidden"  id="hidPage"        name="hidPage"        value="${userPageV.page}"/>
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
                            <td><input type="text" class="Ltext v-len" id="srchUsrId" name="srchUsrId" size="20" minlength="4" title="아이디" value="${userMngV.usrId}" /></td>
                            <th><label for="name">이름</label></th>
                            <td colspan="3"><input type="text" class="Ltext v-len" id="srchUsrNm" name="srchUsrNm" size="20" minlength="2" title="이름" value="${userMngV.usrNm}" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="image" class="Limage" id="btnSearch" name="btnSearch" onclick="fnReadListPage(1);return false;" src="<c:url value='/images/btn_search.gif'/>" />
            </form>
        </div></div></div>
    </div>
    
    <div class="LblockPageSubtitle" class="LblockPageSubtitle">
        <h2>사용자 리스트</h2>
        <div class="LblockListInfo">
            <form>
                <select id="gridRow" name="gridRow"><c:out value="${input.hidListRows}" /></select>건/페이지
                <span class="Ltotal">(총 <label id="totalRecords"></label>건)</span>
            </form>
        </div>
        <div class="LblockSubbutton">
	        <span class="Lbtn authC" onclick="fnNew(); return false;" style="display: inline;"><a href="#">신규</a></span>
        </div>
    </div>

    <!-- jquery grid 시작 -->
    <table id="jqList"></table>    
    <!-- jquery grid 종료 -->    

	<div class="LblockPageSubtitle space_10">
	    <h2>상세 조회</h2>
	    <div class="LblockSubbutton">
	        <span id="btnSave" class="Lbtn_save" onclick="fnSave(); return false;" ><a href="#">저장</a></span>
	    </div>
	</div>
    <div id="LblockDetail01" class="LblockDetail">
        <form id="detailForm" method="post">
	        <input type="hidden" id="hidRowCnt" name="hidRowCnt">
	        <input type="hidden" id="hidListRows" name="hidListRows">
	        <input type="hidden" id="hidMode" name="hidMode" value="">
	
	        <!-- 수정화면 호출시 사용 Hidden -->
	        <input type="hidden" name="subMode" id="subMode" value="C">
	        <input type="hidden" name="subSrc" id="subSrc" value="">
			<table summary="사용자 상세정보">
			    <caption>사용자 상세정보</caption>
			    <colgroup>
			       <col style="width: 16%;">
			       <col style="width: 34%;">
			       <col style="width: 16%;">
			       <col style="width: 34%;">
			   </colgroup>
			   <tbody>
			       <tr>
			           <th><label class="th_essential">*</label>사용자 ID</th>
			           <td>
			              <input class="Ltext Lright readonly" id="usrId" name="usrId" readonly="">
			           </td>
			           <th>사용자 명</th>
			           <td>
			              <input class="Ltext" id="usrNm" name="usrNm">
			           </td>
			       </tr>
			       <tr>
			           <th>비밀번호</th>
			           <td>
			              <input type="password" class="Ltext" id="usrPw" name="usrPw">
			           </td>
			           <th>비밀번호 확인</th>
                       <td>
                          <input type="password" class="Ltext" id="usrPwCfm" name="usrPwCfm">
                          <span class="Lbtn3"><a href="#" onclick="fnUpdateUsrPwInfo(); return false;">비밀번호변경</a></span>
                       </td>
			       </tr>
			       <tr>
                       <th>부서명</th>
                       <td><input class="Ltext" id="dprtNm" name="dprtNm"></td>
                       <th>사용유무</th>
                       <td>
                          <select id="useYn" name="useYn">
                              <option value="">선택</option>
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                          </select>
                       </td>
                   </tr>
			       <tr>			           
			           <th>오류건수</th>
			           <td colspan="3"><input class="Ltext" id="lgnErrNcnt" name="lgnErrNcnt"></td>
			       </tr>
			    </tbody>
			</table>
       </form>
   </div>

