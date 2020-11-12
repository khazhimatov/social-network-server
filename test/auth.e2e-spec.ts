import { INestApplication } from '@nestjs/common'
import * as _ from 'lodash'
import * as request from 'supertest'
import { bootstrap } from '#bootstrap'
import { ITestEachArgs, requestData } from './singUpUtils'

describe('module auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrap()
    await app.init()
  })

  describe('SignUp. Creating a new users with different data', () => {
    test.each(...requestData)('$description', async ({data, status}: ITestEachArgs) => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/signUp')
        .send(data)
      return await expect(response.ok).toBe(status)
    })
  })

  afterAll(async (done) => {
    await app.close()
    done()
  });
})
