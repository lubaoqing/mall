import {request} from './request'

export function getHomeMultiddata() {
  return request({
    url: '/home/multidata'
  })
}