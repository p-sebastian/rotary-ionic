import axios, {AxiosResponse} from 'axios'

import {TFilterSelected} from '../pages/Members/MemberFilter.hooks'
import {TClub} from '../redux/club.interface'
import {TProject} from '../redux/project.interface'
import {TUser} from '../redux/user.interface'
import {wrapper} from '../utils/recipies.util'

export class ApiService {
  private static instance: ApiService
  private static URL = 'https://rotary.convini.ec'
  private static VERSION = 'api/v1'
  private static PORT = 443
  private _token: string | null = null
  private constructor() {}

  private get url() {
    return `${ApiService.URL}:${ApiService.PORT}/${ApiService.VERSION}`
  }

  private get options() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      } as {[key: string]: string},
    }
    if (this._token) {
      options.headers.Authorization = `Bearer ${this._token}`
    }
    return options
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }

    return ApiService.instance
  }

  set token(token: string | null) {
    this._token = token
  }

  verifyUser = (identification: string) =>
    wrapper<AxiosResponse<TUser>>(
      axios.get.bind(null, `${this.url}/user/verify/${identification}`, this.options) as any,
      400,
    )

  login = (sub: string) =>
    wrapper<AxiosResponse<{user: TUser; token: string}>>(
      axios.post.bind(null, `${this.url}/user/login`, {sub}, this.options) as any,
      401,
    )

  getMembers = () => wrapper<AxiosResponse<TUser[]>>(axios.get.bind(null, `${this.url}/user`, this.options) as any, 400)

  filterMembers = (by: Partial<TFilterSelected>) =>
    wrapper<AxiosResponse<string[]>>(axios.post.bind(null, `${this.url}/user/filter`, by, this.options) as any, 400)

  getClubs = () => wrapper<AxiosResponse<TClub[]>>(axios.get.bind(null, `${this.url}/club`, this.options) as any, 400)

  getProjects = () =>
    wrapper<AxiosResponse<TProject[]>>(axios.get.bind(null, `${this.url}/project`, this.options) as any, 400)

  createUser = (user: Partial<TUser>) =>
    wrapper<AxiosResponse<TUser>>(
      axios.put.bind(null, `${this.url}/user/register/${user.identification}`, user, this.options) as any,
      400,
    )

  createProject = (project: TProject) =>
    wrapper<AxiosResponse<TProject>>(axios.put.bind(null, `${this.url}/project`, project, this.options) as any, 400)
}
