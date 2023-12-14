/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react'

const Pagination = (props) => {
	const { page, fnSearch } = props
	
	const [ nowPageNo, setNowPageNo ] = useState(page.nowPageNo)
	const [ pageSize, setPageSize ] = useState(page.pageSize)
	const fnPaginationPrev = () => {
		if (nowPageNo === 1) {
			return
		}

		setNowPageNo(nowPageNo - 1)
	}

	const fnPaginationNext = () => {
		if (nowPageNo === page.totalPageCnt) {
			return
		}

		setNowPageNo(nowPageNo + 1)
	}

	const fnChangePageNum = (pg) => {
		setNowPageNo(pg)
		fnSearch(pg)
	}

	const fnChangePageSize = (e) => {
		const pgSize = Number(e.target.value)
		setPageSize(pgSize)
		fnSearch(1, pgSize)
	}
	
	return (
		<>
		{
			page	&& page.totalCnt > 0 &&
			<div>
				<div>
					<div className="ui-select-block">
						<select
							className="ui-select ui-select__width--110"
							value={pageSize}
							onChange={(e) => fnChangePageSize(e)}
						>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
				</div>
				<div className="pagination">
					<div className="pagination__inner">
						<a className="paging paging-prev" onClick={() => fnPaginationPrev()}></a>
						{Array.from(Array(page.totalPageCnt).keys(), n => 
							<a className={nowPageNo === (n + 1) ? 'paging is-active' : 'paging'}
								key={n}
								onClick={() => fnChangePageNum(n+1)}
							>
								{ n + 1 }
							</a>
						)
						}
						<a className="paging paging-next" onClick={() => fnPaginationNext()}></a>
					</div>
				</div>
			</div>
			}
			</>
	)
}

export default Pagination