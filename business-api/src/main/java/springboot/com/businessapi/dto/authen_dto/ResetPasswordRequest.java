package springboot.com.businessapi.dto.authen_dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    @Schema(example = "token")
    @NotBlank
    private String token;

    @Schema(example = "password")
    @NotBlank
    private String password;
}
