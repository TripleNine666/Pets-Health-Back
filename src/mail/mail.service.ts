import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ISendMailPayload } from "./mail.types";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(payload: ISendMailPayload) {
    const {name, clinic, orderDto, pet} = payload
    await this.mailerService.sendMail({
      to: clinic.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Запись на прием к ветеринару',
      text: `Здравствуйте, хотим сообщить, что к вам в клинику записался ${name} со своим питомцем по кличке ${pet.name}: \n ${pet.type} порода: ${pet.breed}, пол: ${pet.sex}, возраст: ${pet.age} \n Услуга: ${orderDto.title}, ${orderDto.name} на дату ${new Date(orderDto.date).toLocaleString('ru-RU')} \n Цена ${orderDto.price} BYN`,
    });
  }
}