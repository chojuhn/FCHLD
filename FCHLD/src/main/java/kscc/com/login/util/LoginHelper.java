package kscc.com.login.util;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import kscc.com.login.svc.LoginMngS;
import kscc.com.login.vo.LoginMngV;
import kscc.com.login.vo.RoleMngV;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class LoginHelper implements UserDetailsService {

    @Resource(name="loginMngS")
    private LoginMngS loginMngS;

    @Override
    // UserDetailService 구현체
    public UserDetails loadUserByUsername(String usrId) throws UsernameNotFoundException {
        LoginMngV loginMngV = new LoginMngV();
        
        List<RoleMngV> roleMngVList  = null;
        List<GrantedAuthority> roles = null;
        UserDetails userDetails      = null;

        try{
            // DAO를 통해 쿼리를 날리고 결과를 받아오는 것.
            loginMngV    = loginMngS.readUserInfo(usrId);
            roleMngVList = loginMngS.readUserAuthList(usrId);

            // 권한설정 (ROLE_ 시작하는 롤명이어야 Spring Security 에서 적용된다. )
            roles = new ArrayList<GrantedAuthority>();

            for(int inx=0; inx<roleMngVList.size(); inx++) {
                roles.add( new SimpleGrantedAuthority( roleMngVList.get(inx).getAuthId() ) );
            }

            userDetails = new User(loginMngV.getUsrId(), loginMngV.getUsrPw(), roles);

            return userDetails;
        }catch(Exception e){
            StringBuilder logMsg = new StringBuilder();
            logMsg.append( "Username(" );
            logMsg.append( usrId );
            logMsg.append( ") access exception!" );
            
            throw new UsernameNotFoundException(logMsg.toString(), e);
        }
    }
}
