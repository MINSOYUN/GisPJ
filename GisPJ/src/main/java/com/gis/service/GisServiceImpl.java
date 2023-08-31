package com.gis.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gis.mapper.GisMapper;
import com.gis.vo.GisVO;

@Service
public class GisServiceImpl implements GisService {
	
	@Autowired
	GisMapper mapper;
	
	@Override
	public List<GisVO> gisList() {
		return mapper.gisList();
	}
	
	 
	 public GisVO getCarInfo(GisVO vo) {
		 return mapper.getCarInfo(vo);
	    }

}
