import React, { useState } from 'react'
import { Tree, getBackendOptions, MultiBackend } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'
import MenuTreeViewInner from '/@components/common/MenuTreeViewInner'

const TreeView = () => {
  const treeData = [
    {
      "id": 1,
      "parent": 0,
      "level": 0,
      "droppable": true,
      "text": "CMS"
    },
    {
      "id": 2,
      "parent": 1,
      "level": 1,
      "droppable": true,
      "text": "회원관리",
      
    },
    {
      "id": 3,
      "parent": 2,
      "level": 2,
      "text": "회원목록",
    },
    {
      "id": 4,
      "parent": 1,
      "level": 1,
      "droppable": true,
      "text": "게시판관리"
    },
    {
      "id": 5,
      "parent": 4,
      "level": 2,
      "text": "공지사항관리"
    },
    {
      "id": 6,
      "parent": 4,
      "level": 2,
      "text": "FAQ관리"
    },
    {
      "id": 7,
      "parent": 4,
      "level": 2,
      "text": "1:1문의관리"
    },
    {
      "id": 8,
      "parent": 4,
      "level": 2,
      "text": "서비스약관관리"
    },
    {
      "id": 9,
      "parent": 4,
      "level": 2,
      "text": "Contact Us 관리"
    },
    {
      "id": 10,
      "parent": 1,
      "level": 1,
      "droppable": true,
      "text": "시스템관리"
    },
    {
      "id": 11,
      "parent": 10,
      "level": 2,
      "text": "국가(언어)관리"
    },
    {
      "id": 12,
      "parent": 10,
      "level": 2,
      "text": "FAQ유형관리"
    },
  ]

  const [ treeList, setTreeList ] = useState(treeData)
  const [ selectedNode, setSelectedNode ] = useState(null)
  const fnHandleDrop = (newTreeData) => {
    setTreeList(newTreeData)
  }

  const fnHandleSelect = (node) => {
    node.id === selectedNode?.id ? setSelectedNode(null) : setSelectedNode(node)
  }

  return (
    <div className="ui-tree__wrapper">
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Tree
          tree={treeList}
          rootId={0}
          onDrop={fnHandleDrop}
          enableAnimateExpand={true}
          sort={false}
          insertDroppableFirst={false}
          canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          initialOpen={true}
          classes={{
            root: 'ui-tree',
          }}
          dropTargetOffset={5}
          render={(node, { depth, isOpen, onToggle}) => (
            <MenuTreeViewInner
              node={node}
              depth={depth}
              isOpen={isOpen}
              isSelected={node.id === selectedNode?.id}
              onToggle={onToggle}
              onSelect={fnHandleSelect}
            />
          )}
        />
      </DndProvider>
    </div>
  )
}

export default React.memo(TreeView)