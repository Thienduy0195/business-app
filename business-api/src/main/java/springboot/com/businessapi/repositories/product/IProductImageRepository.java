package springboot.com.businessapi.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import springboot.com.businessapi.entities.product.ProductImage;

@Repository
@Transactional
public interface IProductImageRepository extends JpaRepository<ProductImage, Long> {

    @Modifying
    @Query(value = "DELETE from product_image pi WHERE pi.product_id = :productId", nativeQuery = true)
    void clearImagesOfProduct(@Param("productId") Long productId);

}
