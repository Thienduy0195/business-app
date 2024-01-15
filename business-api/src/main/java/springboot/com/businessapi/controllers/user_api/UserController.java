package springboot.com.businessapi.controllers.user_api;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springboot.com.businessapi.entities.user.User;
import springboot.com.businessapi.mapper.IUserMapper;
import springboot.com.businessapi.dto.user_dto.UserDto;
import springboot.com.businessapi.security.CustomUserDetails;
import springboot.com.businessapi.services.user.IUserService;

import java.util.List;
import java.util.stream.Collectors;

import static springboot.com.businessapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;

    private final IUserMapper userMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/me")
    public UserDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        return userMapper.toUserDto(user);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<UserDto> getUsers() {
        return userService.getUsers().stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{username}")
    public UserDto getUser(@PathVariable String username) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(username));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{username}")
    public UserDto deleteUser(@PathVariable String username) {
        User user = userService.validateAndGetUserByUsername(username);
        userService.deleteUser(user);
        return userMapper.toUserDto(user);
    }

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getUsers().size();
    }

}
