import { v4 } from "uuid";

class KeyGen{
    constructor(){
        this.currentKey = v4()
    }
    public currentKey:string;
    public gen(){
        this.currentKey = v4()
    };
}
export const keyGen = new KeyGen();