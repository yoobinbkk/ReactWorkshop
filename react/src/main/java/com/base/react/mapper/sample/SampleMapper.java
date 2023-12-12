package com.base.react.mapper.sample;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.sample.ReqSampleDTO;
import com.base.react.model.sample.ResSampleDTO;

@DataBaseConnMapper
public interface SampleMapper {
	
	List<ResSampleDTO> getSampleList(ReqSampleDTO reqSampleDTO);
	
}