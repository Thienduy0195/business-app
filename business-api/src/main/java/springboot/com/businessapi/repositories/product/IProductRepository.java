package springboot.com.businessapi.repositories.product;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.entities.product.ProductImage;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {



    @Modifying
    @Query("UPDATE Product p SET p.productFlag = 1 where p.id =:entityId")
    void deleteById(Long entityId);

//    @Query("SELECT p FROM Product p WHERE p.productFlag = 0")
    @Query("SELECT p FROM Product p")
    Page<Product> findAllByProductFlag(Pageable pageable);


    Page<Product> findAll(Specification<Product> spec, Pageable pageable);
}
