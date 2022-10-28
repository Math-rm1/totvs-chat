import { MessageRepository } from './message.repository';
import { Get, Inject, Injectable, Post } from "@nestjs/common";
import { Contact } from "domain/model/contact.model";
import { ContactRepository } from "./contact.repository";

@Injectable()
export class ContactService {
  constructor(
    @Inject(ContactRepository) private readonly contactRepository: ContactRepository,
    @Inject(MessageRepository) private readonly messageRepository: MessageRepository
  ) {}

  create(name: string): Contact {
    const contact = new Contact(name);
    this.contactRepository.create(contact);
    return contact;
  }

  findAll(): Contact[] {
    const contacts = this.contactRepository.findAll();
    return contacts;
  }

  findByUser(userLoginId: string): Contact[] {
    const contacts = this.contactRepository.findAll();
    return contacts.filter(
      (contact) => this.messageRepository.findByUser(userLoginId, contact.id).length);
  }
}