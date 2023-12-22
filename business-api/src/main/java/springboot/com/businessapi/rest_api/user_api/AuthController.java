package springboot.com.businessapi.rest_api.user_api;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springboot.com.businessapi.exception_handler.DuplicatedUserInfoException;
import springboot.com.businessapi.mapper.UserMapper;
import springboot.com.businessapi.rest_api.dto.authen_dto.AuthResponse;
import springboot.com.businessapi.rest_api.dto.authen_dto.LoginRequest;
import springboot.com.businessapi.rest_api.dto.authen_dto.SignUpRequest;
import springboot.com.businessapi.security.TokenProvider;
import springboot.com.businessapi.services.user.IUserService;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final UserMapper userMapper;

    @PostMapping("/authenticate")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.existUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (userService.existUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        userService.saveUser(userMapper.mapSignUpRequestToUser(signUpRequest));

        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        return new AuthResponse(token);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }

    @PostMapping("/forgot-password")
    public String forgotPass(@RequestBody Map<String, String> request){
        String email =  request.get("email");
        String response = userService.forgotPass(email);

        if(!response.startsWith("The email")){
            response= "/reset-password?token=" + response;
        }
        return response;
    }

    @PutMapping("/reset-password")
    public String resetPass(@RequestParam String token, @RequestParam String password){
        return userService.resetPass(token,password);
    }


}
