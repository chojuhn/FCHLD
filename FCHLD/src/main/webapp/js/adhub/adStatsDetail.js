	
	//엓셀 저장
	function excelSave() {
		$("#form2").attr("action","/mktp/adhub/adStatsDetailExcel.do");		
		$("#form2").submit();

	}

	//광고 통계 목록화면 이동
	function btnStateList() {
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);
		$("#form2").attr("action","/mktp/adhub/adStatsList.do");		
		$("#form2").submit();

	}	
	