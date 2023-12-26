package springboot.com.businessapi.mapper;


import springboot.com.businessapi.dto.authen_dto.ResetPasswordRequest;
import springboot.com.businessapi.entities.user.User;
import springboot.com.businessapi.dto.authen_dto.SignUpRequest;
import springboot.com.businessapi.dto.user_dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);

    User mapSignUpRequestToUser(SignUpRequest signUpRequest);

    User mapResetPasswordRequestToUser(ResetPasswordRequest resetPasswordRequest);
}
