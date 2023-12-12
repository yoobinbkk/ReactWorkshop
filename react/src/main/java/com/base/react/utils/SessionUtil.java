package com.base.react.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.base.react.model.Const;

import io.jsonwebtoken.Claims;

@Component
public class SessionUtil {

	@Value("${application.jwt.header-key}")
	private String jwtHeaderKey;

	@Autowired
	private JwtUtil jwtUtil;

	public String getUserCd() {
		return String.valueOf(this.getClaims().get(Const.USER_CD));
	}

	private Claims getClaims() {
		return jwtUtil.getClaimsFromToken(CommonUtil.getRequest().getHeader(jwtHeaderKey));
	}

}
