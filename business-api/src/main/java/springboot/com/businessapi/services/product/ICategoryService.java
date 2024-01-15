package springboot.com.businessapi.services.product;

import springboot.com.businessapi.dto.product_dto.CategoryDto;

import java.util.List;

public interface ICategoryService {

    List<CategoryDto> findAll();
}
