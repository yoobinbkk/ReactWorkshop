import React from 'react'


const TreeViewInner = (props) => {
  const { droppable, data } = props.node
  const indent = props.depth * 16 + 10

  const fnHandleToggle = (e) => {
    e.stopPropagation()
    props.onToggle(props.node.id)
  }

  const fnHandleSelect = () => {
    props.onSelect(props.node)
  }

  return (
    <div className={`ui-tree__node depth-${(props.depth) + 1}`}
      style={{paddingInlineStart: indent }}
      onClick={fnHandleSelect}
    >
      <div
        className={`ui-tree__icon-wrapper ${props.isOpen ? 'is-open' : ''}`}
      >
        {
          props.node.droppable && (
            <div className="ui-tree__icon" onClick={fnHandleToggle}></div>
          )
        }
      </div>
      <div className={`ui-tree__node-text ${props.isSelected ? 'is-selected' : ''}`}>{props.node.text}</div>
      <div className="ui-tree__button-area">
        {
          props.depth < 2 &&
          <button type="button" className="btn-circle-plus mr-10"></button>
        }
        <button type="button" className="btn-sorting"></button>
        <button type="button" className="btn-circle-close"></button>
      </div>
    </div>
  )
}

export default TreeViewInner