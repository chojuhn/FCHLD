/**
 * 최초 실행 document ready
 */
$(document).ready(function(){
    $( "#rgtDt2" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });
    $( "#rgtDt1" ).datepicker({
    	changeMonth: true,
  		changeYear: true,
      	showOn: "button",
      	buttonImage: "../images/btn_icon_calendar.gif",
      	buttonImageOnly: false,
      	showButtonPanel: true
    });

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
		firstCheck();
	}));
    
	// 검색 버튼
	$("#btnSearch").on("click",(function() {  
		btnSearchClick();
	}));
	
	// 엑셀 버튼
	$("#btnExcel").on("click",(function() {  
		btnExcelClick();
	}));

	// 1 주
	$("#btnAdd1Week").on("click",(function() {
		//if($("input[name=rgtDt2]").val() == "") {}
			$("input[name=rgtDt2").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=rgtDt2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=rgtDt2]").val());
			$("input[name=rgtDt1]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}
	}));
	
	// 1 개월
	$("#btnAdd1Month").on("click",(function() {
		//if($("input[name=rgtDt2]").val() == "") {}
			$("input[name=rgtDt2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=rgtDt2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=rgtDt2]").val());
			$("input[name=rgtDt1]").val(ComUtil.addDayMask(strVal, -1, "M", "-"));
		}
	}));
	
	// 3 개월
	$("#btnAdd3Month").on("click",(function() {
		//if($("input[name=rgtDt2]").val() == "") {}
			$("input[name=rgtDt2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=rgtDt2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=rgtDt2]").val());
			$("input[name=rgtDt1]").val(ComUtil.addDayMask(strVal, -3, "M", "-"));
		}
	}));
	
	// 6 개월
	$("#btnAdd6Month").on("click",(function() {
		//if($("input[name=rgtDt2]").val() == "") {}
			$("input[name=rgtDt2]").val(ComUtil.getCurDay("-", ""));
		
		if($("input[name=rgtDt2]").val() != "") {
			var strVal = ComUtil.removeMask($("input[name=rgtDt2]").val());
			$("input[name=rgtDt1]").val(ComUtil.addDayMask(strVal, -6, "M", "-"));
		}
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
			
			if($("input[name=rgtDt1]").val() != "" && $("input[name=rgtDt2]").val() == "") {
				alert("from일자 입력시 to일자는 필수 입력 입니다.");
				return;
			} else if($("input[name=rgtDt1]").val() == "" && $("input[name=rgtDt2]").val() != "") {
				alert("to일자 입력시 from일자는 필수 입력 입니다.");
				return;
			} else if($("input[name=rgtDt1]").val() != "" && $("input[name=rgtDt2]").val() != "") {
				if(ComUtil.removeMask($("input[name=rgtDt1]").val()) > ComUtil.removeMask($("input[name=rgtDt2]").val())) {
					alert("from일자가 to일자 보다 큽니다. 확인해주세요.");
					return;
				}
			}
						
			$("input[name=currentPage]").val(1);
			$("input[name=pageSize]").val($("select[name=searchPageSize]").val());
			$("form[name=form1]").attr("action", "/mktp/adhub/adStatsList.do");
			$("form[name=form1]").submit();
		} 
	}
	
	

	/**
	 * 엑셀 버튼 Click
	 */
	function excelSave() {
		$("input[name=currentPage]").val(1);
		$("input[name=pageSize]").val(10);		
		$("form[name=form1]").attr("action", "/mktp/adhub/adStatsExcel.do");
		$("form[name=form1]").submit();
	}

	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {
		$("input[name=currentPage]").val(pageNo);
		$("form[name=form1]").attr("action", "/mktp/adhub/adStatsList.do");
		$("form[name=form1]").submit();
		
	}

	/**
	 * 상품별 광고 액션 통계 상세 Click
	 * @param ksccAdvrId
	 */
	function fncAdDetail( ksccAdvrId, appId ) {
		$("input[name=ksccAdvrId]").val(ksccAdvrId);
		$("#appId").val(appId);
		$("form[name=form1]").attr("action", "/mktp/adhub/adStatsDetail.do");
		$("form[name=form1]").submit();
	}
	

	// 1 주
	function firstCheck() {
		if($("input[name=rgtDt2]").val() == "") {
			$("input[name=rgtDt2]").val(ComUtil.getCurDay("-", ""));
		}
		if($("input[name=rgtDt2]").val() != "") {
		var strVal = ComUtil.removeMask($("input[name=rgtDt2]").val());
			$("input[name=rgtDt1]").val(ComUtil.addDayMask(strVal, -7, "D", "-"));
		}	
	}
