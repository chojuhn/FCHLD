
	function loading(pntAcmtDvs,pntAcmtRto,pntAcmtAmt,randingPageYn,stlmMthd,stlmMthd2,ptuCyc){
		
		$("#pupExps").hide();
		$('input:checkbox[id="randingPageYn1"]').prop("checked",true);
		
		if(pntAcmtDvs == '' || pntAcmtDvs == null){
			$("#pntAcmtDvs").val('R');
		}
		if(pntAcmtDvs == 'SP0702'){
			$("#pntAcmt1").val(pntAcmtAmt);
		}else if(pntAcmtDvs == 'SP0701'){
			$("#pntAcmt1").val(pntAcmtRto);
		}
		
/*		if(randingPageYn == 'Y'){
			$('input:checkbox[name="randingPageYn1"]').prop("checked",true);
		}*/
				
		if(stlmMthd == 'SP0301'){
			$("#stlmMthd2").show();
		}else{
			$("#stlmMthd2").hide();
		}
		
		if(ptuCyc == ''){
			$("#ptuCycText").show();
			$("#ptuCycDate").show();
		}else{
			$("#ptuCycText").hide();
			$("#ptuCycDate").hide();			
		}
	}
	
	$(document).ready(function(){
				
		$('#advrUprc').mousemove(fncPayPnt);
		$('#pntAcmt1').mousemove(fncPayPnt);
		$('#addPnt').mousemove(fncPayPnt);
	
		// 게시판 라디오 버튼
		$("#blbrExpsYn1").on("click",(function() {  
			fncExpsYn();
		}));
		// 팝업 라디오 버튼
		$("#pupExpsYn1").on("click",(function() {  
			fncExpsYn();
		}));

		// 취소 버튼
		$("#btnInit").on("click",(function() {  
			btnInitClick();
		}));
		
		// 금액 제한
		$("#pntAcmt1").on("keyup",(function(event) {
			fncLimit();
		}));
		
		// 통신사 
		$('input[type="checkbox"][name="mvmnTlcnCmpy0"]').click(function(){
	        var value = $(this).val();
	        if ($(this).prop('checked')) {
	        	if(value == 'A') {
	        	 $('input[type="checkbox"][name="mvmnTlcnCmpy0"]').prop('checked', true);
	        	}
	        	else {
	        		$(this).prop('checked', true);
	        		$('#mvmnTlcnCmpy1').prop('checked', false);
	        	}
	       	}else {
	       		if(value == 'A') {
	       			$('input[type="checkbox"][name="mvmnTlcnCmpy0"]').prop('checked', false);
	       		}else {
	       			$('#mvmnTlcnCmpy1').prop('checked', false);
	       		}
	       	}
	        if($('input:checkbox[name="mvmnTlcnCmpy0"]:checked').length ==3) {
	        	$('#mvmnTlcnCmpy1').prop('checked', true);
	        }
	    }); 
		
		// 성별  
		$('input[type="checkbox"][name="tgtCusGndr0"]').click(function(){
	        var value = $(this).val();
	        if ($(this).prop('checked')) {
	        	if(value == 'A') {
	        	 $('input[type="checkbox"][name="tgtCusGndr0"]').prop('checked', true);
	        	}
	        	else {
	        		$(this).prop('checked', true);
	        		$('#tgtCusGndr1').prop('checked', false);
	        	}
	       	}else {
	       		if(value == 'A') {
	       			$('input[type="checkbox"][name="tgtCusGndr0"]').prop('checked', false);
	       		}else {
	       			$('#tgtCusGndr1').prop('checked', false);
	       		}
	       	}
	        if($('input:checkbox[name="tgtCusGndr0"]:checked').length ==2) {
	        	$('#tgtCusGndr1').prop('checked', true);
	        }
	    });
		
		
		// 나이 
		$('input[type="checkbox"][name="tgtCusAge0"]').click(function(){
	        var value = $(this).val();
	        if ($(this).prop('checked')) {
	        	if(value == 'A') {
	        	 $('input[type="checkbox"][name="tgtCusAge0"]').prop('checked', true);
	        	}
	        	else {
	        		$(this).prop('checked', true);
	        		$('#tgtCusAge1').prop('checked', false);
	        	}
	       	}else {
	       		if(value == 'A') {
	       			$('input[type="checkbox"][name="tgtCusAge0"]').prop('checked', false);
	       		}else {
	       			$('#tgtCusAge1').prop('checked', false);
	       		}
	       	}
	        if($('input:checkbox[name="tgtCusAge0"]:checked').length ==10) {
	        	$('#tgtCusAge1').prop('checked', true);
	        }
	    });
		
	});

	//총지급 포인트 계산
	function fncPayPnt(e){
		var advrUprc = $('#advrUprc').val();
		var pntAcmtDvs = $('#pntAcmtDvs').val();
		var pntAcmt1 = $('#pntAcmt1').val();
		var addPnt = $('#addPnt').val();
		var payPnt = 0;
		
		if(pntAcmtDvs == 'A'){
			payPnt = Number(pntAcmt1) + Number(addPnt);
			document.getElementById("payPnt").innerHTML = payPnt + " 포인트";
		}else if(pntAcmtDvs == 'R'){
			payPnt = Number(advrUprc)*Number(pntAcmt1)/100 + Number(addPnt);
			document.getElementById("payPnt").innerHTML = payPnt + " 포인트";
		}

	}
	
	// 금액 제한
	function fncLimit() {
		var advrUprc 	= $('#advrUprc').val();
		var pntAcmtDvs 	= $('#pntAcmtDvs').val();
		var pntAcmt1 	= $('#pntAcmt1').val();
		
		alert("advrUprc:"+advrUprc);
		alert("pntAcmt1:"+pntAcmt1);

		if(pntAcmtDvs == 'A'){
			if(advrUprc(pntAcmt1) > advrUprc(advrUprc) ){
				alert("광고 단가보다 높으면 안됩니다.");
				document.form.pntAcmt1.value ="";
			}			
		}else if(pntAcmtDvs == 'R'){
			if(pntAcmt1 > 100){
				alert("정률은 100% 가 최대입니다.");
				document.form.pntAcmt1.value ="";
			}
		}
		
	}
	
	//가맹점
	function fncFrcId(val) {
		if( val == null || val == "") {

		}else{
			var param = {
					frcId : val	
			};
			
			$.ajax({
				type : "POST",
				url : '/mktp/adhub/frcInfo.json',
				data : param,
				dataType : "json", 
				success : function(data) {
					
					if(data.result == "true") {
						var ptuCyc 		= data.adInfo.ptuCyc;
						var stlmMthd 	= data.adInfo.stlmMthd;
						var stlmMthd2 	= data.adInfo.stlmMthd2;
						var pntAcmtDvs 	= data.adInfo.pntAcmtDvs;
						var pntAcmtAmt	= data.adInfo.pntAcmtAmt;
						var pntAcmtRto	= data.adInfo.pntAcmtRto;
						var addPnt		= data.adInfo.addPnt;
							
						if(ptuCyc == 0 || ptuCyc == 7 || ptuCyc == 15 || ptuCyc == 30 || ptuCyc == 45 || ptuCyc == 60 ){
							document.form.ptuCyc1.value = ptuCyc;
							$("#ptuCycText").hide();
							$("#ptuCycDate").hide();
						}else{
							document.form.ptuCyc1.value = "";
							document.form.ptuCycText.value = ptuCyc;
							$("#ptuCycDate").show();
						}
						
						if(stlmMthd == "SP0303"){
							document.form.stlmMthd.value = "M";
							$("#stlmMthd2").hide();
						}else if(stlmMthd == "SP0302"){
							document.form.stlmMthd.value = "W";
							$("#stlmMthd2").hide();
						}else if(stlmMthd == "SP0301"){
							document.form.stlmMthd.value = "D";
							if(stlmMthd2 == "SP1901"){
								document.form.stlmMthd2.value = "A";
							}else if(stlmMthd2 == "SP1902"){
								document.form.stlmMthd2.value = "D";
							}
							$("#stlmMthd2").show();
						}
						
						if(pntAcmtDvs == "SP0702"){
							document.form.pntAcmtDvs.value = "A";
							document.form.pntAcmt1.value = pntAcmtAmt;
						}else if(pntAcmtDvs == "SP0701"){
							document.form.pntAcmtDvs.value = "R";
							document.form.pntAcmt1.value = pntAcmtRto;
						}
						
						document.form.addPnt.value = addPnt;
					}else{
//						alert("서버 에러입니다.");
						return true;
					}
				},
				error : function(e) {
					alert("error" + e.responseText);
				}
				
			});
		
		}
	}	

	//광고 유형(cpc일때)
	function fncTyp() {
//		var typ = $("#advrTyp").val();
//		if(typ == "CPC"){
//			$('input:checkbox[id="randingPageYn1"]').prop("checked",false);
//			$("#randingPageYn1").attr("disabled", true);
//		}else{
//			$('input:checkbox[id="randingPageYn1"]').prop("checked",true);
//			$("#randingPageYn1").attr("disabled", false);
//		}
	}
	
	//정산
	function fncStlm() {

		var st = $("#stlmMthd").val();		    
	    if(st == "D" ){
	    	$("#stlmMthd2").show();
	    }else{
	    	$("#stlmMthd2").val("");
	    	$("#stlmMthd2").hide();    	
	    }

	} 

	//노출기간
	function fncExpsClosDt(obj) {
		var datepicker01 = $("#datepicker01").val();
		var datepicker02 = $("#datepicker02").val();

		var sttDt  = datepicker01.replace(/-/gi,"");
		var closDt = datepicker02.replace(/-/gi,"");

		if(sttDt > closDt) {
			alert("노출 마감일은 노출 시작일보다 적으면 안됩니다.");
			obj.value ="";
			return false;
		}
	}
	
	//지급포인트
	function fncPntAcmtDvs() {
		var pntAcmtDvs = $("#pntAcmtDvs").val();

		if(pntAcmtDvs == "A"){			
			document.form.pntAcmt1.value ="";
			$("#pntAcmtPercent").val("포인트");
						
		}else if(pntAcmtDvs == "R"){
			document.form.pntAcmt1.value ="";
			$("#pntAcmtPercent").val("%");
			
		}
	}
	
	//가용기간
	function fncPtuCyc() {
		var pc = $("#ptuCyc1").val();				
	    if(pc == "" ){
	    	$("#ptuCycText").show();
	    	$("#ptuCycDate").show();
	    }else{
	    	$("#ptuCycText").val("");
	    	$("#ptuCycText").hide();
	    	$("#ptuCycDate").hide();
   	
	    }		
	}
	
	//숫자만
	function checkNum(obj) {
		
		var word = obj.value;
		var str = "1234567890";
		for (var i=0; i < word.length; i++){
			if(str.indexOf(word.charAt(i)) < 0 ) {
				alert("숫자만 입력해주세요.");
				obj.value="";
				obj.focus();
				return false;
			}
		}
	}
	
	/*//이통사
	function fncMoveTeleCom() {
		var chk = $('input:checkbox[id="mvmnTlcnCmpy1"]').is(":checked");
		if(chk && ){
			 $('input:checkbox[name="mvmnTlcnCmpy0"]').prop("checked",true);
		}else{
			 $('input:checkbox[name="mvmnTlcnCmpy0"]').prop("checked",false);
		}
	}
	
	//성별
	function fncGndr() {
		var chk = $('input:checkbox[id="tgtCusGndr1"]').is(":checked");
		if(chk){
			 $('input:checkbox[name="tgtCusGndr0"]').prop("checked",true);
		}else{
			 $('input:checkbox[name="tgtCusGndr0"]').prop("checked",false);
		}		
	}
	
	//나이
	function fncAge() {
		var chk = $('input:checkbox[id="tgtCusAge1"]').is(":checked");
		if(chk){
			 $('input:checkbox[name="tgtCusAge0"]').prop("checked",true);
		}else{
			 $('input:checkbox[name="tgtCusAge0"]').prop("checked",false);
		}		
	}*/
	

	//광고 카테고리 팝업
	function btnStateChange(gubun,aprvPrcgRsn) {
		$("#gubun").val(gubun);
		if(gubun == "category"){
			var url = "/mktp/adhub/popup/updateAdStateView.do?gubun="+gubun;	
			var name = '_blank'; 
			var specs = 'toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=420,height=500';
			var newWindow = window.open(url, name, specs);
			newWindow.focus();
		}
	}
	
	//광고 상품 카테고리
	function getReturnValue(val,gubun,hgrnCdNm,mhrkCd,hgrnCd){
		if(gubun == 'category'){
			$("#ctgrNm").val(val+" > "+hgrnCdNm);
			$("#ctgrId").val(hgrnCd);
		}
	}
		
	//노출구분
	function fncExpsYn() {
		var expsYn = $("input[name=expsYn]:checked").val();
		if(expsYn == "blb"){
			$("#blbrExps").show();
			$("#pupExps").hide();
		}else if(expsYn == "pup"){
			$("#blbrExps").hide();
			$("#pupExps").show();
	
		}	
	}

	/**
	 * 취소 버튼 Click
	 */
	function btnInitClick()
	{
		$("#advrUprc").val(0);
		$("#advrQnt").val(0);
		$("#addPnt").val(0);
		$("#ptuCyc").val(0);
		$("input[name=currentPage]").val();
		$("input[name=pageSize]").val();
		$("#form2").attr("action","/mktp/adhub/getListAd2.do");		
		$("#form2").submit();						
	}
	
	//저장
	function btnSave() {
		
		var stlmMthd = $("#stlmMthd").val();
		var stlmMthd2 = $("#stlmMthd2").val();
		var advrQnt = $("#advrQnt").val();
		var datepicker01 = $("#datepicker01").val();
		var datepicker02 = $("#datepicker02").val();

		if(stlmMthd == "M"){
			if(advrQnt == "" && datepicker01 == "" && datepicker02 == "" ){
				alert("광고수량 또는 노출기간을 입력하여야 합니다.");
				$("#advrQnt").focus();
				return false;
			}
			if(advrQnt == ""){
				if(datepicker01 == "" || datepicker02 == ""){
					alert("광고수량 또는 노출기간을 입력하여야 합니다.");
					$("#datepicker01").focus();
					return false;							
				}		
			}
		}
		
		if(stlmMthd2 == "A"){
			if(advrQnt == ""){
				alert("광고수량을 입력하여야 합니다.");
				$("#advrQnt").focus();
				return false;
			}
		} else if(stlmMthd2 == "D") {
			if(datepicker01 == "" && datepicker02 == ""){
				alert("노출기간을 입력하여야 합니다.");
				$("#datepicker01").focus();
				return false;
			}else if(datepicker01 == "" || datepicker02 == ""){
				alert("노출기간은 시작일과 마감일을 입력하여야 합니다.");
				$("#datepicker01").focus();
				return false;				
			}			
		} 	

		if($("#frcId").val() == ""){
			alert("가맹점명은 필수 값입니다.");
			$("#frcId").focus();
			return false;
		}else if($("#frcAdvrId").val() == ""){
			alert("가맹점 광고ID은 필수 값입니다.");
			$("#frcAdvrId").focus();
			return false;			
		}else if($("#advrTtl").val() == ""){
			alert("광고제목은 필수 값입니다.");
			$("#advrTtl").focus();
			return false;	
		}else if($("#advrLinkUrl").val() == ""){
			alert("광고URL은 필수 값입니다.");
			$("#advrLinkUrl").focus();
			return false;
		}else if($("#advrLinkUrl").val() == "http://"){
			alert("광고URL은 필수 값입니다.");
			$("#advrLinkUrl").focus();
			return false;			
		}else if($("#advrTyp").val() == ""){
			alert("광고유형은 필수 값입니다.");
			$("#advrTyp").focus();
			return false;			
 		}else if($("#stlmMthd").val() == ""){
 			alert("정산유형은 필수 값입니다.");
 			$("#stlmMthd").focus();
 			return false;	
		}else if($("#advrUprc").val() == ""){
			alert("광고단가은 필수 값입니다.");
			$("#advrUprc").focus();
			return false;			
		}else if($("#ptuCyc1").val() == ""){
			if($("#ptuCycText").val() == ""){
				alert("가용기간은 필수 값입니다.");
				$("#ptuCyc1").focus();
				return false;
			}	
		}


		//랜딩페이지  사용 체크여부
		var randingPageYnChk = $('input:checkbox[id="randingPageYn1"]').is(":checked");
		if(randingPageYnChk){
			var a = $("#dtlTtl2").val();
			if(a != ''){
				$("#randingPageYn").val('Y');
			}else{				
				alert("상세내용을 입력해주세요.");	
				return false;				
			}

		}

		var datepicker01 = $("#datepicker01").val();
		var datepicker02 = $("#datepicker02").val();
		var sttDt  = datepicker01.replace(/-/gi,"");
		var closDt = datepicker02.replace(/-/gi,"");
		
		$("#datepicker01").val(sttDt);
		$("#datepicker02").val(closDt);
		
		var pntAcmtDvs = $("#pntAcmtDvs").val();
		var pntAcmtRto = "";
		var pntAcmtAmt = "";
		
		if(pntAcmtDvs == "A"){
			pntAcmtAmt = $("#pntAcmt1").val();
			if(pntAcmtAmt == ''){
				alert("지급 포인트는 필수 값입니다.");
				return false;
			}else{
				$("#pntAcmtAmt").val(pntAcmtAmt);	
			}
		}else if(pntAcmtDvs == "R"){
			pntAcmtRto = $("#pntAcmt1").val();
			if(pntAcmtRto == ''){
				alert("지급 포인트값은 필수 값입니다.");
				return false;
			}else{
				$("#pntAcmtRto").val(pntAcmtRto);	
			}
		}
		
		var addPnt = $("#addPnt").val();
		var advrQnt = $("#advrQnt").val();
		
		if(addPnt == ''){
			$("#addPnt").val(0);
		}
		if(advrQnt == ''){
			$("#advrQnt").val(0);
		}
				
		var ptuCyc = $("#ptuCyc1").val();
		if(ptuCyc == ""){
			$("#ptuCyc").val($("#ptuCycText").val());
		}else{
			$("#ptuCyc").val($("#ptuCyc1").val());
		}	
		
		var mvmnTlcnCmpy = "";
		var tgtCusGndr	 = "";
		var tgtCusAge	 = "";
		var mvmnTlcnCmpy2 = "";
		var mvmnTlcnCmpy3 = "";
		var mvmnTlcnCmpy4 = "";		
		var tgtCusGndr2 = "";
		var tgtCusGndr3 = "";
		var tgtCusAge2 = "";
		var tgtCusAge3 = "";
		var tgtCusAge4 = "";
		var tgtCusAge5 = "";
		var tgtCusAge6 = "";
		var tgtCusAge7 = "";
		var tgtCusAge8 = "";
		var tgtCusAge9 = "";
		var tgtCusAge10 = "";
		var tgtCusAge11 = "";
		var blbrExpsYn = "";
		var pupExpsYn  = "";
		
		var mvmnTlcnCmpy1Chk = $('input:checkbox[id="mvmnTlcnCmpy1"]').is(":checked");
		var mvmnTlcnCmpy2Chk = $('input:checkbox[id="mvmnTlcnCmpy2"]').is(":checked");
		var mvmnTlcnCmpy3Chk = $('input:checkbox[id="mvmnTlcnCmpy3"]').is(":checked");
		var mvmnTlcnCmpy4Chk = $('input:checkbox[id="mvmnTlcnCmpy4"]').is(":checked");
		
		var tgtCusGndr1Chk = $('input:checkbox[id="tgtCusGndr1"]').is(":checked");
		var tgtCusGndr2Chk = $('input:checkbox[id="tgtCusGndr2"]').is(":checked");
		var tgtCusGndr3Chk = $('input:checkbox[id="tgtCusGndr3"]').is(":checked");	

		var tgtCusAge1Chk = $('input:checkbox[id="tgtCusAge1"]').is(":checked");
		var tgtCusAge2Chk = $('input:checkbox[id="tgtCusAge2"]').is(":checked");
		var tgtCusAge3Chk = $('input:checkbox[id="tgtCusAge3"]').is(":checked");
		var tgtCusAge4Chk = $('input:checkbox[id="tgtCusAge4"]').is(":checked");		
		var tgtCusAge5Chk = $('input:checkbox[id="tgtCusAge5"]').is(":checked");
		var tgtCusAge6Chk = $('input:checkbox[id="tgtCusAge6"]').is(":checked");
		var tgtCusAge7Chk = $('input:checkbox[id="tgtCusAge7"]').is(":checked");
		var tgtCusAge8Chk = $('input:checkbox[id="tgtCusAge8"]').is(":checked");
		var tgtCusAge9Chk = $('input:checkbox[id="tgtCusAge9"]').is(":checked");
		var tgtCusAge10Chk = $('input:checkbox[id="tgtCusAge10"]').is(":checked");
		var tgtCusAge11Chk = $('input:checkbox[id="tgtCusAge11"]').is(":checked");
			
		var expsYnChk	  = $("input[name=expsYn]:checked").val();
		
		if(mvmnTlcnCmpy1Chk){
			mvmnTlcnCmpy = "111";
		}else{
			if(mvmnTlcnCmpy2Chk){ mvmnTlcnCmpy2 = "1"; }else{ mvmnTlcnCmpy2 = "0"; }
			if(mvmnTlcnCmpy3Chk){ mvmnTlcnCmpy3 = "1"; }else{ mvmnTlcnCmpy3 = "0"; }
			if(mvmnTlcnCmpy4Chk){ mvmnTlcnCmpy4 = "1"; }else{ mvmnTlcnCmpy4 = "0"; }
			mvmnTlcnCmpy = mvmnTlcnCmpy2 + mvmnTlcnCmpy3 + mvmnTlcnCmpy4;
		}

		if(tgtCusGndr1Chk){
			tgtCusGndr = "11";
		}else{
			if(tgtCusGndr2Chk){ tgtCusGndr2 = "1"; }else{ tgtCusGndr2 = "0"; }
			if(tgtCusGndr3Chk){ tgtCusGndr3 = "1"; }else{ tgtCusGndr3 = "0"; }
			tgtCusGndr = tgtCusGndr2 + tgtCusGndr3;
		}

		if(tgtCusAge1Chk){
			tgtCusAge = "1111111111";
		}else{
			if(tgtCusAge2Chk){ tgtCusAge2 = "1"; }else{ tgtCusAge2 = "0"; }
			if(tgtCusAge3Chk){ tgtCusAge3 = "1"; }else{ tgtCusAge3 = "0"; }
			if(tgtCusAge4Chk){ tgtCusAge4 = "1"; }else{ tgtCusAge4 = "0"; }
			if(tgtCusAge5Chk){ tgtCusAge5 = "1"; }else{ tgtCusAge5 = "0"; }
			if(tgtCusAge6Chk){ tgtCusAge6 = "1"; }else{ tgtCusAge6 = "0"; }
			if(tgtCusAge7Chk){ tgtCusAge7 = "1"; }else{ tgtCusAge7 = "0"; }
			if(tgtCusAge8Chk){ tgtCusAge8 = "1"; }else{ tgtCusAge8 = "0"; }
			if(tgtCusAge9Chk){ tgtCusAge9 = "1"; }else{ tgtCusAge9 = "0"; }
			if(tgtCusAge10Chk){ tgtCusAge10 = "1"; }else{ tgtCusAge10 = "0"; }
			if(tgtCusAge11Chk){ tgtCusAge11 = "1"; }else{ tgtCusAge11 = "0"; }		
			tgtCusAge = tgtCusAge2 + tgtCusAge3 + tgtCusAge4 + tgtCusAge5 + tgtCusAge6 + tgtCusAge7 + tgtCusAge8 + tgtCusAge9 + tgtCusAge10 + tgtCusAge11;
		}

		if(expsYnChk == 'blb'){
			blbrExpsYn = "Y";
			pupExpsYn = "N";
		}else if(expsYnChk == 'pup'){
			blbrExpsYn = "N";
			pupExpsYn = "Y";
		}
				
		$("#mvmnTlcnCmpy").val(mvmnTlcnCmpy);
		$("#tgtCusGndr").val(tgtCusGndr);
		$("#tgtCusAge").val(tgtCusAge);
		$("#blbrExpsYn").val(blbrExpsYn);
		$("#pupExpsYn").val(pupExpsYn);
		
		if ( confirm("저장을 하시겠습니까?") ) {
			$("#form").attr("action","/mktp/adhub/insertAd.do");		
			$("#form").submit();
		}
	}
	

	function strip_tag(val,str){
		var id = $(val).attr('id');
		var content = str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
		$("#"+id).val(content);
	}

	
	/**
	 * 광고상품 불러오기 버튼Click 
	 */
	function btnLoadClick() {
		
		window.name = "adCalendarExpsInfo";
		
		var data = {
				pop_gubun		: ""
		};
		
		ComUtil.popupPost("/mktp/adhub/popup/copyAdExpsInfo.do", "800", "600", "viewAdList", data);
	}
	
	
	/**
	 * 광고상품 불러오기
	 */
	function detailInfoLoad(data) {

		ComUtil.postAjaxData('/mktp/adhub/copyAdGoodInfo.json', data, 'btnAddCallBack', true, '처리 중 입니다.', '13000' );
		
	}
	
	function btnAddCallBack(data) {
		
		for(var name in data.RESULT_DATA){
			if(!(data.RESULT_DATA[name] == "" || data.RESULT_DATA[name] == null) || data.RESULT_DATA[name] == 0){
				if(name == "mvmnTlcnCmpy"){		//통신사 세팅
					var MTC =  data.RESULT_DATA[name].split("");
					
					for(var i = 0 ; i < MTC.length ; i++){
						if(MTC[i] == "1"){
							$("#mvmnTlcnCmpy" + (i+2)).attr("checked","checked");
						}
					}
					if(data.RESULT_DATA[name] == "111"){
						$("#mvmnTlcnCmpy1").attr("checked","checked");
					}
					
					
				}else if(name == "tgtCusGndr"){	//성별 세팅
					var TCG =  data.RESULT_DATA[name].split("");
					
					for(var i = 0 ; i < TCG.length ; i++){
						if(TCG[i] == "1"){
							$("#tgtCusGndr" + (i+2)).attr("checked","checked");
						}
					}
					if(data.RESULT_DATA[name] == "11"){
						$("#tgtCusGndr1").attr("checked","checked");
					}
					
					
					
				}else if(name == "tgtCusAge"){	//나이 세팅
					var TCA =  data.RESULT_DATA[name].split("");
					
					for(var i = 0 ; i < TCA.length ; i++){
						if(TCA[i] == "1"){
							$("#tgtCusAge" + (i+2)).attr("checked","checked");
						}
					}
					if(data.RESULT_DATA[name] == "1111111111"){
						$("#tgtCusAge1").attr("checked","checked");
					}
				}else if(name == "expsSttDt"){ // 노출기간 세팅
					$("#datepicker01").val(ComUtil.getDateFormat(data.RESULT_DATA[name]));
				}else if(name == "expsClosDt"){
					$("#datepicker02").val(ComUtil.getDateFormat(data.RESULT_DATA[name]));
				}else if(name == "pntAcmtAmt" || name == "pntAcmtRto" ){
					//pass
				}else if(name == "pntAcmtDvs"){			// 포인트적립구분(A:정액,R:정률)	
					if(data.RESULT_DATA[name] == "A"){	//정액
						$("#pntAcmt1").val(data.RESULT_DATA["pntAcmtAmt"]);
						$("#pntAcmtPercent").val("포인트");
					}else if(data.RESULT_DATA[name] == "R"){	// 정률
						$("#pntAcmt1").val(data.RESULT_DATA["pntAcmtRto"]);
						$("#pntAcmtPercent").val("%");
					}
					
				}else if(name == "payPnt"){
					$("#"+name).html(data.RESULT_DATA[name] + " 포인트");
				}else if(name == "ptuCyc"){
					$("#ptuCyc1").val(data.RESULT_DATA[name]);
					fncPtuCyc();
				}else{
					$("#"+name).val(data.RESULT_DATA[name]);
				}
			}
			
		}
		
		
	}