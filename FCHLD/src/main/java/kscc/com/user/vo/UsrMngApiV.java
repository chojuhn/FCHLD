package kscc.com.user.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UsrMngApiV {
	
	@NotNull
	@Size(min=3,max=20)
	private String name;

	@NotNull
	@Size(min=10,max=13)
	private String phoneNumber;

	@NotNull
	@Size(min=1,max=20)
	private String deptName;
	
	public UsrMngApiV(){
		
	}

	public UsrMngApiV(String name, String phoneNumber, String deptName) {
		super();
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.deptName = deptName;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	
}
