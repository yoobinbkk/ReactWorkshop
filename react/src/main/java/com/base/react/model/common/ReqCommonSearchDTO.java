package com.base.react.model.common;

import com.base.react.model.ParentPagingDTO;

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
public class ReqCommonSearchDTO extends ParentPagingDTO {
	private String keyword;
}
