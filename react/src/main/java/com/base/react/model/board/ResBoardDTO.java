package com.base.react.model.board;

import java.util.Date;

import com.base.react.model.sample.IngreDTO;

import lombok.Data;

@Data
public class ResBoardDTO {

	private String userCd;
	private String userId;
	private String userNm;
	private String userPw;
	private Date userPwExpDt;
	private String userToken;
	private Date userTokenExpDt;
	private String delYn;
	private String regUserCd;
	private Date regDt;
	private String updUserCd;
	private Date updDt;
}
