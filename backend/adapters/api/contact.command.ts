import { ApiProperty } from "@nestjs/swagger";

export class FindByUserDTO {
  @ApiProperty()
  userLoginId: string;
}