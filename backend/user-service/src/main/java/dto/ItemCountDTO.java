package dto;

public class ItemCountDTO {
	private int found;
    private int lost;

    public ItemCountDTO(int found, int lost) {
        this.found = found;
        this.lost = lost;
    }
    
    public int getFound() { return found; }
    public int getLost() { return lost; }
}
