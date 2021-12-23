//arr type 지정
let 멍멍 = ['dog', true];
//tuple type type 지정 위치까지 엄격하게!
let 야옹 = ['cat', true]; //? 옵션 들어올수도 안들어올수도 있다.
//주의! 옵션은 중간에만! 들어가서는 안된다. ? 옵션은 항상 뒤에서부터 넣어줘야한다!!
function 함수(...x) {
    //rest parameter가 아닌 각각 type을 지정해주는거랑 차이는 ...을 사용했을때는 배열로!!
    console.log(x);
}
함수(1, '2');
//추가!
let arr = [1, 2, 3];
let arr2 = [4, 5, ...arr]; //[4,5,1,2,3]
//---------------------------------------------------------------------------
function 함수4(...rest) { }
함수4('a', true, 6, 3, '1', 4);
//---------------------------------------------------------------------------
function 함수5(...rest) {
    let result = [[], []];
    rest.forEach((a) => {
        if (typeof a === 'string') {
            result[0].push(a);
        }
        else {
            result[1].push(a);
        }
    });
    return result;
}
