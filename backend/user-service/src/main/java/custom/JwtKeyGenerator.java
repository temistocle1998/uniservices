package custom;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Base64;
public class JwtKeyGenerator {
	 public static void main(String[] args) {
	        byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded();
	        String secretKey = Base64.getEncoder().encodeToString(keyBytes);
	        // System.out.println("Clé secrète sécurisée : " + secretKey);
	    }
}
