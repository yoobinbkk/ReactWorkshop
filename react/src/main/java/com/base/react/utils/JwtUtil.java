package com.base.react.utils;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.base.react.model.Const;
import com.base.react.model.SessionVO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil implements Serializable {

	private static final long serialVersionUID = -8136646537826000867L;

	@Value("${application.jwt.secret-key}")
	private String JWT_SECRET_KEY;

	@Value("${application.jwt.header-key}")
	private String JWT_HEADER_KEY;

	// 서비스에서 사용
	public String generateToken(SessionVO sessionVO) {

		Map<String, Object> claims = new HashMap<String, Object>();

		claims.put(Const.USER_CD, sessionVO.getUserCd());
		claims.put(Const.USER_NM, sessionVO.getUserNm());
		claims.put(Const.IP_ADDRESS, sessionVO.getIpAddress());

		return this.generateToken(claims, JWT_SECRET_KEY);
	}

	// 토큰생성
	private String generateToken(Map<String, Object> claims, String jwtSecretKey) {

		claims = Objects.isNull(claims) ? new HashMap<String, Object>() : claims;

		return Jwts.builder()
					// 담길 정보
					.setClaims(claims)
					// 토큰용도
					.setSubject(UUID.randomUUID().toString().replaceAll("-", ""))
					// 토큰발급시간
					.setIssuedAt(new Date(System.currentTimeMillis()))
					// 토큰만료시간
					.setExpiration(new Date(System.currentTimeMillis() + Const.JWT_EXPIRATION))
					// 암호화알고리즘
					.signWith(SignatureAlgorithm.HS512, jwtSecretKey)
					// 토큰발급
					.compact()
		;
	}

	public Claims getClaims(String jwt) {
		return this.getClaimsFromJwt(jwt, JWT_SECRET_KEY);
	}

	public Claims getClaims() {
		return this.getClaimsFromJwt(this.getHeaderJwt(), JWT_SECRET_KEY);
	}

	public String removePrefix(String jwt) {
		return jwt.substring(Const.JWT_PREFIX_LENGTH);
	}

	public Boolean isExpired(String jwt) {
		return this.getClaims(jwt).getExpiration().before(new Date());
	}

	private Claims getClaimsFromJwt(String jwt, String jwtSecretKey) {
		return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(jwt).getBody();
	}

	private String getHeaderJwt() {
		return CommonUtil.getRequest().getHeader(JWT_HEADER_KEY);
	}
}
