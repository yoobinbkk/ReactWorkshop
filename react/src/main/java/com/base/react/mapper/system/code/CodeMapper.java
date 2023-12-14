package com.base.react.mapper.system.code;

import java.util.List;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.common.LangDTO;
import com.base.react.model.system.code.ReqCodeDTO;
import com.base.react.model.system.code.ResCodeDTO;

@DataBaseConnMapper
public interface CodeMapper {
	
	Integer mergeIntoCodeMst(ReqCodeDTO reqCodeMngDTO);
	
	Integer mergeIntoCodeMstDtl(ReqCodeDTO reqCodeMngDTO);
	
	Integer updateCodeMst(ReqCodeDTO reqCodeMngDTO);
	
	Integer getCodeMstListCnt(ReqCodeDTO reqCodeMngDTO);
	
	List<ResCodeDTO> getCodeMstList(ReqCodeDTO reqCodeMngDTO);
	
	ResCodeDTO getCodeMstDetail(ReqCodeDTO reqCodeMngDTO);
	
	
	Integer getCodeSubListCnt(ReqCodeDTO reqCodeMngDTO);
	
	List<ResCodeDTO> getCodeSubList(ReqCodeDTO reqCodeMngDTO);
	
	Integer mergeIntoCodeSub(ReqCodeDTO reqCodeMngDTO);
	
	Integer mergeIntoCodeSubDtl(ReqCodeDTO reqCodeMngDTO);
	
	ResCodeDTO getCodeSubDetail(ReqCodeDTO reqCodeMngDTO);
	
	Integer updateCodeSub(ReqCodeDTO reqCodeMngDTO);
	
	List<LangDTO> getCodeMstLangList(ReqCodeDTO reqCodeMngDTO);
	
	List<LangDTO> getCodeSubLangList(ReqCodeDTO reqCodeMngDTO);
	
	List<LangDTO> getLangCdList(ReqCodeDTO reqCodeMngDTO);
}