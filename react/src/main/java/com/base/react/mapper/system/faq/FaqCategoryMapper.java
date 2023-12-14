package com.base.react.mapper.system.faq;

import java.util.List;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.system.faq.ReqFaqCategoryDTO;
import com.base.react.model.system.faq.ResFaqCategoryDTO;

@DataBaseConnMapper
public interface FaqCategoryMapper {

	List<ResFaqCategoryDTO> getFaqCategoryList(ReqFaqCategoryDTO reqFaqCategoryDTO);
	
	ResFaqCategoryDTO getFaqCategoryDetail(ReqFaqCategoryDTO params);
	
	int postFaqCategoryReg(ReqFaqCategoryDTO params);
	
	int putFaqCategoryMstUpd(ReqFaqCategoryDTO params);
	
	int putFaqCategoryDtlUpd(ReqFaqCategoryDTO params);
	
	int delFaqCategoryMstDel(ReqFaqCategoryDTO reqFaqCategoryDTO);
	
	int delFaqCategoryDtlDel(ReqFaqCategoryDTO reqFaqCategoryDTO);
}
