import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class HelloAsl {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        System.out.println("Hello ASL from Java");
        System.out.println("Current date: " + now.format(formatter));
    }
}
