package springboot.com.businessapi.dto.product_dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductTypeDto {

    private Long productTypeId;

    private String productTypeName;
}
