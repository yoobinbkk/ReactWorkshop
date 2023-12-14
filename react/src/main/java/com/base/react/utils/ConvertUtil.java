package com.base.react.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

public class ConvertUtil {

    static CustomObjectMapper om = new CustomObjectMapper();

    static {
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(MultipartFile.class, new JsonSerializer<MultipartFile>() {
            @Override
            public void serialize(MultipartFile value, JsonGenerator gen, SerializerProvider serializers)
                    throws IOException {
                gen.writeBinary(value.getBytes());
            }

        });
        om.registerModule(simpleModule);
    }

    public static <T> T convert(Object src, Class<T> clz) {
        if(src == null) {
            return null;
        }

        return (T) om.convertValue(src, clz);
    }

//    public static <T> T convertWithSession(Object src, Class<T> clz, SessionUtil sessionUtil) {
//        if (src == null) {
//            return null;
//        }
//
//        T obj = (T)om.convertValue(src, clz);
//
//        if (obj instanceof ParentPagingDTO && sessionUtil != null) {
//        	ParentPagingDTO dto = (ParentPagingDTO)obj;
//            dto.setSvcNtCd(sessionUtil.getSvcNtCd());
//            dto.setSvcLangCd(sessionUtil.getSvcLangCd());
//            dto.setRegId(sessionUtil.getMemId());
//            dto.setUpdId(sessionUtil.getMemId());
//        }
//        return obj;
//    }

    public static <T> List<T> convertList(List<?> src, Class<T> clz) {
        return Optional.ofNullable(src)
//            .orElseGet(() -> new ArrayList<>())
            .orElseGet(ArrayList::new)
            .stream()
            .map(v -> convert(v, clz))
            .collect(Collectors.toList());
    }

//    public static void mergeWithSession(Object obj1, Object obj2, SessionVO sessionVO) {
//        if (obj1 == null || obj2 == null) {
//            return;
//        }
//
//        obj1.getClass().getDeclaredFields();
//
//        try {
//            for (Field field : obj2.getClass().getDeclaredFields()) {
//                field.setAccessible(true);
//
//                Object val = field.get(obj2);
//                if (val != null) {
//                    switch (val.getClass().getSimpleName()) {
//                        case "Default" :
//                        case "Detail" :
//                            field.set(obj1, val);
//                        default :
//                            field.set(obj1, val);
//                    }
//                }
//            }
//        } catch (IllegalAccessException ex) {
//            ex.printStackTrace();
//        }
//
//        if (obj1 instanceof ParentEntity && sessionVO != null) {
//            ParentEntity dto = (ParentEntity)obj1;
//            dto.setUpdUserCd(sessionVO.getMemCd());
//        }
//    }
}
