//type void와 유사하다!! 
//조건1.return값없음!
//조건2.endpoint가 없어야함!
function 함수11() {
    throw new Error(); //에러생성함수! 코드가 중단됨!
    while (true) { //조건식 참이면 무한히 코드가 반복!
    }
} //endpoint가 없는 함수!
//사실 return값 필요없을 때, void로 대체가능하여 never는 잘 사용되지 않는 타입이나
//간혹 코드를 이상하게 짜면 출몰함! 다음과 같은 상황들!
function 함수12(parameter) {
    if (typeof parameter == 'string') { //뭔가 이상한 narrowing parameter는 string만 들어올수 있고 if문으로 string을 모두 걸렀다 그렇다면 else문은?!
        console.log(parameter);
    }
    else {
        console.log(parameter); // 정말 never type이 생성되었다!!!
    }
} //이런 상황에 never는 있을 수 없다! 는 의미
let 함수13 = function () {
    throw new Error();
}; //never type은 그럴수가 없는뎅? 컴퓨터가 우리에게 의문을 던지는것임 코드가 어디 이상하니까 다시확인해보자!!
