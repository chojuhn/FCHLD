package kscc.xxx.usr.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import kscc.framework.paging.vo.BasePagingV;
import kscc.framework.validation.xss.CheckXssCharacters;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;


public class UsrMngV extends BasePagingV {

	private static final long serialVersionUID = 1L;

	/** 아이디 */
	private String id;

	@NotNull
	@NotEmpty (message="{NotEmpty.mainForm.userName}")
	@CheckXssCharacters
	private String userName;

	@NotNull
	@Size(min=2,max=20)
	@CheckXssCharacters
	private String deptName;

	@NotNull
	@Size(min=2,max=10)
	@CheckXssCharacters
	private String position;

	@NotNull
	@Email
	@Size(min=2,max=40)
	@CheckXssCharacters
	private String emailAddr;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getEmailAddr() {
		return emailAddr;
	}

	public void setEmailAddr(String emailAddr) {
		this.emailAddr = emailAddr;
	}

}
