package kscc.xxx.usr.svc;

import java.util.List;

import javax.annotation.Resource;

import kscc.framework.mapper.CommonMapper;
import kscc.xxx.usr.vo.UsrMngV;

import org.springframework.stereotype.Service;


@Service("usrMngS")
public class UsrMngS {

    @Resource(name = "commonMapper")
    private CommonMapper commonMapper;

    public List<UsrMngV> readUserList(UsrMngV usrMngV) throws Exception {
        return (List)commonMapper.executeQuery("usr.usrMng.readUserList", usrMngV);
    }

    public int readUserListCnt(UsrMngV usrMngV) throws Exception {
        return (Integer)commonMapper.executeQuery("usr.usrMng.readUserListCnt", usrMngV);
    }

    public void addUserList(UsrMngV usrMng) throws Exception {
        commonMapper.executeQuery("usr.usrMng.addUserList",usrMng);
    }
}
