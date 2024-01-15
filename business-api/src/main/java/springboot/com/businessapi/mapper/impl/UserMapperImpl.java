package springboot.com.businessapi.mapper.impl;


import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.authen_dto.ResetPasswordRequest;
import springboot.com.businessapi.entities.user.User;
import springboot.com.businessapi.dto.authen_dto.SignUpRequest;
import springboot.com.businessapi.dto.user_dto.UserDto;
import springboot.com.businessapi.mapper.IUserMapper;
import springboot.com.businessapi.security.WebSecurityConfig;
import springboot.com.businessapi.security.oauth2.OAuth2Provider;

@RequiredArgsConstructor
@Component
public class UserMapperImpl implements IUserMapper {

    private final PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;

    @Autowired
    public UserMapperImpl(PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole());
    }

    @Override
    public User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        User user = modelMapper.map(signUpRequest, User.class);
        System.out.println(user.toString());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(WebSecurityConfig.ADMIN);
        user.setProvider(OAuth2Provider.LOCAL);
        System.out.println(user.toString());
        return user;
    }

    @Override
    public User mapResetPasswordRequestToUser(ResetPasswordRequest resetPasswordRequest) {
        User user = modelMapper.map(resetPasswordRequest, User.class);
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        return user;
    }
}
