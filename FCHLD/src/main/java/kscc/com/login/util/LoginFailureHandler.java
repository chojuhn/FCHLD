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

import kscc.com.login.svc.LoginMngS;
import kscc.com.login.vo.LoginMngV;

import org.springframework.context.MessageSource;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginFailureHandler implements AuthenticationFailureHandler{

    @Resource(name="loginMngS")
    private LoginMngS loginMngS;
    
    @Resource(name="messageSource")
    MessageSource messageSource;
    
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
     
        ObjectMapper         om = new ObjectMapper();
        Map<String, Object> map = new HashMap<String, Object>();
        
        int lgnErrNcnt = 0;
        LoginMngV managerMngV = null;
        String jsonString = null;
        OutputStream out = response.getOutputStream();

        try {
            // 관리자 정보 조회
            managerMngV = loginMngS.readUserInfo( request.getParameter( "usrId" ) );

            // 관리자 정보가 있는 경우
            if(managerMngV != null) {
                
                // 사용자 정보는 있는데 비밀번호가 틀릴 경우 
                loginMngS.updateLgnErrNcnt(request.getParameter( "usrId" ));
                lgnErrNcnt = loginMngS.readLgnErrNcnt(request.getParameter( "usrId" ));
                
                // 비밀번호 연속으로 5회 이상 틀리면 계정 사용 정지
                if (lgnErrNcnt >= 5) {
                    map.put("success", false);
                    map.put("msg",     messageSource.getMessage("login.5.incorrect" , null , Locale.getDefault() ));
                    map.put("param",   null);
                } else {
                    Object[] parameter = { lgnErrNcnt };
                    
                    map.put("success", false);
                    map.put("msg",     null);
                    map.put("param",   "notLogin");
                    map.put("errCnt",  messageSource.getMessage("login.wrong.password" , parameter , Locale.getDefault() ));
                }            
            } else { 
                // 관리자 정보가 없는 경우
                map.put("success", false);
                map.put("msg",     messageSource.getMessage("login.no.info" , null , Locale.getDefault() ));
                map.put("param",   null);
            }

        } catch ( Exception e ) {
            map.put("success", false);
            map.put("msg",     messageSource.getMessage("login.fail" , null , Locale.getDefault() ));
            map.put("param",   null);
        }

        jsonString = om.writeValueAsString(map);        
        out.write(jsonString.getBytes());
    }
}
