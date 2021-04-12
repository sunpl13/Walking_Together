import {React, useState} from 'react'

function Mapp() {
/*
    const [state, setstate] = useState({
        lat : "",
        lon : "",
        time : ""
    })

    const {lat, lon, time} = state;

    const getLocation = () => {                                                   //현재 위치 값 가져오는 함수
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
              let loca = localStorage.getItem("user_location");

              if(loca === null) {
                  let arr = [{lat : position.coords.latitude,
                    lon : position.coords.longitude,
                    time : position.timestamp}];
                  localStorage.setItem("user_location", JSON.stringify(arr));
              } else {
                  loca = JSON.parse(loca);
                  localStorage.setItem("user_location", JSON.stringify(loca.concat(
                      {lat : position.coords.latitude,
                       lon : position.coords.longitude,
                       time : position.timestamp})));
              }
          }
          );
        }
      }

      const timer = setInterval(() => {
         getLocation();
      }, 5000);

      const stop = () => {
          clearInterval(timer);
      }
*/





    return (
        <div>
            <button>종료</button>
        </div>
    )
}

export default Mapp
