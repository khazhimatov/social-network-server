import { UnauthorizedException } from '@nestjs/common';

export const CatchSignUpError = () => (_: unknown, __: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
  const originalMethod = descriptor.value
  
  descriptor.value = async function SafeWrapper(...args: any[]) {
    try {
      await originalMethod.apply(this, args)
    } catch(error) {
      let errorMessage: string | Record<string, string> = 'Неизвестная ошибка'

      if (error.code && error.code == 11000) {
          errorMessage = 'Такой пользователь уже существует'
      } else if (error.errors) {
        errorMessage = {}
        Object.keys(error.errors).forEach((item: string) => {
          errorMessage[item] = error.errors[item].properties.message
        })
      }
      else {
        console.error(error)
      }

      throw new UnauthorizedException(errorMessage, 'Ошибка авторизации')
    }
  }
  return descriptor
}
