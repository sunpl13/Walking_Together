import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import pdfMake from "pdfmake";
import "../../../node_modules/pdfmake/build/vfs_fonts.js";
import { useLocation } from "react-router";
import "../../styles/certification.scss";
import { debounce } from "lodash";
import { changeBar } from "../../modules/topbar";

import Files_And_Folder_Flatline from "../../source/Files_And_Folder_Flatline.svg";

import { certificationBack } from "../../source/certification";
import { certificationDefault } from "../../source/certificationDefault";
import Comment from "../../utils/Comment";

const format = (data) => {
  if (data.length === 1) {
    return ([[
      {text: data[0].activityDate, fontSize: 11, alignment: 'center'},
      {text: data[0].distance+"m", fontSize: 11, alignment: 'center'},
      {text: data[0].startTime.substring(11, 19), fontSize: 11, alignment: 'center'},
      {text: data[0].endTime.substring(11, 19), fontSize: 11, alignment: 'center'},
      {text: data[0].partnerName, fontSize: 11, alignment: 'center'},
      {text: data[0].careTime, fontSize: 11, alignment: 'center'},
      {text: data[0].ordinaryTime, fontSize: 11, alignment: 'center'}
    ]]);
  } else {
    return (data.map((item) => {
      return ([
        {text: item.activityDate, fontSize: 11, alignment: 'center'},
        {text: item.distance+"m", fontSize: 11, alignment: 'center'},
        {text: item.startTime.substring(11, 19), fontSize: 11, alignment: 'center'},
        {text: item.endTime.substring(11, 19), fontSize: 11, alignment: 'center'},
        {text: item.partnerName, fontSize: 11, alignment: 'center'},
        {text: item.careTime, fontSize: 11, alignment: 'center'},
        {text: item.ordinaryTime, fontSize: 11, alignment: 'center'}
      ]);
    }));
  }
};

const CertificationAction = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { data, careTimes, ordinaryTimes, totalTime } = location.state.res;

  const formatData = format(data);
  const startDate = (data[0]).activityDate;  //조회 시작일
  const endDate = (data[data.length-1]).activityDate;  //조회 종료일

  const documentDefinition = {
		pageSize: 'A4',
		pageOrientation: 'portrait',
    margin: [ 30, 20, 30, 20 ],
    info: {
      title: 'walking-together',
      author: 'computer-gks'
    },
    pageMargins: [ 30, 30, 30, 30 ],

    images: {
      certification: certificationBack,
      certificationDefault: certificationDefault
    },

    background: [
      {
        image: 'certificationDefault',
        width: 595,
        height: 842,
        absolutePosition: { x: 0, y: 0 }
      }
    ],

		content: [
      //1page
      {
        image: 'certification',
        width: 595,
        height: 842,
        absolutePosition: { x: 0, y: 0 }
      },

      //USER INFO
      {text: data[0].name, fontSize: 15, absolutePosition: { x: 237, y: 289 }},
      {text: data[0].department, fontSize: 15, absolutePosition: { x: 237, y: 325 }},
      {text: data[0].stdId, fontSize: 15, absolutePosition: { x: 237, y: 362 }},

      //TOTAL INFO
      {text: startDate+'~'+endDate,  fontSize: 12, absolutePosition: { x: 237, y: 423.6 }},  //*******바꾸기 */
      {text: careTimes, fontSize: 12, absolutePosition: { x: 237, y: 445.8 }},
      {text: ordinaryTimes, fontSize: 12, absolutePosition: { x: 237, y: 467.5 }},
      {text: totalTime, fontSize: 12, absolutePosition: { x: 237, y: 489.5 }, pageBreak: 'after'},
      
      //activity table
      {  
        table: {
          //heights: 20,
          headerRows: 1,
          dontBreakRows: true,
          body: [
            [ //table header
              {text: '활동일', fontSize: 12, bold: true, alignment: 'center'}, 
              {text: '활동거리', fontSize: 12, bold: true, alignment: 'center'}, 
              {text: '시작시간', fontSize: 12, bold: true, alignment: 'center'}, 
              {text: '종료시간', fontSize: 12, bold: true, alignment: 'center'}, 
              {text: '파트너명', fontSize: 12, bold: true, alignment: 'center'},
              {text: '돌봄활동', fontSize: 12, bold: true, alignment: 'center'},
              {text: '일반활동', fontSize: 12, bold: true, alignment: 'center'}
            ],
            ...formatData,
          ],
          alignment: "center"
        },
        absolutePosition: { x: 94, y: 80 }
      },
		],
    pageBreakBefore: function(currentNode, followingNodesOnPage) {
      return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    }
  };

	const func = debounce(() => {
    const doc = pdfMake.createPdf(documentDefinition);
    doc.download();
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "null", 
        { title: "인증서발급", data: null }, 
        "null", 
        "null", 
        "null", 
        "h350"
      )
    );  //상단바 변경
  }, [dispatch])
    
  return (
    <div id="certificationAction">
      <Comment sub="D o w n l o a d" main={"인증서 PDF\n다운로드"}/>

      <div id="buttonWrap">
        <button id="pdfmake" className="user_btn_blue" onClick={func}>인증서 다운로드</button>
      </div>
    
      <div id="imageWrap">
        <img src={Files_And_Folder_Flatline} alt=""/>
      </div>
    </div>
  );
};

export default CertificationAction;
