import axios from 'axios'
import getConfig from 'next/config'
import Cookies from 'js-cookie'

let token = null

const config = getConfig()
const API_URL = config.publicRuntimeConfig.env.API_URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

const requestHandler = (request) => {
  //console.log('cookie', request.cookie, ' / ', Cookies.get('ServiceCookies'), ' / ', Cookies.get('token'))
  // 클라이언트 사이드의 http리퀘스트의 헤더에 정보를 담는다.
  if(isBrowser) {
    request.headers.Authorization = `Bearer ${Cookies.get('token')}`
    request.headers.ServiceCookies = Cookies.get('ServiceCookies')
  } else {
    //console.log('request in server')
  }
  // console.log(isBrowser, 'isBrowser???')
  // console.log(request, 'in requestHandler')
  return request
}

const responseHandler = (response) => {
  // console.log(response, 'in responseHandler')
  if(isBrowser) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.headers.authorization}`
    // axiosInstance.defaults.headers.cookie = `Bearer ${response.headers.authorization}`
  } else {
    //console.log('hrere ')
    // response.cookie('test', 'testttt')
    // A. 서버사이드에서는 여기의 axios인스턴스에 토큰을 세팅해도, 클라이언트(브라우저)의 axios인스턴스에는 세팅되지 않기때문에
    // 개별페이지의 api콜하는 부분에서 header값을 개별적으로 담아야한다. 여기의 response가 next서버의 response가 아니기 때문에, 쿠키에 심어도 무소용
    // B. 어차피 클라이언트의 요청에 ServiceCookies가 담겨있다면, token은 없어도 무관하기 때문에 담지 않아도 상관없다.
    // response.cookie('token', response.headers.authorization)
  }
  if(response.data.resCd === 404) {
    console.log('404')
  }
  return response.data
}

axiosInstance.interceptors.request.use(
  request => requestHandler(request)
)

axiosInstance.interceptors.response.use(
  response => responseHandler(response)
)

export const tokenSelector = state => state.auth.token;

export const setAuthHeader = (token, serviceCookies) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  axiosInstance.defaults.headers.common.ServiceCookies = serviceCookies
}

export default axiosInstance