


	function loading(mvmnTlcnCmpy,tgtCusGndr,tgtCusAge,blbrExpsYn,pupExpsYn,pntAcmtDvs,pntAcmtRto,pntAcmtAmt,stlmMthd,stlmMthd2,ptuCyc,randingPageYn,advrTyp,resultMessage){

		if(pntAcmtDvs == 'A'){
			$("#pntAcmt1").val(pntAcmtAmt);
			$("#pntAcmtPercent").val("포인트");
			$("#pntAcmtPercent1").val("포인트");
		}else if(pntAcmtDvs == 'R'){
			$("#pntAcmt1").val(pntAcmtRto);
			$("#pntAcmtPercent").val("%");
			$("#pntAcmtPercent1").val("포인트");
		}else{
			$("#pntAcmtDvs").val("R");
			$("#pntAcmtPercent").val("%");
		}

		if(stlmMthd == 'M' || stlmMthd == 'W'){
			$("#stlmMthd2").hide();
		}else if(stlmMthd == 'D'){
			$("#stlmMthd2").show();
		}
		
		if(randingPageYn == "Y"){
			$('input:checkbox[id="randingPageYn1"]').prop("checked",true);
		}
		
		if(advrTyp == "CPC") {
			$('input:checkbox[id="randingPageYn1"]').prop("checked",false);
			$("#randingPageYn1").attr("disabled", true);			
		}
			
		if(ptuCyc == '0' || ptuCyc == '7' || ptuCyc == '15' || ptuCyc == '30' || ptuCyc == '45' || ptuCyc == '60'){
			$("#ptuCycText").hide();
			$("#ptuCycDate").hide();
		}else{
			$("#ptuCycText").show();
			$("#ptuCycDate").show();
			$("#ptuCycText").val(ptuCyc);
		}
		
		if(mvmnTlcnCmpy.substring(0,1) == "1"){
			$('input:checkbox[id="mvmnTlcnCmpy2"]').prop("checked",true);
		}
		if(mvmnTlcnCmpy.substring(1,2) == "1"){
			$('input:checkbox[id="mvmnTlcnCmpy3"]').prop("checked",true);
		}
		if(mvmnTlcnCmpy.substring(2,3) == "1"){
			$('input:checkbox[id="mvmnTlcnCmpy4"]').prop("checked",true);
		}
		if($('input:checkbox[name="mvmnTlcnCmpy0"]:checked').length ==3) {
        	$('#mvmnTlcnCmpy1').prop('checked', true);
        }
		
		if(tgtCusGndr.substring(0,1) == "1"){
			$('input:checkbox[id="tgtCusGndr2"]').prop("checked",true);
		}
		if(tgtCusGndr.substring(1,2) == "1"){
			$('input:checkbox[id="tgtCusGndr3"]').prop("checked",true);
		}
		if($('input:checkbox[name="tgtCusGndr0"]:checked').length ==2) {
			$('#tgtCusGndr1').prop('checked', true);
		}
		
		
		if(blbrExpsYn == "Y"){
			$('input:radio[name="expsYn"]:radio[value="blb"]').attr('checked',true);
			$("#blbrExps").show();
			$("#pupExps").hide();			
		}
		
		if(pupExpsYn == "Y"){
			$('input:radio[name="expsYn"]:radio[value="pup"]').attr('checked',true);
			$("#blbrExps").hide();
			$("#pupExps").show();			
		}
		
		if(tgtCusAge.substring(0,1) == "1"){
			$('input:checkbox[id="tgtCusAge2"]').prop("checked",true);
		}
		if(tgtCusAge.substring(1,2) == "1"){
			$('input:checkbox[id="tgtCusAge3"]').prop("checked",true);
		}
		if(tgtCusAge.substring(2,3) == "1"){
			$('input:checkbox[id="tgtCusAge4"]').prop("checked",true);
		}
		if(tgtCusAge.substring(3,4) == "1"){
			$('input:checkbox[id="tgtCusAge5"]').prop("checked",true);
		}
		if(tgtCusAge.substring(4,5) == "1"){
			$('input:checkbox[id="tgtCusAge6"]').prop("checked",true);
		}
		if(tgtCusAge.substring(5,6) == "1"){
			$('input:checkbox[id="tgtCusAge7"]').prop("checked",true);
		}
		if(tgtCusAge.substring(6,7) == "1"){
			$('input:checkbox[id="tgtCusAge8"]').prop("checked",true);
		}
		if(tgtCusAge.substring(7,8) == "1"){
			$('input:checkbox[id="tgtCusAge9"]').prop("checked",true);
		}
		if(tgtCusAge.substring(8,9) == "1"){
			$('input:checkbox[id="tgtCusAge10"]').prop("checked",true);
		}
		if(tgtCusAge.substring(9,10) == "1"){
			$('input:checkbox[id="tgtCusAge11"]').prop("checked",true);
		}
		if($('input:checkbox[name="tgtCusAge0"]:checked').length ==10) {
			$('#tgtCusAge1').prop('checked', true);
		}
		
		if(resultMessage != ''){
			alert(resultMessage);
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

		if(pntAcmtDvs == 'A'){
			if(advrUprc(pntAcmt1) > advrUprc(advrUprc)){
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
	
	//광고 상품 승인,수정요청,승인거부,삭제 처리,카테고리 및 팝업
	function btnStateChange(gubun,aprvPrcgRsn,view) {
		var text = "";
		if(gubun == "accept"){
			text = "승인을 하시겠습니까?";
		}else if(gubun == "req"){
			text = "수정요청을 하시겠습니까?";
		}else if(gubun == "cancel"){
			text = "승인거부를 하시겠습니까?";
		}else if(gubun == "del"){
			text = "삭제 하시겠습니까?";
		}
		if(gubun == "accept" || gubun == "req" || gubun == "cancel" || gubun == "del"){
			if(view == "view"){
				var url = "/mktp/adhub/popup/updateAdStateView.do?gubun="+gubun+"&aprvPrcgRsn="+aprvPrcgRsn;	
				var name = '_blank'; 
				var specs = 'toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=420,height=500';
				var newWindow = window.open(url, name, specs);
				newWindow.focus();			
			}else{
				if ( confirm(text) ) {
					document.form2.gubun.value =gubun;
					if(aprvPrcgRsn == undefined){
						aprvPrcgRsn = "";
					}
					if(gubun == "req" || gubun == "cancel"){
						var url = "/mktp/adhub/popup/updateAdStateView.do?gubun="+gubun+"&aprvPrcgRsn="+aprvPrcgRsn;	
						var name = '_blank'; 
						var specs = 'toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=420,height=500';
						var newWindow = window.open(url, name, specs);
						newWindow.focus();
					}else{
						$("#form2").attr("action","/mktp/adhub/updateAdState.do");		
						$("#form2").submit();	
					}
				}			
			}				
		}else{
			var url = "/mktp/adhub/popup/updateAdStateView.do?gubun="+gubun;	
			var name = '_blank'; 
			var specs = 'toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=420,height=500';
			var newWindow = window.open(url, name, specs);
			newWindow.focus();
		}

	}
	
	//광고 상품 수정요청,승인거부,카테고리
	function getReturnValue(val,gubun,hgrnCdNm,mhrkCd,hgrnCd){
		if(gubun == 'category'){
			$("#ctgrNm").val(val+" > "+hgrnCdNm);
			$("#ctgrId").val(hgrnCd);
		}else{
			document.form2.gubun.value =gubun;
			$("#aprvPrcgRsn").val(val);
			$("#form2").attr("action","/mktp/adhub/updateAdState.do");		
			$("#form2").submit();			
		}
	}
	
	//광고 상품 목록화면 이동
	function btnAdList() {
		$("input[name=currentPage]").val();
		$("input[name=pageSize]").val();
		document.form2.gubun.value ="search";
		$("#form2").attr("action","/mktp/adhub/getListAd.do");		
		$("#form2").submit();

	}

	//광고 유형(cpc일때)
	function fncTyp() {
		var typ = $("#advrTyp").val();
		if(typ == "CPC"){
			$('input:checkbox[id="randingPageYn1"]').prop("checked",false);
			$("#randingPageYn1").attr("disabled", true);
		}else{
			$('input:checkbox[id="randingPageYn1"]').prop("checked",true);
			$("#randingPageYn1").attr("disabled", false);
		}
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
		if(chk){
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
		
	//저장 및 승인
	function btnSave(gubun) {
		console.log("==========");

		var stlmMthd2 = $("#stlmMthd2").val();
		var advrQnt = $("#advrQnt").val();
		var datepicker01 = $("#datepicker01").val();
		var datepicker02 = $("#datepicker02").val();
		
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
			}			
		} 		
		
		if($("#advrTtl").val() == ""){
			alert("광고제목은 필수 값입니다.");
			$("#advrTtl").focus();
			return false;	
		}else if($("#advrLinkUrl").val() == ""){
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
			$("#pntAcmtAmt").val(pntAcmtAmt);
		}else if(pntAcmtDvs == "R"){
			pntAcmtRto = $("#pntAcmt1").val();
			$("#pntAcmtRto").val(pntAcmtRto);
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
		
		var file1 = $('input:file[id="files[0]"]').val();
		var file2 = $('input:file[id="files[1]"]').val();

		if(file1 != "" || file2 != ""){
			$("#imgChange").val('Y');
		} 
		
		$("#mvmnTlcnCmpy").val(mvmnTlcnCmpy);
		$("#tgtCusGndr").val(tgtCusGndr);
		$("#tgtCusAge").val(tgtCusAge);
		$("#blbrExpsYn").val(blbrExpsYn);
		$("#pupExpsYn").val(pupExpsYn);
		
		if(gubun == "accept"){
			if ( confirm("승인을 하시겠습니까?") ) {
				document.form.gubun.value =gubun;
				$("#form").attr("action","/mktp/adhub/updateAd.do");
				$("#form").submit();	
			}
		}else{
			if ( confirm("저장을 하시겠습니까?") ) {
				document.form.gubun.value ="save";
				$("#form").attr("action","/mktp/adhub/updateAd.do");		
				$("#form").submit();
			}
		}
	
	}

	
	function strip_tag(val,str){
		var id = $(val).attr('id');
		var content = str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
		$("#"+id).val(content);
	}	