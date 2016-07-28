/**
 * 최초 실행 document ready
 */
$(document).ready(function(){

    // 검색 버튼
    $("#btnSearch").on("click",(function() {
        btnSearchClick();
    }));



    // 페이지 건수 변경시
    $("#searchPageSize").on("change",(function() {
        $("#btnSearch").trigger("click");
    }));

    $("#btnExcel").on("click",(function() {
        btnExcelClick();
    }));
});


/**
 * 초기화 버튼 Click
 */
function btnInitClick()
{
    ComUtil.clearForm("form1");
}

/**
 * 조회 버튼 Click
 */
function btnSearchClick() {
    var result = validate();
    if ( result )
    {
        $("input[name=currentPage]").val(1);
        $("input[name=pageSize]").val($("select[name=searchPageSize]").val());

        $("form[name=form1]").attr("action", rootContextPath + "/usr/readUserList.do");
        $("form[name=form1]").submit();
    }
}


/**
 * 엑셀 버튼 Click
 */
function btnExcelClick() {
    $("input[name=currentPage]").val(1);
    $("input[name=pageSize]").val($("select[name=searchPageSize]").val());

    $("form[name=form1]").attr("action", rootContextPath + "/usr/downloadFile.do");
    $("form[name=form1]").submit();
}

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick( pageNo ) {
    $("input[name=currentPage]").val(pageNo);
    $("form[name=form1]").attr("action", rootContextPath + "/usr/readUserList.do");
    $("form[name=form1]").submit();

}

/**
 * 회원 상세 Click
 * @param mbrMngNo

function showDetail( mbrMngNo ) {
    $("input[name=searchMbrMngNo]").val(mbrMngNo);
    $("form[name=form1]").attr("action", rootContextPath + "/usr/readUserList.do");
    $("form[name=form1]").submit();
}
 */
/**
 * 초기화 시 일자 기본값으로 세팅
 */
// 당일
function firstCheck() {
    if($("input[name=searchJoinDtTo]").val() == "") {
        $("input[name=searchJoinDtTo]").val(ComUtil.getCurDay("-", ""));
    }
    if($("input[name=searchJoinDtTo]").val() != "") {
    //var strVal = ComUtil.removeMask($("input[name=searchJoinDtTo]").val());
        $("input[name=searchJoinDtFrom]").val(ComUtil.getCurDay("-", ""));
    }
}
