package com.base.react.model.sample;

import com.base.react.model.ParentDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class IngreDTO extends ParentDTO {

	private long ingreSeq;
	
	private String ingreCd;
	
	private String ingreNm;
	
	private String ingreNmEn;
	
	private String ingreNmCn;
	
	private String allergenYn;
	
	private String originCd;
	
	private String[] casNo;
	
	private String[] mixrePurpose;

}

