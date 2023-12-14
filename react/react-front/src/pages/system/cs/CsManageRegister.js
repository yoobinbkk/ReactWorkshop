import React, { useEffect, useState } from "react";
import useCsManageApi from "/@apis/system/cs/csManageApi";
import useInputs from '/@hooks/common/useInputs';
import useModal from '/@hooks/common/useModal';

const CsManageRegister = () => {

  const { findCsManageDetail, findCsManageLangList, insertCsCode} = useCsManageApi()

  const [selectedDepth1, setSelectedDepth1] = useState(null)
  const [selectedDepth2, setSelectedDepth2] = useState(null)
  const [selectedDepth3, setSelectedDepth3] = useState(null)
  const [categoryDetail, setCategoryDetail] = useState(null)

  const [formState, setFormState] = useState('init')
  const { fnAlertOpen, fnPopupOpen } = useModal()
  const [depthNo, setDepthNo] = useState(null);

  const fnChangeFormState = (state) => {
    if (state === 'reg') {
      setCategoryDetail({
        ...categoryDetail,
        categoryNm: '',
        categoryCd: '',
        nationCd: '',
        langCd: '',
        useYn: 'Y',
        regDt: '',
        regUserCd: '',
        updDt: '',
        updUserCd: '',
        ucategoryCd: ''
      })
    }
    setFormState(state);
  }

  const addButton1 = () => {
    setDepthNo('1차')
    fnChangeFormState('reg')
  };

  const addButton2 = () => {
    if (selectedDepth1 === null) {
      fnAlertOpen({ message: '1차 유형을 선택해주세요.' })
    } else {
      setDepthNo('2차')
      fnChangeFormState('reg')
      setCategoryDetail({
        ucategoryCd: selectedDepth1
      })
    }
  }

  const addButton3 = () => {
    if (selectedDepth2 === null) {
      fnAlertOpen({ message: '2차 유형을 선택해주세요.' })
    } else {
      setDepthNo('3차')
      fnChangeFormState('reg')
      setCategoryDetail({
        ucategoryCd: selectedDepth2
      })
    }
  }

  // console.log(formState)

  const inputChange = (e) => {
    setCategoryDetail({
      ...categoryDetail,
      [e.target.name]: e.target.value
    })
  }

  const [params, fnInputChange] = useInputs({
    keyword: '',
    nowPageNo: 1,
    pageSize: 10,
  })

  const { isLoading, data: resultData, refetch } = useCsManageApi({ params })

  const loadCategoryDetail = async (categoryCd, depth) => {
    try {
      const detailData = await findCsManageDetail({ categoryCd });
      setCategoryDetail(detailData);
    } catch (error) {
      console.error('Error fetching category detail:', error);
    }
  };

  useEffect(() => {
    const selectDepthData = async () => {
      if (selectedDepth3) {
        await loadCategoryDetail(selectedDepth3, 2);
      } else if (selectedDepth2) {
        await loadCategoryDetail(selectedDepth2, 1);
      } else if (selectedDepth1) {
        await loadCategoryDetail(selectedDepth1, 0);
      }
      fnChangeFormState('detail');
    };
    selectDepthData();

  }, [selectedDepth1, selectedDepth2, selectedDepth3]);

  const handleDepth1Click = (categoryCd) => {
    if (categoryCd !== selectedDepth1) {
      setSelectedDepth1(categoryCd);
      setSelectedDepth2(null);
      setSelectedDepth3(null);
    }
  };

  const handleDepth2Click = (categoryCd) => {
    if (categoryCd !== selectedDepth2) {
      setSelectedDepth2(categoryCd);
      setSelectedDepth3(null);
    }
  };

  const handleDepth3Click = (categoryCd) => {
    if (categoryCd !== selectedDepth3) {
      setSelectedDepth3(categoryCd);
    }
  };

  const fnSearch = (pg, pgSize = 10) => {
    params.nowPageNo = pg
    params.pageSize = pgSize
    refetch()
  }

  // 저장
  const handleSave = async () => {
    try {
      if (categoryDetail.categoryCd === '') {
        fnAlertOpen({ message: '관리코드를 입력해주세요.' })
      } else if (categoryDetail.categoryNm === '') {
        fnAlertOpen({ message: '유형명을 입력해주세요.' })
      } else if (categoryDetail.nationCd === '') {
        fnAlertOpen({ message: '서비스 이용국가를 입력해주세요.' })
      } else {
        const result = await findCsManageDetail(categoryDetail);
        console.log('Save result:', result);
        if (result === undefined) {
          fnAlertOpen({ message: '필수 값 입력' })
        }
      }
      // refetch();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
    <h2>시스템관리 &gt; 문의유형관리 &gt; 유형관리</h2>
    <div>
      <div className="d-flex-between">
        <div className="width-p32">
          <div className="ui-table__wrap mt-10">
            <table className="ui-table text-center ui-table__td--40">
              <colgroup>
                <col width="*" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th>1차 문의 유형</th>
                  <th>
                    <div className="d-flex">
                      <button type="button" className="btn-circle-plus" onClick={addButton1}></button>
                    </div>
                  </th>
                </tr>
              </thead>
              {!isLoading && (
                <tbody>
                  {resultData && resultData.length > 0 ? (
                    resultData
                      .filter(result => result.depth === '0')
                      .map((result, index) => (
                        <tr key={result.categoryCd}>
                          <td
                            className="text-left"
                            onClick={() => handleDepth1Click(result.categoryCd)}
                          >{result.categoryNm}</td>
                          <td>
                            <div className="d-flex">
                              <button type="button" className="btn-circle-close"></button>
                            </div>
                          </td>
                        </tr>
                      ))) :
                    <tr>
                      <td>
                        데이터가 없습니다.
                      </td>
                    </tr>
                  }
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="width-p32">
          <div className="ui-table__wrap mt-10">
            <table className="ui-table text-center ui-table__td--40">
              <colgroup>
                <col width="*" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th>2차 문의 유형</th>
                  <th>
                    <div className="d-flex">
                      <button type="button" className="btn-circle-plus" onClick={addButton2}></button>
                    </div>
                  </th>
                </tr>
              </thead>
              {!isLoading && selectedDepth1 && (
                <tbody>
                  {resultData && resultData.length > 0 ? (
                    resultData
                      .filter(result => result.depth === '1' && result.ucategoryCd === selectedDepth1)
                      .map((result, index) => (
                        <tr key={result.categoryCd}>
                          <td
                            className="text-left"
                            onClick={() => handleDepth2Click(result.categoryCd)}
                          >{result.categoryNm}</td>
                          <td>
                            <div className="d-flex">
                              <button type="button" className="btn-circle-close"></button>
                            </div>
                          </td>
                        </tr>
                      ))) :
                    <tr>
                      <td>
                        데이터가 없습니다.
                      </td>
                    </tr>
                  }
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="width-p32">
          <div className="ui-table__wrap mt-10">
            <table className="ui-table text-center ui-table__td--40">
              <colgroup>
                <col width="*" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th>3차 문의 유형</th>
                  <th>
                    <div className="d-flex">
                      <button type="button" className="btn-circle-plus" onClick={addButton3}></button>
                    </div>
                  </th>
                </tr>
              </thead>
              {!isLoading && selectedDepth2 && (
                <tbody>
                  {resultData && resultData.length > 0 ? (
                    resultData
                      .filter(result => result.depth === '2' && result.ucategoryCd === selectedDepth2)
                      .map((result, index) => (
                        <tr key={result.categoryCd}>
                          <td
                            className="text-left"
                            onClick={() => handleDepth3Click(result.categoryCd)}
                          >{result.categoryNm}</td>
                          <td>
                            <div className="d-flex">
                              <button type="button" className="btn-circle-close"></button>
                            </div>
                          </td>
                        </tr>
                      ))) :
                    <tr>
                      <td>
                        데이터가 없습니다.
                      </td>
                    </tr>
                  }
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div>
        </div>
      </div>

      <div className="d-flex-between">
      </div>
      <div className="ui-table__wrap mt-200">
        <table className="ui-table__th--bg-gray mt-5 ui-register-form">
          <colgroup>
            <col width="15%" />
            <col width="18%" />
            <col width="15%" />
            <col width="18%" />
            <col width="10%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            {categoryDetail && formState === 'detail' || formState === 'reg' ? (
              <>
                {formState === 'reg' ?
                  <>
                    <tr>
                      <td>{depthNo} 유형 등록</td>
                    </tr>
                  </>
                  :
                  <tr>
                    <td>상세 보기</td>
                  </tr>
                }
                <tr>
                  <th>유형명</th>
                  <td>
                    {formState === 'reg' ?
                      <input type="text" className="ui-input ui-input__width--full" placeholder="유형명 입력" name="categoryNm" onChange={inputChange} value={categoryDetail.categoryNm} />
                      : categoryDetail.categoryNm
                    }
                  </td>
                </tr>
                <tr>
                  <th>관리코드</th>
                  <td>
                    {formState === 'reg' ?
                      <input type="text" className="ui-input ui-input__width--full" placeholder="유형명 입력" name="categoryCd" onChange={inputChange} value={categoryDetail.categoryCd} />
                      : categoryDetail.categoryCd
                    }
                  </td>
                </tr>
                <tr>
                  <th>설명</th>
                  <td>
                    {formState === 'reg' ?
                      <input type="text" className="ui-input ui-input__width--full" placeholder="유형명 입력" name="categoryNm" onChange={inputChange} value={categoryDetail.categoryNm} />
                      : categoryDetail.categoryNm
                    }
                  </td>
                  <th>상위코드</th>
                  <td>
                    {formState === 'reg' ?
                      <input type="text" className="ui-input ui-input__width--full" placeholder=" " name="ucategoryCd" onChange={inputChange} value={categoryDetail.ucategoryCd} disabled />
                      : categoryDetail.ucategoryCd
                    }
                  </td>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>
                    {formState === 'reg' ?
                      <select className='ui-select' name='useYn' onChange={inputChange} value={params.useYn}>
                        <option value="Y">사용</option>
                        <option value="N">미사용</option>
                      </select>
                      : categoryDetail.useYn === 'Y' ? '사용' : '미사용'
                    }
                  </td>
                  <th>서비스 이용국가</th>
                  <td>
                    {formState === 'reg' ?
                      <input type="text" className="ui-input ui-input__width--full" placeholder="유형명 입력" name="nationCd" onChange={inputChange} value={categoryDetail.nationCd} />
                      : categoryDetail.nationCd
                    }
                  </td>
                </tr>
                {formState !== 'reg' && (
                  <>
                    <tr>
                      <th>최종수정일시</th>
                      <td>{categoryDetail.updDt}</td>
                      <th>최종수정자</th>
                      <td>{categoryDetail.updUserCd}</td>
                    </tr>
                    <tr>
                      <th>최초수정일시</th>
                      <td>{categoryDetail.regDt}</td>
                      <th>최초등록자</th>
                      <td>{categoryDetail.regUserCd}</td>
                    </tr>
                  </>
                )
                }
                <div className="d-flex">
                  {
                    formState === 'reg' ?
                      <>
                        <button type="button" className="ui-button ui-button__bg--blue" onClick={handleSave}>저장</button>
                        <button type="button" className="ui-button ui-button__bg--gray ml-10" onClick={() => fnChangeFormState('init')}>취소</button>
                      </> :
                      <>
                        <button type="button" className="ui-button ui-button__bg--blue">수정</button>
                      </>
                  }
                </div>
              </>
            ) : (
              <>
                <tr>
                  <td colSpan={20}>상단 목록 영역의 유형을 선택 혹은 추가해주세요</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default React.memo(CsManageRegister)