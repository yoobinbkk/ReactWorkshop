package com.base.react.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;

public class CommonUtil {



 	public static HttpServletRequest getRequest() {
 		ServletRequestAttributes reqAttribute = null;
 		try {
 			reqAttribute = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
		} catch (Exception e) {
			return null;
		}
		return reqAttribute.getRequest();
 	}

}
