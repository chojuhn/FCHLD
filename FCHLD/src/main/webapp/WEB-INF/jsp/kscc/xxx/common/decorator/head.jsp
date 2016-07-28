<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<%
    String contextPath = request.getContextPath();
%>
<script type="text/javascript">
/*********************************************
 * 상수
 *********************************************/
    var rootContextPath = "<%=contextPath%>";
    var sysdateYMD = "${cfn:getSysDateYMD()}";
    var sysdateY_M_D = "${cfn:getSysDateY_M_D()}";

    // [팝업에서 사용] 콜백할 함수명. kscc.etc.js 상수와 일치시켜야 함.
    var KSCC_PAGEVAR_CALLBACK_FUNC_NAME = "<c:out value="${input._kscc_cb_func}"/>";
    var KSCC_PAGEVAR_CALLBACK_STRING = "<c:out value="${input._kscc_cb_string}"/>";
</script>

<link rel="stylesheet" type="text/css" href="<%=contextPath%>/css/jquery-ui-1.9.2.custom.css" />
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/css/ui.jqgrid.custom.css" />
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/css/import.css" />
<script type="text/javascript" src="<%=contextPath%>/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/jquery-ui-1.9.2.custom.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/jquery/grid.locale-kr.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/jquery/jquery.number.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/jquery/jquery.jqGrid-4.6.0.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/menu_model.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/menu_model2.js"></script>

<script type="text/javascript">var KSCC_CONTEXT_PATH = "${pageContext.request.contextPath}";</script>
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/js/include/dtree/dtree.css" media="screen" />
<script type="text/javascript" src="<%=contextPath%>/js/include/dtree/dtree.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/include/jquery/jquery.blockUI.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/include/validate/validate.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/include/comutil.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.base.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.timeout.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.formatter.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.gnb.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.etc.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.grid.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.date.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/kscc.utilgroup.js"></script>

<script type="text/javascript" src="<%=contextPath%>/js/dui_prototype.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/framework/dui_webvalidator.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/common.js"></script>

<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="excanvas.min.js"></script><![endif]-->
<script type="text/javascript" src="<%=contextPath%>/js/chart/jquery.flot.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/chart/jquery.flot.pie.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/chart/jquery.flot.spline.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/chart/jquery.flot.symbol.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/chart/jquery.flot.time.js"></script>
<script type="text/javascript" src="<%=contextPath%>/js/chart/jquery.flot.tooltip.min.js"></script>