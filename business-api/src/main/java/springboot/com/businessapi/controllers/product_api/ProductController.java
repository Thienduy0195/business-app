package springboot.com.businessapi.controllers.product_api;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.services.product.IProductService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final IProductService productService;

    @GetMapping("/list")
    public Page<Product> showProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "3") int size) {
        try {
            Pageable pagination = PageRequest.of(page, size);
            return productService.getProductPage(pagination);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }


}
