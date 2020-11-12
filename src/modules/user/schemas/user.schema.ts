import { Document } from 'mongoose';
import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose"
import { genderEnum } from '../enums/gender.enum';
import * as config from '#config';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Schema()
export class User {
  @Prop({ type: String, unique: true, index: true, validate: emailRegex, required: true })
  email: string

  @Prop({ type: String, minlength: 5, maxlength: 95, required: true })
  password: string

  @Prop({ type: String, unique: true, index: true, min: 5, maxlength: 50, required: true, default: uuidv4()})
  username: string

  @Prop({ type: String, minlength: 7, maxlength: 20 })
  phone?: string

  @Prop({ type: String, index: true, minlength: 2, maxlength: 15, required: true, default: config.get('firstNameDefaultValue') })
  firstName: string

  @Prop({ type: String, index: true, minlength: 2, maxlength: 15, required: true, default: config.get('lastNameDefaultValue') })
  lastName: string

  @Prop({ type: Number, index: true })
  birthday?: number

  @Prop({ type: String, index: true, minlength: 2, maxlength: 20 })
  city?: string

  @Prop({ type: String, minlength: 1, maxlength: 200 })
  status?: string

  @Prop({ type: String, enum: Object.values(genderEnum), index: true })
  gender?: genderEnum

  @Prop({ type: Number, required: true, default: Date.now(), index: true })
  createdAt: number

  @Prop({ type: Number, required: true, default: Date.now(), index: true })
  updatedAt: number
}

export const UserSchema = SchemaFactory.createForClass(User)
