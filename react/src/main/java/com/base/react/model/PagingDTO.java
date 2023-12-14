package com.base.react.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PagingDTO {

    private int pageSize;

    private int totalCnt;

    private int nowPageNo;

    private int totalPageCnt;

    private int startPage;

    private int endPage;

    private int curBlock;
}
