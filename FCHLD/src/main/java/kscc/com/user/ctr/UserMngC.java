package kscc.com.user.ctr;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kscc.com.user.svc.UserMngS;
import kscc.com.user.vo.UserMngV;
import kscc.framework.contants.Constants;
import kscc.framework.layer.ctr.AbstractController;
import kscc.framework.util.AuthUtil;
import kscc.framework.util.KSessionUtil;
import kscc.framework.util.PageUtil;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.rte.fdl.property.EgovPropertyService;

@Controller
@RequestMapping(value = "/com")
public class UserMngC extends AbstractController {

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Autowired
    UserMngS userMngS;
        
    private static final Logger LOG = LoggerFactory.getLogger(UserMngC.class);
    private final String c = "C";
    private final String u = "U";

    /**
     * 로그인
     */
    @RequestMapping(value = "readUserList.do", method = RequestMethod.GET)
    public String readUserList(ModelMap model, HttpServletRequest request) throws Exception {  
        return "com/readUserList";
    }
        
    /**
     * Employee In Oracle
     */
    @RequestMapping(value = "readUserList.ajax", method = { RequestMethod.GET, RequestMethod.POST })
    @ResponseBody
    public Map readUserList(ModelMap model, @ModelAttribute("userMngV") UserMngV userMngV, HttpServletRequest request) throws Exception {
        LOG.debug("@@@ readUserList ajax");
        Map<String, Object> map = new HashMap<String, Object>();
        
        List resultList = userMngS.readUserList(userMngV);
        
        PageUtil.setPageInfo( map, userMngV, resultList,  userMngS.readUserListCnt( userMngV ) );
        
        LOG.debug("@@@ resultList " + resultList);
       
        return map;
    }
    
    /**
     * Employee In Oracle
     */
    @RequestMapping(value = "updateUserInfo.ajax", method = { RequestMethod.GET, RequestMethod.POST })
    @ResponseBody
    public Map updateUserInfo(ModelMap model, @ModelAttribute("userMngV") UserMngV userMngV, HttpServletRequest request) throws Exception {
        LOG.debug("@@@ updateUserInfo ajax : " + userMngV.toString());
        Map<String, Object> map = new HashMap<String, Object>();
        userMngV.setChngUsrId( KSessionUtil.getAttribute( "loginId" ).toString() ); // 세션값에서 데이터를 가져오도록 수정

        if (c.equals( userMngV.getHidMode() )) {
            // 비밀번호
            ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);
            String hashPwd = encoder.encodePassword(userMngV.getUsrPw(), userMngV.getUsrId()); // PWD 암호화 SHA-256 + userId 로 Salt
            userMngV.setUsrPw( hashPwd );
            
            userMngS.addUserInfo(userMngV);
        } else if (u.equals( userMngV.getHidMode() )) {
            userMngS.updateUserInfo(userMngV);
        }
        
        map.put(Constants.RES_KEY_RESULT, Constants.RES_KEY_RESULT_SUCCESS );
       
        return map;
    }
    
    /**
     * Employee In Oracle
     */
    @RequestMapping(value = "updateUsrPwInfo.ajax", method = { RequestMethod.GET, RequestMethod.POST })
    @ResponseBody
    public Map updateUsrPwInfo(ModelMap model, @ModelAttribute("userMngV") UserMngV userMngV, HttpServletRequest request) throws Exception {
        LOG.debug("@@@ updateUsrPwInfo ajax : " + userMngV.toString());
        Map<String, Object> map = new HashMap<String, Object>();
        
        String pwdHst    = "";
        String newPwdHst = "";
        
        // 비밀번호
        ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);
        String hashPwd = encoder.encodePassword(userMngV.getUsrPw(), userMngV.getUsrId()); // PWD 암호화 SHA-256 + userId 로 Salt
        userMngV.setUsrPw( hashPwd );
        
        //TODO::2016-04-04 비밀번호 변경 시 자기 정보 사용금지 항목 체크 해야함.
        //      프로젝트의 사용자 테이블, 이메일, 영문 이름, 전화번호(뒷번호) 가 있을 경우,
        //      수정할 비밀번호와 패턴 체크를 해야한다. 
        //      해당 코드는 샘플이며, 개인정보에 따라서 loop 돌려 모두 체크해야 한다. 
        
//        if (StringUtil.contains( loginMngV.getUsrPw(), "자기 정보" )) {
//            map.put("success", false);
//            map.put("msg",     "자기 정보는 비밀번호로 사용하실 수 없습니다.");
//            
//            return map;
//        }

        // 현재 비밀번호 및 비밀번호 이력가져오기
        UserMngV nowUserMngV = userMngS.readUserInfo( userMngV.getUsrId() );     
        pwdHst = nowUserMngV.getPwdHst();        
         
        if (pwdHst == null || ("").equals( pwdHst )) {
            JSONObject jo = new JSONObject();
            newPwdHst = AuthUtil.shfitPasswdHistory(jo, hashPwd);
            userMngV.setPwdHst( newPwdHst );
              
            // 비밀번호 업데이트            
            userMngS.updateUsrPwInfo(userMngV);
            
            map.put(Constants.RES_KEY_RESULT, Constants.RES_KEY_RESULT_SUCCESS );
            
        } else {
            JSONObject parseJo = new JSONObject(pwdHst);

            // 비밀번호 이력과 비교
            if (AuthUtil.checkLatelyPasswd(parseJo, hashPwd)) {
                map.put(Constants.RES_KEY_RESULT, Constants.RES_KEY_RESULT_ERROR );
                map.put("msg", "최근 사용한 비밀번호는 사용할 수 없습니다.");
            } else {
                newPwdHst = AuthUtil.shfitPasswdHistory(parseJo, hashPwd);
                userMngV.setPwdHst( newPwdHst );
                
                // 비밀번호 업데이트            
                userMngS.updateUsrPwInfo(userMngV);                
                map.put(Constants.RES_KEY_RESULT, Constants.RES_KEY_RESULT_SUCCESS );
            }
        }
        
        return map;
    }
    
}
