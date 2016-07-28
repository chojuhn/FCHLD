package kscc.xxx.usr.svc;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kscc.framework.mapper.CommonMapper;
import kscc.xxx.usr.vo.EmployeeGridV;
import kscc.xxx.usr.vo.EmployeeV;
import kscc.xxx.usr.vo.UsrMngV;

import org.springframework.stereotype.Service;


@Service("sampleMngS")
public class SampleMngS {

    @Resource(name = "commonMapper")
    private CommonMapper commonMapper;

    public List<EmployeeV> readEmpList2(UsrMngV usrMngV) {
        return (List)commonMapper.executeQuery("usr.usrMng.readEmployeeList", usrMngV);
    }

    public EmployeeV readEmpList(UsrMngV usrMngV) {
        return (EmployeeV)commonMapper.executeQuery("usr.usrMng.readEmployee", usrMngV);
    }
    
    public List<EmployeeV> readEmpList(EmployeeV employeeV) {
        return (List)commonMapper.executeQuery("sample.sampleMng.readEmployeeList", employeeV);
    }
    
    public List<EmployeeV> readEmpList(Map condition) {
        return (List)commonMapper.executeQuery("sample.sampleMng.readEmployeeList", condition);
    }
    
    public int readEmpListCnt(EmployeeGridV employeeV) {
        return (Integer)commonMapper.executeQuery("sample.sampleMng.readEmployeeListCnt", employeeV);
    }
    
    public List<EmployeeV> readEmpPage(EmployeeGridV employeeV) {
        return (List)commonMapper.executeQueryForPage("sample.sampleMng.readEmployeeList", employeeV, employeeV.getPage() - 1, employeeV.getRows());
    }
    
    public List<EmployeeV> readEmpList2(EmployeeV employeeV) {
        return (List)commonMapper.executeQuery("sample.sampleMng.readEmployee2List", employeeV);
    }
    
    public int readListCnt(EmployeeV employeeV) {
        return (Integer)commonMapper.executeQuery("sample.sampleMng.readListCnt", employeeV);
    }
    
    public int readList2Cnt(EmployeeV employeeV) {
        return (Integer)commonMapper.executeQuery("sample.sampleMng.readList2Cnt", employeeV);
    }
    
}
