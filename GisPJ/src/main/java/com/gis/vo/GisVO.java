package com.gis.vo;

import lombok.Data;

@Data
public class GisVO {
	private String gid;
	private String lon;  // 寃쎈룄
	private String lat;   // �쐞�룄
	private String date;
	private String time;
	private String geom;
	private String car_num;
	private String noise;
	private String rpm;
	
	private String ratio;
	
	private String start_lon;
	private String start_lat;
}
