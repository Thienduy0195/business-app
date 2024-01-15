package springboot.com.businessapi.services.product;

import springboot.com.businessapi.dto.product_dto.ProductImageDto;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.entities.product.ProductImage;

import java.util.List;

public interface IProductImageService {
    void saveOrUpdate(Product product, List<ProductImageDto> productImages);

}
