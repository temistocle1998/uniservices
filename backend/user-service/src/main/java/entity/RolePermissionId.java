package entity;

import java.io.Serializable;

//Clé composite
public class RolePermissionId implements Serializable {
	private String role;
	private String permission;
	// equals() et hashCode()
}