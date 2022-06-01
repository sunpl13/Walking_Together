import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { finishActivity } from "../../modules/activity";
import { debounce } from "lodash";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

import "../../styles/activity.scss";

const Activity = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const key = process.env.REACT_APP_MAP;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
  document.head.appendChild(script);

  //*****states*****
  //active state (true일 때 => loc1에 저장, false일 때 => loc2에 저장)
  const [loc1State, setLoc1State] = useState(true);

  window.getLoc1State = function () {
    //get function
    return loc1State;
  };

  //location 1
  const [loc1, setLoc1] = useState({ lat: 0, lon: 0 }); //state
  window.getLoc1 = function () {
    return loc1;
  };

  //location 2
  const [loc2, setLoc2] = useState({ lat: 0, lon: 0 }); //state
  window.getLoc2 = function () {
    //get function
    return loc2;
  };

  //activity state
  const [activityState, setActivityState] = useState(true);
  window.getActivityState = function () {
    return activityState;
  };

  //index (localstorage에 저장될 좌표 순번)
  const [index, setIndex] = useState(0); //state
  window.getIndex = function () {
    //get function
    return index;
  };

  const [distance, setDistance] = useState(0);
  const [startTime] = useState(new Date().getTime() + 32400000);
  window.getStartTime = function () {
    //get function
    return startTime;
  };
  const [time, setTime] = useState(0);

  //F-지도에 표시할 선 생성
  const createLine = (map) => {
    if (window.getLoc1().lat !== 0 && window.getLoc2().lat !== 0) {
      const polyline = new window.kakao.maps.Polyline({
        path: [
          //선을 구성하는 좌표배열 (현재 좌표와 이전 좌표)
          new window.kakao.maps.LatLng(
            window.getLoc1().lat,
            window.getLoc1().lon
          ),
          new window.kakao.maps.LatLng(
            window.getLoc2().lat,
            window.getLoc2().lon
          ),
        ],
        strokeWeight: 6, //두께
        strokeColor: "#FFAE00", //색상
        strokeOpacity: 0.7, //불투명도
        strokeStyle: "solid", //스타일
      });
      const length =
        parseFloat(localStorage.getItem("distance")) + polyline.getLength();
      localStorage.setItem("distance", length); //총 거리 update (m 단위)
      setDistance(length);

      polyline.setMap(map); //지도에 표시
    } else {
      console.log("not ready");
    }
  };

  //F-지도 생성
  const createMap = (lat, lon) => {
    const container = document.getElementById("map"); //지도 담을 div
    const options = {
      center: new window.kakao.maps.LatLng(lat, lon), //지도 중심 X,Y좌표 정보를 가지고 있는 객체 생성
      level: 3, //확대 수준, 작을수록 범위 좁아짐
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성

    const makerPosition = new window.kakao.maps.LatLng(lat, lon); //시작 마커 위치
    const marker = new window.kakao.maps.Marker({
      //마커 생성
      position: makerPosition,
    });
    marker.setMap(map); // 마커를 지도 위에 표시

    localStorage.setItem("distance", 0); //거리 초기화

    //활동 상태가 true면 getlocation, panMove, createLine
    //활동 상태가 false면 interval 중단
    const func = () => {
      if (window.getActivityState() === true) {
        getLocation().then((res) => {
          panTo(map, res.latitude, res.longitude);
          createLine(map);
        });
      } else {
        clearInterval(interval); //활동 중지
      }
    };

    //F-위치 받아오기 => 맵 중심 이동 => 선 생성 30초마다 반복
    const interval = setInterval(() => {
      func(); //활동 상태 체크
    }, 30000);
  };

  //F-지도 중심 이동
  const panTo = (map, lat, lon) => {
    const moveLatLon = new window.kakao.maps.LatLng(lat, lon); //이동할 위치 좌표 생성
    map.panTo(moveLatLon); //부드럽게 move
  };

  //F-geolocation 사용자 위치 받아오기
  const getLocation = async () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: position.timestamp,
            });
            if (window.getLoc1State() === true) {
              //true: loc1에 업데이트, false: loc2에 업데이트
              setLoc1({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }); //speed: coords.speed, timestamp: coords.timestamp})
              setTime(
                moment(position.coords.timestamp).diff(
                  moment(window.getStartTime())
                )
              );
              setLoc1State(false);
            } else {
              setLoc2({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }); //speed: coords.speed, timestamp: coords.timestamp})
              setTime(
                moment(position.coords.timestamp).diff(
                  moment(window.getStartTime())
                )
              );
              setLoc1State(true);
            }
            localStorage.setItem("lastIndex", window.getIndex()); //로컬스토리지에 마지막 인덱스 업데이트
          },
          (error) => {
            alert(error.message);
          },
          {
            enableHighAccuracy: true, //높은 정확도
            maximumAge: 0, //0:항상 최신 위치, Infinity:캐시에 저장된 위치
            timeout: Infinity, //Infinity
          }
        );
      }).then((coords) => {
        localStorage.setItem(
          "location" + window.getIndex(),
          JSON.stringify({
            lat: coords.latitude,
            lon: coords.longitude,
            timestamp: coords.timestamp,
          })
        );
        setIndex(window.getIndex() + 1);
        return coords;
      });
    }
    alert("GPS를 지원하지 않습니다");
  };

  //useEffect
  useEffect(() => {
    dispatch(
      changeBar(
        "null",
        { title: "활동", data: null },
        "null",
        "null",
        "null",
        "h600"
      )
    ); //상단바 변경
    script.onload = () => {
      //kakao map script 로딩 완료 시, loading상태 true 로 변경
      window.kakao.maps.load(() => {
        creation();
      });
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const creation = () => {
    //좌표 받아와서 맵 생성
    getLocation().then((res) => {
      createMap(res.latitude, res.longitude);
    });
  };

  //stop function
  const stop = debounce(() => {
    setActivityState(false);
    dispatch(
      changeBar(
        "null",
        { title: "사진 등록", data: null },
        "create",
        "null",
        createAction,
        "h600"
      )
    );
  }, 800);

  const submit = debounce(async () => {
    if (
      window.confirm(
        "시간과 거리를 확인하셨나요?\n\n 거리와 시간이 충족 되지 않았을 시 실적이 인정되지 않을 수 있습니다!"
      )
    ) {
      const lastIndex = localStorage.getItem("lastIndex");
      const endLocation = JSON.parse(
        localStorage.getItem(`location${lastIndex}`)
      );
      let map = [];

      for (let i = 0; i <= lastIndex; i++) {
        map.push(localStorage.getItem("location" + i));
      }

      const formData = new FormData();
      formData.append("activityId", localStorage.getItem("activityId"));
      formData.append("map", map);
      formData.append("endPhoto", window.getPicture());
      formData.append(
        "endTime",
        moment(endLocation.timestamp).format("YYYYMMDDHHmmss")
      );
      formData.append("distance", Math.ceil(localStorage.getItem("distance")));
      formData.append("checkNormalQuit", 0);

      dispatch(finishActivity(formData)).then((res) => {
        if (res.status === 200) {
          //정상적으로 보내졌을 때
          alert(res.message);
          //remove at local storage
          localStorage.removeItem("activityId");
          localStorage.removeItem("partnerId");
          localStorage.removeItem("distance");
          localStorage.removeItem("lastIndex");

          for (let i = 0; i <= lastIndex; i++) {
            localStorage.removeItem("location" + i);
          }
          history.replace("/user/feed");
        } else if (res.code === 404 || res.code === 407) {
          //활동 존재하지 않을 때, 이미 종료된 활동일 때
          alert(res.message);
          history.replace("/user/feed");
        } else {
          //실패 했을 때
          alert(res.message);
          setActivityState(true);
        }
      });
    }
  }, 800);

  //*******
  //end photo
  const [picture, setPicture] = useState([]);
  window.getPicture = function () {
    return picture;
  };
  const [buttonFirst, setButtonFirst] = useState(true);

  const camera = useRef();
  const frame = useRef();

  const takePhoto = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        frame.current.src = base64;
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 파일을 버퍼에 저장
      setPicture(e.target.files[0]); // 파일 상태 업데이트
      setButtonFirst(false);
    }
  };

  const createAction = debounce((e) => {
    e.preventDefault();

    if (window.getPicture().length === 0) {
      alert("사진 촬영 후 활동 종료가 가능합니다.");
    } else {
      submit();
    }
  }, 800);

  return (
    <div className="activityMapWrap">
      <div
        id="mapWrap"
        className={activityState === false ? "hidden" : "visible"}
      >
        <div id="map"></div>
        <div id="activityInfo">
          {moment(time).format("HH")}시간 {moment(time).format("mm")}분 동안
          <br/>{parseInt(distance)}m를 걸었어요!
        </div>
        <p id="message">30초마다 갱신됩니다.</p>
        <div id="buttonWrap">
          <button onClick={stop} className="btn">활동 종료</button>
        </div>
      </div>

      <div
        id="activityRegisterWrap"
        className={activityState === true ? "hidden" : "visible"}
      >
        <Comment sub="F i n i s h" main={"파트너와\n사진을 찍어요!\n"}/>
        <div
          id="activityRegister"
          className={activityState === true ? "hidden" : "visible"}
        >
          <div className="picture_container">
            {picture.length === 0 ? (
              <div className={activityState === true ? "hidden" : "preview"}>
              </div>
            ) : (
              <div className={activityState === true ? "hidden" : "preview"}>
                <img id="preview_img" ref={frame} alt="none" />
              </div>
            )}
          </div>

          <div id="pictureInput">
            <form
              action="/activity/createActivity"
              className={activityState === true ? "hidden" : "imageForm"}
              encType="multipart/form-data"
              method="post"
              onSubmit={(e) => createAction(e)}
            >
              <input
                type="file"
                accept="image/*"
                capture="camera"
                ref={camera}
                id="inputFile"
                onChange={takePhoto}
                disabled={activityState === true ? true : false}
              />

              {buttonFirst === true ? (
                <label htmlFor="inputFile" className="btn" disabled={activityState === true ? true : false}>
                  사진 촬영
                </label>
              ) : (
                <label htmlFor="inputFile" className="btn" disabled={activityState === true ? true : false}>
                  다시 촬영
                </label>
              )}
              {picture.length === 0 ? (
                <span id="fileName">선택된 사진 없음</span>
              ) : (
                <span id="fileName">{picture.name}</span>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
