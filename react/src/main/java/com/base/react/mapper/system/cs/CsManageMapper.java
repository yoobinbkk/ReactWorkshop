package com.base.react.mapper.system.cs;

import java.util.List;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.system.cs.CsManageDTO;

@DataBaseConnMapper
public interface CsManageMapper {
	
	int selectCsManageListCount(CsManageDTO csManageDTO);
	
	List<CsManageDTO> selectCsManageList(CsManageDTO csManageDTO);

}