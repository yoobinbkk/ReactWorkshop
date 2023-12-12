package com.base.react.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.base.react.model.Const;
import com.base.react.utils.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter{

	@Value("${application.jwt.header-key}")
	private String JWT_HEADER_KEY;
	
	private final JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		
		
		String jwtToken = request.getHeader(JWT_HEADER_KEY);
		
		
		if (StringUtils.hasText(jwtToken)) {
			
			Claims claims = jwtUtil.getClaimsFromToken(jwtToken);
			
			try {
			
				// 토큰이 유효한지
				if (!jwtUtil.isExpiredToken(jwtToken)) {
					
					// 서버에 인증정보가 없으면 토큰정보를 가지고 인증정보 세팅
					if (Objects.isNull(SecurityContextHolder.getContext().getAuthentication())) {
						
						// TODO 권한세부설계 후 수정
						List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
						authList.add(new SimpleGrantedAuthority(Const.AUTH_READ));
						
						UsernamePasswordAuthenticationToken UPAToken = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authList);
						
						UPAToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
						SecurityContextHolder.getContext().setAuthentication(UPAToken);
						
					}
					
				}
			
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

			
		}
		
		
		
		
		
		
		
		filterChain.doFilter(request, response);
	}

}
