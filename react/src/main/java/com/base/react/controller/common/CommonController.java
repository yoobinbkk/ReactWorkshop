package com.base.react.controller.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.react.model.ResponseVO;
import com.base.react.service.common.CommonService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/common")
public class CommonController {

	private final CommonService commonService;

	@GetMapping("/selectMenuList_temp")
	public ResponseEntity<ResponseVO> selectMenuList_temp() {
		return ResponseEntity.ok(commonService.selectMenuList_temp());
	}

	@GetMapping("/selectMenuList")
	public ResponseEntity<ResponseVO> selectMenuList() {
		return ResponseEntity.ok(commonService.selectMenuList());
	}

	@GetMapping("/selectPageList")
	public ResponseEntity<ResponseVO> selectPageList() {
		return ResponseEntity.ok(commonService.selectPageList());
	}
}
