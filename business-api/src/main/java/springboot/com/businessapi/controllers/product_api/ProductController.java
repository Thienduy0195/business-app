package springboot.com.businessapi.controllers.product_api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springboot.com.businessapi.entities.product.Product;
import springboot.com.businessapi.services.product.IProductService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final IProductService productService;

    @GetMapping("/list")
    public List<Product> showProductList() {
        return productService.getProductList();
    }
}
