import React from 'react'

const CodePageSample2 = () => {
	return (
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
								<th>1차 FAQ 유형</th>
								<th>
									<div className="d-flex">
										<button type="button" className="btn-circle-plus"></button>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="text-left">회원 등록</td>
								<td>
									<div className="d-flex">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td className="text-left">서비스 약관</td>
								<td>
									<div className="d-flex">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
						</tbody>
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
								<th>2차 FAQ 유형</th>
								<th>
									<div className="d-flex">
										<button type="button" className="btn-circle-plus"></button>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="text-left">회원 등록</td>
								<td>
									<div className="d-flex">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td className="text-left">서비스 약관</td>
								<td>
									<div className="d-flex">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
						</tbody>
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
								<th>3차 FAQ 유형</th>
								<th>
									<div className="d-flex">
										<button type="button" className="btn-circle-plus"></button>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="text-left">회원 등록</td>
								<td>
									<div className="d-flex">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
							<tr>
								<td className="text-left">서비스 약관</td>
								<td>
									<div className="d-flex">
										<button type="button" className="btn-circle-close"></button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default React.memo(CodePageSample2)