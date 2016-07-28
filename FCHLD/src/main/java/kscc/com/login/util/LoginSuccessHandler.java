package kscc.com.login.util;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kscc.com.login.svc.LoginMngS;
import kscc.com.login.vo.LoginMngV;
import kscc.framework.util.DateUtil;

import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 로그인 성공시 호출되는 Handler 이다.<br>
 *
 * 로그인이 성공하면, 최근 비밀번호 변경일로부터 현재까지 90일이 
 * 초과되었는지 검사하고, 세션정보에 특정 정보를 입력하는 역할을 한다. 
 */
public class LoginSuccessHandler implements AuthenticationSuccessHandler{

    @Resource(name="loginMngS")
    private LoginMngS loginMngS;
    
    @Resource(name="messageSource")
    MessageSource messageSource;
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        HttpSession session = request.getSession(true);
        
        Map<String, Object> map = new HashMap<String, Object>();        
        ObjectMapper om         = new ObjectMapper();        
        
        LoginMngV loginMngV = null;
        String pwdModDtm    = null;
        String jsonString   = null; // json 결과값 
        OutputStream opst   = response.getOutputStream(); // outputStream
        int lgnErrNcnt      = 0; // 로그인 에러 카운트 
        
        try {
            loginMngV  = loginMngS.readUserInfo( authentication.getName() );
            lgnErrNcnt = loginMngS.readLgnErrNcnt( authentication.getName() );
            pwdModDtm  = loginMngV.getChngDt();           
            
            if (lgnErrNcnt >= 5) {
                // 로그인 정보가 맞더라도 5회이상 비밀번호를 틀린 경우, 관리자가 풀어주지 않는 한 로그인을 할 수 없다.
                map.put("success", false);
                map.put("msg",     messageSource.getMessage("login.5.incorrect" , null , Locale.getDefault() ));
                map.put("param",   null);
            } else if( pwdModDtm != null && !("").equals( pwdModDtm ) 
                && DateUtil.getDateGap( DateUtil.getCurrDate(), loginMngV.getChngDt()) > 90 ) {
                // 비밀번호 변경 주기(90일) 경과시 비밀번호 변경 화면                
                map.put("success", false);
                map.put("msg",     null);
                map.put("param",   "pwRenew"); // 비밀번호 갱싱
                map.put("usrId",   authentication.getName()); // Spring Security SecurityContextHolder 의 내용

                session.invalidate();   // 세션 만료                

                loginMngS.updateLstLgnDtm( loginMngV );
            } else {
                // 성공한 Map 구성
                map.put("success",      true);
                map.put("returnUrl",    "/com/index.do");
                
                // 로그인 성공 후 세션값 생성 
                session.setAttribute("loginId", loginMngV.getUsrId());
                session.setAttribute("loginNm", loginMngV.getUsrNm());
                session.setAttribute("dprtNm",  loginMngV.getDprtNm());

                loginMngS.updateLstLgnDtm( loginMngV );
            }

            loginMngV.setUsrId( authentication.getName() );

        } catch ( Exception e ) {
            map.put("success",      false);
            map.put("msg",          messageSource.getMessage("login.fail" , null , Locale.getDefault() ));
            map.put("param",        null);
            map.put("returnUrl",    "/com/logout.do");
        }
        
        jsonString = om.writeValueAsString(map);
        opst.write(jsonString.getBytes());
    }
}
