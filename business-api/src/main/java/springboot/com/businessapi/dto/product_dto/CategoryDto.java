package springboot.com.businessapi.dto.product_dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryDto {

    private Long categoryId;

    private String categoryCode;

    private String categoryName;
}
