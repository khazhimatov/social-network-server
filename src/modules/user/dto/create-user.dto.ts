import { ApiProperty } from '@nestjs/swagger'
import { v4 as uuidv4 } from 'uuid'
import { UseClassValidator } from '#decorators/class-validator-custom/UseClassValidator'
import { genderEnum } from '../enums/gender.enum'

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  @UseClassValidator('IsEmail')()
  email: string

  @UseClassValidator('MinLength')(5)
  @UseClassValidator('MaxLength')(95)
  password: string

  @UseClassValidator('MinLength')(5)
  @UseClassValidator('MaxLength')(50)
  @ApiProperty({ example: uuidv4() })
  username?: string

  @UseClassValidator('IsPhoneNumber')('+7')
  @ApiProperty({ example: '7777777777' })
  phone?: string

  @UseClassValidator('MinLength')(2)
  @UseClassValidator('MaxLength')(15)
  firstName?: string

  @UseClassValidator('MinLength')(2)
  @UseClassValidator('MaxLength')(15)
  lastName?: string

  @ApiProperty({ example: Date.now() })
  @UseClassValidator('IsNumber')()
  @UseClassValidator('Min')(-2494821736676, {message: 'Указана неправильная дата'})
  birthday?: number

  @UseClassValidator('MinLength')(2)
  @UseClassValidator('IsString')()
  city?: string

  @UseClassValidator('IsEnum')(genderEnum)
  gender?: genderEnum
}
