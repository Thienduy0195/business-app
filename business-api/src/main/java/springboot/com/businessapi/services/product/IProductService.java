package springboot.com.businessapi.services.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import springboot.com.businessapi.entities.product.Product;

import java.util.List;

public interface IProductService {
    List<Product> getProductList();
    Page<Product> getProductPage(Pageable pageable);
    Product findById(Long id);

}
