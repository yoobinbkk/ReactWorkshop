package com.base.react.service.system.code;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.base.react.mapper.system.code.CodeMapper;
import com.base.react.model.PagingDTO;
import com.base.react.model.common.LangDTO;
import com.base.react.model.common.ResCommonSearchDTO;
import com.base.react.model.system.code.ReqCodeDTO;
import com.base.react.model.system.code.ResCodeDTO;
import com.base.react.utils.CommonUtil;
import com.base.react.utils.ConvertUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CodeService {
	
	private final CodeMapper codeMngMapper;
	
	// CODE_MST/DTL MERGE(삽입 및 수정)
	public int updateCodeMst(ReqCodeDTO reqCodeMngDTO) throws Exception{
		int result = codeMngMapper.mergeIntoCodeMst(reqCodeMngDTO);
		reqCodeMngDTO.getArrLangObj().stream()
			.filter(obj -> obj.getLangNm() != null && !obj.getLangNm().isEmpty())
			.forEach(langObj -> {
				ReqCodeDTO params =  ReqCodeDTO.builder()
						.mstCd(reqCodeMngDTO.getMstCd())
						.mstCdDesc(reqCodeMngDTO.getMstCdDesc())
						.useYn(reqCodeMngDTO.getUseYn())
						.langCd(langObj.getLangCd())
						.mstCdNm(langObj.getLangNm())
						.build();
				codeMngMapper.mergeIntoCodeMstDtl(params);
			});
		
		return result;
	}

	// CODE_MST UPDATE(리스트 상태변경)
	public int updateCodeMstState(ReqCodeDTO reqCodeMngDTO) throws Exception{
		return codeMngMapper.updateCodeMst(reqCodeMngDTO);
	}
	
	// CODE_MST/DTL LIST
	public ResCommonSearchDTO selectCodeMstList(ReqCodeDTO reqCodeMngDTO) {
		int totalCnt = codeMngMapper.getCodeMstListCnt(reqCodeMngDTO);
		CommonUtil.setPaging(reqCodeMngDTO, totalCnt);
		
		List<ResCodeDTO> list = new ArrayList<ResCodeDTO>();

		if (totalCnt > 0) {
			list = codeMngMapper.getCodeMstList(reqCodeMngDTO);
		}
		
		PagingDTO page = ConvertUtil.convert(reqCodeMngDTO, PagingDTO.class);
		ResCommonSearchDTO res = ResCommonSearchDTO.builder()
								.page(page)
								.list(list)
								.build();
		return res;
	}
	
	// CODE_MST/DTL SELECT ONE
	public ResCodeDTO selectCodeMst(ReqCodeDTO reqCodeMngDTO) {
		ResCodeDTO res = codeMngMapper.getCodeMstDetail(reqCodeMngDTO);
		res.setArrLangObj(codeMngMapper.getCodeMstLangList(reqCodeMngDTO)); // 등록 언어 리스트
		return res;
	}
	
	// CODE_SUB/DTL MERGE(삽입 및 수정)
	public int updateCodeSub(ReqCodeDTO reqCodeMngDTO) {
		int result = codeMngMapper.mergeIntoCodeSub(reqCodeMngDTO);
		
		reqCodeMngDTO.getArrLangObj().stream()
		.filter(obj -> obj.getLangNm() != null && !obj.getLangNm().isEmpty())
		.forEach(langObj -> {
			ReqCodeDTO params =  ReqCodeDTO.builder()
					.mstCd(reqCodeMngDTO.getMstCd())
					.mstCdNm(reqCodeMngDTO.getMstCdNm())
					.subCd(reqCodeMngDTO.getSubCd())
					.subCdDesc(reqCodeMngDTO.getSubCdDesc())
					.useYn(reqCodeMngDTO.getUseYn())
					.langCd(langObj.getLangCd())
					.subCdNm(langObj.getLangNm())
					.build();
			codeMngMapper.mergeIntoCodeSubDtl(params);
		});
		
		return result;
	}
	
	// CODE_MST/DTL LIST
	public ResCommonSearchDTO selectCodeSubList(ReqCodeDTO reqCodeMngDTO) {
		int totalCnt = codeMngMapper.getCodeSubListCnt(reqCodeMngDTO);
		CommonUtil.setPaging(reqCodeMngDTO, totalCnt);
			
		List<ResCodeDTO> list = new ArrayList<ResCodeDTO>();

		if (totalCnt > 0) {
			list = codeMngMapper.getCodeSubList(reqCodeMngDTO);
		}
			
		PagingDTO page = ConvertUtil.convert(reqCodeMngDTO, PagingDTO.class);
		ResCommonSearchDTO res = ResCommonSearchDTO.builder()
								.page(page)
								.list(list)
								.build();
		return res;
	}
	
	// CODE_SUB UPDATE
	public int updateCodeSubState(ReqCodeDTO reqCodeMngDTO) {
		return codeMngMapper.updateCodeSub(reqCodeMngDTO);	
	}
	
	// CODE_SUB/DTL SELECT ONE
	public ResCodeDTO selectCodeSub(ReqCodeDTO reqCodeMngDTO) {
		ResCodeDTO res = codeMngMapper.getCodeSubDetail(reqCodeMngDTO);
		res.setArrLangObj(codeMngMapper.getCodeSubLangList(reqCodeMngDTO));		// 등록 언어 리스트
		return res;
	}
	
	// LANG_MST LIST
	public List<LangDTO> selectLangMstList(ReqCodeDTO reqCodeMngDTO){
		return codeMngMapper.getLangCdList(reqCodeMngDTO);
	}
}
