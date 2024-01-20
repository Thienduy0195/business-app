package springboot.com.businessapi.services.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.mail.EmailDetails;

@Service
@RequiredArgsConstructor
@Log4j2
public class EmailSenderServiceImpl implements IEmailSenderService {


    private final JavaMailSender javaMailSender;

    @Override
    public void sendForgotPassEmail(EmailDetails mail) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            String htmlContent = "<div>Please visit this link to update you password: <a href=\"" + "http://localhost:3000" + mail.getMailContent() + "\">Reset password</a></div>";
            mimeMessage.setContent(htmlContent , "text/html; charset=UTF-8");
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            mimeMessageHelper.setSubject(mail.getMailSubject());
            mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom()));
        mimeMessageHelper.setTo(mail.getMailTo());
        mimeMessageHelper.setText(htmlContent, true);
        mimeMessageHelper.setReplyTo(mail.getMailFrom());
            javaMailSender.send(mimeMessageHelper.getMimeMessage());
    }

    @Override
    public void sendOTPEmail(EmailDetails emailDetails) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        String htmlContent = "<div>This is the OTP for sign up: <strong> " + emailDetails.getMailContent() + "</strong></div>";
        mimeMessage.setContent(htmlContent, "text/html; charset=UTF-8");
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        mimeMessageHelper.setSubject(emailDetails.getMailSubject());
        mimeMessageHelper.setFrom(new InternetAddress(emailDetails.getMailFrom()));
        mimeMessageHelper.setTo(emailDetails.getMailTo());
        mimeMessageHelper.setText(htmlContent, true);
        mimeMessageHelper.setReplyTo(emailDetails.getMailFrom());
        javaMailSender.send(mimeMessageHelper.getMimeMessage());
    }
}
