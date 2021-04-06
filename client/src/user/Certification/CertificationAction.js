import React from 'react';
import pdfMake from 'pdfmake';

const format = (data) => {
	data.map(item => {
		return ([
			{text: item.activityDate},
			{text: item.partnerName},
			{text: item.startTime},
            {text: item.endTime},
			{text: item.ordinaryTime},
			{text: item.careTime},
            {text: item.distance},
            {text: item.totalTime}
		]);
	});
}

const CertificationAction = ({data}) => {

	const formattedData = format(data);

    let totOrdTime = 0; //일반활동 총 시간
    let totCareTime = 0; //돌봄활동 총 시간
    let totActTime = 0; //전체활동 총 시간
    let totDistance = 0;

    //총 시간 구하는 function
    const getTotalTime = () => {
        data.map((item) => {
            totOrdTime += item.ordinaryTime
            totCareTime += item.careTime
            totActTime += item.totalTime
            totDistance += item.distance
            return("");
        })
    }
    getTotalTime();

    const documentDefinition = {
		pageSize: 'A4',
		pageOrientation: 'portrait',
        info: {
            title: 'walking-together',
            author: 'computer-gks'
        },
        pageMargins: [ 30, 30, 30, 30 ],
        background: '배경',
        style: {
            header: {
                fontSize: 22,
                bold: true,
                alignment: 'center'
            },
            body: {
                fontSize: 11,
                bold: true,
                margin: [ 5, 0, 0, 5 ]
            }
        },
		content: [
			{text: '인증서'},
			'\n',
			{
				table: {
					headerRows: 1,
					dontBreakRows: true,
					body: [
						[ //table header
                            {text: '활동일', style: 'tableHeader'}, 
                            {text: '파트너이름', style: 'tableHeader'}, 
                            {text: '시작시간', style: 'tableHeader'}, 
                            {text: '종료시간', style: 'tableHeader'}, 
                            {text: '일반활동시간', style: 'tableHeader'},
                            {text: '돌봄활동시간', style: 'tableHeader'},
                            {text: '활동거리', style: 'tableHeader'},
                            {text: '인정시간', style: 'tableHeader'}
                        ],
						...formattedData, //table body

                        [ //total table header
                            {text: '일반활동시간', style: 'tableHeader'},
                            {text: '돌봄활동시간', style: 'tableHeader'},
                            {text: '전체활동거리', style: 'tableHeader'},
                            {text: '전체인정시간', style: 'tableHeader'}
                        ],
                        [ //total table body
                            {text: totOrdTime},
                            {text: totCareTime},
                            {text: totDistance},
                            {text: totActTime}
                        ]
					]
				}
			}
		],
        pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
        }
  };

	const func = () => {
        pdfMake.createPdf(documentDefinition).open();  //please change to "download"
    }
        
    return (
        <button id="pdfmake" onClick={func}>다운로드</button>
    )
};

export default CertificationAction;