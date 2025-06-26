package repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Trouver un utilisateur par son email
    Optional<User> findByEmail(String email);

    // Vérifier si un utilisateur existe par son email
    boolean existsByEmail(String email);

    // Trouver un utilisateur par son téléphone
    Optional<User> findByTelephone(String telephone);
}