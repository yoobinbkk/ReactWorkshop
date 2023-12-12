package com.base.react.model;

public class Const {


	public static final String API_ROOT = "/api";

	// 인증없이 접근 가능한 페이지
	public static final String[] WHITE_LIST_URL = {
		"/api/sign/**",
    };


	// 권한관련
	private static final String AUTH_PREFIX = "AUTH_";

	public static final String AUTH_READ = AUTH_PREFIX + "READ";
	public static final String AUTH_CREATE = AUTH_PREFIX + "CREATE";
	public static final String AUTH_UPDATE = AUTH_PREFIX + "UPDATE";
	public static final String AUTH_DELETE = AUTH_PREFIX + "DELETE";


	// 1DAY
	public static final long JWT_EXPIRATION = 1000 * 60 * 60 * 24;
	public static final String JWT_SUBJECT = "LOGIN";





	// token 관련
	public static final String USER_CD = "userCd";


}
