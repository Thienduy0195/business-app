package springboot.com.businessapi.services.product.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.repositories.product.IProductRepository;
import springboot.com.businessapi.services.product.IProductService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements IProductService {

    private final IProductRepository productRepository;

    @Override
    public List<Product> getProductList() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> getProductPage(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
