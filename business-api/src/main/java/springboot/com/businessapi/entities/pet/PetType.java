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
public class PetType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_type_id")
    private Long petTypeId;

    @Column(name = "pet_type_name", columnDefinition = "nvarchar(50)")
    private String petTypeName;

    @OneToMany(mappedBy = "petType", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<Pet> petSet;

    public PetType(Long petTypeId, String petTypeName) {
        this.petTypeId = petTypeId;
        this.petTypeName = petTypeName;
    }
}
