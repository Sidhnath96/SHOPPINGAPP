import {test as myTest} from "@playwright/test";
type sidhanath ={
    age:number,
    email:string
}
const myFixtireTest = myTest.extend<sidhanath>({
    age :30,
    email:"myemail@gmail.com"
})

export const test = myFixtireTest;