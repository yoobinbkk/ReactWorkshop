import React from 'react'
import commonUtil from '/@utils/commonUtil'

const TotalCount = (props) => {
  const { totalCount } = props

  return (
    <tr className="search-counter-area">
      <td colSpan="4">
        <div>검색결과 총 <span className="search-counter">{ commonUtil.changeNumberFormat(totalCount, { isComma: true }) }</span> 건</div>
      </td>
    </tr>
  )
}

export default TotalCount
