package com.base.react.model;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ResponseVO {

	private int httpStatus;

	private String code;

	private String message;

	private Object data;

	public void setResSucc() {
		this.httpStatus = HttpStatus.OK.value();
		this.code = "RS001";
		this.message = "정상 처리 되었습니다.";
		this.data = null;
	}

	public void setResSucc(Object data) {
		this.httpStatus = HttpStatus.OK.value();
		this.code = "RS001";
		this.message = "정상 처리 되었습니다.";
		this.data = data;
	}

	public void setResFail(String message) {
		this.httpStatus = HttpStatus.OK.value();
		this.code = "RS002";
		this.message = message;
//		this.data = new Object();

	}

	public void setResError() {
		this.httpStatus = HttpStatus.OK.value();
		this.code = "RS003";
		this.message = "서버오류 발생했습니다.";
		this.data = new Object();
	}



}
