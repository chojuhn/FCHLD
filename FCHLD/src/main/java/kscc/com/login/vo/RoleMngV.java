package kscc.com.login.vo;

import kscc.framework.paging.vo.BasePagingV;

public class RoleMngV extends BasePagingV {
    /**
     * 
     */
    private static final long serialVersionUID = -1158191500692710103L;
    
    String authId;
    String authNm;
    String usrId;
    String mgrYn;
    String remarks;
    
    /**
     * @return the authId
     */
    public String getAuthId() {
        return authId;
    }
    
    /**
     * @param authId the authId to set
     */
    public void setAuthId( String authId ) {
        this.authId = authId;
    }
    
    /**
     * @return the authNm
     */
    public String getAuthNm() {
        return authNm;
    }
    
    /**
     * @param authNm the authNm to set
     */
    public void setAuthNm( String authNm ) {
        this.authNm = authNm;
    }
    
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
     * @return the mgrYn
     */
    public String getMgrYn() {
        return mgrYn;
    }
    
    /**
     * @param mgrYn the mgrYn to set
     */
    public void setMgrYn( String mgrYn ) {
        this.mgrYn = mgrYn;
    }
    
    /**
     * @return the remarks
     */
    public String getRemarks() {
        return remarks;
    }
    
    /**
     * @param remarks the remarks to set
     */
    public void setRemarks( String remarks ) {
        this.remarks = remarks;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "RoleMngV [authId=" + authId + ", authNm=" + authNm + ", usrId=" + usrId + ", mgrYn=" + mgrYn
                + ", remarks=" + remarks + "]";
    }
    
    
    
    
        
    
}
