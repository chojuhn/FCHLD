
//** ---------------------------------------------------------------------------
//함 수 명 : fnGetAjaxData
//인    자 : 
//		  1. pUrl          : json 호출 url
//		  2. pData         : 파라메터 데이터 Form 명 또는 Array
//		  3. pCallBackFn   : 정상 처리 완료 후 호출 Function 명
//		  4. pBlockUI      : true - blockUI 함수를 호출 한다., false - blockUI 호출 하지 않는다.
//		  5. pBlockMessage : BlockUI에 설정 할 메시지
//		  6. pBlockTime    : BlockUI에 설정 할 시간
//목    적 : 
//플 로 우 : 
//검    수 :
//예   제  : 	fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', 'frm', 'callbackTblListClick', true, '조회 중 입니다.', '30000' );
//			fnGetAjaxData('/sm/so/cm/pop/selectSmso3011.json', {codeId:$(obj).data("data").codeId}, 'callbackTblListClick', true, '조회 중 입니다.', '30000' );
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
function fnGetAjaxData(/* String */ pUrl, /* String or Array */ pData, /* String */ pCallBackFn, /* Bool */ pBlockUI, /* Bool */ pBlockMessage, /* String */ pBlockTime )
{
	try
	{
		var hiddenField;
		var objEle;

		if ( String(document.getElementById('MNGR_MENU_STATE')) == "undefined" || String(document.getElementById('MNGR_MENU_STATE')) == "null" || document.getElementById('MNGR_MENU_STATE') == null )
		{
			hiddenField = document.createElement("input");	 
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("id", "MNGR_MENU_STATE");
			hiddenField.setAttribute("name", "MNGR_MENU_STATE");
			hiddenField.setAttribute("value", $(document).find('input[name=MNGR_MENU_STATE]').val());

			objEle = eval("document.getElementById('"+ pData +"')");

			objEle.appendChild(hiddenField);			
		}
		else
		{
			document.getElementById('MNGR_MENU_STATE').value = "";
			document.getElementById('MNGR_MENU_STATE').value = $(document).find('input[name=MNGR_MENU_STATE]').val();	
		}
		
		var sData = null;

		if(typeof(pData) == "object" )
		{
			sData = pData;
		}
		else
		{
			sData = $('#'+pData).serialize();
		}
		
		$.ajax({
			dataType : "text",
			type : "POST",
			url : pUrl,
			data : sData,
			async : true,
			cache : false, 
			//contentType : "application/x-www-form-urlencoded; charset=euc-kr",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend : function()
			{
				if(pBlockUI)
				{
					if (typeof(pBlockTime) == "undefined" || pBlockTime === undefined || pBlockTime == null || pBlockTime == "")
					{
						blockUI(pBlockMessage,'','13000');
					}
					else
					{
						blockUI(pBlockMessage,'',pBlockTime);
					}
				}
		 	},
			success : function(data, status, request)
			{
				//document.all.txtErrors.value = data;
				var temp_Result	= eval("(" + data + ")");

				if(temp_Result.RESULT_YN == "Y")
				{
					if(pCallBackFn != '')
					{
						eval(pCallBackFn+'(temp_Result);');
					}
				}
				else if (temp_Result.RESULT_YN == "SESSION_ERROR")
				{
					alert(temp_Result.RESULT_MSG);
					
					window.location.href = "/jsp/manage/contents/login_logout/login.do?txtPrePage=" + escape(window.location.href);
				}
				else
				{	
					alert(temp_Result.RESULT_MSG);
				}
			},
			complete: function()
			{
				if(pBlockUI)
				{
					//진행중 표시 제거하기
					unblockUI();
				}
			},
		    error: function(data, status, error)
			{
				window.error = error;

				if(pBlockUI)
				{
					unblockUI();
				}

		    	alert("fnGetAjaxData1[" + error + "]");
			}
		});	
	}
	catch(e)
	{
		alert("fnGetAjaxData2[" + e.message + "]");
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : fnGetAjaxSubmitData
//인    자 : 
//		  1. pUrl          : json 호출 url
//		  2. pData         : 파라메터 데이터 Form
//		  3. pCallBackFn   : 정상 처리 완료 후 호출 Function 명
//		  4. pBlockUI      : true - blockUI 함수를 호출 한다., false - blockUI 호출 하지 않는다.
//		  5. pBlockMessage : BlockUI에 설정 할 메시지
//		  6. pBlockTime    : BlockUI에 설정 할 시간
//목    적 : 
//플 로 우 : 
//검    수 :
//예   제  : 	fnGetAjaxSubmitData('/sm/so/cm/pop/selectSmso3011.json', 'frm', 'callbackTblListClick', true, '조회 중 입니다.', '30000' );
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
function fnGetAjaxSubmitData(/* String */ pUrl, /* String or Array */ pData, /* String */ pCallBackFn, /* Bool */ pBlockUI, /* Bool */ pBlockMessage, /* String */ pBlockTime )
{
	try
	{
		var hiddenField;
		var objEle;

		if ( String(document.getElementById('MNGR_MENU_STATE')) == "undefined" || String(document.getElementById('MNGR_MENU_STATE')) == "null" || document.getElementById('MNGR_MENU_STATE') == null )
		{
			hiddenField = document.createElement("input");	 
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("id", "MNGR_MENU_STATE");
			hiddenField.setAttribute("name", "MNGR_MENU_STATE");
			hiddenField.setAttribute("value", $(document).find('input[name=MNGR_MENU_STATE]').val());

			objEle = eval("document.getElementById('"+ pData +"')");

			objEle.appendChild(hiddenField);			
		}
		else
		{
			document.getElementById('MNGR_MENU_STATE').value = "";
			document.getElementById('MNGR_MENU_STATE').value = $(document).find('input[name=MNGR_MENU_STATE]').val();	
		}
		
		$("#"+pData).ajaxSubmit({
			dataType : "text",
			url : pUrl,
			async : true,
			cache : false, 
			//contentType : "application/x-www-form-urlencoded; charset=euc-kr",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			beforeSend : function()
			{
				if(pBlockUI)
				{
					if (typeof(pBlockTime) == "undefined" || pBlockTime === undefined || pBlockTime == null || pBlockTime == "")
					{
						blockUI(pBlockMessage,'','13000');
					}
					else
					{
						blockUI(pBlockMessage,'',pBlockTime);
					}
				}
		 	},
			success : function(data, status, request)
			{
				var temp_Result	= eval("(" + data + ")");

				if(temp_Result.RESULT_YN == "Y")
				{
					if(pCallBackFn != '')
					{
						eval(pCallBackFn+'(temp_Result);');
					}
				}
				else if (temp_Result.RESULT_YN == "SESSION_ERROR")
				{
					alert(temp_Result.RESULT_MSG);
					
					window.location.href = "/jsp/manage/contents/login_logout/login.do?txtPrePage=" + escape(window.location.href);
				}
				else
				{
					alert(temp_Result.RESULT_MSG);
				}
			},
			complete: function()
			{
				if(pBlockUI)
				{
					//진행중 표시 제거하기
					unblockUI();
				}
			},
		    error: function(data, status, error)
			{
				window.error = error;

				if(pBlockUI)
				{
					unblockUI();
				}

		    	alert("fnGetAjaxSubmitData1[" + error + "]");
			}
		});	
	}
	catch(e)
	{
		alert("fnGetAjaxSubmitData2[" + e.message + "]");
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : blockUI
//인    자 : 
//		  1. mesg			: 표시 메시지
//		  2. cssMap			: 표시 스타일
//		  3. timeout		: 표시 시간
//목    적 : 화면의 버튼 막기 
//플 로 우 : 
//검    수 :
//예   제  : 	
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
function blockUI(/** String */ mesg, /** object of the css */ cssMap, /** Number */ timeout)
{
	mesg = mesg || '처리중입니다. 잠시만 기다려 주세요.';

	//cssMap = cssMap || { width: 460, height: 50 };
	//cssMap = cssMap || { backgroundColor: '#FFF', width:'310px', height:'130px', padding:'5px', position:'absolute', left:'45%', top:'35%' };

	timeout = timeout || 5000;
	
	$.blockUI({
		message : '<span class="msg">' + mesg + '</span><span class="load_img"><img src="/html/manage/images/common/loader2.gif" alt="로딩 이미지"></span>',
		//css : cssMap,
		overlayCSS: { backgroundColor: '#FFF', opacity: 0.5, cursor: 'wait' },
		blockMsgClass: 'loadBox',
		timeout: timeout
	});
	
	setTimeout($.unblockUI, timeout);
}

//** ---------------------------------------------------------------------------
//함 수 명 : unblockUI
//인    자 : 
//목    적 : 화면의 버튼 막기 닫기
//플 로 우 : 
//검    수 :
//예   제  : 	
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------
function unblockUI()
{
	$.unblockUI();
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : 없음
//결    과	: 없음
//목    적 : XML객체를 생성한다.
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : uf_getXmlHttpRequestObject()
//주의사항 : 
//** ---------------------------------------------------------------------------
function uf_getXmlHttpRequestObject()
{
	if(window.XMLHttpRequest)
	{
		return new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		//alert("XMLHttpRequest 개체를 생성할 수 없습니다.");
		return null
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : method		(Http 전송방식)
//			: address		(서버 주소)
//			: data			(서버에 전달할 파라미터)
//			: async			(동기(false)/비동기(true) 여부)
//			: showwait		(process 표시 여부)
//			: callback		(callback 함수명)
//결    과	: String
//목    적 : XML객체를 이용해 페이지를 호출한다.
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : uf_sendRequest(method,address,data,async,showwait,callback)
//주의사항 : 
//** ---------------------------------------------------------------------------
function uf_sendRequest(method,address,data,async,showwait,callback)
{ 
	//xml 객체 생성 
	request = uf_getXmlHttpRequestObject(); 

	if ( request == null )
	{
		alert("XMLHttpRequest 객체를 생성할 수 없습니다.");
		return;
	}

	data = data + uf_getReplace( document.getElementById("txtMNGR_MENU_STATE").value, '?', '&' );

	//전송방식에 따라 data 및 address를 조작하자   
	if(method == 'GET')
	{
		address = address + "?" + data; 

		data = null; 
	}

	if ( showwait )
	{
		uf_showwait();
	}

	//open
	request.open(method,address,async); 

	//요청의 header 설정 
	request.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 

	//send 
	request.send(data);
	
	if ( showwait )
	{
		uf_removewait();
	}

	var uf_callBackFounction;

	uf_callBackFounction = eval(callback);

	var strData;

	if ( async )
	{
		request.onreadystatechange = function()
		{
			if(request.readyState == 1 || request.readyState == 2 || request.readyState == 3)
			{
			}
			else if(request.readyState == 4)
			{
				if (request.status == 200)
				{
					//return request.responseText;

					//uf_callBackFounction(request.responseText);
					uf_callBackFounction(uf_getReplace( request.responseText, '\r\n', '' ));
				}
				else
				{
					//alert("응답오류입니다.\n\n오류내용 : [" + request.status + " / " + request.statusText + "]");

					strData	= {"RESULT_YN":"N","RESULT_MSG":"응답오류입니다.\n\n오류내용 : [" + request.status + " / " + request.statusText + "]\n\n\n\n" + request.responseText};
					strData	= strData.toJSONString();

					uf_callBackFounction(strData);
				}
			}
		}
	}
	else
	{
		if(request.readyState == 4)
		{
			if (request.status == 200)
			{	
				//return request.responseText;

				//uf_callBackFounction(request.responseText);
				uf_callBackFounction(uf_getReplace( request.responseText, '\r\n', '' ));
			}
			else
			{
				//alert("응답오류입니다.\n\n오류내용 : [" + request.status + " / " + request.statusText + "]");

				strData	= {"RESULT_YN":"N","RESULT_MSG":"응답오류입니다.\n\n오류내용 : [" + request.status + " / " + request.statusText + "]\n\n\n\n" + request.responseText};
				strData	= strData.toJSONString();

				uf_callBackFounction(strData);
			}
		}
		else
		{
			//alert("응답오류입니다.\n\n오류내용 : [" + request.status + " / " + request.statusText + "]");

			strData	= {"RESULT_YN":"N","RESULT_MSG":"응답오류입니다.\n\n오류내용 : [" + request.status + " / " + request.statusText + "]\n\n\n\n" + request.responseText};
			strData	= strData.toJSONString();

			uf_callBackFounction(strData);
		}
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : XmlHttpRequestObject	(XmlHttpRequestObject 객체)
//결    과	: 
//목    적 : 서버에서 응답을 받은 후 수행하는 함수를 콜백 함수
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : 
//주의사항 : 별도의 함수로 빠질경우의 Sample 입니다.
//** ---------------------------------------------------------------------------
function uf_callbackFunction(XmlHttpRequestObject)
{
	alert("callbackFunction");

	//요청을 받는다.

	//서버에서 응답온 후 적절한 작업을 수행
	if(XmlHttpRequestObject.readyState == 1 || XmlHttpRequestObject.readyState == 2 || XmlHttpRequestObject.readyState == 3)
	{
		//서버에서 처리 시간이 길어져 응답이 늦게 도착할때 이 상태를 이용해서 현재 서버가 처리중임을 알리는 내용을 화면에 출력한다.
		//단 브라우저마다 readyState의 2, 3 번 값이 틀리기 때문에 크로스 브라우저를 지원하기 위해서는 1번과 4번만 사용하는 것이 유용하다.
	}
	else if(XmlHttpRequestObject.readyState == 4)
	{
		//서버로부터 응답이 도착
		if (XmlHttpRequestObject.status == 200)
		{
			return request.responseText;
		}
		else
		{
			alert("응답오류입니다.\n\n오류 : [" + XmlHttpRequestObject.status + " / " + XmlHttpRequestObject.statusText + "]");
		}
	}

	//사실 onreadystatechange에서 명시한 콜백 함수는 readyState라는 프로퍼티값이 변경될때 마다 호출된다 따라서 실제로 onreadystate함수는 3~4번 호출되는 셈이다.
	//그러므로 onreadystatechange 함수안에서 값에 따라 처리를 해줘야 한다.

	//0 : UNINITIALIZED : 객체만 생성되고 아직 초기화 되지 않은 상태(open 메서드가 호출 되지 않음)
	//1 : LOADING : open 메서드가 호출되고 아직 send 메서드가 불리지 않은 상태
	//2 : LOADED : send 메서드가 불렸지만 status와 헤더는 도착하지 않은 상태
	//3 : INTERACTIVE : 데이터의 일부를 받은 상태
	//4 : COMPLETED : 데이터를 전부 받은 상태, 완전한 데이터의 이용 가능
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : XmlHttpRequestObject	(XmlHttpRequestObject 객체)
//결    과	: 
//목    적 : 서버에서 응답을 받은 후 완료인지 체크하는 콜백 함수
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : 
//주의사항 : Sample 입니다.
//** ---------------------------------------------------------------------------
function uf_isReadyState(XmlHttpRequestObject)
{
	var sReadyState;

	sReadyState = false;

	//서버에서 응답온 후 적절한 작업을 수행
	if(XmlHttpRequestObject.readyState == 1 || XmlHttpRequestObject.readyState == 2 || XmlHttpRequestObject.readyState == 3)
	{
		//서버에서 처리 시간이 길어져 응답이 늦게 도착할때 이 상태를 이용해서 현재 서버가 처리중임을 알리는 내용을 화면에 출력한다.
		//단 브라우저마다 readyState의 2, 3 번 값이 틀리기 때문에 크로스 브라우저를 지원하기 위해서는 1번과 4번만 사용하는 것이 유용하다.
		
		sReadyState = false;
	}
	else if(XmlHttpRequestObject.readyState == 4)
	{
		//서버로부터 응답이 도착
		if (XmlHttpRequestObject.status == 200)
		{
			sReadyState = true;
		}
		else
		{
			//alert("응답오류입니다.\n\n오류내용 : [" + XmlHttpRequestObject.status + " / " + XmlHttpRequestObject.statusText + "]");

			sReadyState	= false;
		}
	}

	return sReadyState;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : 
//목    적 : 상태바 생성
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------	
function uf_showwait(sMsg,bCheck)
{
	if ( bCheck == null || uf_getTrim(bCheck,"A") == "" )
	{
		bCheck = true;
	}

	if (bCheck)
	{
		if(document.getElementById("Proccess_Ing"))
		{
			var s_Client_Width;		//document width 값
			var s_Client_Height;	//document height 값
			var s_Scroll_Width;		//document scroll width 값
			var s_Scroll_Height;	//document scroll height 값

			//브라우저별

			if (navigator.userAgent.indexOf("MSIE 6") > 0)
			{
				//IE 6.x

				s_Client_Width = document.body.clientWidth;
				s_Client_Height = document.body.clientHeight;
				s_Scroll_Width = document.body.scrollWidth;
				s_Scroll_Height = document.body.scrollHeight;
			}
			else if(navigator.userAgent.indexOf("MSIE 7") > 0)
			{
				//IE 7.x

				s_Client_Width = document.body.clientWidth;
				s_Client_Height = document.body.clientHeight;
				s_Scroll_Width = document.body.scrollWidth;
				s_Scroll_Height = document.body.scrollHeight;
			}
			else if(navigator.userAgent.indexOf("MSIE 8") > 0)
			{
				//IE 8.x

				s_Client_Width = document.documentElement.clientWidth;
				s_Client_Height = document.documentElement.clientHeight;
				s_Scroll_Width = document.documentElement.scrollWidth;
				s_Scroll_Height = document.documentElement.scrollHeight;
				
				s_Client_Width = s_Client_Width - 1;
				s_Client_Height = s_Client_Height - 0;

				s_Scroll_Width = s_Scroll_Width - 1;
				s_Scroll_Height = s_Scroll_Height - 0;
			}
			else if(navigator.userAgent.indexOf("Firefox") > 0)
			{
				//FF

				s_Client_Width = document.documentElement.clientWidth;
				s_Client_Height = document.documentElement.clientHeight;
				s_Scroll_Width = document.documentElement.scrollWidth;
				s_Scroll_Height = document.documentElement.scrollHeight;
			}
			else if(navigator.userAgent.indexOf("Opera") > 0)
			{
				//Opera

				s_Client_Width = document.documentElement.clientWidth;
				s_Client_Height = document.documentElement.clientHeight;
				s_Scroll_Width = document.documentElement.scrollWidth;
				s_Scroll_Height = document.documentElement.scrollHeight;
			}
			else if(navigator.userAgent.indexOf("Netscape") > 0)
			{
				//Netscape

				s_Client_Width = document.documentElement.clientWidth;
				s_Client_Height = document.documentElement.clientHeight;
				s_Scroll_Width = document.documentElement.scrollWidth;
				s_Scroll_Height = document.documentElement.scrollHeight;
			}
			else
			{
				s_Client_Width = document.documentElement.clientWidth;
				s_Client_Height = document.documentElement.clientHeight;
				s_Scroll_Width = document.documentElement.scrollWidth;
				s_Scroll_Height = document.documentElement.scrollHeight;
			}

			//브라우저별

			document.getElementById("Proccess_Ing_Content").style.top = s_Scroll_Height/2-60+"px";
			document.getElementById("Proccess_Ing_Content").style.left = s_Scroll_Width/2-60+"px";
			document.getElementById("Proccess_Ing_Content").style.width = "170px";
			document.getElementById("Proccess_Ing_Content").style.height = "70px";
			document.getElementById("Proccess_Ing_Content").style.position = "absolute";
			document.getElementById("Proccess_Ing_Content").style.zIndex = 10000;

			document.getElementById("Proccess_Ing_BG").style.top = "0px";
			document.getElementById("Proccess_Ing_BG").style.left = "0px";
			document.getElementById("Proccess_Ing_BG").style.width = s_Scroll_Width+"px";
			document.getElementById("Proccess_Ing_BG").style.height = s_Scroll_Height+"px";

			document.getElementById("Proccess_Ing").style.top = "0px";
			document.getElementById("Proccess_Ing").style.left = "0px";
			document.getElementById("Proccess_Ing").style.width = s_Scroll_Width+"px";
			document.getElementById("Proccess_Ing").style.height = s_Scroll_Height+"px";
			document.getElementById("Proccess_Ing").style.display = "block";
		}
	}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : 
//목    적 : 상태바 제거
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//** ---------------------------------------------------------------------------	
function uf_removewait()
{
	if(document.getElementById("Proccess_Ing"))
	{
		document.getElementById("Proccess_Ing").style.display = "none";
	}
}
