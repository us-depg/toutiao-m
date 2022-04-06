// 封装本地存储操作模块

// 存储数据
export const setItem = (key, value) => {
  // 判断我的存储的数据是否为对象或者数组格式
  if(typeof value === 'object'){
    // 把value转换为JSON
    value = JSON.stringify(value)
    
  }
  // 如果是JSON则直接存
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key =>{
  const data = window.localStorage.getItem(key)
  try {
    // 如果他是正确的JSON格式的字符串
    return JSON.parse(data)
  } catch (err) {
    // 如果他不是JSON格式字符串直接存data
    return data
  }

}
// 删除数据
export const removeItem = key =>{
  window.localStorage.removeItem(key)
}