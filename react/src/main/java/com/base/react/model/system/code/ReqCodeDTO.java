package com.base.react.model.system.code;

import java.util.List;

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
public class ReqCodeDTO extends ParentPagingDTO{
	private String mstCd;
    private String mstCdNm;
	private String mstCdDesc;
	private String subCd;
	private String subCdNm;
	private String subCdDesc;
	private String useYn;
	private String delYn;
	private String langCd;
	private String keyword;
	private List<String> arrMstCd;
	private List<String> arrSubCd;
	private List<LangDTO> arrLangObj;
}
