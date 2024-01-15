package springboot.com.businessapi.dto.product_dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDto {

    private Long id;

    private String code;

    private String name;

    private String unit;

    private String title;

    private String avatarURL;

    private String information;

    private String description;

    private String note;

    private Integer weight;

    private Integer quantity;

    private Double costPrice;

    private Double wholesalePrice;

    private Double retailPrice;

    private Integer discountPercent;

    private Integer salePrice;

    private Double reviewScore;

    private Integer productFlag = 0;

    private CategoryDto category;

    private ProductTypeDto productType;

    List<ProductImageDto> productImages;

}
