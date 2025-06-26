package custom;

public class ApiResponse<T> {
    private boolean error;
    private T data;
    private String message;


    public ApiResponse(boolean error, T data) {
        this.error = error;
        this.data = data;
    }
    

    public ApiResponse(boolean error, String message) {
        this.error = error;
        this.message = message;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
