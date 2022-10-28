import { Injectable } from "@nestjs/common";
import { Contact } from "domain/model/contact.model";
import { ContactRepository } from "domain/ports/contact.repository";

@Injectable()
export class ContactInMemory implements ContactRepository {
  private readonly contacts: Contact[] = [];

  create(contact: Contact): Contact {
    this.contacts.push(contact);
    return contact;
  }

  findById(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  findAll(): Contact[] {
    return this.contacts;
  }
}