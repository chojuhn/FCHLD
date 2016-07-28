package kscc.xxx.usr.vo;

import kscc.framework.excel.ExcelColumn;
import kscc.framework.excel.ExcelTable;
import kscc.framework.paging.vo.BasePagingV;

@ExcelTable(fileName = "사용자출력")
public class EmployeeV extends BasePagingV {
    @ExcelColumn(headerName = "번호", columnWidth = 20)
    private String num;
    @ExcelColumn(headerName = "이름", columnWidth = 30)
    private String name;
    @ExcelColumn(headerName = "생일", columnWidth = 30)
    private String birthdate;
    @ExcelColumn(headerName = "성", columnWidth = 10)
    private String sex;
    @ExcelColumn(headerName = "전화번호", columnWidth = 50)
    private String telephone;
    @ExcelColumn(headerName = "주소", columnWidth = 50)
    private String address;
    @ExcelColumn(headerName = "우편번호", columnWidth = 30)
    private String postal;   
 

    public String getNum() {
        return num;
    }

    public void setNum( String num ) {
        this.num = num;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate( String birthdate ) {
        this.birthdate = birthdate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex( String sex ) {
        this.sex = sex;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone( String telephone ) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress( String address ) {
        this.address = address;
    }

    public String getPostal() {
        return postal;
    }

    public void setPostal( String postal ) {
        this.postal = postal;
    }

    @Override
    public String toString() {
        return "EmployeeV [num=" + num + ", name=" + name + ", birthdate=" + birthdate + ", sex=" + sex + ", telephone="
                + telephone + ", address=" + address + ", postal=" + postal + "]";
    }
}
