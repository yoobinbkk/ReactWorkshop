import React from "react";

const FaqCategoryRegPop = () => {
  return (
    <>
      <table className="ui-table__th--bg-gray mt-5 ui-register-form">
        <colgroup>
          <col width="15%" />
          <col width="35%" />
          <col width="15%" />
          <col width="35%" />
        </colgroup>
        <tbody>
          <tr>
            <th>COLUMN 1</th>
            <td>
              <div className="ui-radio__inner">
                <div className="ui-radio-block">
                  <input type="radio" className="ui-radio" id="radio3" name="radio3" />
                  <label className="ui-label" htmlFor="radio3">
                    <span className="ui-radio-object"></span>
                    <span className="ui-label__text">New</span>
                  </label>
                </div>
                <div className="ui-radio-block">
                  <input type="radio" className="ui-radio" id="radio4" name="radio3" />
                  <label className="ui-label" htmlFor="radio4">
                    <span className="ui-radio-object"></span>
                    <span className="ui-label__text">AD</span>
                  </label>
                </div>
              </div>
            </td>
            <th>COLUMN 2</th>
            <td>
              <div className="ui-checkbox__list">
                <div className="ui-checkbox__inner">
                  <div className="ui-checkbox-block">
                    <input type="checkbox" className="ui-checkbox" id="check3" />
                    <label htmlFor="check3" className="ui-label">
                      <span className="ui-checkbox-object"></span>
                      <span className="ui-label__text">CHECK 1</span>
                    </label>
                  </div>
                  <div className="ui-checkbox-block">
                    <input type="checkbox" className="ui-checkbox" id="check4" />
                    <label htmlFor="check4" className="ui-label">
                      <span className="ui-checkbox-object"></span>
                      <span className="ui-label__text">CHECK 2</span>
                    </label>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>COLUMN 3</th>
            <td>
              <div className="form-flex">
                <div className="ui-input-box ui-form-box__width--230">
                  <input type="text" className="ui-input ui-input__width--full" />
                </div>
              </div>
            </td>
            <th>COLUMN 4</th>
            <td>
              <div className="ui-select-box ui-form-box__width--230">
                <select className="ui-select ui-select__width--full">
                  <option>선택</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <th>COLUMN 5</th>
            <td colSpan="3">
              <div className="form-flex">
                <div className="ui-input-box ui-form-box__width--full">
                  <textarea className="ui-textarea"></textarea>
                </div>
              </div>
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
    </>
  )
}

export default FaqCategoryRegPop