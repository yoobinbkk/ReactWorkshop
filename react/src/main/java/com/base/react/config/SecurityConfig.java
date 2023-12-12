package com.base.react.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.base.react.model.Const;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // 웹 보안설정추가
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	
	private final JwtRequestFilter jwtRequestFilter;
	
	// webSecurity 설정
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/webjars/**");
    }
	
	// httpSecurity 설정
	@Bean
    protected SecurityFilterChain webSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity
			.httpBasic(AbstractHttpConfigurer::disable) // 기본설정 비활성
			
			.formLogin(AbstractHttpConfigurer::disable) // signin, signout 설정으로 제어 :: 비활성
			
			.csrf(AbstractHttpConfigurer::disable) // jwt토큰 사용시 비활성
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // jwt토큰 사용으로 인해 세션정보 미생성
			
			.authorizeHttpRequests(request ->
				request
					.requestMatchers(HttpMethod.OPTIONS).permitAll() // preflight요청 허용
					.requestMatchers(Const.WHITE_LIST_URL).permitAll() // 허용된 URL만 모두 허용
//					.requestMatchers(HttpMethod.GET, "/api/small/**").hasAnyAuthority(ConfigConst.AUTH_READ)
//					.requestMatchers(HttpMethod.POST, "/api/small/**").hasAnyAuthority(ConfigConst.AUTH_CREATE)
//					.requestMatchers(HttpMethod.PUT, "/api/small/**").hasAnyAuthority(ConfigConst.AUTH_UPDATE)
//					.requestMatchers(HttpMethod.DELETE, "/api/small/**").hasAnyAuthority(ConfigConst.AUTH_DELETE)
//					.requestMatchers(ConfigConst.API_ROOT + "/**").authenticated() // /api/ 하위 모든URL 인증필요
					.requestMatchers(Const.API_ROOT + "/**").permitAll() // /api/ 하위 모든URL 허용
					.anyRequest().permitAll() // 그 외 url 접근허용
			)
			
			// UPAfilter 전에 커스텀 filter 수행 
			.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
			
			.exceptionHandling(exceptHandler -> 
				exceptHandler
					.authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증실패 401
					.accessDeniedHandler(jwtAccessDeniedHandler) // 권한없음 403
			)
		;

        return httpSecurity.build();
    }

}
