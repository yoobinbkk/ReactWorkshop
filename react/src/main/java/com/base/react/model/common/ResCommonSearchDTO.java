package com.base.react.model.common;

import java.util.List;

import com.base.react.model.PagingDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResCommonSearchDTO {
	
	private PagingDTO page;
	
	private List<?> list;
	
}
