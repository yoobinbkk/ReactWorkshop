import React from 'react'
import useInputs from '/@hooks/common/useInputs'
import useSampleApi from '/@apis/sample/useSampleApi'
import { useQueryCustom } from '/@hooks/common/useQueryCustom'
import Pagination from '/@components/common/Pagination'

const SampleList = () => {
	const {params, fnInputChange} = useInputs({
		keyword: '',
		nowPageNo: 1,
		pageSize: 10,
	})

	const { getIngreInfoList } = useSampleApi()
	const { isLoading, data: resultData, refetch } = useQueryCustom({
		queryKey: 'getIngreInfoList',
		queryFn: getIngreInfoList,
		params
	})
	
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

	return (
		<>
			<section className="search-bar">
				<table className="search-table search-table__transparent">
					<colgroup>
						<col width="10%" />
						<col width="40%" />
						<col width="10%" />
						<col width="40%" />
					</colgroup>
					<tbody>
						<tr>
							<th>검색조건</th>
							<td>
								<input type="text"
									className="ui-input ui-input__width--240"
									name="keyword"
									value={params.keyword}
									onChange={fnInputChange}
									onKeyDown={fnKeyDownEnterSearch}
								/>
								<button type="button"
									className="ui-button ui-button__bg--blue"
									onClick={() => fnSearch(1)}
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
						<col width="5%" />
						<col width="10%" />
						<col width="*" />
						<col width="15%" />
						<col width="15%" />
					</colgroup>
					<thead>
						<tr>
							<th>No.</th>
							<th>성분코드</th>
							<th>성분명</th>
							<th>작성자</th>
							<th>작성일</th>
						</tr>
					</thead>
				{!isLoading &&
					<tbody>
					{resultData && resultData.list && resultData.list.length > 0
						?
						resultData.list.map((result, index) => (
							<tr key={ result.ingreSeq }>
								<td>{ resultData.page.totalCnt - ((resultData.page.pageSize * (resultData.page.nowPageNo - 1)) + index ) }</td>
								<td>{ result.ingreCd }</td>
								<td className="text-left">{ result.ingreNm }</td>
								<td>{ result.regUserCd }</td>
								<td>{ result.regDt }</td>
							</tr>
						))
						:
						<tr>
							<td colSpan="5">데이터가 없습니다.</td>
						</tr>
					}
					</tbody>
				}
				</table>
				{
					!isLoading && resultData && resultData.page &&
						<div className="board-bottom">
							<div className="board-bottom__inner board-bottom__with--form">
								<Pagination page={resultData.page} fnSearch={fnSearch}/>
							</div>
						</div>
				}
			</div>
		</>
	)
}

export default React.memo(SampleList)