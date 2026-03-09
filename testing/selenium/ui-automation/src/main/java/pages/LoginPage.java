package pages;

import base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import utils.WaitUtils;


public class LoginPage extends BaseTest {

    WaitUtils wait;

    public LoginPage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }

    By LoginNavButton = By.xpath("//button[text()='Login']");

    By LoginTab = By.xpath("(//button[text()='Login'])[1]");

    By emailField = By.name("email");

    By passwordField = By.name("password");

    By loginButton = By.xpath("(//button[text()='Login'])[2]");

    public void openLoginPage(){
        wait.waitForElementClickable(LoginNavButton);
        driver.findElement(LoginNavButton).click();
    }

    public void clickLoginTab(){
        wait.waitForElementClickable(LoginTab);
        driver.findElement(LoginTab).click();
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

