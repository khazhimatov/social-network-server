import { User } from "src/modules/user/schemas/user.schema"

export type UserWithoutPassword = Omit<User, 'password'>
