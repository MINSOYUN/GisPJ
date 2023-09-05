package com.gis.Test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gis.service.GisService;
import com.gis.vo.GisVO;

import lombok.extern.log4j.Log4j;

@Log4j
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class serviceTeste {
	
	@Autowired
	GisService service;
	
	@Test
	public void getCarInfo() {
		GisVO vo = new GisVO();
		vo.setCar_num("103하2414");
		vo.setDate("2023-08-29");
		GisVO list = service.getCarInfo(vo);
		log.info("=======================");
		log.info("list : " + list);
	}

}
