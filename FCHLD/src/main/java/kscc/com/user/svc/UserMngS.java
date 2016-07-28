package kscc.com.user.svc;

import java.util.List;

import javax.annotation.Resource;

import kscc.com.login.vo.RoleMngV;
import kscc.com.user.vo.UserMngV;
import kscc.framework.mapper.CommonMapper;

import org.springframework.stereotype.Service;


@Service("userMngS")
public class UserMngS {

    @Resource(name = "commonMapper")
    private CommonMapper commonMapper;

    public UserMngV readUserInfo(String usrId) {
        return (UserMngV)commonMapper.executeQuery("com.userMng.readUserInfo", usrId);
    }

    @SuppressWarnings( "unchecked" )
    public List<RoleMngV> readUserAuthList(String usrId) {
        return (List)commonMapper.executeQuery("com.userMng.readUserAuthList", usrId);
    }
    
    @SuppressWarnings( "unchecked" )
    public List<UserMngV> readUserList(UserMngV userMngV) {
        return (List)commonMapper.executeQueryForPage("com.userMng.readUserList", userMngV, userMngV.getPage() - 1, userMngV.getRows());
    }
    
    public int readUserListCnt(UserMngV userMngV) {
        return (Integer)commonMapper.executeQuery("com.userMng.readUserListCnt", userMngV);
    }
    
    public int updateUsrPwInfo(UserMngV userMngV) {
        return (Integer)commonMapper.executeQuery("com.userMng.updateUsrPwInfo", userMngV);
    }
    
    public int addUserInfo(UserMngV userMngV) {
        return (Integer)commonMapper.executeQuery("com.userMng.addUserInfo", userMngV);
    }
    
    public int updateUserInfo(UserMngV userMngV) {
        return (Integer)commonMapper.executeQuery("com.userMng.updateUserInfo", userMngV);
    }  
    
}
