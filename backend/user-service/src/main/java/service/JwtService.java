package service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import entity.User;

import java.util.Base64;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class JwtService {

	@Value("${jwt.secret}")
	private String secret;
    private SecretKey secretKey;

	@Value("${jwt.expiration}")
	private long expiration;
	
    private final UserService userService = new UserService();

	
	public String generateToken(String email) {
		try {
			if (secret == null || secret.isEmpty()) {
				throw new IllegalStateException("La clé secrète JWT n'est pas configurée.");
			}
			if (expiration <= 0) {
				throw new IllegalStateException("La durée d'expiration du JWT est invalide.");
			}

	        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

	        String token = Jwts.builder()
	                .setSubject(email)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + expiration))
	                .signWith(secretKey, SignatureAlgorithm.HS512)
	                .compact();

			return token;
		} catch (Exception e) {
			  e.printStackTrace(); // Afficher les erreurs pour mieux comprendre le problème
		        return null;
		}
	}

	private SecretKey getSigningKey() {
	    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); // Utiliser UTF-8 pour éviter les erreurs d'encodage
	}
	
	public String getEmailFromToken(String token) {
		SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
	    
	    Claims claims = Jwts.parserBuilder()
	            .setSigningKey(getSigningKey())
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
	    
	    return claims.getSubject();
	}
	
	 public User extractUserFromToken(String token) {
	        if (token == null || !token.startsWith("Bearer ")) {
	            throw new IllegalArgumentException("Invalid or missing token");
	        }

	        String authToken = token.substring(7); // Supprimer "Bearer "
	        String email = this.getEmailFromToken(authToken);

	        if (email == null || email.isEmpty()) {
	            throw new IllegalArgumentException("Le token ne contient pas d'email valide.");
	        }

	        User user = userService.findByEmail(email);
	        if (user == null) {
	            throw new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + email);
	        }

	        return user;
	    }
}