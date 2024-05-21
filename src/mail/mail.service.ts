import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from "../user/interfaces/user.interface";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, name: string) {
    console.log('email: ', email);
    console.log('name: ', name);
    await this.mailerService.sendMail({
      to: 'kolumb1709@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './src/mail/templates/confirmation',
      text: 'Тестовый текст а вдруг \n заработает' +
        'А так',
      context: { // ✏️ filling curly brackets with content
        name,
      },
    });
  }
}