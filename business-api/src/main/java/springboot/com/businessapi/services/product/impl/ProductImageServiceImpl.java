package springboot.com.businessapi.services.product.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.product_dto.ProductImageDto;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.entities.product.ProductImage;
import springboot.com.businessapi.repositories.product.IProductImageRepository;
import springboot.com.businessapi.services.product.IProductImageService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageServiceImpl implements IProductImageService {
    private final IProductImageRepository productImageRepository;

    @Override
    public void saveOrUpdate(Product product, List<ProductImageDto> productImages) {
        productImageRepository.clearImagesOfProduct(product.getId());
        productImages.forEach(item -> {
            System.out.println(item.toString());
            productImageRepository.save(new ProductImage(null, item.getImageURL(), product));
        });
    }


}
