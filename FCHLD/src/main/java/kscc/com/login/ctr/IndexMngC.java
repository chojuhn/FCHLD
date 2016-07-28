package kscc.com.login.ctr;

import javax.servlet.http.HttpServletRequest;

import kscc.com.login.svc.LoginMngS;
import kscc.framework.layer.ctr.AbstractController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexMngC extends AbstractController {

    @Autowired
    LoginMngS loginMngS;

    /**
     * 로그인
     */
    @RequestMapping(value = "index.do", method = RequestMethod.GET)
    public String index(ModelMap model, HttpServletRequest request) throws Exception {
    
        return "index";
    }

}
