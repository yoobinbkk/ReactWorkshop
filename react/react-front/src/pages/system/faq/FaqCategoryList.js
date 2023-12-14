import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputDateRangePicker from '/@components/common/InputDateRangePicker'

const FaqCategoryList = () => {
  const navigate = useNavigate()

  const [params, setParams] = useState({
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

  const goPage = (path, pageParams) => {
    navigate(path, { state: pageParams });
  }

  return (
    <>
      <h2>시스템관리 &gt; FAQ유형관리</h2>
      <section className="search-bar">
        <table className="search-table">
          <colgroup>
            <col width="15%" />
            <col width="35%" />
            <col width="15%" />
            <col width="35%" />
          </colgroup>
          <tbody>
            <tr>
              <th>검색기간</th>
              <td colSpan="3">
                <div className="d-flex">
                  <select className='ui-select mr-5'>
                    <option>전체</option>
                  </select>
                  <InputDateRangePicker />
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
                </div>

              </td>
            </tr>
            <tr>
              <th>1차 유형</th>
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
              <th>2차 유형</th>
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
              <th>3차 유형</th>
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
                    <select className="ui-select ui-select__width--full" name='useYn'>
                      <option value=''>전체</option>
                      <option value='Y'>사용</option>
                      <option value='N'>미사용</option>
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
              <th>검색어</th>
              <td colSpan="3">
                <div className="form-flex">
                  <div className="ui-select-box d-flex">
                    <select className="ui-select" name='keywordType'>
                      <option selected>전체</option>
                      <option value='mstCdNm'>관리유형</option>
                    </select>
                    <input type="text" className="ui-input ui-input__width--full" placeholder='검색어 입력' name='keyword' />
                    <button type="button" className="ui-button ui-button__bg--blue">
                      검색
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <span>검색결과 (총 0 건)</span>
      </section>

      <div className="page-bottom">
        <div className="page-bottom__inner">
          <div className="ui-buttons ui-buttons__right">
            <>
              <button type="button" className="ui-button ui-button__border--blue" onClick={(e) => { goPage('/system/faq/FaqCategoryRegister', params.arrMstCd) }}>유형관리</button>
              <button type="button" className="ui-button ui-button__border--blue">상태변경</button>
              <button type="button" className="ui-button ui-button__bg--gray">삭제</button>
            </>
          </div>
        </div>
      </div>

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
                  <input type="checkbox" className="ui-checkbox"></input>
                  {/* <input type="checkbox" className="ui-checkbox" id="check1"
                    onChange={(e) => allCheckBoxHandler(e.target.checked)} checked={codeList.length !== 0 && codeList.length === params.arrMstCd.length} /> */}
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
              <tr>
                <td>
                  {/* <input type="checkbox" className="ui-checkbox" id={'check' + index} name='arrMstCd' value={item.mstCd}
                          onChange={(e) => checkBoxHandler(e.target.value, e.target.checked)}
                          checked={params.arrMstCd.includes(item.mstCd) ? true : false} /> */}
                </td>
                <td>
                  {/* {item.rowNum} */}
                </td>
                <td>
                  {/* <a href='javascript:void(0)' onClick={(e) => { goPage('/system/code/codeSubReg', { mstCd: item.mstCd, mstCdNm: item.mstCdNm }) }}>{item.mstCdNm}</a> */}
                </td>
                <td>
                  {/* {item.mstCdDesc} */}
                </td>
                <td>
                  {/* <a href='javascript:void(0)' onClick={(e) => { goPage('/system/code/codeSubReg', { mstCd: item.mstCd, mstCdNm: item.mstCdNm }) }}>{item.subCodeCnt}</a> */}
                </td>
                <td>
                  {/* {item.langCd} */}
                </td>
                <td>
                  {/* {item.useYn === 'Y' ? '사용' : '미사용'} */}
                </td>
                <td>
                  {/* {item.updDt} */}
                </td>
                <td>
                  {/* {item.updUserCd} */}
                </td>
                <td>
                  {/* {item.regDt} */}
                </td>
                <td>
                  {/* {item.regUserCd} */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default FaqCategoryList;