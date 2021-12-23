//null & undefined 타입체크
function 함수8(a :string | undefined) {
    if ( a && typeof a === 'string'){ //&& 연산자 활용! && 연산자들 사이에 falsy한값 반환

    }    
}

type Fish = {swim :string}
type Bird = {fly :string}

function 함수9(animal :Fish | Bird){ //오브젝트의 속석명이 다르면 in을 사용하여 object narrowing 가능
    if( 'swim' in animal) {
        animal.swim
    }
}

//오브젝트 instanceof 부모class //오브젝트의 부모를 사용하여 instanceof로 object narrowing 가능
let 날짜 = new Date()
if (날짜 instanceof Date){

}

type Car2 = {
    wheel : '4개'
    color : string
}
type Bike = {
    wheel : '2개'
    color : string
}

function 함수10(x: Car2 | Bike) { //object type 마다 literal type 있다면 narrowing 편해짐!!
    if (x.wheel === '4개'){
        console.log('x는 Car2타입이다.')
    }
}
//결론! 논리적으로 unique한 타입인지 특정지을 수 있으면 narrowing 인정된다!!