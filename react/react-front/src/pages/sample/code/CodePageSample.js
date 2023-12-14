import React from 'react'
import { useNavigate } from 'react-router-dom'
import TotalCount from '/@components/common/TotalCount'
import InputDateRangePicker from '/@components/common/InputDateRangePicker'

const CodePageSample = () => {
	const navigate = useNavigate()
	return (
	<>
		<section className="search-bar">
      <table className="search-table">
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
				<div className="d-flex">
					<select className='ui-select mr-5'>
						<option>전체</option>
					</select>
					<InputDateRangePicker/>
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
                  <select className="ui-select ui-select__width--full" name='useYn'>
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
                  <select className="ui-select" name='keywordType'>
                    <option value='mstCdNm'>관리유형</option>
                  </select>
                  <input type="text" className="ui-input ui-input__width--full" placeholder='검색어 입력' name='keyword'/>
                  <button type="button" className="ui-button ui-button__bg--blue">
                    검색
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <TotalCount totalCount="1252" />
        </tbody>
      </table>
    </section>
		<div className="d-flex-between">
			<div className="width-p48">
				<section className="search-bar">
					<table className="search-table search-table__transparent">
						<colgroup>
							<col width="15%" />
							<col width="85%" />
						</colgroup>
						<tbody>
							<tr>
								<th>검색조건</th>
								<td className="d-flex-between">
									<input type="text"
										className="ui-input ui-input__width--p87"
										name="keyword"
									/>
									<button type="button"
										className="ui-button ui-button__bg--blue"
										onClick={() => navigate('/sample/registerPageSample')}
									>
										검색
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				<div className="ui-table__wrap mt-10">
					<table className="ui-table text-center ui-table__td--40">
						<colgroup>
							<col width="10%" />
							<col width="25%" />
							<col width="*" />
							<col width="10%" />
							<col width="10%" />
						</colgroup>
						<thead>
							<tr>
								<th>No.</th>
								<th>코드</th>
								<th>코드명</th>
								<th>정렬</th>
								<th>
									<div className="d-flex-center">
										<button type="button" className="btn-circle-plus"></button>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>USER_STATUS</td>
								<td>회원상태</td>
								<td>
									<div className="d-flex-center">
										<button type="button" className="btn-sorting"></button>
									</div>
								</td>
								<td>
									<div className="d-flex-center">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td>2</td>
								<td>USER_STATUS</td>
								<td>회원상태</td>
								<td>
									<div className="d-flex-center">
										<button type="button" className="btn-sorting"></button>
									</div>
								</td>
								<td>
									<div className="d-flex-center">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className="width-p48">
				<section className="search-bar">
					<table className="search-table search-table__transparent">
						<colgroup>
							<col width="15%" />
							<col width="85%" />
						</colgroup>
						<tbody>
							<tr>
								<th>검색조건</th>
								<td>
									<input type="text"
										className="ui-input ui-input__width--p87"
										name="keyword"
									/>
									<button type="button"
										className="ui-button ui-button__bg--blue"
									>
										검색
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				<div className="ui-table__wrap mt-10">
					<table className="ui-table text-center ui-table__td--40">
						<colgroup>
							<col width="10%" />
							<col width="20%" />
							<col width="*" />
							<col width="10%" />
						</colgroup>
						<thead>
							<tr>
								<th>No.</th>
								<th>코드</th>
								<th>코드명</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</>
	)
}

export default React.memo(CodePageSample)