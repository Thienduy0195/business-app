package springboot.com.businessapi.controllers.product_api;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.com.businessapi.dto.product_dto.CategoryDto;
import springboot.com.businessapi.dto.product_dto.ProductDto;
import springboot.com.businessapi.dto.product_dto.ProductTypeDto;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.exception_handler.ProductNotFoundException;
import springboot.com.businessapi.services.product.ICategoryService;
import springboot.com.businessapi.services.product.IProductImageService;
import springboot.com.businessapi.services.product.IProductService;
import springboot.com.businessapi.services.product.IProductTypeService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final IProductService productService;
    private final ICategoryService categoryService;
    private final IProductTypeService productTypeService;
    private final IProductImageService productImageService;



    @GetMapping()
    public Page<ProductDto> showProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "30") int size) {
        try {
            Pageable pagination = PageRequest.of(page, size);
            return productService.getProductPage(pagination);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @PostMapping()
    @ResponseBody
    public Product create(@RequestBody @Valid ProductDto productDto) {
        System.out.println(productDto.toString());
        Product product = productService.addNew(productDto);
        if (product != null) {
            productImageService.saveOrUpdate(product, productDto.getProductImages());
        }
        return product;
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<?> showCategories(@PathVariable Long id) {
        if (null == productService.findById(id)){
            throw new ProductNotFoundException("Item not found !");
        }
        return new ResponseEntity<>(productService.findById(id), HttpStatus.OK);
    }


    @PutMapping(value = "/update")
    @ResponseBody
    public Product update(@RequestBody ProductDto productDto) {
        System.out.println(productDto.toString());
        Product product = productService.update(productDto);
        if (product != null) {
            productImageService.saveOrUpdate(product, productDto.getProductImages());
        }
        return product;
    }

    @PutMapping(value = "/delete/{id}")
    @ResponseBody
    public void delete(@PathVariable Long id) {
        if (null == productService.findById(id)){
            throw new ProductNotFoundException("Item not found ! Delete Failed !");
        }else {
            productService.deleteById(id);
        }
    }



    @GetMapping(value = "/categories")
    public List<CategoryDto> showCategories() {
        return categoryService.findAll();
    }


    @GetMapping(value = "/types")
    public List<ProductTypeDto> showProductType() {
        return productTypeService.findAll();
    }

}
