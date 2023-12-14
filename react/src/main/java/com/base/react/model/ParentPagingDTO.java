package com.base.react.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class ParentPagingDTO extends ParentDTO {

    private int pageSize = 10;

    private int totalCnt;

    private int nowPageNo;

    private int totalPageCnt;

    private int limit;

    private int offset;

    private int startRownum;

    private int endRownum;

    private int startPage = 1;

    private int endPage = 1;

    private int curBlock = 1;
}
