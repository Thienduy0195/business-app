package springboot.com.businessapi.services.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.mail.EmailDetails;

import java.io.File;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Log4j2
public class EmailService implements IEmailSenderService {


    private final JavaMailSender javaMailSender;


    @Value("${spring.mail.username}")
    private String sender;

    // Method 1
    // To send a simple email
    public String sendSimpleMail(EmailDetails details) {

        // Try block to check for exceptions
        try {

            MimeMessage message = javaMailSender.createMimeMessage();
            // Sử dụng Helper để thiết lập các thông tin cần thiết cho message
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom("info.silvafarm@gmail.com");
            helper.setTo(details.getRecipient());
            helper.setSubject(details.getSubject());
            helper.setText(details.getMsgBody(), true);
            helper.setReplyTo("info.silvafarm@gmail.com");


            // Gửi message đến SMTP server
            javaMailSender.send(message);

            // Creating a simple mail message
//            SimpleMailMessage mailMessage
//                    = new SimpleMailMessage();

            // Setting up necessary details
//            mailMessage.setFrom(sender);
//            mailMessage.setTo(details.getRecipient());
//            mailMessage.setText(details.getMsgBody());
//            mailMessage.setSubject(details.getSubject());
//
//            // Sending the mail
//            javaMailSender.send(mailMessage);
            System.out.println("SEND MAIL SUCCESS");
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            System.out.println("SEND MAIL FAIL");
        e.printStackTrace();
            return "Error while Sending Mail";
        }
    }

    // Method 2
    // To send an email with attachment
    public String
    sendMailWithAttachment(EmailDetails details) {
        // Creating a mime message
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            // Setting multipart as true for attachments to
            // be sends
            mimeMessageHelper
                    = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(
                    details.getSubject());

            // Adding the attachment
            FileSystemResource file
                    = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(
                    Objects.requireNonNull(file.getFilename()), file);

            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }

        // Catch block to handle MessagingException
        catch (MessagingException e) {

            // Display message when exception occurred
            return "Error while sending mail!!!";
        }
    }
}
