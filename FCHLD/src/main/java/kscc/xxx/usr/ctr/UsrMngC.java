
package kscc.xxx.usr.ctr;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import kscc.framework.excep.KFileUploadException;
import kscc.framework.file.FileDownloadUtil;
import kscc.framework.file.FileUploadUtil;
import kscc.framework.file.UploadFileInfoV;
import kscc.framework.layer.ctr.AbstractController;
import kscc.framework.token.CheckSavedToken;
import kscc.xxx.usr.svc.UsrMngS;
import kscc.xxx.usr.vo.UsrMngV;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;



@Controller
public class UsrMngC extends AbstractController{

    /** EgovSampleService */
    @Resource(name = "usrMngS")
    private UsrMngS usrMngS;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name ="egovIdGnrService")
    private EgovIdGnrService egovIdGnrService;

    @Resource(name ="fileUploadUtil")
    private FileUploadUtil fileUploadUtil;

    @Resource(name ="fileDownloadUtil")
    private FileDownloadUtil fileDownloadUtil;

    private static final Logger LOG = LoggerFactory.getLogger(UsrMngC.class);

    /**
     * 글 목록을 조회한다. (pageing)
     * @param searchV - 조회할 정보가 담긴 PagingVO
     * @param model
     * @return "egovSampleList"
     * @exception Exception
     */

    @RequestMapping(value = "/usr/readUserList.do", method = RequestMethod.GET)
    public String readUserList(ModelMap model) throws Exception {

        //String test = messageSource.getMessage( "dev.lbl.online.outTrLOGTp", new String[]{}, Locale.KOREA );
        // Message Test
        //System.out.println( "@@@ messageSource " + test);
        return "usr/readUsrList";
    }


    @RequestMapping(value = "/usr/readUserList.do", method = RequestMethod.POST)
    public String readUserList(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV) throws Exception {
        LOG.debug("@@@ input id "+ usrMngV.getId());

        PaginationInfo paginationInfo = setPaginationInfo(usrMngV);

        List resultList = usrMngS.readUserList(usrMngV);
        paginationInfo.setTotalRecordCount(usrMngS.readUserListCnt(usrMngV));

        model.addAttribute("resultList",resultList);
        model.addAttribute("paginationInfo",paginationInfo);

        return "usr/readUsrList";
    }

    @RequestMapping(value = "/usr/readUserListAsync.ajax")
    @ResponseBody
    public UsrMngV readUserList() throws Exception {

        UsrMngV resultUsrMngV = new UsrMngV();
        resultUsrMngV.setId("20150722");
        resultUsrMngV.setUserName("애봉이");
        resultUsrMngV.setPosition("작가");
        resultUsrMngV.setDeptName("마음의 소리");
        resultUsrMngV.setEmailAddr("chojuhn@gmail.com");

        return resultUsrMngV;
    }

    @RequestMapping(value = "/usr/readUserListMapAsync.ajax")
    @ResponseBody
    public HashMap readUserListMap() throws Exception {

        HashMap map = new HashMap();

        UsrMngV resultUsrMngV = new UsrMngV();
        resultUsrMngV.setId("20150722");
        resultUsrMngV.setUserName("애봉이");
        resultUsrMngV.setPosition("작가");
        resultUsrMngV.setDeptName("마음의 소리");
        resultUsrMngV.setEmailAddr("chojuhn@gmail.com");

        map.put("result",resultUsrMngV);

        return map;
    }

    @RequestMapping(value = "/usr/addUserList.do")
    public String addUserList(@ModelAttribute("mainForm") UsrMngV usrMngV, ModelMap model) throws Exception {

        return "usr/usrRgst";
    }

    @RequestMapping(value = "/usr/addUserList.ajax")
    @CheckSavedToken
    @ResponseBody
    public HashMap addUserList( @ModelAttribute("mainForm") @Valid UsrMngV usrMngV, BindingResult result, ModelMap model,
            HttpServletRequest req, HttpServletResponse res) throws Exception {

        LOG.debug( "@@@ CheckSavedToken TEST");

        HashMap map = new HashMap();

        if(result.hasErrors()){
            map.put("ksccResultType", "F");
            LOG.debug("Error Error Error");
            return map;
        }else{
            LOG.debug("not error error");
        }

        String id = egovIdGnrService.getNextStringId();
        usrMngV.setId(id);
        usrMngS.addUserList(usrMngV);
        map.put("ksccResultType", "S");
        return map;
    }

    /**
     * 글 목록을 조회한다. (pageing)
     * @param searchV - 조회할 정보가 담긴 PagingVO
     * @param model
     * @return "egovSampleList"
     * @exception Exception
     */

    @RequestMapping(value = "/usr/readUserExcel.do", method = RequestMethod.GET)
    public String readUserExcel(ModelMap model) throws Exception {
        return "usr/readUsrExcel";
    }

    @RequestMapping("/usr/readUserExcel.do")
    public ModelAndView readUserExcel(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV) throws Exception {
        LOG.debug("@@@ input id Excel"+ usrMngV.getId());

        PaginationInfo paginationInfo = setPaginationInfo(usrMngV);

        List resultList = usrMngS.readUserList(usrMngV);
        paginationInfo.setTotalRecordCount(usrMngS.readUserListCnt(usrMngV));

//        model.addAttribute("resultList",resultList);
//        model.addAttribute("paginationInfo",paginationInfo);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", resultList);
        LOG.debug("@@@ input id Excel 호출");
        return new ModelAndView("categoryExlView", "categoryMap", map);
    }

    @RequestMapping("/usr/readUserCsv.do")
    public ModelAndView readUserCsv(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV) throws Exception {
        LOG.debug("@@@ input id CSV "+ usrMngV.getId());

        PaginationInfo paginationInfo = setPaginationInfo(usrMngV);

        List resultList = usrMngS.readUserList(usrMngV);
        paginationInfo.setTotalRecordCount(usrMngS.readUserListCnt(usrMngV));

//        model.addAttribute("resultList",resultList);
//        model.addAttribute("paginationInfo",paginationInfo);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("category", resultList);
        LOG.debug("@@@ input id Excel 호출 " + propertiesService);
        return new ModelAndView("categoryCsvView", "categoryMap", map);
    }

    @RequestMapping(value = "/usr/uploadFile.do", method = RequestMethod.GET)
    public String uploadFile(ModelMap model) throws Exception {
        return "usr/uploadFile";
    }

    @RequestMapping(value = "/usr/uploadFile.do")
    public String uploadFile(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV, HttpServletRequest request) throws Exception {
        LOG.debug("@@@ input uploadFile");

//        PaginationInfo paginationInfo = setPaginationInfo(usrMngV);
//
//        List resultList = usrMngS.readUserList(usrMngV);
//        paginationInfo.setTotalRecordCount(usrMngS.readUserListCnt(usrMngV));
//
//        model.addAttribute("resultList",resultList);
//        model.addAttribute("paginationInfo",paginationInfo);

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
            }
        } catch ( KFileUploadException e ) {
            //TODO:: 업무에 맞게 LOG Handle 을 해줘야 한다.
            LOG.error( e.getMessage() );
        }

        return "usr/sampleExcelPopup";
    }

    @RequestMapping(value = "/usr/downloadFile.do", method = RequestMethod.GET)
    public String downloadFile(ModelMap model) throws Exception {
        return "usr/downloadFile";
    }

    @RequestMapping(value = "/usr/downloadFile.do")
    public void downloadFile(ModelMap model, @ModelAttribute("usrMngV") UsrMngV usrMngV,
                HttpServletRequest request, HttpServletResponse response) throws Exception {
        LOG.debug("@@@ input id downloadFile file response "+ response);

        String filePath = "C:\\Temp\\PV3 - 복사본.txt";

        try {
            fileDownloadUtil.downFile( filePath, "파일이름.txt", request, response );
        } catch ( KFileUploadException e ) {
            //TODO:: 업무에 맞게 LOG Handle 을 해줘야 한다.
            LOG.error( e.getMessage() );
        }
    }
}
