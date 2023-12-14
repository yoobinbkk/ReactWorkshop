package com.base.react.mapper.common;

import java.util.List;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.common.MenuDTO;
import com.base.react.model.common.PageDTO;

@DataBaseConnMapper
public interface CommonMapper {

	List<MenuDTO> selectMenuList_temp();
	List<MenuDTO> selectMenuList();
	List<PageDTO> selectPageList();

}
