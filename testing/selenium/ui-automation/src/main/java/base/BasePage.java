package base;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.WaitUtils;

public class BasePage {
    protected WebDriver driver;
    protected WaitUtils wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        wait = new WaitUtils(driver);
    }

    By logoutButton = By.xpath("//button[normalize-space()='Logout']");
    By loginButton = By.xpath("//button[normalize-space()='Login']");
    By statusOverlay = By.xpath("//div[@role='status']");

    public void clickLogoutButton() {
        int attempts = 0;
        while (attempts < 3) {
            try {

                wait.waitForElementInvisible(statusOverlay);
                WebElement btn = wait.waitForElementClickable(logoutButton);
                ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", btn);
                btn.click();
                break;
            } catch (org.openqa.selenium.ElementClickInterceptedException e) {
                attempts++;
            }
        }
    }

    public boolean isLoginButtonDisplayed() {
        return wait.waitForElementVisible(loginButton).isDisplayed();
    }

}
