package kscc.com.api.ctr;

import kscc.com.api.response.CommonResV;
import kscc.com.user.vo.UsrMngApiV;
import kscc.com.validation.util.ValidationUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/fchld")
public class UsrMngApiC {
	private static final Logger LOG = LoggerFactory.getLogger(UsrMngApiC.class);
	
	@RequestMapping(value="/usr/{name}/{phoneNumber}/{deptName}", method = RequestMethod.GET)
	public ResponseEntity<CommonResV> readUsrInfo (@PathVariable String name, @PathVariable String phoneNumber, @PathVariable String deptName) throws Exception{
		
		UsrMngApiV usrMngApiV = new UsrMngApiV(name, phoneNumber, deptName);
		if(!ValidationUtil.isValidated(usrMngApiV)){
			return ValidationUtil.validateError();
		}
		CommonResV resultCommonResV = new CommonResV("true", null, usrMngApiV);
		LOG.debug("Do Something in FCHLD");
		return new ResponseEntity<CommonResV>(resultCommonResV, HttpStatus.OK);
	}
}
