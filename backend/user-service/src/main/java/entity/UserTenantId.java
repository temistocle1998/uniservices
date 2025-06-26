package entity;

import java.io.Serializable;
import java.util.UUID;

//Clé composite
public class UserTenantId implements Serializable {
 private UUID user;
 private UUID tenant;
 // equals() et hashCode()
}