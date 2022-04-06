import request from "@/utils/request.js";

// 获取文章评论列表
export const getComment = (params)=>{
  return request({
    method:'GET',
    url:'/v1_0/comments',
    params
  })
}
/**
 * 发布评论
 */
 export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}