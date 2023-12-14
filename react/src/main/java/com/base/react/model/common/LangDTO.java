package com.base.react.model.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LangDTO {

	private String langCd;

	private String langNm;
	
	private String langCdDesc;
}


