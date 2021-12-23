//null & undefined 타입체크
function 함수8(a) {
    if (a && typeof a === 'string') { //&& 연산자 활용! && 연산자들 사이에 falsy한값 반환
    }
}
function 함수9(animal) {
    if ('swim' in animal) {
        animal.swim;
    }
}
//오브젝트 instanceof 부모class //오브젝트의 부모를 사용하여 instanceof로 object narrowing 가능
let 날짜 = new Date();
if (날짜 instanceof Date) {
}
function 함수10(x) {
    if (x.wheel === '4개') {
        console.log('x는 Car2타입이다.');
    }
}
//결론! 논리적으로 unique한 타입인지 특정지을 수 있으면 narrowing 인정된다!!
