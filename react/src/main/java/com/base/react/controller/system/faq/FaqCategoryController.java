package com.base.react.controller.system.faq;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.react.model.ResponseVO;
import com.base.react.model.system.faq.ReqFaqCategoryDTO;
import com.base.react.model.system.faq.ResFaqCategoryDTO;
import com.base.react.service.system.faq.FaqCategoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/faqCategory")
@Slf4j
public class FaqCategoryController {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private final FaqCategoryService faqCategoryService;
	
	
	// 카테고리 리스트불러오기
	@GetMapping("/getFaqCategoryList")
	public ResponseEntity<ResponseVO> getFaqCategoryList() {
		ResponseVO responseVO = new ResponseVO();
		
		try {
			ReqFaqCategoryDTO reqFaqCategoryDTO = new ReqFaqCategoryDTO();
			
			List<ResFaqCategoryDTO> faqCategoryList = faqCategoryService.getFaqCategoryList(reqFaqCategoryDTO);

			responseVO.setResSucc(faqCategoryList);
			
		} catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}
		
		return ResponseEntity.ok(responseVO);
	}
	
	// 카테고리 상세보기
	@GetMapping("/getFaqCategoryDetail")
	public ResponseEntity<ResponseVO> getFaqCategoryDetail(ReqFaqCategoryDTO params) {
		ResponseVO responseVO = new ResponseVO();
		
		try {
			ResFaqCategoryDTO resFaqCategoryDTO = faqCategoryService.getFaqCategoryDetail(params);
			
			if (resFaqCategoryDTO != null) {
				responseVO.setResSucc(resFaqCategoryDTO);
			} else {
				responseVO.setResFail(null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			responseVO.setResError();
		}
		
		return ResponseEntity.ok(responseVO);
	}
	
	// 카테고리 등록
	@PostMapping("/postFaqCategoryReg")
	public ResponseEntity<ResponseVO> postFaqCategoryReg(@RequestBody ReqFaqCategoryDTO params) {
		ResponseVO responseVO = new ResponseVO();
		
		try {
			int result = faqCategoryService.postFaqCategoryReg(params);
			
			if (result > 0) {
				responseVO.setResSucc(result);
			} else {
				responseVO.setResFail(null);
			}
		} catch(Exception e) {
			e.printStackTrace();
			responseVO.setResFail(null);
		}
		
		return ResponseEntity.ok(responseVO);
	}
	
	// 카테고리 수정
	@PutMapping("/putFaqCategoryUpd")
	public ResponseEntity<ResponseVO> putFaqCategoryUpd(@RequestBody ReqFaqCategoryDTO params) {
		ResponseVO responseVO = new ResponseVO();
		
		try {
			// 마스터 업데이트
			int mstUpd = faqCategoryService.putFaqCategoryMstUpd(params);
			
			if (mstUpd > 0) {
				responseVO.setResSucc(mstUpd);
			} else {
				responseVO.setResFail(null);
			}
		} catch(Exception e) {
			e.printStackTrace();
			responseVO.setResFail(null);
		}
		
		return ResponseEntity.ok(responseVO);
	}
	
	// 카테고리 삭제
	@DeleteMapping("/delFaqCategoryDel")
	public ResponseEntity<ResponseVO> delFaqCategoryDel(@RequestBody ReqFaqCategoryDTO reqFaqCategoryDTO) {
		ResponseVO responseVO = new ResponseVO();
		
		try {
			
			int mstDel = faqCategoryService.delFaqCategoryMstDel(reqFaqCategoryDTO);
			
			if (mstDel > 0) {
				responseVO.setResSucc(mstDel);
			} else {
				responseVO.setResFail(null);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
			responseVO.setResFail(null);
		}
		
		return ResponseEntity.ok(responseVO);
	}
}
