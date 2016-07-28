package kscc.xxx.usr.ctr;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kscc.framework.excel.util.ExcelReader;
import kscc.framework.excel.view.CategoryCsvView;
import kscc.framework.excel.view.CategoryExcelView;
import kscc.framework.excep.KFileUploadException;
import kscc.framework.file.FileDownloadUtil;
import kscc.framework.file.FileUploadUtil;
import kscc.framework.file.UploadFileInfoV;
import kscc.framework.layer.ctr.AbstractController;
//import kscc.framework.service.cache.CacheService;
//import kscc.framework.service.cache.CacheUtil;
import kscc.framework.service.mail.KMail;
import kscc.framework.service.mail.vo.SndngMailV;
import kscc.framework.util.PageUtil;
import kscc.xxx.usr.svc.SampleMngS;
import kscc.xxx.usr.vo.EmployeeGridV;
import kscc.xxx.usr.vo.EmployeeV;
import kscc.xxx.usr.vo.UsrMngV;
import net.sf.ehcache.CacheManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.io.ByteStreams;

import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;


@Controller
@RequestMapping(value = "/sample")
public class SampleMngC extends AbstractController {

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name ="fileUploadUtil")
    private FileUploadUtil fileUploadUtil;

    @Resource(name ="fileDownloadUtil")
    private FileDownloadUtil fileDownloadUtil;

    @Resource(name ="excelReader")
    private ExcelReader excelReader;

    @Autowired
    SampleMngS sampleMngS;
    
