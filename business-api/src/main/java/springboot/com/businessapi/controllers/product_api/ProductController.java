package springboot.com.businessapi.controllers.product_api;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @GetMapping(value = "/admins")
    public Page<ProductDto> showProductsAdmin(
            @RequestParam(required = false, value = "page", defaultValue = "0") int page,
            @RequestParam(required = false, value = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(required = false, value = "productFlag") Integer productFlag,
            @RequestParam(required = false, value = "code") String code,
            @RequestParam(required = false, value = "name") String name,
            @RequestParam(required = false, value = "categoryId") Long categoryId,
            @RequestParam(required = false, value = "productTypeId") Long productTypeId,
            @RequestParam(required = false, value = "sortType") String sortType
    ) {
        try {
            String sortBy;
            Sort.Direction direction;
            if ("SALE-DESC".equals(sortType)) {
                sortBy = "soldQuantity";
                direction = Sort.Direction.DESC;
            } else if ("SALE-ASC".equals(sortType)) {
                sortBy = "remainingQuantity";
                direction = Sort.Direction.DESC;
            } else {
                sortBy = "id";
                direction = Sort.Direction.ASC;
            }
            Pageable pagination = PageRequest.of(page, pageSize);
            return productService.getProductPage(code, name, categoryId, productTypeId, productFlag, sortBy, direction, pagination);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }


    @GetMapping(value = "/users")
    public Page<ProductDto> showProductsUser(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "30") int size) {
        try {
            Pageable pagination = PageRequest.of(page, size);
            return productService.getProductPageUser(pagination);
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
