import axios, {AxiosResponse} from 'axios'

import {TUser} from '../redux/user.interface'
import {wrapper} from '../utils/recipies.util'

const headers = {
  'Content-Type': 'application/json',
}
export class ApiService {
  private static instance: ApiService
  private static URL = 'https://convini.ngrok.io'
  private static VERSION = 'api/v1'
  private static PORT = 443
  private constructor() {}

  private get url() {
    return `${ApiService.URL}:${ApiService.PORT}/${ApiService.VERSION}`
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }

    return ApiService.instance
  }

  verifyUser = (identification: string) =>
    wrapper<AxiosResponse<TUser>>(
      axios.get.bind(null, `${this.url}/user/verify/${identification}`, {headers}) as any,
      400,
    )

  login = (sub: string) =>
    wrapper<AxiosResponse<{user: TUser; token: string}>>(
      axios.post.bind(null, `${this.url}/user/login`, {sub}, {headers}) as any,
      401,
    )
  // getLocations = () => wrapper<AxiosResponse<TLocation[]>>(axios.get.bind(null, `${this.url}/location`) as any, 400)
  // getPoints = () => wrapper<AxiosResponse<TPoint[]>>(axios.get.bind(null, `${this.url}/point`) as any, 400)
  // getRestaurant = (id: string) =>
  //   wrapper<AxiosResponse<TRestaurant>>(axios.get.bind(null, `${this.url}/restaurant/${id}`) as any, 400)
  createUser = (user: Partial<TUser>) =>
    wrapper<AxiosResponse<TUser>>(
      axios.put.bind(null, `${this.url}/user/register/${user.identification}`, user, {headers}) as any,
      400,
    )
  // recyclePoints = (point: TRecycleRequest) =>
  //   wrapper<AxiosResponse<TPoint>>(axios.put.bind(null, `${this.url}/point`, point, {headers}) as any, 400)
  // redeemPoints = (redeem: TRedeemRequest) =>
  //   wrapper<AxiosResponse<TPoint>>(axios.post.bind(null, `${this.url}/promo/redeem`, redeem, {headers}) as any, 400)
}
