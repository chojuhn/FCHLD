
	//검색
	function btnSearch(gubun){
		var go	 = gubun;
		
		
		if(go == 'kscc'){
			$("input[name=currentPageDt]").val(1);
			$("input[name=pageSizeDt]").val($("select[name=searchPageSize]").val());		
			$("#form").attr("action","/mktp/adhub/adKsccCalculateGoods2.do");	
		}else {
			$("input[name=currentPage]").val(1);
			$("input[name=pageSize]").val($("select[name=searchPageSize]").val());		
			$("#form").attr("action","/mktp/adhub/adCalculateGoods2.do");	
		}	
		$("#form").submit();	
	}
	
	/**
	 * 초기화 버튼 Click
	 */
	function btnInitClick()
	{
		document.getElementById("appId").value ="";
		document.getElementById("advrTtl").value ="";
	}
	
	/**
	 * 엑셀 버튼 Click
	 */
	function excelSave(gubun) {
		var go = gubun;
		
		if(go == 'kscc'){
			$("form[name=form]").attr("action", "/mktp/adhub/adKsccCalculateGoodsExcel.do");			
		}else{
			$("form[name=form]").attr("action", "/mktp/adhub/adCalculateGoodsExcel.do");
		}
		$("form[name=form]").submit();
	}
	
	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {
		var go	 = $("#btnSearch").val();
		if(go == 'kscc'){
			$("input[name=currentPageDt]").val(pageNo);
			$("form[name=form]").attr("action", "/mktp/adhub/adKsccCalculateGoods2.do");			
		}else{
			$("input[name=currentPage]").val(pageNo);
			$("form[name=form]").attr("action", "/mktp/adhub/adCalculateGoods2.do");
		}
		$("form[name=form]").submit();
		
	}
	
	// 목록
	function btnCalculList(gubun) {
		$("#searchfrcId").val(""); 
		$("#searchAppId").val("");
		$("#fnDt").val("");
		if(gubun == 'kscc'){
			$("form[name=form]").attr("action", "/mktp/adhub/adKsccCalculate2.do");			
		}else{
			$("form[name=form]").attr("action", "/mktp/adhub/adCalculate2.do");
		}
		$("form[name=form]").submit();		
	}