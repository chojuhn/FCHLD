

	function loading(blbrExpsYn,pupExpsYn,pushExpsYn,resultMessage,gubun){
		if(blbrExpsYn == 'Y' || blbrExpsYn == 'on'){
			$('input:checkbox[name="searchBlbrExpsYn"]').prop("checked",true);			
		}
		if(pupExpsYn == 'Y' || pupExpsYn == 'on'){
			$('input:checkbox[name="searchPupExpsYn"]').prop("checked",true);			
		}
		if(pushExpsYn == 'Y' || pushExpsYn == 'on'){
			$('input:checkbox[name="searchPushExpsYn"]').prop("checked",true);			
		}

		if(resultMessage != ''){
			alert(resultMessage);
			fncSearch();			
		}
	}
	
	//검색
	function fncSearch(){
		checkBoxValue();

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
				$("#form").attr("action","/mktp/adhub/getListAdStore2.do");		
				$("#form").submit();	
		}		
	
	}

	/**
	 * 초기화 버튼 Click
	 */
	function btnInitClick()
	{
		ComUtil.clearForm("form");
	}
	
	/**
	 * 페이지 Click
	 * @param pageNo
	 */
	function paginationClick( pageNo ) {
		checkBoxValue();
		
		$("input[name=currentPage]").val(pageNo);
		$("form[name=form]").attr("action", "/mktp/adhub/getListAdStore2.do");
		$("form[name=form]").submit();
		
	}
	
	function selectAll() {
		var chk = $('input:checkbox[id="checkAll"]').is(":checked");
		if(chk){
			 $('input:checkbox[name="chkid"]').prop("checked",true);
		}else{
			 $('input:checkbox[name="chkid"]').prop("checked",false);
		}
	}


	//광고 상품 승인,수정요청,승인거부,삭제 처리,카테고리 및 팝업
	function btnStateChange(gubun,aprvPrcgRsn) {
		checkBoxValue();
		
		$("#gubun").val(gubun);
		if(aprvPrcgRsn == undefined){
			aprvPrcgRsn = "";
		}
		if(gubun == "req" || gubun == "cancel" || gubun == "category"){
			var url = "/mktp/adhub/popup/updateAdStateView.do?gubun="+gubun+"&aprvPrcgRsn="+aprvPrcgRsn;	
			var name = '_blank'; 
			var specs = 'toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=420,height=500';
			var newWindow = window.open(url, name, specs);
			newWindow.focus();
		}
	}
	
	//광고 상품 수정요청,승인거부,카테고리
	function getReturnValue(val,gubun,hgrnCdNm,mhrkCd,hgrnCd){
		if(gubun == 'category'){
			$("#searchCtgrNm").val(val+" > "+hgrnCdNm);
			$("#searchCtgrId").val(hgrnCd);
		}
	}
	
	
	
	//광고 상품 상세 및 수정화면 이동
	function fncAdDetail(obj,stat,pushYn,store){
		checkBoxValue();
		
		var id = obj;
		var state = stat;
//		alert("id : "+id+ "  state : "+state);
		$("#ksccAdvrId").val(id);

		if(pushYn == "Y"){//가맹점 푸쉬 보류
			if(state == "A" || state == "C"){
		 		$("#form").attr("action","/mktp/adhub/adGoodPushStoreD.do");		
		 		$("#form").submit();			
			}else if(state == "R" || state == "W"){
//		 		$("#form").attr("action","/mktp/adhub/adGoodPushStoreU.do");
		 		$("#form").attr("action","/mktp/adhub/adGoodPushStoreD.do");
		 		$("#form").submit();
			}			
		}else{
			if(state == "A" || state == "C"){
		 		$("#form").attr("action","/mktp/adhub/adGoodStoreD.do");		
		 		$("#form").submit();			
			}else if(state == "R" || state == "W"){
		 		$("#form").attr("action","/mktp/adhub/adGoodStoreU.do");		
		 		$("#form").submit();
			}			
		}
			
	}
	

	//신규-일반
	function fncNew(){
		checkBoxValue();
		$("#form").attr("action","/mktp/adhub/adGoodStoreR.do");		
		$("#form").submit();				
	}
	
	//신규-Push
	function fncNewPush(){
		checkBoxValue();
		$("#form").attr("action","/mktp/adhub/adGoodPushStoreR.do");		
		$("#form").submit();				
	}
	
	//체크 박스 공통 값 넣기
	function checkBoxValue(){
		var blb = $('input:checkbox[id="searchBlbrExpsYn"]').is(":checked");
		var pup = $('input:checkbox[id="searchPupExpsYn"]').is(":checked");
		var pus = $('input:checkbox[id="searchPushExpsYn"]').is(":checked");
		//노출구분
		if(blb){
			$("#expsYn").val('Y');
			$("#searchBlbrExpsYn").val('Y');
		}
		if(pup){
			$("#expsYn").val('Y');
			$("#searchPupExpsYn").val('Y');
		}
		if(pus){
			$("#expsYn").val('Y');
			$("#searchPushExpsYn").val('Y');
		}
		
	}	