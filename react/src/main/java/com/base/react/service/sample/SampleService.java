package com.base.react.service.sample;

import java.util.List;

import org.springframework.stereotype.Service;

import com.base.react.mapper.sample.SampleMapper;
import com.base.react.model.PagingDTO;
import com.base.react.model.ResponseVO;
import com.base.react.model.common.ReqCommonSearchDTO;
import com.base.react.model.common.ResCommonSearchDTO;
import com.base.react.model.sample.IngreDTO;
import com.base.react.model.sample.ReqSampleDTO;
import com.base.react.model.sample.ResSampleDTO;
import com.base.react.utils.CommonUtil;
import com.base.react.utils.ConvertUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SampleService {
	
	private final SampleMapper sampleMapper;
	
	public List<ResSampleDTO> getSampleList(ReqSampleDTO reqSampleDTO) {
		return sampleMapper.getSampleList(reqSampleDTO);	
	}

	public ResponseVO getIngreInfoList(ReqCommonSearchDTO reqCommonSearchDTO) {
		int totalCnt = sampleMapper.getIngreInfoListCount(reqCommonSearchDTO);
		List<IngreDTO> list = null;
		PagingDTO page = null;
		
		CommonUtil.setPaging(reqCommonSearchDTO, totalCnt);
		if (totalCnt > 0) {
			list = sampleMapper.getIngreInfoList(reqCommonSearchDTO);
		}
		
		page = ConvertUtil.convert(reqCommonSearchDTO, PagingDTO.class);
		
		ResponseVO responseVO = new ResponseVO();
		responseVO.setResSucc(ResCommonSearchDTO.builder()
									.list(list)
									.page(page)
									.build());
		return responseVO;
	}

}
