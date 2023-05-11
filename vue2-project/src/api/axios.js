import {get, post} from '@/utils/request'
// 示例
export const LOGIN = params => get('/cmsServer/sms/getImageCode', params)
export const LOGOUT = params => post('/cmsServer/sms/getImageCode', params)
