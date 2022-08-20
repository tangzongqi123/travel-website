export const getAssetURL=(image)=>{
  //参数一:相对路径
  //参数二:当前的路径URL  import.meta.url返回当前模块的 URL 路径
 
  //href整个路径
  return new URL(`../assets/img/${image}`,import.meta.url).href
}