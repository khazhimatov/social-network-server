import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { User } from '../user/schemas/user.schema'
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'
import { JwtService } from '@nestjs/jwt'
import { UserWithoutPassword } from './interfaces/UserWithoutPassword'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  async signIn(user: UserWithoutPassword): Promise<{accessToken: string}> {
    const payload = { username: user.username, sub: 'auth'}
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    const user: User = await this.userService.findOne({email})

    if (user && bcrypt.compare(password, user.password)) {
      return _.omit(user, 'password')
    }
    return null
  }
}
