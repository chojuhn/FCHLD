package kscc.com.user.vo;

import kscc.framework.paging.vo.BaseGridPagingV;

public class UserMngV extends BaseGridPagingV {
   
    /**
     * 
     */
    private static final long serialVersionUID = -4479675626304686917L;
    
    String usrId;
    String usrNm;
    String usrPw;
    String regDt;
    String chngUsrId;
    String chngDt;
    int    lgnErrNcnt;
    String useYn;
    String dprtNm;
    String lstLgnDtm;
    String pwdHst;
    
    /**
     * @return the usrId
     */
    public String getUsrId() {
        return usrId;
    }
    
    /**
     * @param usrId the usrId to set
     */
    public void setUsrId( String usrId ) {
        this.usrId = usrId;
    }
    
    /**
     * @return the usrNm
     */
    public String getUsrNm() {
        return usrNm;
    }
    
    /**
     * @param usrNm the usrNm to set
     */
    public void setUsrNm( String usrNm ) {
        this.usrNm = usrNm;
    }
    
    /**
     * @return the usrPw
     */
    public String getUsrPw() {
        return usrPw;
    }
    
    /**
     * @param usrPw the usrPw to set
     */
    public void setUsrPw( String usrPw ) {
        this.usrPw = usrPw;
    }
    
    /**
     * @return the regDt
     */
    public String getRegDt() {
        return regDt;
    }
    
    /**
     * @param regDt the regDt to set
     */
    public void setRegDt( String regDt ) {
        this.regDt = regDt;
    }
    
    /**
     * @return the chngUsrId
     */
    public String getChngUsrId() {
        return chngUsrId;
    }
    
    /**
     * @param chngUsrId the chngUsrId to set
     */
    public void setChngUsrId( String chngUsrId ) {
        this.chngUsrId = chngUsrId;
    }
    
    /**
     * @return the chngDt
     */
    public String getChngDt() {
        return chngDt;
    }
    
    /**
     * @param chngDt the chngDt to set
     */
    public void setChngDt( String chngDt ) {
        this.chngDt = chngDt;
    }
    
    /**
     * @return the lgnErrNcnt
     */
    public int getLgnErrNcnt() {
        return lgnErrNcnt;
    }
    
    /**
     * @param lgnErrNcnt the lgnErrNcnt to set
     */
    public void setLgnErrNcnt( int lgnErrNcnt ) {
        this.lgnErrNcnt = lgnErrNcnt;
    }
    
    /**
     * @return the useYn
     */
    public String getUseYn() {
        return useYn;
    }
    
    /**
     * @param useYn the useYn to set
     */
    public void setUseYn( String useYn ) {
        this.useYn = useYn;
    }
    
    /**
     * @return the dprtNm
     */
    public String getDprtNm() {
        return dprtNm;
    }
    
    /**
     * @param dprtNm the dprtNm to set
     */
    public void setDprtNm( String dprtNm ) {
        this.dprtNm = dprtNm;
    }
    
    /**
     * @return the lstLgnDtm
     */
    public String getLstLgnDtm() {
        return lstLgnDtm;
    }
    
    /**
     * @param lstLgnDtm the lstLgnDtm to set
     */
    public void setLstLgnDtm( String lstLgnDtm ) {
        this.lstLgnDtm = lstLgnDtm;
    }
    
    /**
     * @return the pwdHst
     */
    public String getPwdHst() {
        return pwdHst;
    }
    
    /**
     * @param pwdHst the pwdHst to set
     */
    public void setPwdHst( String pwdHst ) {
        this.pwdHst = pwdHst;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "AdminMngV [usrId=" + usrId + ", usrNm=" + usrNm + ", usrPw=" + usrPw + ", regDt=" + regDt
                + ", chngUsrId=" + chngUsrId + ", chngDt=" + chngDt + ", lgnErrNcnt=" + lgnErrNcnt + ", useYn=" + useYn
                + ", dprtNm=" + dprtNm + ", lstLgnDtm=" + lstLgnDtm + ", pwdHst=" + pwdHst + "]";
    }
    
}
