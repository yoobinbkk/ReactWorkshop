import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import Pagination from '/@components/common/Pagination'
import useModal from '/@hooks/common/useModal'
import { useQueryCustom } from '/@hooks/common/useQueryCustom'
import useCodeApi from '/@apis/system/code/useCodeApi'
import useInputs from '/@hooks/common/useInputs'

const CodeMstList = () => {

  const navigate = useNavigate()
  const { fnAlertOpen, fnConfirmOpen } = useModal()

  const [formState, setFormState] = useState('init')

  const [params, fnInputChange, reset, setParams] = useInputs({
		keywordType: '',
    keyword: '',
    useYn: '',
    chUseYn: 'Y',
    nowPageNo: 1,
    pageSize: 10,
    arrMstCd: [],
	})

  const { selectCodeMstList, updateCodeMstState } = useCodeApi()
	const { isLoading, data: resultData, refetch } = useQueryCustom({
    queryKey: 'selectCodeMstList',
    queryFn: selectCodeMstList,
    params
  })

  const goPage = (path, pageParams) => {
    navigate(path, {state: pageParams});
  }

  const fnKeyPressEnterSearch = (e) => {
		if (e.nativeEvent.isComposing) return
		if (e.key === 'Enter') {
			fnSearch(1, params.pageSize)
		}
	}
  
  // 체크박스 핸들러
  const checkBoxHandler = (value, isChecked) => {
    if(isChecked){
      setParams({
        ...params,
        arrMstCd: [...params.arrMstCd, value]
      })
    }else{
      setParams({
        ...params,
        arrMstCd: params.arrMstCd.filter((item)=> item !== value)
      })
    }
  }

  // 전체 체크박스 핸들러
  const allCheckBoxHandler = (isChecked) => {
    if(isChecked){
      setParams({
        ...params,
        arrMstCd: resultData.list.map((item) => item.mstCd)
      })
    }else{
      setParams({
        ...params,
        arrMstCd: []
      })
    }
  }

  // 코드삭제
  const fnCodeDelete = async () => {
    if(params.arrMstCd.length > 0){
      if (await fnConfirmOpen({ 
        message: '삭제 버튼을 누르시면 선택하신 ' + params.arrMstCd.length + '개 항목이\n'
                + '영구 삭제 처리됩니다.\n'
                + '정말 삭제 하시겠습니까?\n'
      })){
        await updateCodeMstState({arrMstCd: params.arrMstCd, delYn: 'Y'});
        fnSearch(params)
      }
    }else{
      await fnAlertOpen({message: '목록을 선택해주세요.'})
    }

  }

  // 상태변경
  const fnCodeStateChange = async () => {
    if(params.arrMstCd.length > 0){
      if (await fnConfirmOpen({ 
        message: '선택하신 ' + params.arrMstCd.length + '개 항목에 대하여 상태 변경을'
                + '진행하시겠습니까?'
      })) {
        await updateCodeMstState({arrMstCd: params.arrMstCd, useYn: params.chUseYn});
        fnSearch(params);
      }
    }else{
      await fnAlertOpen({message: '목록을 선택해주세요.'})
    }
  }

  const fnSearch = async ({pg = 1, pgSize = 10}) => {
    setParams({
      ...params,
      nowPageNo: pg,
      pageSize: pgSize
    })
    await refetch();
  }

  // 검색시 체크박스 초기화
  useEffect(()=>{
    setParams({
      ...params, 
      arrMstCd: []
    })
  }, [resultData])

  return (
    <>
    <h2>시스템관리 &gt; CMS코드관리</h2>
    {/* 검색박스 */}
      <table className="ui-table__th--bg-gray mt-5 ui-register-form">
        <colgroup>
          <col width="15%"/>
          <col width="35%"/>
          <col width="15%"/>
          <col width="35%"/>
        </colgroup>
        <tbody>
          <tr>
            <th>검색기간</th>
            <td colSpan="3">
              <select className='ui-select'>
                <option>전체</option>
                <option>어쩌고</option>
              </select>
              <input type="text" className='ui-input width-170' /> <span> ~ </span> <input type="text" className='ui-input width-170' />
              <button className='ui-button pl-5'>
                1주일
              </button>
              <button className='ui-button'>
                1개월
              </button>
              <button className="ui-button">
                3개월
              </button>
              <button className="ui-button">
                6개월
              </button>
              <button className="ui-button">
                1년
              </button>
              <button className="ui-button">
                전체
              </button>
            </td>
          </tr>
          <tr>
            <th>관리유형</th>
            <td>
              <div className="form-flex">
                <div className="ui-select-box ui-form-box__width--230">
                  <select className="ui-select ui-select__width--full">
                    <option>선택</option>
                  </select>
                </div>
              </div>
            </td>
            <th>이용국가</th>
            <td>
            <div className="form-flex">
                <div className="ui-select-box ui-form-box__width--230">
                  <select className="ui-select ui-select__width--full">
                    <option>선택</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>적용상태</th>
            <td>
              <div className="form-flex">
                <div className="ui-select-box ui-form-box__width--230">
                  <select className="ui-select ui-select__width--full" name='useYn' value={params.useYn || ''} onChange={fnInputChange}>
                    <option value=''>전체</option>
                    <option value='Y'>사용</option>
                    <option value='N'>미사용</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>검색어</th>
            <td colSpan="3">
              <div className="form-flex">
                <div className="ui-select-box d-flex">
                  <select className="ui-select" name='keywordType' value={params.keywordType || ''} onChange={fnInputChange}>
                    <option value='mstCdNm'>관리유형</option>
                  </select>
                  <input type="text" className="ui-input ui-input__width--full" placeholder='검색어 입력' name='keyword' 
                    value={params.keyword || ''} onChange={fnInputChange} onKeyDown={fnKeyPressEnterSearch}/>
                  <button type="button" className="ui-button ui-button__bg--blue" onClick={() => fnSearch(1)}>
                    검색
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <span>검색결과 (총 {resultData? resultData.page.totalCnt : '0'}건)</span>

      <div className="page-bottom">
        <div className="page-bottom__inner">
          <div className="ui-buttons ui-buttons__right">
            {formState === 'init'?
            <>
            <button type="button" className="ui-button ui-button__border--blue" onClick={(e)=>{goPage('/system/code/codeMstRegister', params.arrMstCd)}}>유형관리</button>
            <button type="button" className="ui-button ui-button__border--blue" onClick={() => setFormState('upd')}>상태변경</button>
            <button type="button" className="ui-button ui-button__bg--gray" onClick={fnCodeDelete}>삭제</button>
            </>
            :
            <>
            <div className="ui-select-box ui-form-box__width--180 mr-10">
              <select className="ui-select ui-select__width--full" name='chUseYn' value={params.chUseYn || ''} onChange={fnInputChange}>
                <option value='Y'>사용</option>
                <option value='N'>미사용</option>
              </select>
            </div>
            <button type="button" className="ui-button ui-button__bg--gray" onClick={() => setFormState('init')}>취소</button>
            <button type="button" className="ui-button ui-button__border--blue" onClick={fnCodeStateChange}>적용</button>
            </>
            }
          </div>
        </div>
      </div>

      {/* 코드리스트 */}
      <div className="d-flex-between">
        <div className="ui-table__wrap mt-10">
          <table className="ui-table text-center ui-table__td--40">
            <colgroup>
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="ui-checkbox" id="check1" 
                  onChange={(e) => allCheckBoxHandler(e.target.checked)} checked={resultData && resultData.list.length > 0 && resultData.list.length === params.arrMstCd.length}/>
                </th>
                <th>No.</th>
                <th>관리유형</th>
                <th>설명</th>
                <th>등록수</th>
                <th>서비스이용국가</th>
                <th>상태</th>
                <th>수정일시</th>
                <th>수정자</th>
                <th>등록일시</th>
                <th>등록자</th>
              </tr>
            </thead>

            <tbody>
              {
                resultData && resultData.list && resultData.list.length > 0?
                resultData.list.map((item, index) => 
                  <tr key={index}>
                    <td>
                      <input type="checkbox" className="ui-checkbox" id={'check'+index} name='arrMstCd' value={item.mstCd || ''} 
                        onChange={(e)=> checkBoxHandler(e.target.value, e.target.checked)}
                        checked={params.arrMstCd.includes(item.mstCd) ? true : false} />
                    </td>
                    <td>{item.rowNum}</td>
                    <td><a href='#' onClick={()=>{goPage('/system/code/codeSubRegister', {mstCd: item.mstCd, mstCdNm: item.mstCdNm})}}>{item.mstCdNm}</a></td>
                    <td>{item.mstCdDesc}</td>
                    <td><a href='#' onClick={()=>{goPage('/system/code/codeSubRegister', {mstCd: item.mstCd, mstCdNm: item.mstCdNm})}}>{item.subCodeCnt}</a></td>
                    <td>{item.langCd}</td>
                    <td>{item.useYn === 'Y'? '사용' : '미사용'}</td>
                    <td>{item.updDt}</td>
                    <td>{item.updUserCd}</td>
                    <td>{item.regDt}</td>
                    <td>{item.regUserCd}</td>
                  </tr>
                )
                : 
                <tr>
                  <td colSpan={11}>검색 결과가 존재하지 않습니다.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {
        <div className="board-bottom">
          <div className="board-bottom__inner board-bottom__with--form">
            <Pagination page={resultData? resultData.page : ''} fnSearch={fnSearch}/>
          </div>
        </div>
      }

    </>

  )
}

export default CodeMstList