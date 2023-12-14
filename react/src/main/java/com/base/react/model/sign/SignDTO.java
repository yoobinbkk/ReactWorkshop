package com.base.react.model.sign;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignDTO {

	private String userCd;
	private String userId;
	private String userNm;
	private String userPw;
	private Date userPwExpDt;
	private String userToken;
	private String delYn;
	private String regUserCd;
	private Date regDt;
	private String updUserCd;
	private Date updDt;

	private Boolean isSignIn;
}
