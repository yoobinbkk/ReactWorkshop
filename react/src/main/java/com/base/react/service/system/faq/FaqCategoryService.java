package com.base.react.service.system.faq;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.base.react.mapper.system.faq.FaqCategoryMapper;
import com.base.react.model.system.faq.ReqFaqCategoryDTO;
import com.base.react.model.system.faq.ResFaqCategoryDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FaqCategoryService {
	
	private final FaqCategoryMapper faqCategoryMapper;

	public List<ResFaqCategoryDTO> getFaqCategoryList(ReqFaqCategoryDTO reqFaqCategoryDTO) {
		return faqCategoryMapper.getFaqCategoryList(reqFaqCategoryDTO);
	}
	
	public ResFaqCategoryDTO getFaqCategoryDetail(ReqFaqCategoryDTO params) {
		return faqCategoryMapper.getFaqCategoryDetail(params);
	}
	
	public int postFaqCategoryReg(ReqFaqCategoryDTO params) {
		return faqCategoryMapper.postFaqCategoryReg(params);
	}
	
	public int putFaqCategoryMstUpd(ReqFaqCategoryDTO params) {
		
		int mstUpd = faqCategoryMapper.putFaqCategoryMstUpd(params);
		
		if (mstUpd > 0) {
			
			int dtlUpd = faqCategoryMapper.putFaqCategoryDtlUpd(params);
			
			if (dtlUpd > 0) {
				return mstUpd;
			} 
		}
		
		return mstUpd;
	}
	
//	public int putFaqCategoryDtlUpd(ReqFaqCategoryDTO params) {
//		return faqCategoryMapper.putFaqCategoryDtlUpd(params);
//	}
	
	public int delFaqCategoryMstDel(ReqFaqCategoryDTO reqFaqCategoryDTO) {

		int mstDel = faqCategoryMapper.delFaqCategoryMstDel(reqFaqCategoryDTO);
		
		if (mstDel > 0) {

			int dtlDel = faqCategoryMapper.delFaqCategoryDtlDel(reqFaqCategoryDTO);
			
			if (dtlDel > 0) {
				return mstDel;
			} else {
				System.out.println("test");
			}
		}
		
		return mstDel;
	}
}
