<%@ page language="java" contentType="text/html; charset=UTF-8"%>


<link rel="stylesheet" href="/js/jsTree/themes/default/style.min.css" />
<script type="text/javascript" src="/js/jsTree/jstree.min.js"></script>

<style>
#box {
	border:1px solid #b8b8b8;
	margin-bottom: 10px;
}

</style>
<script type="text/javascript">
/* onLoad */
$(function() {
	
	
    $('#jstree_demo_div').jstree({ 'core' : {
        'data' : [
                  { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
                  { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
                  { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
                  { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
               ]
           } 
    });
    
    $('#jstree_demo_div2').jstree({
        'core' : {
            'data' : function (obj, cb) {
                cb.call(this,
                  ['Root 1', 'Root 2']);
            }
        }});
});
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

    <div class="LblockPageSubtitle">
    	<h2>트리 샘플</h2>
	</div>
    
    <div id="box">    
        <div id="jstree_demo_div"></div>
    </div>
    
    <div id="box">
    <div id="jstree_demo_div2"></div>
    </div>

