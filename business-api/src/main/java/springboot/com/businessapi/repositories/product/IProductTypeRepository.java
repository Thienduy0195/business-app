package springboot.com.businessapi.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.com.businessapi.entities.product.ProductType;

@Repository
public interface IProductTypeRepository extends JpaRepository<ProductType, Long> {
}
