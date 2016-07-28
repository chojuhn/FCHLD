package kscc.com.validation.util;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;

import kscc.com.api.response.CommonErrV;
import kscc.com.api.response.CommonResV;
import kscc.com.code.Constants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ValidationUtil {
	private static final Logger LOG = LoggerFactory.getLogger(ValidationUtil.class);
	public static boolean isValidated(Object obj) throws Exception{
		Set<ConstraintViolation<Object>> constraintViolations = Validation.buildDefaultValidatorFactory().getValidator().validate(obj);
		if(constraintViolations.size() != 0){
			LOG.debug(constraintViolations.toString());
			return false;
		}else
			return true;
	}
	
	public static ResponseEntity<CommonResV> validateError() throws Exception{
		CommonErrV errV = new CommonErrV(Constants.CODE_ERROR_VALIDATE, Constants.VALUE_ERROR_VALIDATE);
		CommonResV resultCommonResV = new CommonResV("false",errV,null);
		return new ResponseEntity<CommonResV>(resultCommonResV, HttpStatus.OK);
	}
}
