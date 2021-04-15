import React, { useEffect, useState, useRef, useCallback } from 'react';

const Activity = () => {
//     const [distance, setdistance] = useState("")

//     return (
//         <div>
//             <div className = "distanceContainer">
//                 <span>{distance}KM</span>
//             </div>
//             <div>여기에 맵이 들어가요</div>
//         </div>
//     )
// }
    const key = process.env.REACT_APP_MAP;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    document.head.appendChild(script)


    //*****states*****
    //active state (true일 때 => loc1에 저장, false일 때 => loc2에 저장)
    const [loc1State,setLoc1State] = useState(true);

    //location 1
    window.getLoc1State = function() {  //get function
        return loc1State;
    }
    const [loc1, setLoc1] = useState({lat:0, lon:0});  //state
    window.getLoc1 = function() {
        return loc1;
    };

    //location 2
    const [loc2, setLoc2] = useState({lat:0, lon:0});  //state
    window.getLoc2 = function() {  //get function
        return loc2;
    };

    const state = useRef();
    const [activityState, setActivityState] = useState(true);

    //index
    const [index, setIndex] = useState(0)  //state
    window.getIndex = function() {  //get function
        return index;
    }
    


    //F-지도 생성
    const createMap = (lat, lon) => {
        const container = document.getElementById('map')  //지도 담을 div
        const options = {
            center: new window.kakao.maps.LatLng(lat, lon),  //지도 중심 X,Y좌표 정보를 가지고 있는 객체 생성
            level: 3,  //확대 수준, 작을수록 범위 좁아짐
        }

        const map = new window.kakao.maps.Map(container, options);  //지도 생성

        const makerPosition = new window.kakao.maps.LatLng(lat, lon);  //시작 마커 위치
        const marker = new window.kakao.maps.Marker({   //마커 생성
            position: makerPosition
        });
        marker.setMap(map)  // 마커를 지도 위에 표시

        //F-위치 받아오기 => 맵 중심 이동 => 선 생성 30초마다 반복
        const interval = setInterval(async() => {
            func();  //활동 상태
            await getLocation()
            .then((res) => {
                panTo(map, res.latitude, res.longitude);
                createLine(map);
            })
        }, 30000)

        //F-true or false check
        const func = () => {
            if(state.current.value==="true") {
                return;
            } else {
                clearInterval(interval);  //활동 중지
            }
        }
    }

    //F-지도에 표시할 선 생성
    const createLine = useCallback((map) => {
        if(window.getLoc1().lat!==0&&window.getLoc2().lat!==0) {

            const polyline = new window.kakao.maps.Polyline({
                path: [  //선을 구성하는 좌표배열 (현재 좌표와 이전 좌표)
                    new window.kakao.maps.LatLng(window.getLoc1().lat, window.getLoc1().lon),
                    new window.kakao.maps.LatLng(window.getLoc2().lat, window.getLoc2().lon)
                ],
                strokeWeight: 10, //두께
                strokeColor: '#FFAE00', //색상
                strokeOpacity: 0.7, //불투명도
                strokeStyle: 'solid' //스타일
            });

            polyline.setMap(map);  //지도에 표시
        } else {
            console.log("not ready");
        }
    },[loc1, loc2])

    //F-지도 중심 이동
    const panTo = (map, lat, lon) => {
        var moveLatLon = new window.kakao.maps.LatLng(lat, lon);  //이동할 위치 좌표 생성
        map.panTo(moveLatLon); //부드럽게 move
    }

    //F-geolocation 사용자 위치 받아오기
    const getLocation = async() => {
        if (navigator.geolocation) {  // GPS를 지원하면
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                if (window.getLoc1State()===true) {  //true: loc1에 업데이트, false: loc2에 업데이트
                    setLoc1({lat: position.coords.latitude, lon: position.coords.longitude}) //speed: coords.speed, timestamp: coords.timestamp})
                    console.log("1")
                    setLoc1State(false)
                } else {
                    setLoc2({lat: position.coords.latitude, lon: position.coords.longitude}) //speed: coords.speed, timestamp: coords.timestamp})
                    console.log("2")
                    setLoc1State(true)
                }
                localStorage.setItem('lastIndex',window.getIndex()) //로컬스토리지에 마지막 인덱스 업데이트
                console.log("lat:"+position.coords.latitude+"lon:"+position.coords.longitude)
                console.log("loc1-lat:"+window.getLoc1().lat+"loc1-lon:"+window.getLoc1().lon)
                console.log("loc2-lat:"+window.getLoc2().lat+"loc2-lon:"+window.getLoc2().lon)
                console.log("index:"+window.getIndex())
            },
            (error) => {
                alert(error.message);
            },
            {
                enableHighAccuracy: true,  //높은 정확도
                maximumAge: 0,
                timeout: Infinity
            },
            );
        }).then((coords) => {
            localStorage.setItem('location'+window.getIndex(), {lat: coords.latitude, lon: coords.longitude, speed: coords.speed, time: new Date(coords.timestamp)})
            setIndex(window.getIndex()+1)
            return coords;
        })
        }
        alert('GPS를 지원하지 않습니다');
    }

    //useEffect
    useEffect(() => {
        const action = async() => {
            const res = await getLocation()
            script.onload = () => {
                window.kakao.maps.load(() => {
                    createMap(res.latitude, res.longitude)
                    console.log("초기좌표:"+res.latitude+"초기좌표:"+res.longitude)
                    console.log("loc1:"+window.getLoc1().lat+"loc2:"+window.getLoc2().lon)
                })
            }
        }
        action();
    }, []);

    return (
        <div className="map">
            <div id='map'></div>
            <button onClick={() => setActivityState(false)}>중단</button>
            <input type="text" ref={state} value={activityState}></input>
        </div>
    );
}

export default Activity