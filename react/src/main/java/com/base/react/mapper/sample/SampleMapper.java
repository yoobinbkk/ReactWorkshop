package com.base.react.mapper.sample;

import java.util.List;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.common.ReqCommonSearchDTO;
import com.base.react.model.sample.IngreDTO;
import com.base.react.model.sample.ReqSampleDTO;
import com.base.react.model.sample.ResSampleDTO;

@DataBaseConnMapper
public interface SampleMapper {
	
	List<ResSampleDTO> getSampleList(ReqSampleDTO reqSampleDTO);
	
	int getIngreInfoListCount(ReqCommonSearchDTO reqCommSearchDTO);

	List<IngreDTO> getIngreInfoList(ReqCommonSearchDTO reqCommSearchDTO);
	
}