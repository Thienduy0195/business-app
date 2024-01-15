package springboot.com.businessapi.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.com.businessapi.entities.product.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryCode(String code);

}
