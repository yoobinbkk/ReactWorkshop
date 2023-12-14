package com.base.react.service.sign;

import java.util.Date;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.base.react.config.JwtRequestFilter;
import com.base.react.mapper.sign.SignMapper;
import com.base.react.model.Const;
import com.base.react.model.ResponseVO;
import com.base.react.model.SessionVO;
import com.base.react.model.sign.SignDTO;
import com.base.react.utils.CommonUtil;
import com.base.react.utils.JwtUtil;
import com.base.react.utils.SessionUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignService {

	private final SignMapper signMapper;

	private final SessionUtil sessionUtil;

	private final JwtUtil jwtUtil;

	@Value("${application.jwt.header-key}")
	private String JWT_HEADER_KEY;

	public ResponseVO signIn(SignDTO signDTO) {

		ResponseVO responseVO = new ResponseVO();

		SignDTO adminUserInfo = this.checkSignIn(signDTO);

		if (adminUserInfo.getIsSignIn()) {

			String userToken = jwtUtil.generateToken(
									SessionVO.builder()
										.userCd(adminUserInfo.getUserCd())
										.userNm(adminUserInfo.getUserNm())
										.ipAddress(CommonUtil.getClientIp())
										.build()
								);

			responseVO.setResSucc(
				SignDTO.builder()
					.userNm(adminUserInfo.getUserNm())
					.userToken(userToken)
					.build()
			);
		}
		else {
			responseVO.setResFail(null);
		}
		return responseVO;
	}

	public SignDTO checkSignIn(SignDTO signDTO) {

		if (!StringUtils.hasText(signDTO.getUserId())) {
			System.out.println("아이디가 비어있습니다.");
			return SignDTO.builder().isSignIn(false).build();
		}

		if (!StringUtils.hasText(signDTO.getUserPw())) {
			System.out.println("비밀번호가 비어있습니다.");
			return SignDTO.builder().isSignIn(false).build();
		}

		SignDTO adminUserInfo = signMapper.selectAdminUserInfo(signDTO);

		if (Objects.isNull(adminUserInfo)) {
			System.out.println("유저정보가 없습니다.");
			return SignDTO.builder().isSignIn(false).build();
		}

		if (!signDTO.getUserPw().equals(adminUserInfo.getUserPw())) {
			System.out.println("비밀번호가 틀립니다.");
			adminUserInfo.setIsSignIn(false);
			return adminUserInfo;
		}

		if (adminUserInfo.getUserPwExpDt().before(new Date())) {
			System.out.println("비밀번호 유효기간이 지났습니다.");
			adminUserInfo.setIsSignIn(false);
			return adminUserInfo;
		}

		adminUserInfo.setIsSignIn(true);

		return adminUserInfo;
	}

	public ResponseVO signOut() {

		ResponseVO responseVO = new ResponseVO();

		responseVO.setResSucc();


		return responseVO;
	}

	public ResponseVO tokenCheck(String accessToken) {

		ResponseVO responseVO = new ResponseVO();

		try {

			if (!StringUtils.hasText(accessToken)) {
				System.out.println("토큰이 없습니다.");
				responseVO.setResFail("토큰이 없습니다.");
				return responseVO;
			}

			if (!accessToken.startsWith(Const.JWT_PREFIX)) {
				System.out.println("유효한 토큰이 아닙니다.");
				responseVO.setResFail("유효한 토큰이 아닙니다.");
				return responseVO;
			}

			accessToken = jwtUtil.removePrefix(accessToken);

			Claims claims_temp = jwtUtil.getClaims(accessToken);

			if (claims_temp.getExpiration().before(new Date())) {
				System.out.println("토큰유효기간이 지났습니다.");
				responseVO.setResFail("토큰유효기간이 지났습니다.");
				return responseVO;
			}

			if (jwtUtil.isExpired(accessToken)) {
				System.out.println("토큰유효기간이 지났습니다.");
				responseVO.setResFail("토큰유효기간이 지났습니다.");
				return responseVO;
			}

			Claims claims = jwtUtil.getClaims(accessToken);

			if (!CommonUtil.getClientIp().equals(String.valueOf(claims.get(Const.IP_ADDRESS)))) {
				System.out.println("다른 기기에서 사용중입니다.");
				responseVO.setResFail("다른 기기에서 사용중입니다.");
				return responseVO;
			}

			String replaceToken = jwtUtil.generateToken(
										SessionVO.builder()
											.userCd(String.valueOf(claims.get(Const.USER_CD)))
											.userNm(String.valueOf(claims.get(Const.USER_NM)))
											.ipAddress(CommonUtil.getClientIp())
											.build()
									);

			responseVO.setResSucc(
				SignDTO.builder()
					.userNm(String.valueOf(claims.get(Const.USER_NM)))
					.userToken(replaceToken)
					.build()
			);
		}
		catch (IllegalArgumentException e) {
			log.info("Unable to get JWT Token");
		}
		catch (ExpiredJwtException e) {
			log.info("JWT Token has expired - {}", e.getMessage());
		}
		catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token - {}", e.getMessage());
		}
		catch (SignatureException | MalformedJwtException e) {
			log.info("Invalid JWT Token - {}", e.getMessage());
		}

		return responseVO;
	}
}
