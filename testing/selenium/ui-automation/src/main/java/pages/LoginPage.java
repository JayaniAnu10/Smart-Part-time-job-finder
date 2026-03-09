package pages;

import base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class LoginPage extends BaseTest {

    WebDriverWait wait;

    public LoginPage(WebDriver driver) {
        super(driver);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    By LoginNavButton = By.xpath("//*[@id=\"root\"]/div[2]/nav/div[3]/a[1]/button");

    By LoginTab = By.xpath("//*[@id=\"auth-container\"]/div/div[3]/div/button[1]\n");

    By emailField = By.xpath("//*[@id=\"auth-container\"]/div/div[3]/form/div[1]/div/input");

    By passwordField = By.name("password");

    By loginButton = By.xpath("//*[@id=\"auth-container\"]/div/div[3]/form/button");

    public void openLoginPage(){
        driver.findElement(LoginNavButton).click();
    }

    public void clickLoginTab(){
        wait.until(ExpectedConditions.elementToBeClickable(LoginTab)).click();
    }

    public void enterEmail(String email){
        driver.findElement(emailField).sendKeys(email);
    }

    public void enterPassword(String password){
        driver.findElement(passwordField).sendKeys(password);
    }

    public void clickLogin(){
        driver.findElement(loginButton).click();
    }
}

