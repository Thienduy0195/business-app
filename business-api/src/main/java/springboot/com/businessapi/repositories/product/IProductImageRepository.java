package springboot.com.businessapi.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.com.businessapi.entities.product.ProductImage;

public interface IProductImageRepository extends JpaRepository<ProductImage, Long> {
}
