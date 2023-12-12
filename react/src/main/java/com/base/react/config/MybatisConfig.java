package com.base.react.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
@MapperScan(value="com.base.react.mapper", annotationClass=DataBaseConnMapper.class)
public class MybatisConfig {
	
	
	@Value("${mybatis.mapper-locations}")
	String mapperPath;
	
	@Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource)throws Exception{
		
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		
		// datasource 정보 설정
		sqlSessionFactoryBean.setDataSource(dataSource);
		// 매퍼경로 설정
		sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(mapperPath));
		// .xml 에서 객체 fullpath 생략
		sqlSessionFactoryBean.setTypeAliasesPackage("com.base.react.model");
		
		// camelCase 자동매핑여부
		org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
	    configuration.setMapUnderscoreToCamelCase(true);
	    sqlSessionFactoryBean.setConfiguration(configuration);
		
		return sqlSessionFactoryBean.getObject();
    }
	
	@Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
	
	
	
//	@Bean
//	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		return sqlSessionFactoryBean.getObject();
//	}
//	
//	@Bean
//	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
//		return new SqlSessionTemplate(sqlSessionFactory);
//	}
	
	

}
