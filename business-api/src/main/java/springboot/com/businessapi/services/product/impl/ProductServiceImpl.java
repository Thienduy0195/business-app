package springboot.com.businessapi.services.product.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.product_dto.ProductDto;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.entities.product.ProductType;
import springboot.com.businessapi.repositories.product.IProductImageRepository;
import springboot.com.businessapi.repositories.product.IProductRepository;
import springboot.com.businessapi.services.product.IProductService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements IProductService {

    private final IProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final IProductImageRepository productImageRepository;


    @Override
    public List<Product> getProductList() {
        return productRepository.findAll();
    }

    @Override
    public Page<ProductDto> getProductPage(Pageable pageable) {
        try {
            return productRepository.findAllByProductFlag(pageable).map(item -> modelMapper.map(item, ProductDto.class));
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Product addNew(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        System.out.println(product.toString());
        return productRepository.save(product);
    }

    @Override
    public Product update(ProductDto productDto) {
        Product product = productRepository.save(modelMapper.map(productDto, Product.class));
        return product;
    }

    @Override
    public ProductDto findById(Long id) {
        try{
            Optional<Product> productOptional = productRepository.findById(id);
            if(productOptional.isPresent()){
                return modelMapper.map(productOptional.get(), ProductDto.class);
            }else {
                throw new NoSuchElementException();
            }
        }catch (NoSuchElementException e){
            e.printStackTrace();
        }
        return null;
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
