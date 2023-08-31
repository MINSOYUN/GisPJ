package com.gis.vo;

import lombok.Data;

@Data
public class GisVO {
	private String gid;
	private String lon;  // 경도
	private String lat;   // 위도
	private String date;
	private String time;
	private String geom;
	private String car_num;
	private String noise;
	private String rpm;
	
	private String ratio;
}
