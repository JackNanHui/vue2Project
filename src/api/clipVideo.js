import request from '@/utils/request'

export function downVideo(data) {
    return request({
      url: '/videoProcessing/',
      method: 'post',
      data
    })
  }

  export function getComments(data) {
    return request({
      url: '/GetComments/',
      method: 'post',
      data
    })
  }