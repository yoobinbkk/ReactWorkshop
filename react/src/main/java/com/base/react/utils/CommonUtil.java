package com.base.react.utils;

import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.base.react.model.ParentPagingDTO;

import jakarta.servlet.http.HttpServletRequest;

public class CommonUtil {

	public static void setPaging(ParentPagingDTO dto, int totalCnt) {
		int pageBlock = 10;
		int skipCnt = 0;

		dto.setTotalCnt(totalCnt);

		if (dto.getPageSize() == 0) {
			dto.setPageSize(10);
		}

		if (totalCnt == 0) {
			dto.setTotalPageCnt(0);
			dto.setNowPageNo(1);
			dto.setLimit(dto.getPageSize());
			dto.setOffset(0);
			return;
		}

		int totalPageCnt = dto.getTotalCnt() / dto.getPageSize();

		if (dto.getTotalCnt() % dto.getPageSize() > 0) {
			totalPageCnt++;
		}

		dto.setTotalPageCnt(totalPageCnt);

		if (dto.getNowPageNo() > totalPageCnt) {
			dto.setNowPageNo(totalPageCnt);
		}

		if (dto.getNowPageNo() > 1) {
			skipCnt = (dto.getNowPageNo() - 1) * dto.getPageSize();
		}

		dto.setLimit(dto.getPageSize());
		dto.setOffset((dto.getNowPageNo() - 1) * dto.getPageSize());

		dto.setCurBlock(((dto.getNowPageNo() - 1) / pageBlock) + 1);
		dto.setStartPage((dto.getCurBlock() - 1) * pageBlock + 1);
		dto.setEndPage(dto.getStartPage() + pageBlock - 1);
		dto.setStartRownum(skipCnt + 1);
		dto.setEndRownum(skipCnt + dto.getPageSize());

		if (dto.getEndPage() > dto.getTotalPageCnt()) {
			dto.setEndPage(dto.getTotalPageCnt());
		}
	}

 	public static HttpServletRequest getRequest() {
 		ServletRequestAttributes reqAttribute = null;
 		try {
 			reqAttribute = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
		}
 		catch (Exception e) {
			return null;
		}
		return reqAttribute.getRequest();
 	}

 	/**
     * <pre>
     * Client IP 가져오기
     * </pre>
     * @param codeKey
     * @return
     */
    public static String getClientIp() {


        HttpServletRequest request = CommonUtil.getRequest();

        String ip = request.getHeader("X-Forwarded-For");

        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-RealIP");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (!StringUtils.hasText(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

		return StringUtils.hasText(ip) ? ip : "";
	}

 	public static Boolean equalsY(String str) {

		if (StringUtils.hasText(str)) {
			return false;
		}

		return "Y".equals(str) ? true : false;
	}

	public static Boolean equalsN(String str) {

		if (StringUtils.hasText(str)) {
			return false;
		}

		return "N".equals(str) ? true : false;
	}



}
