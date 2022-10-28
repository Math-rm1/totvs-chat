import { FindByUserDTO } from './contact.command';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Contact } from 'domain/model/contact.model';
import { ContactService } from 'domain/ports/contact.service';

@Controller({
  path: 'contacts',
  version: ['1'],
})
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(
    private contactService: ContactService
  ) {}

  @Post()
  create(@Body() contactCmd: Contact): Contact {
    const { name } = contactCmd;
    const contact = this.contactService.create(name);
    this.logger.log(`Contact created`);
    this.logger.log(JSON.stringify(contact));
    return contact;
  }

  @Get()
  findAll(): Contact[] {
    const contacts = this.contactService.findAll();
    return contacts;
  }

  @Get(':userLoginId')
  findByUser(@Param() params: FindByUserDTO): Contact[] {
    return this.contactService.findByUser(params.userLoginId);
  }
}