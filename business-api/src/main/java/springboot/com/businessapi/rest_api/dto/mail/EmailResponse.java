package springboot.com.businessapi.rest_api.dto.mail;

public record EmailResponse(
        String ownerRef,
        String fromEmail,
        String bodyEmail,
        String subjectEmail
) {
}
