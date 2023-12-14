package com.base.react.mapper.sign;

import com.base.react.config.DataBaseConnMapper;
import com.base.react.model.sign.ResSignDTO;
import com.base.react.model.sign.SignDTO;

@DataBaseConnMapper
public interface SignMapper {

	SignDTO selectAdminUserInfo(SignDTO signDTO);

}