
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
		
		$( "#searchStartDay" ).datepicker({
	    	changeMonth: true,
	  		changeYear: true,
	      	showOn: "button",
	      	buttonImage: "../images/btn_icon_calendar.gif",
	      	buttonImageOnly: false,
	      	showButtonPanel: true
	    });
	    $( "#searchEndDay" ).datepicker({
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
	
	//검색
	function btnSearchClick(){
		
		var go	 = $("#btnSearch").val();
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
		if(go == 'kscc'){
			$("#form1").attr("action","/mktp/adhub/adKsccCalculate2.do");
		}else {
			$("#form1").attr("action","/mktp/adhub/adCalculate2.do");
		}
		$("#form1").submit();		
	}
	
	
	//검색2
	function btnSearch2Click(){
		
		var go	 = $("#btnSearch").val();
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
		if(go == 'kscc'){
			$("#form1").attr("action","/mktp/adhub/adKsccCalculate2.do");
		}else {
			$("#form1").attr("action","/mktp/adhub/adCalculate2.do");
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
			$("form[name=form1]").attr("action", "/mktp/adhub/adKsccCalculateGoods2.do");	
		}else {
			$("form[name=form1]").attr("action", "/mktp/adhub/adCalculateGoods2.do");
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
			$("form[name=form1]").attr("action", "/mktp/adhub/adKsccCalculateExcel.do");			
		}else{
			$("form[name=form1]").attr("action", "/mktp/adhub/adCalculateExcel.do");
		}
		$("form[name=form1]").submit();
	}
	
	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {		
		var go	 = $("#btnSearch").val();
		$("input[name=currentPage]").val(pageNo);	
		if(go == 'kscc'){
			$("#form1").attr("action","/mktp/adhub/adKsccCalculate2.do");
		}else {
			$("#form1").attr("action","/mktp/adhub/adCalculate2.do");
		}
		$("#form1").submit();		
		
	}	