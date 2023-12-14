package com.base.react.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.base.react.model.Const;

import io.jsonwebtoken.Claims;

@Component
public class SessionUtil {

	@Value("${application.jwt.header-key}")
	private String JWT_HEADER_KEY;

	@Autowired
	private JwtUtil jwtUtil;

	public String getUserCd() {
		return String.valueOf(this.getClaims().get(Const.USER_CD));
	}

	public String getUserNm() {
		return String.valueOf(this.getClaims().get(Const.USER_NM));
	}

	public String getIpAddress() {
		return String.valueOf(this.getClaims().get(Const.IP_ADDRESS));
	}

	private Claims getClaims() {
		return jwtUtil.getClaims();
	}

}
