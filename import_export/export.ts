export let 이름 = 'kim';
export let 나이 = 20;
export type Name = string;
export interface 인터페이스 {}

//namespace
namespace 네임스페이스 { //TypeScript 타입변수 숨기기 문법
    export type spaceName = string | number;
}

let 변수 :네임스페이스.spaceName = 'kim';