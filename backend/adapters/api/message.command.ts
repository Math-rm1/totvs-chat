import { ApiProperty } from "@nestjs/swagger";

export class MessageDTO {
  content: string;
  contactOrigin: string;
  contactDestination: string;
}

export class FindByUserCommand {
  @ApiProperty()
  userLoginId: string;

  @ApiProperty()
  userContactId: string;
}