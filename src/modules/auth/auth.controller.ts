import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common'
import { ApiBody, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { CatchSignUpError } from './decorators/CatchSignUpError.decorator'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth. SignUp')
  @ApiBody({ type: CreateUserDto })

  @Post('/signUp')
  @CatchSignUpError()
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto)
  }

  @ApiTags('Auth. SignUp')
  @ApiQuery({ name: 'username', type: String })
  @ApiQuery({ name: 'password', type: String })

  @UseGuards(AuthGuard('local'))
  @Get('/signIn')
  signIn(@Request() req) {
    return this.authService.signIn(req.user)
  }

  @ApiTags('Auth. SignUp')
  @ApiBearerAuth()

  @UseGuards(AuthGuard())
  @Get('/test')
  test() {
    return 'test'
  }
}

