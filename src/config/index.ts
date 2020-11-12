import {defaultConfig} from './defaultConfig'
import * as dotenv from 'dotenv'
dotenv.config()

export function get<T extends string>( key: keyof typeof defaultConfig | T ): string {
  return process.env[key] || defaultConfig[key as keyof typeof defaultConfig] || ''
}

export function set<T extends string>( key: keyof typeof defaultConfig | T, value: string ): string {
  return process.env[key] = value
}

export default {
  get,
  set
}
