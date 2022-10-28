import { Injectable } from "@nestjs/common";
import { Message } from "domain/model/message.model";
import { MessageRepository } from "domain/ports/message.repository";

@Injectable()
export class MessageInMemory implements MessageRepository {
  private readonly messages: Message[] = [];

  create(message: Message): Message {
    this.messages.push(message);
    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }

  findByUser(userLoginId: string, userContactId: string): Message[] {
    return this.messages.filter(
      (message) =>
        (message.origin.id === userLoginId && message.destination.id === userContactId) ||
        (message.origin.id === userContactId && message.destination.id === userLoginId)
    );
  }
}