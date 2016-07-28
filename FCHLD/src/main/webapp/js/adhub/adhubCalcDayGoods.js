
	//검색
	function btnSearch(gubun){
		var go	 = gubun;
		
		$("input[name=currentPageDt]").val(1);
		$("input[name=pageSizeDt]").val($("select[name=searchPageSize]").val());		
		if(go == 'kscc'){
			$("#form").attr("action","/mktp/adhub/adKsccCalculateDayGoods2.do");	
		}else{
			$("#form").attr("action","/mktp/adhub/adCalculateDayGoods2.do");	
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
			$("form[name=form]").attr("action", "/mktp/adhub/adKsccCalculateDayGoodsExcel.do");			
		}else{
			$("form[name=form]").attr("action", "/mktp/adhub/adCalculateDayGoodsExcel.do");		
		}
		$("form[name=form]").submit();
	}
	
	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {
		var go	 = $("#btnSearch").val();
		$("input[name=currentPageDt]").val(pageNo);
		if(go == 'kscc'){
			$("form[name=form]").attr("action", "/mktp/adhub/adKsccCalculateDayGoods2.do");			
		}else{
			$("form[name=form]").attr("action", "/mktp/adhub/adCalculateDayGoods2.do");		
		}
		$("form[name=form]").submit();
		
	}
	
	// 목록
	function btnCalculList(gubun) {
		$("#searchfrcId").val(""); 
		$("#searchAppId").val("");
		$("#fnDt").val("");
				
		if(gubun == 'kscc'){
			$("form[name=form]").attr("action", "/mktp/adhub/adKsccCalculateDay.do");			
		}else{
			$("form[name=form]").attr("action", "/mktp/adhub/adCalculateDay.do");
		}
		$("form[name=form]").submit();		
	}