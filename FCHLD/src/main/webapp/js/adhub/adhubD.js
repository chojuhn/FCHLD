
	function loading(mvmnTlcnCmpy,tgtCusGndr,tgtCusAge,blbrExpsYn,pupExpsYn,pntAcmtDvs,pntAcmtRto,pntAcmtAmt,stlmMthd,stlmMthd2){

		if(pntAcmtDvs == 'A'){
			document.getElementById("pntAcmtDvs").innerHTML = "정액 : "+ pntAcmtAmt + " 포인트";
		}else if(pntAcmtDvs == 'R'){
			document.getElementById("pntAcmtDvs").innerHTML = "정률 : "+ pntAcmtRto + " %";
		}

		if(stlmMthd == 'M'){
			document.getElementById("stlmMthd").innerHTML = "월정산";
		}else if(stlmMthd == 'D'){
			if(stlmMthd == 'A'){
				document.getElementById("stlmMthd").innerHTML = "일정산 광고수량";
			}else{
				document.getElementById("stlmMthd").innerHTML = "일정산 노출기간";	
			}
		}
		
		var mvmn = "";
		if(mvmnTlcnCmpy.substring(0,1) == "1"){
			mvmn += "SKT ";
		}
		if(mvmnTlcnCmpy.substring(1,2) == "1"){
			mvmn += "KT ";
		}
		if(mvmnTlcnCmpy.substring(2,3) == "1"){
			mvmn += "LGT";
		}
		document.getElementById("mvmnTlcnCmpy").innerHTML = mvmn;
		
		var tgtGndr = "";
		if(tgtCusGndr.substring(0,1) == "1"){
			tgtGndr += "남자 ";
		}
		if(tgtCusGndr.substring(1,2) == "1"){
			tgtGndr += "여자";
		}
		document.getElementById("tgtCusGndr").innerHTML = tgtGndr;
		
		var tgtAge = "";
		if(tgtCusAge.substring(0,1) == "1"){
			tgtAge += "0-13 ";
		}
		if(tgtCusAge.substring(1,2) == "1"){
			tgtAge += "14-16 ";
		}
		if(tgtCusAge.substring(2,3) == "1"){
			tgtAge += "17-19 ";
		}
		if(tgtCusAge.substring(3,4) == "1"){
			tgtAge += "20-24 ";
		}
		if(tgtCusAge.substring(4,5) == "1"){
			tgtAge += "25-29 ";
		}
		if(tgtCusAge.substring(5,6) == "1"){
			tgtAge += "30-39 ";
		}
		if(tgtCusAge.substring(6,7) == "1"){
			tgtAge += "40-49 ";
		}
		if(tgtCusAge.substring(7,8) == "1"){
			tgtAge += "50-59 ";
		}
		if(tgtCusAge.substring(8,9) == "1"){
			tgtAge += "60-64 ";
		}
		if(tgtCusAge.substring(9,10) == "1"){
			tgtAge += "65이상";
		}	
		document.getElementById("tgtCusAge").innerHTML = tgtAge;
				
		if(blbrExpsYn == "Y"){
			$("#blbrExps").show();
			$("#pupExps").hide();			
		}
		
		if(pupExpsYn == "Y"){
			$("#blbrExps").hide();
			$("#pupExps").show();			
		}
				
	}
	
	//광고 상품 삭제
	function btnDel(ksccAdvrId) {
		if ( confirm("삭제 하시겠습니까?") ) {	
			document.form3.gubun.value ="del";
			$("#form3").attr("action","/mktp/adhub/updateAdState.do");		
			$("#form3").submit();
		}
	}

	//광고 상품 목록화면 이동
	function btnAdList() {
		$("input[name=currentPage]").val();
		$("input[name=pageSize]").val();
		$("#form2").attr("action","/mktp/adhub/getListAd.do");		
		$("#form2").submit();

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
		}else if(gubun == "return"){
			text = "승인취소를 하시겠습니까?";
		}else if(gubun == "close"){
			text = "삭제 하시겠습니까?";
		}
		if(gubun == "accept" || gubun == "req" || gubun == "cancel" || gubun == "del" || gubun == "return" || gubun == "close"){
			if(view == "view"){
				var url = "/mktp/adhub/popup/updateAdStateView.do?gubun="+gubun+"&aprvPrcgRsn="+aprvPrcgRsn;	
				var name = '_blank'; 
				var specs = 'toolbar=no,status=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,top=10,left=10,width=420,height=500';
				var newWindow = window.open(url, name, specs);
				newWindow.focus();			
			}else{
				if ( confirm(text) ) {
					$("#gubun").val(gubun);
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
			$("#gubun").val(gubun);
			$("#aprvPrcgRsn").val(val);
			$("#form2").attr("action","/mktp/adhub/updateAdState.do");		
			$("#form2").submit();			
		}
	}	