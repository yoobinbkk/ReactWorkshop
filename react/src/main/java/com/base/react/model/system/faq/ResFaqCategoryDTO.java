package com.base.react.model.system.faq;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class ResFaqCategoryDTO {
	private String categoryCd;		// 카테고리 코드
	private String uCategoryCd;		// 상위 카테고리 코드
	private String categoryNm;		// 카테고리 명
	private String langCd;			// 언어
	private String nationCd;		// 국가
	private String depth;			// 뎁스
	private String path;			// 경로
	private String useYn;			// 사용여부
	private String delYn;			// 삭제여부
	private String regUserCd;		// 등록자
	@DateTimeFormat(pattern = "yyyy.MM.dd HH:mm:ss")
	private Date regDt;				// 등록일자
	private String updUserCd;		// 수정자
	@DateTimeFormat(pattern = "yyyy.MM.dd HH:mm:ss")
	private Date updDt;				// 수정일자
}
