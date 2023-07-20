const GetItem = (key:string) =>{
     const sessionValue:any = localStorage.getItem(key);
     return JSON.parse(sessionValue)
}

const SetItem = (key:string,data:any) =>{
    return localStorage.setItem(key,JSON.stringify(data))
}

export {GetItem,SetItem}