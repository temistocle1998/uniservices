package entity;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
	@Id
	@GeneratedValue
	private UUID id;
	@Column(nullable = false)
	private String first_name;
	@Column(nullable = false)
	private String last_name;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String phone_number;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String role;
	@Column(nullable = false)
	private String tenant_id;
	@Column(nullable = false)
	private boolean is_active;
	@Column(nullable = false)
	private boolean is_superadmin;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// Retourner les rôles de l'utilisateur
		return Collections.singletonList(new SimpleGrantedAuthority(this.role));
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.email;
	}
}
