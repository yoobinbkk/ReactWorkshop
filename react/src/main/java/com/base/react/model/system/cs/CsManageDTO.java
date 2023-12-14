package com.base.react.model.system.cs;

import java.util.List;

import com.base.react.model.PagingDTO;
import com.base.react.model.ParentPagingDTO;
import com.base.react.model.common.LangDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CsManageDTO extends ParentPagingDTO {

	// 리스트
	private int rowNum; // 순번

	private String dateType; // 검색기간 유형

    private String startDt; // 시작날짜

	private String endDt; // 종료날짜

	private String level1; // 1차유형

	private String level2; // 2차유형

	private String level3; // 3차유형

	private String level1Nm; // 1차유형

	private String level2Nm; // 2차유형

	private String level3Nm; // 3차유형

	private String nationCd; // 이용국가

	private String useYn; // 사용상태

	private String keywordType; // 검색어 타입

	private String keyword; // 검색어

	private List<String> arrCateCd; // 카테고리

	private List<String> arrLevel1Cd; // level 1

	private List<String> arrLevel2Cd; // level 2

	private List<String> arrLevel3Cd; // level 3

	private List<String> arrUseYnCd; // 사용여부

	private List<LangDTO> arrLangCd; // 언어

	// 등록
	private String categoryCd; // 카테고리 CD

	private String uCategoryCd; // 부모카테고리 CD

	private String langCd; // 언어

	// 목록
	private PagingDTO page;
	
	private List<?> list;
}
