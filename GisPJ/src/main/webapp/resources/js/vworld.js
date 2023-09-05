// dom ready
$(document).ready(function() {
    init();
    
});

function init() {

    // 좌표계 설정
    initProj();

    // map 생성
    var map = new ol.Map({
        
        target: 'map',                          // Map 생성할 div id
        view: new ol.View({
        	 center: ol.proj.transform([127.1775537, 37.2410864], 'EPSG:4326', 'EPSG:900913'),
             zoom: 10,
             minZoom : 0,
             maxZoom : 21
        }),
        logo: false,
        controls: ol.control.defaults({
            attribution: false
        }),
    });
    
    // 배경지도 레이어 추가
    addBaseLayer(map);

    // 배경지도 선택 select
    initBaseLayerSelect(map);

    var FullScreen = new ol.control.FullScreen();
    map.addControl(FullScreen);

    addNewLayer(map);

}


// 이곳에 geoServer의 레이어 추가
function addNewLayer(map) {
	
	var cleanLayers = []; // 현재 표시 중인 Clean_O와 Clean_X 레이어를 저장할 배열
	
	// 날짜 '확인' 버튼 눌렀을 때
	$("#confirmButton").click(function() {
		console.log('확인');
		
		// 날짜에 따른 운행시간과 청소 비율 계산
	    const date = document.getElementById('selectedDate').value;   // 날짜
	    const car_num = document.querySelector('.carNum').textContent;   // 차량번호

	    const url = '/gis/carinfo';
	    const data = {car_num: car_num, date : date};
	  
	    console.log('car_num : ',car_num);
	    console.log('date : ',date);
	    
	 // 데이터 전송을 위한 fetch 요청
	    try {
	        fetch(url, {
	            method: 'post', 
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify(data)
	        })
	        .then(response => response.json())
	        .then(info => {
	        	
        	    // 데이터가 없는 경우 응답 확인
	        	if (!info || (info.time == '00:00:00' && info.ratio == 0)) {
	                alert('데이터가 없습니다.');
	                document.getElementById('time').innerText = '데이터 없음';
	                document.getElementById('ratio').innerText = '데이터 없음';
	                return;
	            }
	            
	        	var ratio = info.ratio;
	            var time = info.time;

	            // ratio와 time 값을 활용하여 원하는 작업 수행
	            console.log('ratio:', ratio);
	            console.log('time:', time);
	            
	            // 변수 값으로 화면에 출력
	            document.getElementById('time').innerText = time;
	            document.getElementById('ratio').innerText = ratio;
	            
	        });
	    } catch(e) {
	    	
	        console.log('fetchPost', e);
	    }

	     
	    
	    var Clean_O = new ol.layer.Tile({
	        source: new ol.source.TileWMS({
	            url: 'http://localhost:8080/geoserver/opengis/wms',
	            params: {
	            'layers' : 'opengis:Clean_O',
	            'tiled' : 'true',
	            'viewparams': 'date:' + date + '; car_num:' + car_num // 올바른 파라미터 형식
	            },
	            serverType: 'geoserver'
	        })
	     })

	     var Clean_X = new ol.layer.Tile({
	        source: new ol.source.TileWMS({
	            url: 'http://localhost:8080/geoserver/opengis/wms',
	            params: {
	            'layers' : 'opengis:Clean_X',
	            'tiled' : 'true',
	            'viewparams': 'date:' + date + '; car_num:' + car_num
	            },
	            serverType: 'geoserver'
	        })
	     })
	    
	    var path = new ol.layer.Tile({
	        source: new ol.source.TileWMS({
	            //Vworld Tile 변경
	            url: 'http://localhost:8080/geoserver/opengis/wms',
	            params: {
	            'layers' : 'opengis:route',
	            'tiled' : 'true',
	            'viewparams': 'date:' + date + '; car_num:' + car_num
	            },
	            serverType: 'geoserver'
	        })
	     })
	    
	    
      // point 넘버링
        var startPoint = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/opengis/wms',
                params: {
                    'layers': 'opengis:startPoint',
                    'tiled': 'true',
                    'viewparams': 'date:' + date + '; car_num:' + car_num
                },
                serverType: 'geoserver',
            })
        });
	    
	 // point 넘버링
        var endPoint = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/opengis/wms',
                params: {
                    'layers': 'opengis:endPoint',
                    'tiled': 'true',
                    'viewparams': 'date:' + date + '; car_num:' + car_num
                },
                serverType: 'geoserver',
            })
        });

	    
	    // Clean_O -> 중복된 레이어가 있는지 확인하고 제거
	    cleanLayers.forEach(layer => {
	        map.removeLayer(layer);
	    });
	    
	    
	    // 배열에 추가
	    cleanLayers.push(Clean_O);
	    cleanLayers.push(Clean_X);
	    cleanLayers.push(path);
	    cleanLayers.push(startPoint);
	    cleanLayers.push(endPoint);
	    
	    
	    map.addLayer(Clean_O);
	    map.addLayer(Clean_X);
	    map.addLayer(path);
	    map.addLayer(startPoint);
	    map.addLayer(endPoint);
	});
	
    
    // 용인시
    var boundary = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: 'http://localhost:8080/geoserver/opengis/wms',
            params: {
            'layers' : 'opengis:MAP',
            'tiled' : 'true'
            },
            serverType: 'geoserver'
        })
     })

     // 링크
     var link = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: 'http://localhost:8080/geoserver/opengis/wms',
            params: {
            'layers' : 'opengis:LINK',
            'tiled' : 'true'
            },
            serverType: 'geoserver'
        })
     })

     // 노드
     var node = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: 'http://localhost:8080/geoserver/opengis/wms',
            params: {
            'layers' : 'opengis:NODE',
            'tiled' : 'true'
            },
            serverType: 'geoserver'
        })
     })

     // 주유소
     var gas = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: 'http://localhost:8080/geoserver/opengis/wms',
            params: {
            'layers' : 'opengis:주유소',
            'tiled' : 'true'
            },
            serverType: 'geoserver'
        })
     })

     // 초등학교
     var ELSchool = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: 'http://localhost:8080/geoserver/opengis/wms',
            params: {
            'layers' : 'opengis:ELSchool',
            'tiled' : 'true'
            },
            serverType: 'geoserver'
        })
     })

     // 고등학교
     var HSchool = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: 'http://localhost:8080/geoserver/opengis/wms',
            params: {
            'layers' : 'opengis:HSchool',
            'tiled' : 'true'
            },
            serverType: 'geoserver'
        })
     })
    
    
    
     map.addLayer(boundary);
