package springboot.com.businessapi.repositories.pet;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.com.businessapi.entities.pet.Pet;


@Repository
@Transactional
public interface PetRepository extends JpaRepository<Pet, Long> {


}
