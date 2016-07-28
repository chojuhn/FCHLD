package kscc.com.login.svc;

import java.util.List;

import javax.annotation.Resource;

import kscc.com.login.vo.LoginMngV;
import kscc.com.login.vo.RoleMngV;
import kscc.framework.mapper.CommonMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@Service("loginMngS")
public class LoginMngS {

    @Resource(name = "commonMapper")
    private CommonMapper commonMapper;

    public LoginMngV readUserInfo(String usrId) {
        return (LoginMngV)commonMapper.executeQuery("com.loginMng.readUserInfo", usrId);
    }

    @SuppressWarnings( "unchecked" )
    public List<RoleMngV> readUserAuthList(String usrId) {
        return (List)commonMapper.executeQuery("com.loginMng.readUserAuthList", usrId);
    }
    
    public int updateUsrPw(LoginMngV loginMngV) {
        return (Integer)commonMapper.executeQuery("com.loginMng.updateUsrPw", loginMngV);
    }
    
    public int updateLstLgnDtm(LoginMngV userV) {
        return (Integer)commonMapper.executeQuery("com.loginMng.updateLstLgnDtm", userV);
    }
    
    public int updateLgnErrNcnt(String usrId) {
        return (Integer)commonMapper.executeQuery("com.loginMng.updateLgnErrNcnt", usrId);
    }
    
    public int readLgnErrNcnt(String usrId) {
        return (Integer)commonMapper.executeQuery("com.loginMng.readLgnErrNcnt", usrId);
    }
    
}
