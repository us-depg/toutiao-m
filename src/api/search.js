import request from '@/utils/request.js'

// 获取联想建议
export const getSearchSuggestion = (q) => {
  return request({ method: 'GET', url: '/v1_0/suggestion', params: { q } })
}
// 获取搜索内容
export const getSearchResult = (params) => {
  return request({ method: 'GET', url: '/v1_0/search', params })
}
