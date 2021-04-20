import { Button, } from 'antd'
import React, { useState } from 'react'
import myPromise from '@/utils/promise'
const Index = () => {
    const [number,setNumber] = useState(0);

    const handleClick = () => {
        // for(let i=0; i<5;i++ ){
        //     setTimeout(() => {
        //          setNumber((num) => num + 1)
        //          console.log(number)
        //     }, 1000)
        //  }
        new myPromise((resolve,reject) => {
            setTimeout(() => resolve!(100),1000)
            return 1;
        })
        .then((res:number)=> {
            console.log(res)
        })
        .then((res) => console.log("再来一次",res))
        
    }

    return (
        <>
            <div>
                <Button type="primary" onClick={handleClick}>点我</Button>
                {number}
            </div>
        </>
    )
}
export default Index;
