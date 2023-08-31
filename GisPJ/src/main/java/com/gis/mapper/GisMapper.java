package com.gis.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.gis.vo.GisVO;

public interface GisMapper {
	// 차량 목록
	public List<GisVO> gisList();
	
	// 청소 비율, 운행 시간
	public GisVO getCarInfo(GisVO vo);
}
