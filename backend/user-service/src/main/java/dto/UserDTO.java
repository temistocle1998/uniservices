package dto;

import java.util.Date;

public class UserDTO {

	private Long id;
	private String name;
	private String email;
	private String role;
	private String status;
	private Date lastLogin;

	public UserDTO(Long id, String firstName, String lastName, String email, String role, Date joinDate, Date lastLogin) {
		this.id = id;
		this.name = firstName + " " + lastName;
		this.email = email;
		this.role = role;
		this.status = "active"; // Tu peux modifier selon la logique métier
		this.lastLogin = lastLogin;
	}
}
