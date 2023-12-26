package springboot.com.businessapi.services.user;


import springboot.com.businessapi.entities.user.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    Optional<User> getUserByEmail(String email);

    boolean existUserWithUsername(String username);

    boolean existUserWithEmail(String email);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);

    String forgotPassword(String email);

    String resetPassword(User user);
}
