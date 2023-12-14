package com.base.react.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry
			// url 매핑
			.addMapping("/**")
			// 이 서버로 호출하는 resource 허용범위
			.allowedOrigins("*")
			// 허용하는 http method
			.allowedMethods(
					HttpMethod.GET.name(),
					HttpMethod.POST.name(),
					HttpMethod.PUT.name(),
					HttpMethod.DELETE.name()
			)
			// 허용하는 header
			.allowedHeaders("*")
			// 세션정보(쿠키 등) 허용여부, 허용하려면 allowedOrigins에서 특정 호스트 필요
			.allowCredentials(false)
			// response에 포함될 헤더
			.exposedHeaders("authorization")
			// preflight 요청에대한 캐싱시간(초)
			.maxAge(3600);

	}

}
