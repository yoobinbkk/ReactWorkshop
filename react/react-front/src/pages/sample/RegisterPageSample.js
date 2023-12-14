import React from 'react'
import useModal from '/@hooks/common/useModal'
import PopupRegisterSample from '/@components/sample/PopupRegisterSample'

const RegisterPageSample = () => {
	const { fnPopupOpen } = useModal()
	const fnTestPopupOpen = () => {
		fnPopupOpen({
			title: 'test',
			content: <PopupRegisterSample />,
			popupWidth: '800px'
		})
	}
	return (
		<>
			<h2>일반페이지 등록 스타일</h2>
			<table className="ui-table__th--bg-gray mt-5 ui-register-form">
				<colgroup>
					<col width="15%"/>
					<col width="35%"/>
					<col width="15%"/>
					<col width="35%"/>
				</colgroup>
				<tbody>
					<tr>
						<th>관리코드</th>
						<td>

						</td>
						<th>서비스이용국가</th>
						<td>
							<div className="form-flex">
								<div className="ui-input-box ui-form-box__width--230">
									<input type="text" className="ui-input ui-input__width--full" />
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>서비스약관유형</th>
						<td>
							<div className="form-flex">
								<div className="ui-select-box ui-form-box__width--230">
									<select className="ui-select ui-select__width--full">
										<option>선택</option>
									</select>
								</div>
							</div>
						</td>
						<th>서비스약관버전</th>
						<td>
							<div className="form-flex">
								<div className="ui-select-box ui-form-box__width--230">
									<input type="text" className="ui-input ui-input__width--full" />
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>RADIO</th>
						<td>
							<div className="ui-radio__inner">
								<div className="ui-radio-block">
									<input type="radio" className="ui-radio" id="radio1" name="radio2" />
									<label className="ui-label" htmlFor="radio1">
										<span className="ui-radio-object"></span>
										<span className="ui-label__text">New</span>
									</label>
								</div>
								<div className="ui-radio-block">
									<input type="radio" className="ui-radio" id="radio2" name="radio2" />
									<label className="ui-label" htmlFor="radio2">
										<span className="ui-radio-object"></span>
										<span className="ui-label__text">AD</span>
									</label>
								</div>
							</div>
						</td>
						<th>CHECKBOX</th>
						<td>
							<div className="ui-checkbox__list">
								<div className="ui-checkbox__inner">
									<div className="ui-checkbox-block">
										<input type="checkbox" className="ui-checkbox" id="check1" />
										<label htmlFor="check1" className="ui-label">
											<span className="ui-checkbox-object"></span>
											<span className="ui-label__text">CHECK 1</span>
										</label>
									</div>
									<div className="ui-checkbox-block">
										<input type="checkbox" className="ui-checkbox" id="check2" />
										<label htmlFor="check2" className="ui-label">
											<span className="ui-checkbox-object"></span>
											<span className="ui-label__text">CHECK 2</span>
										</label>
									</div>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>TEXTAREA</th>
						<td colSpan="3">
							<div className="form-flex">
								<div className="ui-input-box ui-form-box__width--full">
									<textarea className="ui-textarea"></textarea>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>SUBTABLE</th>
						<td className="inside-td" colSpan="3">
							<table className="ui-table__inside">
								<colgroup>
									<col width="15%" />
								</colgroup>
								<tbody>
									<tr className="ui-table__contents--item">
										<th>column 1</th>
										<td>
										<div className="form-flex">
											<div className="ui-input-box ui-form-box__width--230">
												<input type="text" className="ui-input ui-input__width--full" />
											</div>
										</div>
										</td>
									</tr>
									<tr className="ui-table__contents--item">
										<th>column 2</th>
										<td></td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="page-bottom">
				<div className="page-bottom__inner">
					<div className="ui-buttons ui-buttons__right">
						<button type="button" className="ui-button ui-button__bg--blue">저장</button>
						<button type="button" className="ui-button ui-button__bg--gray">삭제</button>
						<button type="button" className="ui-button ui-button__border--blue">목록</button>
					</div>
				</div>
			</div>

			<h2 className="mt-10">팝업페이지 등록 스타일</h2>
			<div>
			<button type="button" className="ui-button ui-button__bg--blue" onClick={() => fnTestPopupOpen()}>팝업확인</button>
			</div>
		</>
	)
}

export default RegisterPageSample