package springboot.com.businessapi.services.product.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.product_dto.CategoryDto;
import springboot.com.businessapi.repositories.product.ICategoryRepository;
import springboot.com.businessapi.services.product.ICategoryService;

import java.util.List;
@RequiredArgsConstructor
@Service
public class CateGoryServiceImpl implements ICategoryService {

    private final ICategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream().map(item -> modelMapper.map(item, CategoryDto.class)).toList();
    }
}
