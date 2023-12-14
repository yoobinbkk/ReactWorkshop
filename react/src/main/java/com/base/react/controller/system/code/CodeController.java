package com.base.react.controller.system.code;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.react.model.ResponseVO;
import com.base.react.model.system.code.ReqCodeDTO;
import com.base.react.service.system.code.CodeService;
import com.base.react.utils.SessionUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/system/code")
@Slf4j
public class CodeController {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final CodeService codeMngService;
	
	private final SessionUtil sessionUtil;
	
	// 코드 마스터 저장/업데이트
	@PutMapping("/updateCodeMst")
	@Transactional
	public ResponseEntity<ResponseVO> updateCodeMst(@RequestBody ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {			
			responseVO.setResSucc(codeMngService.updateCodeMst(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}

	// 코드 마스터 리스트
	@GetMapping("/selectCodeMstList")
	public ResponseEntity<ResponseVO> selectCodeMstList(ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {			
			responseVO.setResSucc(codeMngService.selectCodeMstList(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
	
	// 코드 마스터 상세
	@GetMapping("/selectCodeMst")
	public ResponseEntity<ResponseVO> selectCodeMst(ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {
			responseVO.setResSucc(codeMngService.selectCodeMst(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
	
	// [리스트] 코드 삭제(DEL_YN UPDATE) / 상태 업데이트(USE_YN UPDATE)
	@PutMapping("/updateCodeMstState")
	@Transactional
	public ResponseEntity<ResponseVO> updateCodeMstState(@RequestBody ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();
		
		try {
			responseVO.setResSucc(codeMngService.updateCodeMstState(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}
		
		return ResponseEntity.ok(responseVO);
	}
	
	// 서브코드 저장/업데이트
	@PutMapping("/updateCodeSub")
	@Transactional
	public ResponseEntity<ResponseVO> updateCodeSub(@RequestBody ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {
			responseVO.setResSucc(codeMngService.updateCodeSub(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
		
	// 서브코드 리스트
	@GetMapping("/selectCodeSubList")
	public ResponseEntity<ResponseVO> selectCodeSubList(ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {
			responseVO.setResSucc(codeMngService.selectCodeSubList(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
	
	// 서브코드 상세
	@GetMapping("/selectCodeSub")
	public ResponseEntity<ResponseVO> selectCodeSub(ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {				
			responseVO.setResSucc(codeMngService.selectCodeSub(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
	
	// 서브코드 삭제/업데이트
	@PutMapping("/updateCodeSubState")
	@Transactional
	public ResponseEntity<ResponseVO> updateCodeSubState(@RequestBody ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();
			
		try {
			responseVO.setResSucc(codeMngService.updateCodeSub(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}
		
		return ResponseEntity.ok(responseVO);
	}
	
	// init params 언어 코드 리스트
	@GetMapping("/selectLangMstList")
	public ResponseEntity<ResponseVO> selectLangMstList(ReqCodeDTO reqCodeMngDTO) {
		ResponseVO responseVO = new ResponseVO();

		try {			
			responseVO.setResSucc(codeMngService.selectLangMstList(reqCodeMngDTO));
		}
		catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}

		return ResponseEntity.ok(responseVO);
	}
}
