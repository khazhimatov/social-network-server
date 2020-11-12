import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import * as config from '#config'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        let uri = ''

        if (config.get('NODE_ENV') === 'test') {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const mongoose = require('mongoose')
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const MockMongoose = require('mock-mongoose').MockMongoose
          const mockMongoose = new MockMongoose(new mongoose.Mongoose)

          mockMongoose.prepareStorage().then(function() {
            return mongoose.connect(config.get('MONGODB_CONNECTION_STRING'), { useNewUrlParser: true, useUnifiedTopology: true })
          })

          uri = mockMongoose.getMockConnectionString('27017')
        }
        else {
          uri = config.get('MONGODB_CONNECTION_STRING')
        }

        return {
          uri,
          useCreateIndex: true,
          useNewUrlParser: true,
        }
      }
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
