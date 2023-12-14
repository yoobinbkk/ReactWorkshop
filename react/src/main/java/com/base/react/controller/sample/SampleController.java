package com.base.react.controller.sample;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.react.model.ResponseVO;
import com.base.react.model.common.ReqCommonSearchDTO;
import com.base.react.model.sample.ReqSampleDTO;
import com.base.react.model.sample.ResSampleDTO;
import com.base.react.service.sample.SampleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sample")
@Slf4j
public class SampleController {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final SampleService sampleService;

	@GetMapping("/getSampleList")
	public ResponseEntity<ResponseVO> getSampleList() {

		ResponseVO responseVO = new ResponseVO();

		try {
			ReqSampleDTO reqSampleDTO = new ReqSampleDTO();

			reqSampleDTO.setCamelTestMsg("DTO TEST");

			List<ResSampleDTO> sampleList = sampleService.getSampleList(reqSampleDTO);

			System.out.println(":: getSampleList" + "  " + sampleList.size());

			responseVO.setResSucc(sampleList);

		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
	
	@GetMapping("/getIngreInfoList")
	public ResponseEntity<ResponseVO> getIngreInfoList(ReqCommonSearchDTO reqCommonSearchDTO) {
		return ResponseEntity.ok(sampleService.getIngreInfoList(reqCommonSearchDTO));
	}

//	@GetMapping("/getSampleList")
//	public ResponseEntity<ResponseVO> getSampleList(@RequestParam String paramTest) {
//
//		ResponseVO responseVO = new ResponseVO();
//
//		try {
//			ReqSampleDTO reqSampleDTO = new ReqSampleDTO();
//
//			reqSampleDTO.setCamelTestMsg("DTO TEST");
//
//			List<ResSampleDTO> sampleList = sampleService.getSampleList(reqSampleDTO);
//
//			System.out.println(":: getSampleList" + "  " + sampleList.size());
//
//			responseVO.setResSucc(sampleList);
//
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//			responseVO.setResError();
//		}
//
//		return ResponseEntity.ok(responseVO);
//	}


}
