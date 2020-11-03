import axios, {AxiosResponse} from 'axios'

import {TUser} from '../redux/user.interface'
import {wrapper} from '../utils/recipies.util'

const headers = {
  'Content-Type': 'application/json',
}
export class ApiService {
  private static instance: ApiService
  private static URL = 'https://convini.ngrok.io'
  private static PORT = 443
  private constructor() {}

  private get url() {
    return `${ApiService.URL}:${ApiService.PORT}`
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }

    return ApiService.instance
  }

  // getLocations = () => wrapper<AxiosResponse<TLocation[]>>(axios.get.bind(null, `${this.url}/location`) as any, 400)
  // getPoints = () => wrapper<AxiosResponse<TPoint[]>>(axios.get.bind(null, `${this.url}/point`) as any, 400)
  // getRestaurant = (id: string) =>
  //   wrapper<AxiosResponse<TRestaurant>>(axios.get.bind(null, `${this.url}/restaurant/${id}`) as any, 400)
  createUser = (user: Omit<TUser, '_id'>) =>
    wrapper<AxiosResponse<TUser>>(axios.put.bind(null, `${this.url}/user`, user, {headers}) as any, 400)
  // recyclePoints = (point: TRecycleRequest) =>
  //   wrapper<AxiosResponse<TPoint>>(axios.put.bind(null, `${this.url}/point`, point, {headers}) as any, 400)
  // redeemPoints = (redeem: TRedeemRequest) =>
  //   wrapper<AxiosResponse<TPoint>>(axios.post.bind(null, `${this.url}/promo/redeem`, redeem, {headers}) as any, 400)
}
