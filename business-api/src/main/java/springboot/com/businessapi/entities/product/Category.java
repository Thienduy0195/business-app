package springboot.com.businessapi.entities.product;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_code", columnDefinition = "varchar(5)")
    private String categoryCode;

    @Column(name = "category_name", columnDefinition = "nvarchar(100)")
    private String categoryName;

    @JsonManagedReference
    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Set<Product> products;
}
