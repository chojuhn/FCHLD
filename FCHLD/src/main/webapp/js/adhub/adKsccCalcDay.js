
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
		
		$( "#searchStartDate" ).datepicker({
	    	changeMonth: true,
	  		changeYear: true,
	      	showOn: "button",
	      	buttonImage: "../images/btn_icon_calendar.gif",
	      	buttonImageOnly: false,
	      	showButtonPanel: true
	    });
	    $( "#searchEndDate" ).datepicker({
	    	changeMonth: true,
	  		changeYear: true,
	      	showOn: "button",
	      	buttonImage: "../images/btn_icon_calendar.gif",
	      	buttonImageOnly: false,
	      	showButtonPanel: true
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
		
		// 검색 버튼 2
		$("#btnSearch2").on("click",(function() {  
			btnSearch2Click();
		}));
	
	    // 일자별탭화면 진입시 조회
	    $("#btnDayKscc").on("click",(function() {
	    	btnSearchDay("Kscc");
	    }));
	    
	    
	 	// 월별 사용자 탭화면 진입
	    $("#btnMonthKscc").on("click",(function() {
	    	btnSearchMonth("Kscc");
	    }));
		
		// 일자별탭화면 진입시 조회
	    $("#btnDay").on("click",(function() {
	    	btnSearchDay("");
	    }));
	    
	    
	 	// 월별 사용자 탭화면 진입
	    $("#btnMonth").on("click",(function() {
	    	btnSearchMonth("");
	    }));
		
	});

	/**
	 * 일자별탭화면 버튼 Click
	 */
	function btnSearchDay(val){
		$("#rgtDt1").val("");
		$("#rgtDt2").val("");
		$("#fnDt").val("");
	    $("#searchAppId").val("");
	    $("#searchfrcId").val("");	
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);
		if(val == "Kscc"){
			$("form[name=form1]").attr("action", "/mktp/adhub/adKsccCalculateDay.do");
		}else{
			$("form[name=form1]").attr("action", "/mktp/adhub/adCalculateDay.do");
		}
		
		$("form[name=form1]").submit();
	}

	/**
	 * 월별 사용자 탭화면 진입 Click
	 */
	function btnSearchMonth(val){
		$("#rgtDt1").val("");
		$("#rgtDt2").val("");
		$("#fnDt").val("");
	    $("#searchAppId").val("");
	    $("#searchfrcId").val("");	
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);
		if(val == "Kscc"){
			$("form[name=form1]").attr("action", "/mktp/adhub/adKsccCalculate.do");
		}else{
			$("form[name=form1]").attr("action", "/mktp/adhub/adCalculate.do");
		}
		
		$("form[name=form1]").submit();
	}
	
	function initDate(){
		var to_day = ComUtil.getCurDay("-", "");
		var st_day = ComUtil.addDayMask(ComUtil.removeMask(to_day), -7, "D", "-");
		$("#searchEndDate").val(to_day);
		$("#searchStartDate").val(st_day);
		
	}

	
	//검색2
	function btnSearch2Click(){
		
		var go	 = $("#btnSearch2").val();
		var searchStartDate = $("#searchStartDate").val();
		var searchEndDate = $("#searchEndDate").val();
		var rgtDt1 = "";
		var rgtDt2 = "";
		
		if(searchStartDate != "" ){
				rgtDt1 = searchStartDate;
		}
		
		if(searchEndDate != "" ){
				rgtDt2 = searchEndDate;	
		}		
						
		if(rgtDt1 != "" && rgtDt2 != "") {
			if(rgtDt1 > rgtDt2) {
				alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
				return;
			}
		}

		$("#rgtDt1").val(rgtDt1);
		$("#rgtDt2").val(rgtDt2);

		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val($("select[name=searchPageSize]").val());		
		if(go == 'kscc'){
			$("#form1").attr("action","/mktp/adhub/adKsccCalculateDay.do");
		}else {
			$("#form1").attr("action","/mktp/adhub/adCalculateDay.do");
		}
		
		$("#form1").submit();			
	}

	/**
	 * 초기화 버튼 Click
	 */
	function btnInitClick()
	{
		ComUtil.clearForm("form1");
	}
	
	/**
	 * 가맹점 별 정산내역(kscc) Click
	 * @param ksccAdvrId
	 */
	function fncAdDetail( frcId, fnDt, appId, gubun) {
		var go = gubun;
		
		$("#searchfrcId").val(frcId);
		$("#fnDt").val(fnDt);
		$("#searchAppId").val(appId);
		if(go == 'kscc'){
			$("form[name=form1]").attr("action", "/mktp/adhub/adKsccCalculateDayGoods2.do");	
		}else {
			$("form[name=form1]").attr("action", "/mktp/adhub/adCalculateDayGoods2.do");	
		}
		

		$("form[name=form1]").submit();
	}

	/**
	 * 엑셀 버튼 Click
	 */
	function excelSave(gubun) {
		var go = gubun;
		
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);
		
		if(go == 'kscc'){
			$("form[name=form1]").attr("action", "/mktp/adhub/adKsccCalculateDayExcel.do");			
		}else{
			$("form[name=form1]").attr("action", "/mktp/adhub/adCalculateDayExcel.do");		
		}
		$("form[name=form1]").submit();
	}
	
	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {		
		var go	 = $("#btnSearch2").val();
		$("input[name=currentPage]").val(pageNo);	
		if(go == 'kscc'){
			$("#form1").attr("action","/mktp/adhub/adKsccCalculateDay.do");
		}else {
			$("#form1").attr("action","/mktp/adhub/adCalculateDay.do");
		}
		
		$("#form1").submit();		
		
	}	