package springboot.com.businessapi.services.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import springboot.com.businessapi.dto.product_dto.ProductDto;
import springboot.com.businessapi.entities.product.Product;

import java.util.List;

public interface IProductService {
    List<Product> getProductList();
    Page<ProductDto> getProductPage(Pageable pageable);

    Product addNew(ProductDto productDto);

    Product update(ProductDto productDto);

    ProductDto findById(Long id);

    void deleteById(Long id);
}
