//检查手机格式
export const checkPhone = (value:string):boolean => {
    const phoneNumReg = /^1[3|4|5|7|8]\d{9}$/;
    if(phoneNumReg.test(value)){
        return true;
    }else{
        return false;
    }
}

//获取html字符串中第一张图片路径
export const getImgUrl = function(str:any){
    let data = '';
    str.replace(/]*src=['"]([^'"]+)[^>]*>/, function (match:any, capture:any) {
        data = capture;
    });
    return data
}
