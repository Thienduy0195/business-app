package springboot.com.businessapi.services.mail;


import springboot.com.businessapi.dto.mail.EmailDetails;

public interface IEmailSenderService {

    // Method
    // To send a simple email
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details);
}