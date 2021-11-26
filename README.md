# typescript_prac
>declare let a :number;
js 파일에서의 변수를 ts 파일에서 쓰고 싶을 때
결과는 잘 나오지만 에러가 난다
따라서 위 코드로 재 정의 해주면 더이상 에러가 안난다.

>type script의 이상한 특징 ambient module 
import export 없이도 타입들을 다른 파일에서 가져다쓸 수 있다!!!



>declare global {
    type Dog = string;
}
local module에서 글로벌 변수(type, interface)를 만들고 싶을 때 사용된다.