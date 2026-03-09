package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class WaitUtils {
    WebDriver driver;
    WebDriverWait wait;

    public WaitUtils(WebDriver driver){
        this.driver = driver;
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void waitForElementClickable(By locator){
        wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    public void waitForElementVisible(By locator){
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
}
