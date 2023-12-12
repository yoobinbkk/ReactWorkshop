package com.base.react.utils;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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

	// 서비스에서 사용
	public String generateToken(SessionVO sessionVO) {

		Map<String, Object> claims = new HashMap<String, Object>();

		claims.put(Const.USER_CD, sessionVO.getUserCd());

		return this.generateToken(claims, sessionVO.getUserCd());
	}

	private String generateToken(Map<String, Object> claims, String subject) {
		return this.generateToken(claims, subject, Const.JWT_EXPIRATION, JWT_SECRET_KEY);
	}

	// 토큰생성
	private String generateToken(Map<String, Object> claims, String subject, long expiration, String jwtSecretKey) {

		claims = Objects.isNull(claims) ? new HashMap<String, Object>() : claims;

		return Jwts.builder()
					// 담길 정보
					.setClaims(claims)
					// 토큰용도
					.setSubject(subject)
					// 토큰발급시간
					.setIssuedAt(new Date(System.currentTimeMillis()))
					// 토큰만료시간
					.setExpiration(new Date(System.currentTimeMillis() + expiration))
					// 암호화알고리즘
					.signWith(SignatureAlgorithm.HS512, jwtSecretKey)
					// 토큰발급
					.compact()
		;
	}

	// 서비스에서 사용
	public Claims getClaimsFromToken(String jwtToken) {
		return this.getClaimsFromToken(jwtToken, JWT_SECRET_KEY);
	}

	// 토큰으로 claims 가져오기
	private Claims getClaimsFromToken(String jwtToken, String jwtSecretKey) {
		return Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(jwtToken).getBody();
	}


	public Boolean isExpiredToken(String jwtToken) {
		return this.getClaimsFromToken(jwtToken).getExpiration().before(new Date());
	}





//	public String doGenerateToken(String subject, Map<String, Object> claims, long jwtTokenValidity, String secret) {
//
//
//        return Jwts.builder()
//                    .setClaims(claims)
//                    .setSubject(subject)
//                    .setIssuedAt(new Date(System.currentTimeMillis()))
//                    .setExpiration(new Date(System.currentTimeMillis() + jwtTokenValidity * 1000))
//                    .signWith(SignatureAlgorithm.HS512, secret)
//                    .compact();
//    }
//
//
//	private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
//	    return Jwts
//	            .builder()
//	            .setClaims(extraClaims)
//	            .setSubject(userDetails.getUsername())
//	            .setIssuedAt(new Date(System.currentTimeMillis()))
//	            .setExpiration(new Date(System.currentTimeMillis() + expiration))
//	            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//	            .compact();
//	  }
}
