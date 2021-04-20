import React, { ReactElement, ReactNode, useState } from 'react';
import {Menu} from 'antd'
import { IRouter } from '@/types'


const { SubMenu } = Menu;


// type eleArr = ReactElement[];


const hasSubMenu = (item:IRouter):boolean | undefined => {
    return item.children && item.children.length !== 0 
}
const flatMenuList = (menuArr: IRouter[]) => {
    const newArr = menuArr.map((item)=>{
        if(item.title && !hasSubMenu(item)){
            return   <Menu.Item  key={item.path}  icon={item.icon}>{item.title}</Menu.Item>

        }else if(item.title && hasSubMenu(item)){
            return (
                <SubMenu  key={item.path} icon={item.icon} title={item.title}>
                    {flatMenuList(item.children as IRouter[])}
                </SubMenu>
            )
        }

    })
   return  newArr; 
}
export const renderMenu = (menuArr: IRouter[]) => {

    
    const  newArr = flatMenuList(menuArr);

    return menuArr.length === newArr.length ? (
        <>
            {...newArr}
        </>
    ) : null
    
}
// export const flatMenu = (menuArr: IRouter[], newArr:ReactNode[]) =>{
//     const hasSubMenu = (item:IRouter):boolean | undefined => {
//         return item.children && item.children.length !== 0 
//     }
    
//     const len = menuArr.length;
//     if(len <= 0 ){ return ; }
//     for(let i = 0; i < len; i++){
//         if(menuArr[i].title && !hasSubMenu(menuArr[i])){
//             return   <Menu.Item  key={menuArr[i].path}  icon={menuArr[i].icon}>{menuArr[i].title}</Menu.Item>

//         }else if(menuArr[i].title && hasSubMenu(menuArr[i])){
//             return (
//                 <SubMenu>
//                     {flatMenu(menuArr[i].children as IRouter[],newArr[i] as eleArr)}
//                 </SubMenu>
//             )
//         }
//     }
//     console.log("newARR",newArr)
//     return (
//         <>
//         {...newArr}
//         </>
//     );

// }
// const siderMenu = (props:IProps) =>{

//     const flatMenu = (menuArr: IRouter[]) =>{
//         const hasSubMenu = (item:IRouter):boolean | undefined => {
//             return item.children && item.children.length !== 0 
//         }
//         const menuList:ReactElement[] = [];
//         const len = menuArr.length;
//         for(let i = 0; i < len; i++){
//             if(menuArr[i].title && !hasSubMenu(menuArr[i])){
//                 menuList.push(
//                     <Menu.Item key={menuArr[i].path} icon={menuArr[i].icon} >{menuArr[i].title}</Menu.Item>
//                 )
//             }else if(hasSubMenu(menuArr[i])){
                
//                 // flatMenu(menuArr[i].children);   
//             }else{
                
//             }
//         }
//         console.log(menuList)
//         return (
//             <>
//             {...menuList}
//             </>
//         );

//     }

//     const renderMenu = () =>{   
//        return flatMenu(props.router);
//     }

//     return (    
//         <>
//           {renderMenu()}
//         </>
//     )
// }
// export default siderMenu;
