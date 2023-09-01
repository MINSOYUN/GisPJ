package com.gis.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gis.service.GisService;
import com.gis.vo.GisVO;

@Controller
@RequestMapping("/gis/*")
public class GisController {
	
	@Autowired
	GisService service;
	
	@GetMapping("vworld")
	public void stayadmin(Model model) {
		try {
			List<GisVO> list = service.gisList();
			model.addAttribute("list", list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	@PostMapping("/carinfo")
    @ResponseBody
    public Map<String, Object> carinfo(@RequestBody GisVO vo) {
		GisVO info = service.getCarInfo(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("map", info);
		return map;
    }

}
