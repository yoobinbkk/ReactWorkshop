package com.base.react.model;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public class Const {


	public static final String API_ROOT = "/api";
	public static final String API_SUFFIX = "/**";

	public static final String[] API_WHITE_LIST = {
			API_ROOT + "/sign",
			API_ROOT + "/common",
	};

	// 인증없이 호출 가능한 URL
	public static final String[] URL_WHITE_LIST = {
			API_ROOT + "/sign" + API_SUFFIX,
			API_ROOT + "/common" + API_SUFFIX,
	};

	// 권한관련
	private static final String AUTH_PREFIX = "AUTH_";

	public static final String AUTH_READ = AUTH_PREFIX + "READ";
	public static final String AUTH_CREATE = AUTH_PREFIX + "CREATE";
	public static final String AUTH_UPDATE = AUTH_PREFIX + "UPDATE";
	public static final String AUTH_DELETE = AUTH_PREFIX + "DELETE";


	// 1Hour
	public static final Long JWT_EXPIRATION = 1000 * 60 * 60L;
	public static final String JWT_SUBJECT = "LOGIN";


	public static final String JWT_PREFIX = "Bearer ";
	public static final Integer JWT_PREFIX_LENGTH = JWT_PREFIX.length();



	// token 관련
	public static final String USER_CD = "userCd";
	public static final String USER_NM = "userNm";
	public static final String IP_ADDRESS = "ipAddress";

	public static final String LANG_CD = "langCd";

}
