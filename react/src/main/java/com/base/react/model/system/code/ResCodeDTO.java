package com.base.react.model.system.code;

import java.util.Date;
import java.util.List;

import com.base.react.model.common.LangDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResCodeDTO {
	private int rowNum;
	private String mstCd;
    private String mstCdNm;
	private String mstCdDesc;
	private String subCd;
    private String subCdNm;
	private String subCdDesc;
	private String useYn;
	private String langCd;
	private String regUserCd;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date regDt;
	private String updUserCd;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date updDt;
	private int subCodeCnt;
	private List<LangDTO> arrLangObj;
}
