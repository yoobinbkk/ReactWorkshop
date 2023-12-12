package com.base.react.model;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ResponseVO {
	
	private int httpStatus;
	
	private String resCode;
	
	private String resMessage;
	
	private Object resData;
	
	public void setResSucc(Object data) {
		this.httpStatus = HttpStatus.OK.value();
		this.resCode = "RS001";
		this.resMessage = "정상 처리 되었습니다.";
		this.resData = data;
	}
	
	public void setResFail(String resMessage) {
		this.httpStatus = HttpStatus.OK.value();
		this.resCode = "RS002";
		this.resMessage = resMessage;
//		this.resData = new Object();
		
	}
	
	public void setResError() {
		this.httpStatus = HttpStatus.OK.value();
		this.resCode = "RS003";
		this.resMessage = "서버오류 발생했습니다.";
		this.resData = new Object();
	}
	
	

}
