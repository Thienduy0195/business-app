package springboot.com.businessapi.dto.product_dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductImageDto {
    private Long imageId;
    private String imageURL;
}
