<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://openlayers.org/en/v5.3.0/build/ol.js"></script>
    <link rel="stylesheet"    href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
    <script>
      $(document).ready(function() {
          $(".vehicle").click(function() {
        	  const carNum = $(this).data("car-num"); // 선택한 버튼의 차량 번호 가져오기
        	  $(".carNum").text(carNum); // nonhidden 박스 내용 변경
              $("#nonhidden").show();
          });

          $(".folded").click(function() {
              $("#nonhidden").toggle();
          });
    	
          
        });
    </script>
    <style type="text/css">
    	
    </style>
    <!-- openlayers -->
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
 
    <!-- proj4js-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>
    <!-- JS -->
    <script src="\resources\js\vworld.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="\resources\css\vworld.css">
</head>
<body>
  <!-- 사이드바 -->
  <div class="sidebar">
    <div class="top-text" style="display: flex; align-items: center;">
      <img src="\resources\img\용인시.png" alt="용인시" style="margin-right: 10px; height: 50px; width: 50px;">용인시 청소 관제 시스템
    </div>
    <div class="box st">
      <img src="\resources\img\지도.PNG" alt="지도" style="margin-right: 10px; height: 25px; width: 25px; border-radius: 5px;">
        <button id="normal" class="btn btn-primary" type="button">기본</button>
        <button id="wisung"  class="btn btn-primary" type="button">위성</button>
        <button id="hybrid" class="btn btn-primary" type="button">하이브리드</button>
    </div> 

    <div class="box nd" style="padding-top: 20px; margin: 0 auto">
      <strong style="display: block; font-weight: bold;">차량 목록</strong>
      <hr>
      <c:forEach items="${list}" var="car" step="1">
	      <button class="vehicle info1" style="padding-top: 10px;" data-car-num="${car.car_num}">🚗 ${car.car_num }</button>
      </c:forEach>
    </div>
    
    <div class="box rd nonhidden" id='nonhidden'>
      <strong class="carNum">${car.car_num }</strong>
      <hr>
      <div class="details" style=" text-align:left;">
        <div style="margin: 30px 0px;">날짜선택 : <input type="date" id="selectedDate"><button class="btn btn-primary" id="confirmButton" style="padding: 3px 6px; margin-left: 8px;">확인</button></div>
        <div style="margin: 30px 0px;">운행시간 : <span id="time"></span></div>
        <div style="margin: 30px 0px;">청소비율 : <span id="ratio"></span>%</div>
        <input type="hidden" name="lon" id="lon">
        <input type="hidden" name="lat" id="lat">
      </div>
      <div>
        <button class="folded">접기</button>
      </div>
    </div>
  </div>
  
  <!-- 메인 컨텐츠 -->
  <div class="content">
    <div id="map" class="map">
      <select id="baseLayer" style='display:none;'></select>
    </div>
  </div>

</body>
</html>