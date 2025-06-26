package exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import custom.ApiResponse;


@ControllerAdvice
public class GlobalExceptionHandler {

    // Gérer l'exception EmailAlreadyUsedException
    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<ApiResponse
    <String>> handleEmailAlreadyUsedException(EmailAlreadyUsedException ex) {
        ApiResponse<String> apiResponse = new ApiResponse<>(true, ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    // Gérer les autres exceptions (optionnel)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGenericException(Exception ex) {
        ApiResponse<String> apiResponse = new ApiResponse<>(true, "Une erreur s'est produite : " + ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}