package com.base.react.model.common;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuDTO {

	private String menuCd;

	private String umenuCd;

	private String apiUrl;
	
	private String sysYn;

	private String defaultPageCd;

	private String defaultPageYn;

	private Integer menuDepth;

	private String naviPath;

	private String menuNm;

	private String pagePath;

	private String urlPath;

	private List<MenuDTO> subMenuList;

	private String layoutNm;
}


