package springboot.com.businessapi.services.pet;


import springboot.com.businessapi.entities.pet.Pet;

public interface IPetService {

    Boolean addNew(Pet pet);

    Boolean update(Pet pet);

    Pet findById(Long id);

    Pet findByCode(String code);

    Boolean delete(Long id);
}
