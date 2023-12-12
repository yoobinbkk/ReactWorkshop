package com.base.react.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class SessionVO {

	private String userCd;
	private String userId;
	private String userNm;

	private String jwtToken;
}
