package com.base.react.service.sample;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.base.react.mapper.sample.SampleMapper;
import com.base.react.model.sample.ReqSampleDTO;
import com.base.react.model.sample.ResSampleDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SampleService {
	
	private final SampleMapper sampleMapper;
	
	public List<ResSampleDTO> getSampleList(ReqSampleDTO reqSampleDTO) {
		return sampleMapper.getSampleList(reqSampleDTO);	
	}

}
