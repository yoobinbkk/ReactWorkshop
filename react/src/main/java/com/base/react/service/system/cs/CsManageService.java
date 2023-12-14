package com.base.react.service.system.cs;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.base.react.mapper.system.cs.CsManageMapper;
import com.base.react.model.PagingDTO;
import com.base.react.model.ResponseVO;
import com.base.react.model.system.cs.CsManageDTO;
import com.base.react.utils.CommonUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CsManageService {

	private final CsManageMapper csManageMapper;

	/*
	 * 문의유형관리 카운트
	 */
	public int selectCsManageListCount(CsManageDTO csManageDTO) {
		return csManageMapper.selectCsManageListCount(csManageDTO);
	}

	/*
	 * 문의유형관리 리스트
	 */
	public ResponseVO selectCsManageList(CsManageDTO csManageDTO) {
		ResponseVO responseVO = new ResponseVO();
		int totalCnt = this.selectCsManageListCount(csManageDTO);
		List<CsManageDTO> list = new ArrayList<>();
		PagingDTO page = new PagingDTO();

		CommonUtil.setPaging(csManageDTO, totalCnt);

		if (totalCnt > 0)  {
			list = csManageMapper.selectCsManageList(csManageDTO);
		}

		responseVO.setResSucc(
				CsManageDTO.builder()
					.list(list)
					.page(page)
					.build()
			);

		return responseVO;
	}
}
