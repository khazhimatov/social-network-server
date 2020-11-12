import * as ClassValidator from 'class-validator'
import ErrorMessages from './ErrorMessages'

export const UseClassValidator = (name: string) =>
  <T extends any> (...args: Array<T | ClassValidator.ValidationOptions>) => {
    const defaultOptions = {}
    const ClassValidatorFunc = ClassValidator[name]

    if (ErrorMessages[name]) {
      defaultOptions["message"] = "$property: " + ErrorMessages[name]
    }

    const defaultArgs = new Array(ClassValidatorFunc.length).fill({})
    defaultArgs[ClassValidatorFunc.length - 1] = defaultOptions

    args = defaultArgs.map((_, index) => args[index] ?? {})
    args[args.length - 1] = defaultOptions

    return ClassValidator[name](...args)
  }
