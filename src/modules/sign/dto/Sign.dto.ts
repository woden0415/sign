import { EnumSignStatus } from "../Sign.entity"


export class SignDto {
  id?: number
  content?: string
  status?: EnumSignStatus
}
