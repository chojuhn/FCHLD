<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<jsp:directive.include file="/WEB-INF/jsp/kscc/xxx/common/decorator/common.jsp"/>
<script type="text/javascript" language="javascript">
/* 메일 보내는 함수 */
function fnSendMail() {
	jQuery("#sendMail").attr("action", "<c:url value='/sample/sampleEmail.do'/>").submit();
}

</script>
    <div class="LblockPageSubtitle">
    	<h2>이메일 보내기</h2>
    	<div class="LblockSubbutton">
    		<span class="Lbtn" onclick="fnInit()"><a href="#">초기화</a></span>
    		<span class="Lbtn_save authS" onclick="fnSendMail()" style="display: inline;"><a href="#">보내기</a></span>
    	</div>
    </div>

    <div id="LblockDetail01" class="LblockDetail">
    	<form name="sendMail" id="sendMail" method="post">
        <table summary="교통사업자 정보">
            <caption>교통사업자 정보</caption>
            <colgroup>
                <col style="width: 20%;">
                <col style="width: 80%;">
            </colgroup>
            <tbody>
                <tr>
                    <th><label class="th_essential">*</label><label for="acfieldTo" class="">받는사람</label></th>
                    <td><input class="Ltext" id="acfieldTo" name="acfieldTo" size="120" ></td>                             
                </tr>
                <tr>
                    <th><label class="th_essential">*</label><label for="acfieldCc" class="">참조</label></th>
                    <td><input class="Ltext" id="acfieldCc" name="acfieldCc" size="120" ></td>
                </tr>
                <tr>
                    <th><label class="th_essential">*</label><label for="subject" class="">제목</label></th>
                    <td><input class="Ltext" id="subject" name="subject" size="120" ></td>
                </tr>
                <tr>
                    <td colspan="2"><textarea id="content" name="content" style="width: 99%; height: 356px; display: block;"></textarea></td>
                </tr>
            </tbody>
        </table>
        </form>
    </div>

    

