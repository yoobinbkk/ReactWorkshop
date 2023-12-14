import React from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import useModal from '/@hooks/common/useModal'
import useInputs from '/@hooks/common/useInputs'
import { useQueryCustom } from '/@hooks/common/useQueryCustom'

import customAxios from '/@utils/customAxios'
import useCsManageApi from '/@apis/system/cs/csManageApi'
import Pagination from '/@components/common/Pagination'
import InputDateRangePicker from '/@components/common/InputDateRangePicker'

const CsManageList = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common'])
  const { fnAlertOpen, fnConfirmOpen } = useModal()

  /* [S] 변수 정의 */
  const {params, fnInputChange} = useInputs({
    dateType: '', // 검색기간 유형
    startDt: '', // 시작날짜
    endDt: '', // 종료날짜
    level1: '', // 1차유형
    level2: '', // 2차유형
    level3: '', // 3차유형
    country: '', // 이용국가
    useYn: '', // 사용 상태
    keywordType: '', // 검색어 타입
    keyword: '', // 검색어
    nowPageNo: 1,
    pageSize: 10,
    arrCategoryCd: []
  })

  const { selectCsManageList } = useCsManageApi()
  const { isLoading, data: resultData, refetch } = useQueryCustom({
    queryKey: 'selectCsManageList',
		queryFn: selectCsManageList,
		params
  })
  /* [E] 변수 정의 */

  /* [S] 이벤트 정의 */
  const fnSearch = (pg, pgSize = 10) => {
    params.nowPageNo = pg
    params.pageSize = pgSize
    refetch()
  }

  const fnKeyDownEnterSearch = (e) => {
		if (e.nativeEvent.isComposing) return
		if (e.key === 'Enter') {
			fnSearch(1, params.pageSize)
		}
	}

  const inputChange = (e) => {
    fnInputChange({
      ...params,
      [e.target.name]: e.target.value
    })
  }

  const fnHandleStartDateChange = (date) => {
    fnInputChange({
      ...params,
      startDt: date,
    })
  }

  const fnHandleEndDateChange = (date) => {
    fnInputChange({
      ...params,
      endDt: date,
    })
  }

  const fnCheckBoxHandler = (value, isChecked) => {
    if(isChecked){
      fnInputChange({
        ...params,
        arrcategoryCd: [...params.arrCategoryCd, value]
      })
    }else{
      fnInputChange({
        ...params,
        arrCategoryCd: params.arrCategoryCd.filter((item)=> item !== value)
      })
    }
  }

  const allfnCheckBoxHandler = (isChecked) => {
    if(isChecked){
      fnInputChange({
        ...params,
        arrCategoryCd: resultData.map((item) => item.categoryCd)
      })
    }else{
      fnInputChange({
        ...params,
        arrCategoryCd: []
      })
    }
  }

  const fnHandleDateRange = (days) => {
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - days)
  
    const newStartDate = fnFormatDate(startDate)
    const newEndDate = fnFormatDate(today)

    fnHandleStartDateChange(newStartDate);
    fnHandleEndDateChange(newEndDate);
  }

  const fnFormatDate = (date) => {
    return (
      date.getFullYear() +
      '.' +
      (date.getMonth() < 9 ? '0' : '') +
      (date.getMonth() + 1) +
      '.' +
      (date.getDate() < 10 ? '0' : '') +
      date.getDate()
    )
  }

  const fnMoveDetail = (pageParams) => {
    navigate('/system/cs/csManageRegister', {state: pageParams});
  }

  /* [E] 이벤트 정의 */

  /* [S] API 호출 */
  const fnUpdateCode = (payload, action) => {
    return customAxios({
      method: 'put',
      url: '/api/system/code/updateCodeMst',
      isLoading: true,
      data: payload,
    })
    .then((res) => {
      const result = res.data.data
      if(res.data.code === 'RS001')
        fnAlertOpen({message: payload.delYn === 'Y'? '선택하신 ' + payload.arrCategoryCd.length + '개 항목이 정상 삭제되었습니다.' : '정상적으로 변경 처리 되었습니다.'})
      else
        fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
      fnSearch(params);
    })
  }
  
  const fnCodeDelete = async () => {
    if(params.arrCategoryCd.length > 0){
      if (await fnConfirmOpen({ 
        message: '삭제 버튼을 누르시면 선택하신 ' + params.arrCategoryCd.length + '개 항목이\n'
                + '영구 삭제 처리됩니다.\n'
                + '정말 삭제 하시겠습니까?\n'
      })){
        fnUpdateCode({arrCategoryCd: params.arrCategoryCd, delYn: 'Y'});
      }
    }else{
      await fnAlertOpen({message: '목록을 선택해주세요.'})
    }

  }

  // 상태변경
  const fnCodeStateChange = async () => {
    if(params.arrCategoryCd.length > 0){
      if (await fnConfirmOpen({ 
        message: '선택하신 ' + params.arrCategoryCd.length + '개 항목에 대하여 상태 변경을'
                + '진행하시겠습니까?'
      })) {
        fnUpdateCode({arrMstCd: params.arrCategoryCd, useYn: params.useYn});
      }
    }else{
      await fnAlertOpen({message: '목록을 선택해주세요.'})
    }
  }
  /* [E] API 호출 */

  return (
    <>
      <table className="ui-table__th--bg-gray mt-5 ui-register-form">
        <colgroup>
          <col width="10%"/>
          <col width="20%"/>
          <col width="10%"/>
          <col width="20%"/>
          <col width="10%"/>
          <col width="20%"/>
        </colgroup>
        <tbody>
          <tr>
            <th>검색기간</th>
            <td colSpan="6">
              <div className="d-flex">
                <select className='ui-select mr-5' name='dateType' onChange={inputChange}>
                  <option value=''>전체</option>
                  <option value='R'>등록일</option>
                  <option value='U'>수정일</option>
                </select>
                <InputDateRangePicker
                  startCallbackFunction={fnHandleStartDateChange}
                  endCallbackFunction={fnHandleEndDateChange}
                  startDate={params.startDt}
                  endDate={params.endDt}
                />
                <button className='ui-button pl-5' onClick={() => fnHandleDateRange(7)}>
                  1주일
                </button>
                <button className='ui-button' onClick={() => fnHandleDateRange(30)}>
                  1개월
                </button>
                <button className='ui-button' onClick={() => fnHandleDateRange(90)}>
                  3개월
                </button>
                <button className='ui-button' onClick={() => fnHandleDateRange(180)}>
                  6개월
                </button>
                <button className='ui-button' onClick={() => fnHandleDateRange(365)}>
                  1년
                </button>
                <button className='ui-button' onClick={() => fnHandleDateRange(0)}>
                  전체
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th>1차유형</th>
            <td>
              <div className="form-flex">
                <div className="ui-select-box ui-form-box__width--230">
                  <select className="ui-select ui-select__width--full">
                    <option>선택</option>
                  </select>
                </div>
              </div>
            </td>
            <th>2차유형</th>
            <td>
              <div className="form-flex">
                <div className="ui-select-box ui-form-box__width--230">
                  <select className="ui-select ui-select__width--full">
                    <option>선택</option>
                  </select>
                </div>
              </div>
            </td>
            <th>3차유형</th>
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
            <th>적용상태</th>
            <td>
              <div className="form-flex">
                <div className="ui-select-box ui-form-box__width--230">
                  <select className="ui-select ui-select__width--full" name='useYn' onChange={inputChange}>
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
            <td colSpan="6">
              <div className="form-flex">
                <div className="ui-select-box d-flex">
                  <select className="ui-select" name='keywordType' onChange={inputChange}>
                    <option value=''>전체</option>
                  </select>
                  <input type="text" className="ui-input ui-input__width--full" placeholder='검색어 입력' name='keyword' onChange={inputChange} onKeyDown={fnKeyDownEnterSearch}/>
                  <button type="button" className="ui-button ui-button__bg--blue" onClick={() => fnSearch(1)}>
                    검색
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <span>검색결과 (총 {resultData ? resultData.page.totalCnt : 0}건)</span>

      <div className="page-bottom">
        <div className="page-bottom__inner">
          <div className="ui-buttons ui-buttons__right">
            {/* {formState === 'init'?
            <>
            <button type="button" className="ui-button ui-button__border--blue" onClick={(e)=>{goPage('/system/code/codeReg', params.arrMstCd)}}>유형관리</button>
            <button type="button" className="ui-button ui-button__border--blue" onClick={() => setFormState('upd')}>상태변경</button>
            <button type="button" className="ui-button ui-button__bg--gray" onClick={fnCodeDelete}>삭제</button>
            </>
            :
            <>
            <div className="ui-select-box ui-form-box__width--180 mr-10">
              <select className="ui-select ui-select__width--full" name='chUseYn' onClick={inputChange}>
                <option value='Y'>사용</option>
                <option value='N'>미사용</option>
              </select>
            </div>
            <button type="button" className="ui-button ui-button__bg--gray" onClick={() => setFormState('init')}>취소</button>
            <button type="button" className="ui-button ui-button__border--blue" onClick={fnCodeStateChange}>적용</button>
            </>
            } */}
          </div>
        </div>
      </div>

      <div className="d-flex-between">
        <div className="ui-table__wrap mt-10">
          <table className="ui-table text-center ui-table__td--40">
            <colgroup>
              <col width="5%" />
              <col width="5%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="*" />
              <col width="5%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox"
                    className="ui-checkbox"
                    id="check1"
                    onChange={(e) => allfnCheckBoxHandler(e.target.checked)} 
                    // checked={!isLoading && resultData && resultData.list.length !== 0 && resultData.list.length === params.arrCategoryCd.length}
                  />                
                </th>
                <th>번호</th>
                <th>1차유형</th>
                <th>2차유형</th>
                <th>3차유형</th>
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
                resultData && resultData.list.length > 0 ?
                resultData.list.map((item, index) => 
                  <tr key={index}>
                    <td>
                      <input 
                        type="checkbox"
                        className="ui-checkbox"
                        id={'check'+index}
                        name='arrCategoryCd'
                        value={item.categoryCd} 
                        onChange={(e)=> fnCheckBoxHandler(e.target.value, e.target.checked)}
                        checked={params.arrCategoryCd.includes(item.categoryCd) ? true : false} />
                    </td>
                    <td>{item.rowNum}</td>
                    <td>{item.level1Nm}</td>
                    <td>{item.level2Nm}</td>
                    <td>{item.level3Nm}</td>
                    <td>{item.nationCd}</td>
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
        !isLoading && resultData.page &&
        <div className="board-bottom">
          <div className="board-bottom__inner board-bottom__with--form">
            <Pagination page={resultData ? resultData.page : ''} fnSearch={fnSearch}/>
          </div>
        </div>
      }
    </>
  )
}

export default React.memo(CsManageList)