package springboot.com.businessapi.entities.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_type_id")
    private Long productTypeId;

    @Column(name = "pet_type_name", columnDefinition = "nvarchar(100)")
    private String productTypeName;

    @OneToMany(mappedBy = "productType", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<Product> products;
}
