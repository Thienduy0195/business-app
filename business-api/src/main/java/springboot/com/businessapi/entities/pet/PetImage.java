package springboot.com.businessapi.entities.pet;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class PetImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageURL;

    @JoinColumn(name = "pet_id", referencedColumnName = "pet_id")
    @ManyToOne(targetEntity = Pet.class)
    private Pet pet;

}
