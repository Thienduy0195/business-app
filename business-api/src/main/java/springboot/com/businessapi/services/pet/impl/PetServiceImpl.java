package springboot.com.businessapi.services.pet.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.entities.pet.Pet;
import springboot.com.businessapi.repositories.pet.PetRepository;
import springboot.com.businessapi.services.pet.IPetService;


@Service
public class PetServiceImpl implements IPetService {

    private PetRepository petRepository;

    @Autowired
    public PetServiceImpl(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @Override
    public Boolean addNew(Pet pet) {
        petRepository.save(pet);
        return null;
    }

    @Override
    public Boolean update(Pet pet) {
        petRepository.save(pet);
        return null;
    }

    @Override
    public Pet findById(Long id) {
        return petRepository.findById(id).get();
    }

    @Override
    public Pet findByCode(String code) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        petRepository.deleteById(id);
        return null;
    }
}
