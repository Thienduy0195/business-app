package springboot.com.businessapi.entities.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import springboot.com.businessapi.entities.pet.PetType;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @Column(columnDefinition = "nvarchar(255)")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String avatarURL;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String note;

    private Integer weight;

    private Integer amount;

    @Column(name = "main_percent")
    private Double mainPrice;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "sale_price")
    private Integer salePrice;

    @Column(name = "review_score")
    private Double reviewScore;

    @JoinColumn(name = "product_type_id", referencedColumnName = "product_type_id")
    @ManyToOne(targetEntity = ProductType.class)
    private ProductType productType;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<ProductImage> productImageSet;


}
