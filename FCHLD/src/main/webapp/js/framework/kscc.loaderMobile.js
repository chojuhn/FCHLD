// 본 js는 kscc 공통 javascript 모바일용 로더입니다. 20140123 - jysong
// 오로지 kscc프레임워크 관련된 사항만 로드시킵니다.
function ksccInclude() {
    // 이곳에 공통 스크립트 파일을 include합니다. KSCC_CONTEXT_PATH 가 있어야 합니다.
    var pathtojsfiles = KSCC_CONTEXT_PATH + "/js/";
    var modules = [
        { include: true, incfile:'framework/kscc.base.js'},      // kscc 기본 실행 함수
        { include: true, incfile:'framework/kscc.date.js'},      // datepicker 관련 함수
        { include: true, incfile:'framework/kscc.formatter.js'}, // 공통 포메터 관련 함수
        { include: true, incfile:'framework/kscc.combo.js'},     // 콤보 관련 함수
        { include: true, incfile:'framework/kscc.etc.js'},       // 기타 함수
        { include: true, incfile:'framework/kscc.grid.js'},      // jqGrid 관련 함수
        { include: true, incfile:'framework/kscc.utilgroup.js'}  // 그룹화된 공통 유틸성 함수
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
