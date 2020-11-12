import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument } from 'src/modules/user/schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private readonly saltRounds = 10

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return await bcrypt.hash(password, salt)
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save()
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find()
  }

  async findOne(filters: Partial<User>): Promise<User> {
    return this.userModel.findOne(filters)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update({_id: id}, updateUserDto)
  }

  remove(id: number) {
    return this.userModel.remove({_id: id})
  }
}
