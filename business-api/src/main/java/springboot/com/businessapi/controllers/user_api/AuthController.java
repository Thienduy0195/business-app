package springboot.com.businessapi.controllers.user_api;


import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springboot.com.businessapi.dto.authen_dto.AuthResponse;
import springboot.com.businessapi.dto.authen_dto.LoginRequest;
import springboot.com.businessapi.dto.authen_dto.ResetPasswordRequest;
import springboot.com.businessapi.dto.authen_dto.SignUpRequest;
import springboot.com.businessapi.dto.mail.EmailDetails;
import springboot.com.businessapi.entities.user.User;
import springboot.com.businessapi.exception_handler.DuplicatedUserInfoException;
import springboot.com.businessapi.exception_handler.UserNotFoundException;
import springboot.com.businessapi.mapper.IUserMapper;
import springboot.com.businessapi.security.TokenProvider;
import springboot.com.businessapi.services.mail.IEmailSenderService;
import springboot.com.businessapi.services.user.IUserService;

import java.util.Map;
import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final IUserMapper userMapper;
    private final IEmailSenderService emailSender;

    @PostMapping("/authenticate")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthResponse(token);
    }

    @PostMapping("/signup-email/{email}")
    public ResponseEntity<String> checkEmailSignup(@PathVariable String email) {
        if (userService.existUserWithEmail(email)) {
            throw new DuplicatedUserInfoException(String.format("%s has been used !", email));
        }
        String OTP = generateOtp();
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setMailFrom("info.silvafarm@gmail.com");
        emailDetails.setMailTo(email);
        emailDetails.setMailSubject("SILVA FARM - SIGN UP YOUR ACCOUNT");
        emailDetails.setMailContent(OTP);
        try {
            emailSender.sendOTPEmail(emailDetails);
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error sending email: " + e.getMessage());
        }

        return ResponseEntity.ok(OTP);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.existUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s has already been used!", signUpRequest.getUsername()));
        }
        userService.saveUser(userMapper.mapSignUpRequestToUser(signUpRequest));

        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        return new AuthResponse(token);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String response = "";
        String email = request.get("email");
        if(userService.existUserWithEmail(email)){
            response = "/reset-password?token=" + userService.forgotPassword(email);
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setMailFrom("info.silvafarm@gmail.com");
            emailDetails.setMailTo(email);
            emailDetails.setMailSubject("SILVA FARM - RESET YOUR PASSWORD");
            emailDetails.setMailContent(response);
            try {
                emailSender.sendForgotPassEmail(emailDetails);
            } catch (MessagingException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error sending email: " + e.getMessage());
            }
        } else {
            throw new UserNotFoundException(String.format("Email %s is invalid!", email));
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        User user = userMapper.mapResetPasswordRequestToUser(resetPasswordRequest);
        return userService.resetPassword(user);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }

    public static String generateOtp() {
        int otpLength = 6;
        String numbers = "0123456789";
        StringBuilder otp = new StringBuilder(otpLength);
        Random random = new Random();
        for (int i = 0; i < otpLength; i++) {
            int index = random.nextInt(numbers.length());
            char digit = numbers.charAt(index);
            otp.append(digit);
        }
        return otp.toString();
    }

}
