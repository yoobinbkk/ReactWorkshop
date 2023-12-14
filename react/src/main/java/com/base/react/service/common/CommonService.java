package com.base.react.service.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.base.react.mapper.common.CommonMapper;
import com.base.react.model.ResponseVO;
import com.base.react.model.common.MenuDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonService {

	private final CommonMapper commonMapper;

	public ResponseVO selectMenuList_temp() {
		ResponseVO responseVO = new ResponseVO();
		responseVO.setResSucc(commonMapper.selectMenuList_temp());

		return responseVO;
	}

	public ResponseVO selectMenuList() {
		ResponseVO responseVO = new ResponseVO();

		List<MenuDTO> tempList = commonMapper.selectMenuList();

		Map<String, List<MenuDTO>> routerMap = !Objects.isNull(tempList)
												? routerMap = tempList.stream().collect(Collectors.groupingBy(MenuDTO::getUmenuCd))
												: new HashMap<>();

		List<MenuDTO> menuList = tempList.stream().filter(vo -> vo.getMenuDepth() == 1).collect(Collectors.toList());
		menuList.forEach(vo -> vo.setSubMenuList(routerMap.get(vo.getMenuCd())));

		responseVO.setResSucc(menuList);

		return responseVO;
	}

	public ResponseVO selectPageList() {
		ResponseVO responseVO = new ResponseVO();
		responseVO.setResSucc(commonMapper.selectPageList());
		return responseVO;
	}
}
