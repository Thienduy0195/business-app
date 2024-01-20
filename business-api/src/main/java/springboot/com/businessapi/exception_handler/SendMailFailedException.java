package springboot.com.businessapi.exception_handler;

public class SendMailFailedException extends RuntimeException{
    public SendMailFailedException(String message){
        super(message);
    }
}
