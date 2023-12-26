package springboot.com.businessapi.entities.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageURL;

    @JoinColumn(name = "product_id", referencedColumnName = "id")
    @ManyToOne(targetEntity = Product.class)
    @JsonBackReference
    private Product product;
}
