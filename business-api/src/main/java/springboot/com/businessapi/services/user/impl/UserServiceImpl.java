package springboot.com.businessapi.services.user.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import springboot.com.businessapi.entities.user.User;
import springboot.com.businessapi.exception_handler.UserNotFoundException;
import springboot.com.businessapi.repositories.user.IUserRepository;
import springboot.com.businessapi.services.user.IUserService;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private static final long EXPIRE_TOKEN = 30;

    private final IUserRepository userRepository;

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

    public String forgotPassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("USER NOT FOUND BY EMAIL");
        }

        User user = userOptional.get();
        user.setToken(generateResetPasswordToken());
        user.setTokenCreationDate(LocalDateTime.now());

        user = userRepository.save(user);
        return user.getToken();
    }

    public String resetPassword(User user) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByToken(user.getToken()));

        if (userOptional.isEmpty()) {
            return "INVALID TOKEN.";
        }
        LocalDateTime tokenCreationDate = userOptional.get().getTokenCreationDate();

        if (isTokenExpired(tokenCreationDate)) {
            return "TOKEN EXPIRED.";
        }

        User userUpdate = userOptional.get();

        userUpdate.setPassword(user.getPassword());
        userUpdate.setToken(null);
        userUpdate.setTokenCreationDate(null);

        userRepository.save(userUpdate);

        return "UPDATE PASSWORD SUCCESSFULLY.";
    }

    private String generateResetPasswordToken() {
        StringBuilder token = new StringBuilder();
        return token.append(UUID.randomUUID())
                .append(UUID.randomUUID()).toString();
    }

    private boolean isTokenExpired(final LocalDateTime tokenCreationDate) {

        LocalDateTime now = LocalDateTime.now();
        Duration diff = Duration.between(tokenCreationDate, now);

        return diff.toMinutes() >= EXPIRE_TOKEN;
    }

}
