package springboot.com.businessapi.services.product.impl;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.dto.product_dto.ProductTypeDto;
import springboot.com.businessapi.entities.product.ProductType;
import springboot.com.businessapi.repositories.product.IProductTypeRepository;
import springboot.com.businessapi.services.product.IProductTypeService;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ProductTypeServiceImpl implements IProductTypeService {

    private final IProductTypeRepository productTypeRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<ProductTypeDto> findAll() {
        return productTypeRepository.findAll().stream().map(item-> modelMapper.map(item, ProductTypeDto.class)).toList();
    }
}
