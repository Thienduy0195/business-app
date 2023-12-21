package springboot.com.businessapi.entities.pet;

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
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Long petId;

    @Column(name = "pet_code", columnDefinition = "nvarchar(50)")
    private String petCode;

    @Column(name = "title_name", columnDefinition = "nvarchar(255)")
    private String titleName;

    private Integer age;

    private String color;

    private String gender;

    @Column(name = "main_price")
    private Integer mainPrice;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "sale_price")
    private Integer salePrice;

    @JoinColumn(name = "pet_type_id", referencedColumnName = "pet_type_id")
    @ManyToOne(targetEntity = PetType.class)
    private PetType petType;

    @OneToMany(mappedBy = "pet", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<PetImage> petImageSet;

    public Pet(Long petId, String petCode, String titleName, Integer age, String color, String gender, Integer mainPrice, Integer discountPercent, Integer salePrice) {
        this.petId = petId;
        this.petCode = petCode;
        this.titleName = titleName;
        this.age = age;
        this.color = color;
        this.gender = gender;
        this.mainPrice = mainPrice;
        this.discountPercent = discountPercent;
        this.salePrice = salePrice;
    }
}
