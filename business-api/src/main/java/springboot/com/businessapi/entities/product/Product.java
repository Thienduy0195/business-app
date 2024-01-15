package springboot.com.businessapi.entities.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.domain.Persistable;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Product implements Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @Column(columnDefinition = "nvarchar(255)")
    private String name;

    @Column(columnDefinition = "nvarchar(100)")
    private String unit;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String avatarURL;

    @Column(columnDefinition = "TEXT")
    private String information;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String note;

    private Integer weight;

    private Integer quantity;

    @Column(name = "cost_price")
    private Double costPrice;

    @Column(name = "wholesale_price")
    private Double wholesalePrice;

    @Column(name = "retail_price")
    private Double retailPrice;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "sale_price")
    private Integer salePrice;

    @Column(name = "review_score")
    private Double reviewScore;

    @Column(name = "created_date", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Column(name = "last_update")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime lastUpdate;

    @Column(name = "product_flag", columnDefinition = "INT DEFAULT 0")
    private Integer productFlag = 0;


    @JsonBackReference
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    @ManyToOne(targetEntity = Category.class)
    private Category category;

    @JsonBackReference
    @JoinColumn(name = "product_type_id", referencedColumnName = "product_type_id")
    @ManyToOne(targetEntity = ProductType.class)
    private ProductType productType;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonBackReference
    List<ProductImage> productImages;

    @PrePersist
    public void onPrePersist() {
        this.createdDate = LocalDateTime.now();
        this.lastUpdate = LocalDateTime.now();
    }

    @PreUpdate
    public void onPreUpdate() {
        this.lastUpdate = LocalDateTime.now();
    }

    @Override
    @JsonIgnore
    public boolean isNew() {
        return getId() == null;
    }
}
