package com.sh.onezip.product.service;

import com.sh.onezip.product.dto.ProductDetailDto;
import com.sh.onezip.product.dto.ProductListDto;
import com.sh.onezip.product.dto.ProductPurchaseInfoDto;
import com.sh.onezip.product.entity.Product;
import com.sh.onezip.product.repository.ProductRepository;
import com.sh.onezip.productoption.repository.ProductOptionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductOptionRepository productOptionRepository;

    @Autowired
    ModelMapper modelMapper;

    public Page<ProductListDto> findAll(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage.map((product) -> convertToProductListDto(product));
    }

    private ProductListDto convertToProductListDto(Product product) {
        ProductListDto productListDto = modelMapper.map(product, ProductListDto.class);
        productListDto.setBizName(product.getBusinessmember().getBizName());
        productListDto.setSellPrice((int)(product.getProductPrice() * (1 - ((double)product.getDiscountRate() / 100))));
        return productListDto;
    }

    public ProductDetailDto ProductDetailDtofindById(Long id) {
        return productRepository.findById(id)
                .map((product) -> convertToProductDetailDto(product))
                .orElseThrow();
    }

    private ProductDetailDto convertToProductDetailDto(Product product) {
        ProductDetailDto productDetailDto = modelMapper.map(product, ProductDetailDto.class);
        productDetailDto.setSellPrice((int)(product.getProductPrice() * (1 - ((double)product.getDiscountRate() / 100))));

//        productOptionRepository.findByProductId(product.getId());
//        productDetailDto.setOptionNames();
//        productDetailDto.setOptionPrices();
        return productDetailDto;
    }


    public List<ProductListDto> findAll() {
        List<Product> products = productRepository.findAll();
        List<ProductListDto> productListDtos = new ArrayList<>();
        for(Product product : products){
            productListDtos.add(convertToProductListDto(product));
        }
        return productListDtos;
    }


    public ProductPurchaseInfoDto productPurchaseInfoDtofindById(Long id) {
        Optional<Product> productOpt = productRepository.findById(id);
        Product product = productOpt.orElse(null);
        ProductPurchaseInfoDto productPurchaseInfoDto = modelMapper.map(product, ProductPurchaseInfoDto.class);
        return productPurchaseInfoDto;
    }
}