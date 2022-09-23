import service from '@/utils/request'

export function login(params) {
  return service({
    url: '/loginInterface',
    method: 'post',
    params,
  })
}