//      map.addLayer(link);
//      map.addLayer(node);
    //  map.addLayer(gas);
    //  map.addLayer(ELSchool);
    //  map.addLayer(HSchool);
}



function initProj() {

    // google 좌표계
    proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs');

    // UTM-K 좌표계
    proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

    // 중부원점(GRS80) [200,000 500,000]
    proj4.defs('EPSG:5181', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs');

}

function addBaseLayer(map) {

    var vworldBaseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection : 'EPSG:3857',
            url : 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_base',
        visible: false
    });
    map.addLayer(vworldBaseLayer);

    // vworld satellite
    var vworldSatelliteLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection : 'EPSG:3857',
            url : 'https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_satellite',
        visible: false
    });
    map.addLayer(vworldSatelliteLayer);

    // vworld hybrid
    var vworldHybridLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection : 'EPSG:3857',
            url : 'https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_hybrid',
        visible: false
    });
    map.addLayer(vworldHybridLayer);

}

function initBaseLayerSelect(map) {

    // add select option
    var html = '';
    $.each(map.getLayers().getArray(), function(i, v) {
        html += '<option value="' + v.get('id') + '">' + v.get('id') + '</option>';
    });
    $('#baseLayer').append(html);

    // select event
    $('#baseLayer').change(function() {
        var layerId = $(this).val();
        $.each(map.getLayers().getArray(), function(i, v) {
            if (v.get('id') && v.get('id').startsWith('vworld_')) { // vworld_로 시작하는 레이어만 처리
                if (layerId == v.get('id')) {
                    v.setVisible(true);
                } else {
                    v.setVisible(false);
                }
            }
        });
    });

    // 초기값
    $('#baseLayer').val('vworld_base').trigger('change');

}

// 지도 버전 변경
$(function(){

    $('#normal').click(function(){

        $('#baseLayer').val('vworld_base').trigger('change');
    });


    $('#wisung').click(function(){

        $('#baseLayer').val('vworld_satellite').trigger('change');
    });

    $('#hybrid').click(function(){

        $('#baseLayer').val('vworld_hybrid').trigger('change');
    });

});
