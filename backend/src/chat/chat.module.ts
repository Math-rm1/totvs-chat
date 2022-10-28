import { Module } from '@nestjs/common';

import { SocketService } from 'domain/ports/socket.service';

import { ContactController } from 'adapters/api/contact.controller';
import { ContactRepository } from 'domain/ports/contact.repository';
import { ContactService } from 'domain/ports/contact.service';
import { ContactInMemory } from 'adapters/db/contactInMemory.repository';

import { MessageRepository } from 'domain/ports/message.repository';
import { MessageInMemory } from 'adapters/db/messageInMemory.repository';

import { MessageController } from 'adapters/api/message.controller';
import { MessageService } from 'domain/ports/message.service';

@Module({
  controllers: [ContactController, MessageController],
  providers: [
    SocketService,
    MessageService,
    ContactService,
    {
      provide: ContactRepository,
      useClass: ContactInMemory
      // useClass: process.env.DATABASE === 'MEMORY' ? ContactInMemory : ContactPostgres
    },
    {
      provide: MessageRepository,
      useClass: MessageInMemory
    }
  ]
})
export class ChatModule {}
