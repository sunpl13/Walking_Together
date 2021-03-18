export const department = [
    {value: '간호학과', label: '간호학과'},
    {value: '건축학과', label: '건축학과'},
    {value: '경영정보학과', label: '경영정보학과'},
    {value: '경영학과', label: '경영학과'},
    {value: '글로벌한국학과', label: '글로벌한국학과'},
    {value: '동물생명자원학과', label: '동물생명자원학과'},
    {value: '물리치료학과', label: '물리치료학과'},
    {value: '보건관리학과', label: '보건관리학과'},
    {value: '사회복지학과', label: '사회복지학과'},
    {value: '상담심리학과', label: '상담심리학과'},
    {value: '생활체육학과', label: '생활체육학과'},
    {value: '식품영양학과', label: '식품영양학과'},
    {value: '신학과', label: '신학과'},
    {value: '아트앤디자인학과', label: '아트앤디자인학과'},
    {value: '영어영문학부', label: '영어영문학부'},
    {value: '유아교육과', label: '유아교육과'},
    {value: '음악학과', label: '음악학과'},
    {value: '일본어학과', label: '일본어학과'},
    {value: '중국어학과', label: '중국어학과'},
    {value: '컴퓨터공학부', label: '컴퓨터공학부'},
    {value: '화학생명과학과', label: '화학생명과학과'},
    {value: '환경디자인원예학과', label: '환경디자인원예학과'},
    {value: '기초학문학부', label: '기초학문학부'},
    {value: '창의융복합학문학부', label: '창의융복합학문학부'},
    {value: '항공관광외국어학부', label: '항공관광외국어학부'},
    {value: '약학과', label: '약학과'},
    {value: '기초의약과학과', label: '기초의약과학과'},
    {value: '화학과', label: '화학과'},
    {value: '생명과학과', label: '생명과학과'},
    {value: '지능정보융합학부', label: '지능정보융합학부'},
    {value: '동물과학부', label: '동물과학부'},
    {value: '원예학과', label: '원예학과'},
    {value: '환경그린디자인학과', label: '환경그린디자인학과'},
    {value: 'IT융합공학과', label: 'IT융합공학과'},
    {value: '컴퓨터학부', label: '컴퓨터학부'},
    {value: '카메카트로닉스학과', label: '카메카트로닉스학과'},    
    {value: '커뮤니케이션디자인학과', label: '커뮤니케이션디자인학과'},
    {value: '미술컨텐츠학과', label: '미술컨텐츠학과'},
    {value: '중독재활전공', label: '중독재활전공'},
    {value: '한류콘텐츠전공', label: '한류컨텐츠전공'},
    {value: '중독심리전공', label: '중독심리전공'},
    {value: '정원디자인전공', label: '정원디자인전공'},
    {value: '공연예술콘텐츠전공', label: '공연예술콘텐츠전공'},
    {value: '운동재활전공', label: '운동재활전공'},
    {value: '미디어콘텐츠전공', label: '미디어콘텐츠전공'},
    {value: '건강운동학전공', label: '건강운동학전공'},
    {value: '자유전공학부', label: '자유전공학부'},
    {value: '교양성경과', label: '교양성경과'},
]

export const option = department.sort(function(a,b) {                           //객체 정렬 형식 (오름차순), 실제로 import 시키는 값
    return a - b;
})


export const soor = [
    {value: '최신순', label: '최신순'},
    {value: '거리순', label: '거리순'}
]

export const sort = soor.sort(function(a,b) {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
})