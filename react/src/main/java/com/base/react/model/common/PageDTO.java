package com.base.react.model.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageDTO {

	private String pageCd;

	private String pagePath;

	private String urlPath;

	private String sysYn;

}


