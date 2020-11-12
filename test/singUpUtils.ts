import { CreateUserDto } from '#modules/user/dto/create-user.dto'
import { genderEnum } from '#modules/user/enums/gender.enum'
import { templateLiteralArgs } from '#utils/templateLiteralArgs'
import * as _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export interface ITestEachArgs {
  data: Partial<CreateUserDto>,
  status: boolean, description?:string
}

export const cloneUser = (user) => {
  const uniqStr = uuidv4()
  const cloneUser = _.clone(user)
  _.set(cloneUser, 'email', uniqStr.substr(0, 5) + '@test.ru')
  return _.set(cloneUser, 'username', uniqStr)
}

const user: CreateUserDto = {
  "email": "test1@test.com",
  "username": "637912fb-ebdd-4851-a55c-46487358da3e",
  "phone": "+79604404900",
  "birthday": 1604482192478,
  "password": "password123",
  "firstName": "Магомед",
  "lastName": "Хажиматов",
  "city": "Grozny",
  "gender": genderEnum.male
}

export const requestData = templateLiteralArgs`
  data | status | description
  ${user} | ${true} | ${'send full data'}
  ${_.pick(cloneUser(user), 'email', 'password')} | ${true} | ${'send only email and password'}
  ${_.pick(cloneUser(user), 'password')} | ${false} | ${'send only password'}
  ${_.pick(cloneUser(user), 'email')} | ${false} | ${'send only email'}
  ${_.pick(cloneUser(user), 'username')} | ${false} | ${'send only username'}
  ${_.set(cloneUser(user), 'email', 'errorEmail')} | ${false} | ${'send data with invalid email'}
  ${_.set(cloneUser(user), 'password', '1')} | ${false} | ${'send data with invalid password'}
  ${_.set(cloneUser(user), 'phone', '77')} | ${false} | ${'send data with invalid phone'}
  ${_.set(cloneUser(user), 'birthday', -999992222222227)} | ${false} | ${'send data with invalid birthday'}
  ${_.set(cloneUser(user), 'firstName', '2')} | ${false} | ${'send data with invalid firstName'}
  ${_.set(cloneUser(user), 'lastName', '7')} | ${false} | ${'send data with invalid lastName'}
  ${_.set(cloneUser(user), 'city', '7')} | ${false} | ${'send data with invalid city'}
  ${_.set(cloneUser(user), 'gender', '77')} | ${false} | ${'send data with invalid gender'}
`
