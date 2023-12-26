package springboot.com.businessapi.repositories.product;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.com.businessapi.entities.product.Product;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {
}
