package com.base.react.controller.system.cs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.react.model.ResponseVO;
import com.base.react.model.system.cs.CsManageDTO;
import com.base.react.service.system.cs.CsManageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/cs")
public class CsManageController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private final CsManageService csManageService;
	
	// 문의유형관리 > 문의 유형 리스트 가져오기
	@GetMapping("/selectCsManageList")
	public ResponseEntity<ResponseVO> selectCsManageList(CsManageDTO csManageDTO) {
		return ResponseEntity.ok(csManageService.selectCsManageList(csManageDTO));
	}
}
