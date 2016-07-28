/**
 * security.js version 0.1
 *
 *
 */

// 3 조합 필수입력 확인
var regExpMix = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[!@#$%^*+=-])(?=.*[a-zA-Z]).*$/;
//키보드 연속패턴 ex) qwer, asdf, zxcv, qaz, wsx, edc (대소문자 구분없이)
var regExpKey = /qwer|asdf|zxcv|qaz|wsx|edc/i;

if (!passwd) var passwd = {};

passwd.validation = function (newPasswd, newPasswdCfm, userId, passwd) {
    this.newPasswd    = newPasswd;
    this.newPasswdCfm = newPasswdCfm;
    this.passwd       = passwd;
    this.userId       = userId;
}

passwd.validation.prototype.checkNewPasswd = function () {
    if (this.newPasswd == "") {
        alert('비밀번호를 넣어주세요.');
        return false;
    }
    return true;
}

passwd.validation.prototype.checkNewPasswdCfm = function () {
    if (this.newPasswdCfm == "") {
        alert('비밀번호 확인을 넣어주세요.');
        return false;
    }
    return true;
}

passwd.validation.prototype.checkId = function () {
    var regExpId = new RegExp(this.userId, "i");
    if(regExpId.test(this.newPasswd)) {
        alert("사용자 ID 는 비밀번호로 사용하실 수 없습니다.");
        return false;
    }
    return true;
}

passwd.validation.prototype.checkKeyPattern = function () {
    if(regExpKey.test(this.newPasswd)) {
        alert("키보드 연속 문자는 비밀번호로 사용하실 수 없습니다.");
        return false;
    }
    return true;
}

passwd.validation.prototype.checkContPattern = function () {
    var text = this.newPasswd;
    for(var idx=0; idx < text.length; idx++) {
        var firstCode = text.charCodeAt(idx);
        if(text.charCodeAt(idx+1) == (firstCode+1) && text.charCodeAt(idx+2) == (firstCode+2)) {
            alert("연속 문자/숫자 패턴은 비밀번호로 사용하실 수 없습니다.");
            return false;
        }
    }
    return true;
}

passwd.validation.prototype.checkSamePattern = function () {
    var text = this.newPasswd;
    for(var idx=0; idx < text.length; idx++) {
        var firstCode = text.charCodeAt(idx);
        // a-z 혹은 A-Z 경우 체크
        if( (firstCode >= 48 && firstCode <= 90) || (firstCode >= 97 && firstCode <= 122) ) {
            if(text.charCodeAt(idx+1) == firstCode && text.charCodeAt(idx+2) == firstCode) {
                alert("동일 문자 패턴은 비밀번호로 사용하실 수 없습니다.");
                return false;
            }
        }
    }
    return true;
}

passwd.validation.prototype.checkMixPattern = function () {
    if(!regExpMix.test(this.newPasswd)) {
        alert('비밀번호 형식이 잘못되었습니다.\n'
                +'(영문, 숫자, 특수문자를 혼합하여 8 ~ 20자 이내)');
        return false;
    }
    return true;
}

passwd.validation.prototype.checkCfm = function () {
    if (this.newPasswd != this.newPasswdCfm) {
        alert("비밀번호가 서로 다릅니다. 확인해주세요.");
        return false;
    }
    return true;
}

passwd.validation.prototype.checkCurrPasswd = function () {
    if (this.passwd == this.newPasswd) {
        alert('현재 비밀번호는 사용할 수 없습니다.');
        return false;
    }
    return true;
}

function newPasswdValidation (oNewPassWord, oNewPassWordCfm, oUserId) {
    var checkPass = new passwd.validation(oNewPassWord, oNewPassWordCfm, oUserId, "");

    // 1. 사용자 비밀번호 Null 체크
    if(!checkPass.checkNewPasswd()) return false;

    // 2. 사용자 비밀번호 Null 체크
    if(!checkPass.checkNewPasswdCfm()) return false;

    // 3. 사용자 ID를 비밀번호로 사용했는지 체크
    if(!checkPass.checkId()) return false;

    // 4. 키보드 연속 문자를 사용했는지 체크
    if(!checkPass.checkKeyPattern()) return false;

    // 5. 연속 문자, 숫자를 사용했는지 체크
    if(!checkPass.checkContPattern()) return false;

    // 6. 동일 문자를 연속으로 사용했는지 체크
    if(!checkPass.checkSamePattern()) return false;

    // 7. 3 조합 문자 체크
    if(!checkPass.checkMixPattern()) return false;

    // 8. 비밀번호 확인과 동일한지 체크
    if(!checkPass.checkCfm()) return false;

    return true;
}

function updatePasswdValidation (oPassWord, oNewPassWord, oNewPassWordCfm, oUserId) {
    var checkPass = new passwd.validation(oNewPassWord, oNewPassWordCfm, oUserId, oPassWord);

    // 1. 사용자 비밀번호 Null 체크
    if(!checkPass.checkNewPasswd()) return false;

    // 2. 사용자 비밀번호 Null 체크
    if(!checkPass.checkNewPasswdCfm()) return false;

    // 3. 사용자 ID를 비밀번호로 사용했는지 체크
    if(!checkPass.checkId()) return false;

    // 4. 현재 비밀번호를 사용했는지 체크
    if(!checkPass.checkCurrPasswd()) return false;

    // 5. 키보드 연속 문자를 사용했는지 체크
    if(!checkPass.checkKeyPattern()) return false;

    // 6. 연속 문자, 숫자를 사용했는지 체크
    if(!checkPass.checkContPattern()) return false;

    // 7. 동일 문자를 연속으로 사용했는지 체크
    if(!checkPass.checkSamePattern()) return false;

    // 8. 3 조합 문자 체크
    if(!checkPass.checkMixPattern()) return false;

    // 9. 비밀번호 확인과 동일한지 체크
    if(!checkPass.checkCfm()) return false;

    return true;
}
