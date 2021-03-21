import {Auth} from 'aws-amplify'

import {AuthSignInPayload, AuthSignUpPayload} from '../redux/auth.interface'
import {TUser} from '../redux/user.interface'
import {ErrorCode} from '../utils/error.util'

export class AmplifyService {
  private static instance: AmplifyService
  private _attributes: TUser | null = null
  private constructor() {}

  private async userAttributes(reload = false): Promise<{sub: string} | null> {
    if (this._attributes && !reload) {
      return this._attributes
    }
    return this.currentAuthenticatedUser()
  }

  private async wrapper<T>(promise: () => Promise<T>, operation_code: number): Promise<T> {
    try {
      return await promise()
    } catch (e) {
      let message: string | null = null
      let error_code: string | null = null
      if (e && e.message) {
        message = e.message
      } else {
        message = e.constructor.name
      }
      if (e && e.code && typeof e.code === 'string') {
        error_code = e.code
      }
      console.log(
        'Auth Exception!',
        e,
        typeof e,
        operation_code,
        e.constructor.name,
        Object.keys(Object.getPrototypeOf(e)),
        JSON.stringify(e),
      )
      throw new Error(`Error: op: ${operation_code}; code: ${error_code ?? 'UNKNOWN'}; message: ${message}`)
    }
  }

  static getInstance(): AmplifyService {
    if (!AmplifyService.instance) {
      AmplifyService.instance = new AmplifyService()
    }

    return AmplifyService.instance
  }

  currentAuthenticatedUser = async (): Promise<{sub: string} | null> => {
    const getCurrentUserInfo = Auth.currentAuthenticatedUser.bind(Auth)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {attributes} = await this.wrapper(getCurrentUserInfo, ErrorCode.AuthCurrentAuthenticatedUser)
    return attributes
  }

  async logout(): Promise<void> {
    try {
      await Auth.signOut()
    } catch (e) {
      // dont error on signout
    }
  }

  signUp = async ({password, email}: AuthSignUpPayload): Promise<string> => {
    const bound = Auth.signUp.bind(Auth, {
      username: email.toLocaleLowerCase(),
      password, // Do not lowercase the password
    })
    const user = await this.wrapper(bound, ErrorCode.AuthSignUp)
    return user.userSub
  }

  signIn = async ({password, email}: AuthSignInPayload) => {
    const bound = Auth.signIn.bind(Auth, {
      username: email.toLocaleLowerCase(),
      password, // Do not lowercase the password
    })
    await this.wrapper(bound, ErrorCode.AuthSignIn)
    const bound2 = this.userAttributes.bind(this)
    return await this.wrapper(bound2, ErrorCode.AuthUserAttributes)
  }

  forgotPassword = async (username: string) => {
    try {
      const bound = Auth.forgotPassword.bind(Auth, username.toLocaleLowerCase())
      await this.wrapper(bound, ErrorCode.AuthForgot)
    } catch (e) {
      console.log('Reject: forgotPassword failed', e)
      return Promise.reject(e)
    }
    return
  }

  forgotPasswordSubmit = async (username: string, code: string, password: string) => {
    try {
      const bound = Auth.forgotPasswordSubmit.bind(Auth, username.toLocaleLowerCase(), code, password)
      await this.wrapper(bound, ErrorCode.AuthForgot)
    } catch (e) {
      console.log('forgotPasswordSubmit Failed', e)
      return Promise.reject(e)
    }
    return
  }

  confirmSignUp = async (code: string, email: string) => {
    try {
      const bound = Auth.confirmSignUp.bind(Auth, email.toLocaleLowerCase(), code)
      await this.wrapper(bound, ErrorCode.AuthConfirmSignUp)
    } catch (e) {
      if (
        e.error_code === 'NotAuthorizedException' &&
        e.message === 'User cannot be confirmed. Current status is CONFIRMED' &&
        e.operation_code === ErrorCode.AuthConfirmSignUp
      ) {
        // great, we are confirmed ... continue
      } else if (
        e.error_code === 'InvalidParameterException' &&
        e.message === 'Custom auth lambda trigger is not configured for the user pool.' &&
        e.operation_code === ErrorCode.AuthConfirmSignUp
      ) {
        // meh .. this is a bug in cognito.  ignore it.
      } else {
        console.log(
          'Reject: confirmSignUp failed',
          e.error_code === 'NotAuthorizedException',
          (e.message as string).indexOf('Current status is CONFIRMED') >= 0,
          e.operation_code === ErrorCode.AuthConfirmSignUp,
          e,
        )
        return Promise.reject(e)
      }
    }
  }
}
