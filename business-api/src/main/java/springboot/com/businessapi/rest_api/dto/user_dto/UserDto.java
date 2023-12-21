package springboot.com.businessapi.rest_api.dto.user_dto;

public record UserDto(Long id, String username, String name, String email, String role) {
}