package kscc.com.login.ctr;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kscc.com.login.svc.LoginMngS;
import kscc.com.login.vo.LoginMngV;
import kscc.framework.contants.Constants;
import kscc.framework.layer.ctr.AbstractController;
import kscc.framework.util.AuthUtil;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class LoginMngC extends AbstractController {

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name ="messageSource")
    private MessageSource messageSource;

    @Autowired
    LoginMngS loginMngS;

    /**
     * 로그인
     */
    @RequestMapping(value = "login.do", method = RequestMethod.GET)
    public String login(ModelMap model, HttpServletRequest request) throws Exception {
        
        HttpSession session = request.getSession(true);
        if(session.getAttribute(Constants.SESSION) != null) {
            session.removeAttribute(Constants.SESSION);
            session.invalidate();
        }
        
        return "com/login/login";
    }
    
    /**
     * 비밀번호 변경 주기(90일) 경과 시 비밀번호 변경
     */
    @RequestMapping(value = "updateUsrPw.ajax", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUsrPw(@ModelAttribute("loginMngV") LoginMngV loginMngV, HttpServletRequest request) throws Exception {

        Map<String, Object> map = new HashMap<String, Object>();
        
        String pwdHst    = "";
        String newPwdHst = "";
        
        // PWD 암호화 SHA-256 + userId 로 Salt
        ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);
        String hashPwd = encoder.encodePassword(loginMngV.getUsrPw(), loginMngV.getUsrId());
        
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
        
        loginMngV.setUsrPw(hashPwd);        

        // 현재 비밀번호 및 비밀번호 이력가져오기
        LoginMngV nowLoginMngV = loginMngS.readUserInfo( loginMngV.getUsrId() );
        
        pwdHst = nowLoginMngV.getPwdHst();
        
        if (pwdHst == null || ("").equals( pwdHst )) {
            JSONObject jo = new JSONObject();
            newPwdHst = AuthUtil.shfitPasswdHistory(jo, hashPwd);
            loginMngV.setPwdHst( newPwdHst );            
                        
            // 비밀번호 업데이트            
            loginMngS.updateUsrPw(loginMngV);
            
            map.put("success",   true);
            map.put("msg",       messageSource.getMessage("user.password.modified" , null , Locale.getDefault() ));
            map.put("returnUrl", "/com/logout.do");    
        } else {
            JSONObject parseJo = new JSONObject(nowLoginMngV.getPwdHst());
            
            // 비밀번호 이력과 비교
            if (AuthUtil.checkLatelyPasswd(parseJo, hashPwd)) {
                map.put("success", false);
                map.put("msg",     messageSource.getMessage("user.lately.password.notallowed" , null , Locale.getDefault() ));
            } else {
                newPwdHst = AuthUtil.shfitPasswdHistory(parseJo, hashPwd);
                loginMngV.setPwdHst( newPwdHst );
                
                // 비밀번호 업데이트            
                loginMngS.updateUsrPw(loginMngV);
                
                map.put("success",   true);
                map.put("msg",       messageSource.getMessage("user.password.modified" , null , Locale.getDefault() ));
                map.put("returnUrl", "/com/logout.do");    
            }
        }

        return map;
    }

    /**
     * 로그인 성공 후 초기화면 설정 부분
     */
    @PreAuthorize("authenticated")
    @RequestMapping(value = "index.do", method = RequestMethod.GET)
    public String index(ModelMap model, HttpServletRequest request) throws Exception {

        String redirectUrl = "index";
        
        //TODO:: 프로젝트에 맞게 초기화면 및 권한에 따른 메뉴 구성 
        
        return redirectUrl;
    }
    




     
    
    
    
}
