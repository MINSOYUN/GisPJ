package com.gis.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gis.vo.GisVO;

@Service
public interface GisService {
	public List<GisVO> gisList();

	public GisVO getCarInfo(GisVO vo);
}
