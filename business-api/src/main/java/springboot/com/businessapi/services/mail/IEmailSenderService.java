package springboot.com.businessapi.services.mail;


import springboot.com.businessapi.dto.mail.EmailDetails;

public interface IEmailSenderService {

    void sendEmail(EmailDetails emailDetails);
}