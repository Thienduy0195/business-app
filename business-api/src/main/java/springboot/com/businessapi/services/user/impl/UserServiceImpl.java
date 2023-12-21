package springboot.com.businessapi.services.user.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.entities.user.User;
import springboot.com.businessapi.exception_handler.UserNotFoundException;
import springboot.com.businessapi.repositories.user.UserRepository;
import springboot.com.businessapi.services.user.UserService;


import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }
}
