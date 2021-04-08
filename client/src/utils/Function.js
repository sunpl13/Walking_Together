//
//파트너 구분 (코드 => 텍스트)
export const checkPartnerDetail = (detail) => {
    if(detail==="e") {
       return "노약자"
    } else if(detail==="o") {
         return "일반인"
    } else if(detail==="d") {
         return "장애인"
    } else if(detail==="c") {
         return "아동"
    } else if(detail==="p") {
         return "임산부"
    }
}