export function randomhash(len: number) {
    let options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ans= ""
    for(let i=0; i<len; i++){
        ans += options.charAt(Math.floor(Math.random() * options.length));
    }
    return ans;
}