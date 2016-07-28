// 본 js는 kscc 공통 javascript 로더입니다. 20140109 - jysong
function ksccInclude() {
    // 이곳에 공통 스크립트 파일을 include합니다. KSCC_CONTEXT_PATH 가 있어야 합니다.
    var pathtojsfiles = rootContextPath + "/js/";
    var modules = [
        { include: true, incfile:'devon/dui_prototype.js'},
        { include: true, incfile:'jquery/jquery-1.10.2.min.js'},
        { include: true, incfile:'devon/dui_webvalidator.js'},
        { include: true, incfile:'jquery/jquery-ui-1.9.2.custom.js'},
        { include: true, incfile:'jquery/jquery.number.js'},
        { include: true, incfile:'jquery/jquery.blockUI.js'},
        { include: true, incfile:'jquery/jquery.json-2.4.min.js'},
        { include: true, incfile:'jquery/jquery.jqGrid-4.6.0.js'},
        { include: true, incfile:'jquery/grid.locale-kr.js'},
        { include: true, incfile:'jquery/jquery.form.js'},
        { include: true, incfile:'jquery/jquery.fileDownload.js'},
        { include: true, incfile:'jquery/jquery.cookie.js'},
        { include: true, incfile:'devon/xsync.js'},
        { include: true, incfile:'framework/kscc.base.js'},      // kscc 기본 실행 함수
        { include: true, incfile:'framework/kscc.date.js'},      // datepicker 관련 함수
        { include: true, incfile:'framework/kscc.formatter.js'}, // 공통 포메터 관련 함수
        { include: true, incfile:'framework/kscc.combo.js'},     // 콤보 관련 함수
        { include: true, incfile:'framework/kscc.etc.js'},       // 기타 함수
        { include: true, incfile:'framework/kscc.grid.js'},      // jqGrid 관련 함수
        { include: true, incfile:'framework/kscc.utilgroup.js'}, // 그룹화된 공통 유틸성 함수
        { include: true, incfile:'framework/kscc.message.js'}    // 공통 메세지
    ];
    var filename;
    for(var i=0;i<modules.length; i++){
        if(modules[i].include === true) {
            filename = pathtojsfiles+modules[i].incfile;
            document.write('<script charset="utf-8" type="text/javascript" src="'+filename+'"></script>');
        }
    }
}

// 실행한다
ksccInclude();
