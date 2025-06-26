package service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import custom.LoginResponse;
import dto.LoginRequest;
import dto.RegisterRequest;
import dto.UserDTO;
import entity.User;
import exception.EmailAlreadyUsedException;
import exception.InvalidCredentialsException;
import repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder; // Pour encoder le mot de passe
	@Autowired
	private JwtService jwtService; // Service pour générer des tokens JWT

	/*
	 * public User register(RegisterRequest registerRequest) { // Vérifier si
	 * l'email est déjà utilisé
	 * 
	 * if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
	 * throw new EmailAlreadyUsedException("Email déjà utilisé"); }
	 * 
	 * // Créer un nouvel utilisateur User user = new User();
	 * user.setFirst_name(registerRequest.getFirst_name());
	 * user.setLast_name(registerRequest.getLast_name());
	 * user.setEmail(registerRequest.getEmail());
	 * user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); //
	 * Encoder le mot de passe user.setRole(registerRequest.getRole()); // Encoder
	 * le mot de passe
	 * 
	 * // Définir le rôle (proprietaire ou finder) if
	 * ("owner".equalsIgnoreCase(registerRequest.getRole())) { // Logique spécifique
	 * pour un propriétaire (si nécessaire) } else if
	 * ("finder".equalsIgnoreCase(registerRequest.getRole())) { // Logique
	 * spécifique pour un finder (si nécessaire) } else { throw new
	 * RuntimeException("Rôle invalide. Doit être 'proprietaire' ou 'chercheur'"); }
	 * 
	 * // Sauvegarder l'utilisateur dans la base de données return
	 * userRepository.save(user); }
	 */

	public LoginResponse login(LoginRequest loginRequest) throws InvalidCredentialsException {
		// Trouver l'utilisateur par email
		Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

		if (userOptional.isEmpty()) {
			throw new InvalidCredentialsException("Email ou mot de passe incorrect");
		}

		User user = userOptional.get();

		// Vérifier le mot de passe
		if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			throw new InvalidCredentialsException("Email ou mot de passe incorrect");
		}

		// Générer un token JWT
		String token = jwtService.generateToken(loginRequest.getEmail());

		// Créer la réponse de connexion
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setUserName(user.getUsername());
		loginResponse.setToken(token);
		loginResponse.setRole(loginResponse.getRole());

		return loginResponse;
	}

	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Utilisateur avec l'email " + email + " non trouvé"));
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	/*
	 * public List<UserDTO> getAllUsersByFormat() { List<User> users =
	 * userRepository.findAll(); return users.stream().map(user -> new UserDTO(
	 * user.getId(), user.getFirst_name(), user.getLast_name(), user.getEmail(),
	 * user.getRole() ).collect(Collectors.toList()); }
	 */

}
