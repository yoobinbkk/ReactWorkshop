import React, { useEffect, useState } from 'react'
import useModal from '/@hooks/common/useModal'
import { useLocation } from 'react-router'
import { useQueryCustom } from '/@hooks/common/useQueryCustom'
import useCodeApi from '/@apis/system/code/useCodeApi'
import useInputs from '/@hooks/common/useInputs'

const CodeMstRegister = () => {

  const { fnAlertOpen, fnConfirmOpen } = useModal()

  // 페이지 파라미터
  const { state  } = useLocation()

  // 등록/수정 STATE
  const [formState, setFormState] = useState('init')

  const [params, fnInputChange, reset, setParams] = useInputs({
		mstCdNm: '',
    mstCd: '',
    mstCdDesc: '',
    useYn: '',
    arrLangObj: [],
	})

  // 등록 언어 리스트
  const [langList, setLangList] = useState([])

  const { selectCodeMstList, selectCodeMst, updateCodeMst, updateCodeMstState, selectLangMstList } = useCodeApi()
	const { isLoading, data: resultData, refetch } = useQueryCustom({
    queryKey: 'selectCodeMstList',
    queryFn: selectCodeMstList,
    params
  })

  // input Change function
  const inputLangChange = (e) => {
    setParams({
      ...params,
      mstCdNm: e.target.name === 'KO'? e.target.value : params.mstCdNm,
      arrLangObj: params.arrLangObj.map(item => item.langCd === e.target.name? {...item, langNm: e.target.value} : {...item} )
    })
  }

  // 등록폼 상태 변경
  const fnChangeFormState = (state) => {
    if(state === 'reg' || state === 'init'){
      setParams({
        ...params,
        mstCdNm: '',
        mstCd: '',
        mstCdDesc: '',
        useYn: 'Y',
        arrLangObj: langList,
      })  
    }
    setFormState(state);
  }

  // 코드저장
  const fnCodeSave = async () => {
    // 컨펌박스 개행인식 white-space: pre-line 필요
    const message = formState === 'reg'? 
      '저장 버튼을 누르시면 등록하신 정보로\n'
      + '저장 처리됩니다.\n'
      + '정말 저장 하시겠습니까?\n'
      : 
      '저장 버튼을 누르시면 변경하신 정보로\n'
      + '저장 처리됩니다.\n'
      + '정말 저장 하시겠습니까?\n'

    if (await fnConfirmOpen({ 
      message
    })) {
      await updateCodeMst(params)
      fnCodeDetail(params.mstCd)
      fnSearch(params);
    }
  }

  // 코드상세
  const fnCodeDetail = async (codeMstCd) => {
    if(codeMstCd !== '' && codeMstCd !== undefined){
      // 수정 상태로 업데이트
      fnChangeFormState('detail')
      const result = await selectCodeMst({mstCd: codeMstCd})
      setParams({
        ...result
      })
    }
  }

  // 코드삭제
  const fnCodeDelete = async (codeMstCd, e) => {
    e.stopPropagation(); // 이벤트 확산 방지
    if (await fnConfirmOpen({ 
      message: '삭제 버튼을 누르시면 선택하신 항목이\n'
              + '영구 삭제 처리됩니다.\n'
              + '정말 삭제 하시겠습니까?\n'
    })){
      await updateCodeMstState({arrMstCd: [codeMstCd], delYn: 'Y'})
      fnSearch(params);
      fnChangeFormState('init');
    }
  }

  // langCd 리스트 조회
  const getLangCdList = async () => {
    const result = await selectLangMstList({});
    setLangList(result);
    setParams({
      ...params,
      arrLangObj: result
    })
  }

  const fnSearch = async ({pg=1, pgSize = 100}) => {
    setParams({
      ...params,
      nowPageNo: pg,
      pageSize:  pgSize
    })
    refetch();
  }

  // 코드명-한국어 연결
  useEffect(()=>{
    setParams({
      ...params,
      arrLangObj: params.arrLangObj.map(item => item.langCd === 'KO'? {...item, langNm: params.mstCdNm} : {...item} )
    })
  }, [params.mstCdNm])

  useEffect(()=>{
    fnChangeFormState('init');
  }, [state])

  // init
  useEffect(()=>{
    fnSearch(1);
    getLangCdList();
  }, [])

  return (
    <>
      <h2>시스템관리 &gt; CMS코드관리 &gt; 유형관리</h2>
      <div className="d-flex-between">

        <div className="width-p32">
          { 
            resultData && resultData.list && resultData.list.length > 0?
            <div className="ui-table__wrap mt-10">
              <table className="ui-table text-center ui-table__td--40">
                <colgroup>
                  <col width="80%" />
                  <col width="10%" />
                  <col width="10%" />
                </colgroup>
                <tbody>
                  {
                    resultData.list.map((code, index) =>
                      <tr key={index} onClick={() => fnCodeDetail(code.mstCd)}>
                        <td align='left'>{code.mstCdNm}</td>
                        <td>=</td>
                        <td>
                          <div className="d-flex">
                            <button type="button" className="btn-circle-close" onClick={(e) => fnCodeDelete(code.mstCd, e) }></button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            :
            <div className='mt-50 mb-30'>
              관리 유형을 등록해주세요.
            </div>
          }
        </div>

        <div className="width-p48">
          { 
          formState !== 'init'?
          <div className="ui-table__wrap mt-10">
            <table className="ui-table__th--bg-gray mt-5 ui-register-form">
              <colgroup>
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
                <col width="30%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>유형명</th>
                  <td>
                    { formState !== 'detail'?
                    <input type="text" className="ui-input ui-input__width--full" placeholder='유형명 입력' name='mstCdNm' onChange={fnInputChange} value={params.mstCdNm}/>
                    :
                    params.mstCdNm
                    }
                  </td>
                  <th>관리코드</th>
                  <td>
                    { formState !== 'detail'?
                    <input type="text" className="ui-input ui-input__width--full" placeholder='관리코드 입력' name='mstCd' onChange={fnInputChange} value={params.mstCd}/>
                    :
                    params.mstCd
                    }
                  </td>
                </tr>
                <tr>
                  <th>설명</th>
                  <td colSpan={3}>
                  { formState !== 'detail'?
                  <input type="text" className="ui-input ui-input__width--full" placeholder='유형설명 입력' name='mstCdDesc' onChange={fnInputChange} value={params.mstCdDesc}/>
                  :
                  params.mstCdDesc
                  }
                  </td>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>
                  { formState !== 'detail'?
                    <select className='ui-select' name='useYn' onChange={fnInputChange} value={params.useYn}>
                      <option value='Y'>사용</option>
                      <option value='N'>미사용</option>
                    </select>
                    : params.useYn === 'Y'? '사용' : '미사용'
                  }
                  </td>
                  <th>서비스이용국가</th>
                  <td>
                    [ X ]
                  </td>
                </tr>
                { formState !== 'reg' && (
                  <>
                  <tr>
                    <th>최종수정일시</th>
                    <td>
                      {params.updDt}
                    </td>
                    <th>최종수정자</th>
                    <td>
                    {params.updUserCd}
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일시</th>
                    <td>
                    {params.regDt}
                    </td>
                    <th>최초등록자</th>
                    <td>
                    {params.regUserCd}
                    </td>
                  </tr>
                  </>
                )
                }
                <tr>
                  <th>언어</th>
                  <td colSpan="3">
                    <table className="ui-table__th--bg-gray mt-5 ui-register-form">
                      <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                      </colgroup>
                      {
                        params.arrLangObj.map(item => 
                          <tr>
                            <th>{item.langCdDesc}</th>
                            <td>
                              { formState !== 'detail'?
                              <input type="text" className="ui-input ui-input__width--full" placeholder='표시명 입력' name={item.langCd} onChange={inputLangChange}
                                value={item.langNm? item.langNm : ''}/>
                              : 
                              item.langNm
                              }
                            </td>
                          </tr>
                        )
                      }
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='d-flex'>
              { formState !== 'detail'? 
              <>
                <button type="button" className="ui-button ui-button__bg--blue" onClick={fnCodeSave}>저장</button>
                <button type="button" className="ui-button ui-button__bg--gray ml-10" onClick={()=>fnChangeFormState('init')}>취소</button>
              </>
              :
              <>
                <button type="button" className="ui-button ui-button__bg--blue" onClick={()=>fnChangeFormState('upd')}>수정</button>
              </>
              }
            </div>
          </div>
          :
          <div className='mt-50'>
            좌측 목록 영역의 관리 유형을 선택 혹은 추가해주세요
          </div>
          }
        </div>

      </div>

      <div className='width-p32 mt-20'>
        <button type="button" className="ui-button ui-button__border--blue ui-button__width--full" onClick={()=>fnChangeFormState('reg')}>추가</button>
      </div>

    </>
  )
}

export default CodeMstRegister