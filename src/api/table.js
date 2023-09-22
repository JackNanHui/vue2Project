import request from '@/utils/request'

export function getTemplateList(params) {
  return request({
    url: '/template/',
    method: 'get',
    params
  })
}

export function templateAdd(data) {
  return request({
    url: '/template/',
    method: 'post',
    data
  })
}

export function templateEdit(data) {
  return request({
    url: `/template/${data.id}/`,
    method: 'PUT',
    data
  })
}

export function templateDel(id) {
  return request({
    url: `/template/${id}/`,
    method: 'DELETE',
  })
}
