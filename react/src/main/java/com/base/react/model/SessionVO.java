package com.base.react.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class SessionVO {

	private String userCd;
	private String userNm;
	private String ipAddress;

	private String userId;

	private String jwtToken;
}