//    @Autowired
//    CacheService cacheService;

    private static final Logger LOG = LoggerFactory.getLogger(SampleMngC.class);

    /**
     * 달력 화면 샘픔
     */
    @RequestMapping(value = "sampleCalendar.do", method = RequestMethod.GET)
    public String sampleCalendar(ModelMap model) throws Exception {
        return "sample/sampleCalendar";
    }

    /**
     * 파일업로드 / 다운로드 화면 샘플
     */
    @RequestMapping(value = "sampleFile.do", method = RequestMethod.GET)
    public String sampleFile(ModelMap model) throws Exception {
        return "sample/sampleFile";
    }

    @RequestMapping(value = "sampleFileUpload.do")
    public String sampleFileUpload(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV, HttpServletRequest request) throws Exception {

        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();

        MultipartFile multipartFile = null;

        while(iterator.hasNext()){
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            if(!multipartFile.isEmpty()){
                LOG.debug("------------- file start -------------");
                LOG.debug("name : " + multipartFile.getName());
                LOG.debug("filename : " + multipartFile.getOriginalFilename());
                LOG.debug("size : " + multipartFile.getSize());
                LOG.debug("확장자 : " + multipartFile.getContentType());
                LOG.debug("-------------- file end --------------\n");
            }
        }

        try {
            List<UploadFileInfoV> fileIntoList = fileUploadUtil.validatUpload(multipartHttpServletRequest, "default.fileupload");
            if (fileIntoList == null) {
                LOG.error( "파일 업로드에 실패하였습니다." );
                //TODO:: 업무별 에러처리 영역
            } else {
                LOG.debug( "파일 업로드에 성공하였습니다." );
                model.addAttribute("mode", "SUCCESS");
                model.addAttribute("msg", "파일 업로드가 완료되었습니다.");

                for ( int i = 0, limit = fileIntoList.size(); i < limit; i++ ) {

                    LOG.debug( "파일 저장 위치 : " +  fileIntoList.get( i ).getFilePath());
                }
            }
        } catch ( KFileUploadException e ) {
            //TODO:: 업무에 맞게 Log Handle 을 해줘야 한다.
            LOG.error( e.getMessage() );
        }

        return "sample/sampleFile";
    }
    
    @RequestMapping(value = "sampleFileUpload2.do")
    public String sampleFileUpload2(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV, HttpServletRequest request) throws Exception {
    	LOG.debug("@@@ file Upload2");
    	
    	FileInputStream reader = new FileInputStream("D:/Temp/TEST/file/b.LOG");
		byte[] result = ByteStreams.toByteArray(reader);
		reader.close();
		
		try {
			UploadFileInfoV  uploadFileInfoV = fileUploadUtil.validatUpload("파일 이름.txt", result, "default.fileupload");
			
			LOG.debug("------------- file start -------------");
            LOG.debug("name : " + uploadFileInfoV.getFileName());
            LOG.debug("filename : " + uploadFileInfoV.getFilePath());
            LOG.debug("size : " + uploadFileInfoV.getFileSize());
            LOG.debug("확장자 : " + uploadFileInfoV.getFileExt());
            LOG.debug("-------------- file end --------------\n");
            
            
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		
        
        return "sample/sampleFile";
    }

    @RequestMapping(value = "sampleFileDownload.do")
    public void sampleFileDownload(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV,
                HttpServletRequest request, HttpServletResponse response) throws Exception {
        LOG.debug( "@@@ input id sampleFileDownload file response " + response );
        LOG.debug( "@@@ request " + request.getParameter( "fileId" ) );

        /*********************************************************************************
         * 파일 다운로드 가이드
         * 1) 파일 주소를 직접 전달하지 않는다.
         * 2) 파일ID 를 통해서 FILE_INFO 테이블을 통해서 파일의 실제 저장된 주소를 조회한다.
         * 2) 조회한 주소를 바탕으로 파일을 다운로드 받는다.
         ********************************************************************************/

        // fileId 를 이용해서, FILE_INFO 테이블에서 실제 파일의 주소를 가져와서 파일 다운로드를 시작한다.

        String filePath = "C:\\Temp\\PV3 - 복사본.txt";

        // 파일이름.txt 는 실제 다운로드가 될때 생성되는 파일의 이름을 적으면 된다.
        try {
            fileDownloadUtil.downFile( filePath, "파일이름.txt", request, response );
        } catch ( KFileUploadException e ) {
            //TODO:: 업무에 맞게 Log Handle 을 해줘야 한다.
            LOG.error( e.getMessage() );
        }
    }

    /**
     * 엑셀업로드 / 다운로드 화면 샘플
     */
    @RequestMapping(value = "sampleExcel.do", method = RequestMethod.GET)
    public String sampleExcel(ModelMap model) throws Exception {
        return "sample/sampleExcel";
    }

    @RequestMapping(value = "sampleExcelPopup.do", method = RequestMethod.GET)
    public String sampleExcelPop(ModelMap model) throws Exception {
        return "sample/sampleExcelPopup";
    }

    @RequestMapping(value = "sampleExcelPopup.do", method = RequestMethod.POST)
    public String sampleExcelPopP(ModelMap model) throws Exception {
        return "sample/sampleExcelPopup";
    }

    @RequestMapping(value = "sampleExcelUploadPopup.do")
    public String sampleExcelUpload(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV, HttpServletRequest request) throws Exception {

        /*********************************************************************************
         * 파일 업로드 가이드
         * 1) 파일을 직접 저장하지 않는다. 파일 Util을 사용하며, FILE_INFO 테이블에 정보를 저장한다.
         * 2) 파일 저장시에는 property 에 선언한 파일 Polcy 에 맞게 Validation 체크를 한다.
         * 3) 파일 확장자, 파일 사이즈 등을 체크한다.
         * 4) 파일을 저장한다. 전달된 파일 저장 정보를 파일 테이블에 저장
         * 5) 업무는 파일 ID 를 갖는다.
         * 6) 엑셀 업로드도 파일 업로드와 동일하게 파일을 업로드를 하고, 실제 위치를 전달받아서
         *    데이터 파싱을 시작한다. 데이터 파싱은 POI 를 사용하면 된다.
         ********************************************************************************/

        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
        MultipartFile multipartFile = null;
        while(iterator.hasNext()){
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            if(!multipartFile.isEmpty()){
                LOG.debug("------------- file start -------------");
                LOG.debug("name : " + multipartFile.getName());
                LOG.debug("filename : " + multipartFile.getOriginalFilename());
                LOG.debug("size : " + multipartFile.getSize());
                LOG.debug("확장자 : " + multipartFile.getContentType());
                LOG.debug("-------------- file end --------------\n");
            }
        }

        try {
            List<UploadFileInfoV> fileIntoList = fileUploadUtil.validatUpload(multipartHttpServletRequest, "default.fileupload");
            if (fileIntoList == null) {
                LOG.error( "엑셀 업로드에 실패하였습니다." );
                //TODO:: 업무별 에러처리 영역
            } else {
                LOG.debug( "엑셀 업로드에 성공하였습니다." );
                model.addAttribute("mode", "SUCCESS");
                model.addAttribute("msg", "엑셀 업로드가 완료되었습니다.");

                // 엑셀 파일을 읽는다.
                LOG.debug( "파일 저장 위치 : " +  fileIntoList.get( 0 ).getFilePath());
                String fileSavedPath = fileIntoList.get( 0 ).getFilePath();

                // 실제 주소를 바탕으로 엑셀 파일을 LIST 형태로 전달 받는다.
                List excelSheetList = excelReader.getObject( fileSavedPath );

                for ( int i = 0; i < excelSheetList.size(); i++ ) {
                    // sheetList 를 통해서 엑셀의 Row 데이터를 전달 받는다.
                    List rowList = (List) excelSheetList.get( i );
                    LOG.debug( "rowList size : " +  rowList.size());
                    for ( int j = 0; j < rowList.size(); j++ ) {
                        // Cell 값을 받는다.
                        List cellList = (List) rowList.get( j );
                        for ( int k = 0; k < cellList.size(); k++ ) {
                            LOG.debug( "cell : " +  cellList.get( k ));
                        }
                    }
                }
            }
        } catch ( KFileUploadException e ) {
            //TODO:: 업무에 맞게 Log Handle 을 해줘야 한다.
            LOG.error( e.getMessage() );
        }

        return "sample/sampleExcelPopup";
    }

    @RequestMapping("sampleExcelDownload.do")
    public ModelAndView sampleExcelDownload(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV) throws Exception {
        List resultList = sampleMngS.readEmpList2(usrMngV);

        // CategoryExcelView<EmployeeV>(엑셀을 만들 데이터, "파일명") 을 넣어주고, 호출하면 다운로드가 시작된다.
        return new ModelAndView(new CategoryExcelView<EmployeeV>(resultList, "한글파일"));
    }

    /**
     * CSV 업로드 / 다운로드 화면 샘플
     */
    @RequestMapping(value = "sampleCsv.do", method = RequestMethod.GET)
    public String sampleCsv(ModelMap model) throws Exception {
        return "sample/sampleCsv";
    }

    @RequestMapping(value = "sampleCsvPopup.do", method = RequestMethod.POST)
    public String sampleCsvPopup(ModelMap model) throws Exception {
        return "sample/sampleCsvPopup";
    }

    @RequestMapping(value = "sampleCsvUploadPopup.do")
    public String sampleCsvUpload(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV, HttpServletRequest request) throws Exception {

        /*********************************************************************************
         * 파일 업로드 가이드
         * 1) 파일을 직접 저장하지 않는다. 파일 Util을 사용하며, FILE_INFO 테이블에 정보를 저장한다.
         * 2) 파일 저장시에는 property 에 선언한 파일 Polcy 에 맞게 Validation 체크를 한다.
         * 3) 파일 확장자, 파일 사이즈 등을 체크한다.
         * 4) 파일을 저장한다. 전달된 파일 저장 정보를 파일 테이블에 저장
         * 5) 업무는 파일 ID 를 갖는다.
         * 6) CSV 업로드도 파일 업로드와 동일하게 파일을 업로드를 하고, 실제 위치를 전달받아서
         *    데이터 파싱을 시작한다. 데이터 파싱은 POI 를 사용하면 된다.
         ********************************************************************************/

        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
        MultipartFile multipartFile = null;
        while(iterator.hasNext()){
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            if(!multipartFile.isEmpty()){
                LOG.debug("------------- file start -------------");
                LOG.debug("name : " + multipartFile.getName());
                LOG.debug("filename : " + multipartFile.getOriginalFilename());
                LOG.debug("size : " + multipartFile.getSize());
                LOG.debug("확장자 : " + multipartFile.getContentType());
                LOG.debug("-------------- file end --------------\n");
            }
        }

        try {
            List<UploadFileInfoV> fileIntoList = fileUploadUtil.validatUpload(multipartHttpServletRequest, "default.fileupload");
            if (fileIntoList == null) {
                LOG.error( "CSV 업로드에 실패하였습니다." );
                //TODO:: 업무별 에러처리 영역
            } else {
                LOG.debug( "CSV 업로드에 성공하였습니다." );
                model.addAttribute("mode", "SUCCESS");
                model.addAttribute("msg", "CSV 업로드가 완료되었습니다.");

                // 엑셀 파일을 읽는다.
                LOG.debug( "파일 저장 위치 : " +  fileIntoList.get( 0 ).getFilePath());
                String fileSavedPath = fileIntoList.get( 0 ).getFilePath();

                // 실제 주소를 바탕으로 엑셀 파일을 LIST 형태로 전달 받는다.
                List excelSheetList = excelReader.getObject( fileSavedPath );

                for ( int i = 0; i < excelSheetList.size(); i++ ) {
                    // sheetList 를 통해서 엑셀의 Row 데이터를 전달 받는다.
                    List rowList = (List) excelSheetList.get( i );
                    LOG.debug( "rowList size : " +  rowList.size());
                    for ( int j = 0; j < rowList.size(); j++ ) {
                        // Cell 값을 받는다.
                        List cellList = (List) rowList.get( j );
                        for ( int k = 0; k < cellList.size(); k++ ) {
                            LOG.debug( "cell : " +  cellList.get( k ));
                        }
                    }
                }
            }
        } catch ( KFileUploadException e ) {
            //TODO:: 업무에 맞게 Log Handle 을 해줘야 한다.
            LOG.error( e.getMessage() );
        }

        return "sample/sampleCsvPopup";
    }

    @RequestMapping("sampleCsvDownload.do")
    public ModelAndView sampleCsvDownload(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV) throws Exception {

        List resultList = sampleMngS.readEmpList2(usrMngV);

        // CategoryCsvView<EmployeeV>(CSV 만들 데이터, "파일명") 을 넣어주고, 호출하면 다운로드가 시작된다.
        return new ModelAndView(new CategoryCsvView<EmployeeV>(resultList, "한글파일"));
    }
    
    /**
     * Email Send
     */
    @RequestMapping(value = "sampleEmail.do", method = RequestMethod.GET)
    public String sampleEmail(ModelMap model) throws Exception {
        return "sample/sampleEmail";
    }
    
    /**
     * Chart
     */
    @RequestMapping(value = "sampleChart.do", method = RequestMethod.GET)
    public String sampleChart(ModelMap model) throws Exception {
        return "sample/sampleChart";
    }
    
    /**
     * Employee In Oracle
     */
    @RequestMapping(value = "sampleEmployee.do", method = RequestMethod.GET)
    public String sampleEmployee(ModelMap model) throws Exception {
        return "sample/sampleEmployee";
    }
    
    @RequestMapping(value = "sampleEmployee.do", method = RequestMethod.POST)
    public String sampleEmployee(ModelMap model, @ModelAttribute("employeeV") EmployeeV employeeV) throws Exception {
        LOG.debug("@@@ sampleEmployee "+ employeeV.getName());

        PaginationInfo paginationInfo = setPaginationInfo(employeeV);

        List resultList = sampleMngS.readEmpList(employeeV);
        paginationInfo.setTotalRecordCount(sampleMngS.readListCnt(employeeV));

        model.addAttribute("resultList",resultList);
        model.addAttribute("paginationInfo",paginationInfo);

        return "sample/sampleEmployee";
    }
    
    /**
     * JS TREE
     */
    @RequestMapping(value = "sampleTree.do", method = RequestMethod.GET)
    public String sampleTree(ModelMap model) throws Exception {
        return "sample/sampleTree";
    }
    

    /**
     * ehcache
     */
    @RequestMapping(value = "sampleUsrInCache.do", method = RequestMethod.GET)
    public String sampleUsrInCache(ModelMap model) throws Exception {
        return "sample/sampleUsrInCache";
    }
    
//    @RequestMapping(value = "sampleUsrInCache.do", method = RequestMethod.POST)
//    public String sampleUsrInCache(ModelMap model, @ModelAttribute("employeeV") EmployeeV employeeV) throws Exception {
//        LOG.debug("@@@ sampleUsrInCache "+ employeeV.getNum());
//
//        PaginationInfo paginationInfo = setPaginationInfo(employeeV);
//
//        List resultList = sampleMngS.readEmpList2(employeeV);
//        paginationInfo.setTotalRecordCount(sampleMngS.readList2Cnt(employeeV));
//
//        model.addAttribute("resultList",resultList);
//        model.addAttribute("paginationInfo",paginationInfo);
//        
//        //Cache cache = ehcache.getCacheManager()("sampleCache1");
//        
//        // cache Name을 가지고 cache 찾기
//        
//        Ehcache ehcache = cacheManager.getCache("sampleCache1");          
//        ehcache.put(new Element("key1", "value1"));
//        Element value = ehcache.get("key1");
//        
//        System.out.println("cache : " + value);
//        
//        
//        System.out.println("@@@ cache1 " + ehcache.getName());
//        System.out.println("@@@ cache1 " + ehcache.getSize());
//        System.out.println("@@@ cache1 " + value);
//        
//        Ehcache ehcache2 = cacheManager.getCache("employeeList");     
//      
////        System.out.println("@@@ cache2 " + ehcache2.getName());
////        System.out.println("@@@ cache2 " + ehcache2.getSize());
////        System.out.println("@@@ cache2 " + ehcache2.getKeys());
////        
////        readInt();
////        Ehcache ehcache3 = cacheManager.getCache("employeeList");    
//        
//        
////        System.out.println("@@@ cache3 " + ehcache3.getName());
////        System.out.println("@@@ cache3 " + ehcache3.getSize());
////        System.out.println("@@@ cache3 " + ehcache3.getKeys());
////        
////        System.out.println("@@@ check cache");
//        
//        
//        System.out.println("@@@ cache service");
//        
//        List resultList2 = (List<EmployeeV>)cacheService.getCache( sampleMngS, "readEmpList2", "employeeList", 300, employeeV );
//        
//        
//        System.out.println("@@@ cache service2 "+ resultList2);
//        
//        List resultList3 = (List<EmployeeV>)cacheService.getCache( "employeeList", employeeV );
//        System.out.println("@@@ cache service3 "+ resultList3);
//        
//        CacheUtil.checkCaches();
//        
//        return "sample/sampleUsrInCache";
//    }
    
    /**
     * Draggable
     */
    @RequestMapping(value = "sampleDrag.do", method = RequestMethod.GET)
    public String sampleDrag(ModelMap model) throws Exception {
        return "sample/sampleDrag";
    }
    
    
    /**
     * Employee In Oracle
     */
    @RequestMapping(value = "sampleEmployeeJqgrid.do", method = RequestMethod.GET)
    public String sampleEmployeeJqgrid(ModelMap model) throws Exception {
        LOG.debug("@@@ sampleEmployeeJqgrid");
        return "sample/sampleEmployeeJqgrid";
    }
     
     /**
      * Employee In Oracle
      */
     @RequestMapping(value = "sampleEmployeeJqgrid.ajax", method = { RequestMethod.GET, RequestMethod.POST })
     @ResponseBody
     public Map sampleEmployeeJqgrid(ModelMap model, @ModelAttribute("employeeGridV") EmployeeGridV employeeGridV, HttpServletRequest request) throws Exception {
         LOG.debug("@@@ sampleEmployeeJqgrid ajax");
         Map<String, Object> map = new HashMap<String, Object>();
         
         List resultList = sampleMngS.readEmpPage(employeeGridV);
         
         PageUtil.setPageInfo( map, employeeGridV, resultList,  sampleMngS.readEmpListCnt( employeeGridV ) );
         
         LOG.debug("@@@ resultList " + resultList);
        
         return map;
     }
     
     /**
      * Employee In Oracle
      */
     @RequestMapping(value = "sampleEmployeeJqgridExcel.ajax", method = { RequestMethod.GET, RequestMethod.POST })
     @ResponseBody
     public ModelAndView sampleEmployeeJqgridExcel(ModelMap model, @ModelAttribute("employeeV") EmployeeGridV employeeV, HttpServletRequest request) throws Exception {
         LOG.debug("@@@ sampleEmployeeJqgrid ajax");
         Map<String, Object> map = new HashMap<String, Object>();

         List resultList = sampleMngS.readEmpPage( employeeV );

         LOG.debug("@@@ 총 데이터 건수 " +  resultList.size() );
         LOG.debug("@@@ 총 데이터 건수 " +  sampleMngS.readEmpListCnt( employeeV ));
         PageUtil.setPageInfo( map, employeeV, resultList,  sampleMngS.readEmpListCnt( employeeV ) );
         
         LOG.debug("@@@ resultList " + resultList);

         return new ModelAndView(new CategoryExcelView<EmployeeV>(resultList, "한글파일"));
     }
     
     
    
    
    
}
