package springboot.com.businessapi.services.product;

import springboot.com.businessapi.dto.product_dto.ProductTypeDto;

import java.util.List;

public interface IProductTypeService {

    List<ProductTypeDto> findAll();
}
