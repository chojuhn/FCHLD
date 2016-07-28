/**
 * 최초 실행 document ready
 */
$(document).ready(function(){

	// form submit event
	$("form[name=form1]").submit(function() {
		try {
			event.preventDefault();
		} catch(e) {
			try {
				event.returnValue = false;
				event.cancelBubble = true;
			} catch(e) {}
		}
	});
        
	// 초기화 버튼
	$("#btnInit").on("click",(function() {  
		btnInitClick();
		initDate();
	}));
    
	// 검색 버튼
	$("#btnSearch").on("click",(function() {  
		btnSearchClick();
	}));

	// 엑셀 버튼
	$("#btnExcel").on("click",(function() {  
		excelSave();
	}));

	
});

	function initDate(){
		var to_day = ComUtil.removeMask(ComUtil.getCurDay("-", ""));
		var yy1 = to_day.substring(0,4);
	    var mm1 = to_day.substring(4,6)-1;
	    
	    loading(yy1,yy1,mm1,mm1);
	}

	function loading(yy1,yy2,mm1,mm2){
		if(mm1 != ""){
			$('#rgtDtM1').val(mm1);
			$('#rgtDtM1 option:contains("'+mm1+'")').prop("selected",true);
		}
		if(mm2 != ""){
			$('#rgtDtM2').val(mm2);
			$('#rgtDtM2 option:contains("'+mm2+'")').prop("selected",true);
		}		
		if(yy1 != ""){
			$('#rgtDtY1').val(yy1);
			$('#rgtDtY1 option:contains("'+yy1+'")').prop("selected",true);
		}
		if(yy2 != ""){
			$('#rgtDtY2').val(yy2);
			$('#rgtDtY2 option:contains("'+yy2+'")').prop("selected",true);
		}
	}
	
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
		var rdY1 = $("#rgtDtY1").val();
		var rdM1 = $("#rgtDtM1").val();
		var rdY2 = $("#rgtDtY2").val();
		var rdM2 = $("#rgtDtM2").val();		
		var rgtDt1 = "";
		var rgtDt2 = "";
		
		if(rdY1 != "" ){
			if(rdY1 != "" && rdM1 != ""){
				rgtDt1 = rdY1 + rdM1;
			}else{
				rgtDt1 = rdY1 + "01";
			}	
		}
		
		if(rdY2 != "" ){
			if(rdY2 != "" && rdM2 != ""){
				rgtDt2 = rdY2 + rdM2;
			}else{
				rgtDt2 = rdY2 + "12";
			}		
		}

		var result = validate();

		if ( result )
		{
			
			if(rdY1 != "" && rdY2 == "") {
				alert("from일자 입력시 to일자는 필수 입력 입니다.");
				return;
			} else if(rdY1 == "" && rdY2 != "") {
				alert("to일자 입력시 from일자는 필수 입력 입니다.");
				return;
			} else if(rdM1 != "" && rdM2 == "") {
				alert("from일자 입력시 to일자는 필수 입력 입니다.");
				return;
			} else if(rdM1 == "" && rdM2 != "") {
				alert("to일자 입력시 from일자는 필수 입력 입니다.");
				return;			
			} else if(rgtDt1 != "" && rgtDt2 != "") {
				if(rgtDt1 > rgtDt2) {
					alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
					return;
				}
			}
			
			$("#rgtDt1").val(rgtDt1);
			$("#rgtDt2").val(rgtDt2);
			
			$("input[name=currentPage]").val(1);
			$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
			$("form[name=form1]").attr("action", "/mktp/adhub/adStatsMonthList.do");
			$("form[name=form1]").submit();
		} 
	}
	
	

	/**
	 * 엑셀 버튼 Click
	 */
	function excelSave() {
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);		
		$("form[name=form1]").attr("action", "/mktp/adhub/adStatsMonthExcel.do");
		$("form[name=form1]").submit();
	}

	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {
		$("input[name=currentPage]").val(pageNo);
		$("form[name=form1]").attr("action", "/mktp/adhub/adStatsMonthList.do");
		$("form[name=form1]").submit();
		
	}

	
