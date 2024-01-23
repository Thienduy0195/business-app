package springboot.com.businessapi.services.product.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.product_dto.ProductDto;
import springboot.com.businessapi.entities.product.Product;
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
    public Page<ProductDto> getProductPage(String code, String name, Long categoryId, Long productTypeId, Integer productFlag, String sortBy, Direction direction, Pageable pageable) {

        System.out.println("code: " + code );
        System.out.println("name: " + name );
        System.out.println("categoryId: " + categoryId );
        System.out.println("productTypeId: " + productTypeId );
        System.out.println("productFlag: " + productFlag );
        System.out.println("sortBy: " + sortBy );
        System.out.println("direction: " + direction.toString() );

        try {
            Specification<Product> spec = Specification.where(null);

            if (code != null && !code.isEmpty()) {
                spec = spec.and((root, query, builder) -> builder.like(root.get("code"), "%" + code + "%"));
            }

            if (name != null && !name.isEmpty()) {
                spec = spec.and((root, query, builder) -> builder.like(root.get("name"), "%" + name + "%"));
            }

            if (categoryId != null) {
                spec = spec.and((root, query, builder) -> builder.equal(root.get("category").get("categoryId"), categoryId));
            }

            if (productTypeId != null) {
                spec = spec.and((root, query, builder) -> builder.equal(root.get("productType").get("productTypeId"), productTypeId));
            }

            if (productFlag == 1) {
                spec = spec.and((root, query, builder) -> builder.equal(root.get("productFlag"), 0));
            }

            if (productFlag == 0) {
                spec = spec.and((root, query, builder) -> builder.equal(root.get("productFlag"), 1));
            }

            Pageable pageableWithSort = pageable;
            if (sortBy != null && !sortBy.isEmpty()) {
                Sort sort = Sort.by(direction, sortBy);
                pageableWithSort = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
            }
            return productRepository.findAll(spec, pageableWithSort).map(item -> modelMapper.map(item, ProductDto.class));

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


//    @Override
//    public Page<ProductDto> getProductPage(Pageable pageable) {
//        try {
//            return productRepository.findAllByProductFlag(pageable).map(item -> modelMapper.map(item, ProductDto.class));
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return null;
//    }

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
