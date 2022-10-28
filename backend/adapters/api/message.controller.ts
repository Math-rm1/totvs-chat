import { MessageDTO, FindByUserCommand } from './message.command';
import { Body, Controller, Get, Logger, Param, Post } from "@nestjs/common";
import { MessageService } from "domain/ports/message.service";
import { Message } from 'domain/model/message.model';

@Controller({
  path: 'messages',
  version: ['1'],
})
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(
    private messageService: MessageService
  ) {}

  @Post()
  create(@Body() messageCmd: MessageDTO): Message {
    const message = this.messageService.create(
      messageCmd.content,
      messageCmd.contactOrigin,
      messageCmd.contactDestination
    );
    this.logger.log(`Message created`);
    this.logger.log(JSON.stringify(message));
    return message;
  }

  @Get()
  findAll(): Message[] {
    return this.messageService.findAll();
  }

  @Get(':userLoginId/:userContactId')
  findByUser(@Param() params: FindByUserCommand): Message[] {
    return this.messageService.findByUser(params.userLoginId, params.userContactId);
  }
}