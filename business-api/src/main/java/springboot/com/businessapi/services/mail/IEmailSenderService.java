package springboot.com.businessapi.services.mail;


import jakarta.mail.MessagingException;
import springboot.com.businessapi.dto.mail.EmailDetails;

public interface IEmailSenderService {

    void sendForgotPassEmail(EmailDetails emailDetails) throws MessagingException;

    void sendOTPEmail(EmailDetails emailDetails) throws MessagingException ;
}