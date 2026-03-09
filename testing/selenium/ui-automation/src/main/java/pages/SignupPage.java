package pages;

import base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import utils.WaitUtils;

public class SignupPage extends BaseTest {

    WaitUtils wait;

    public SignupPage(WebDriver driver){
        super(driver);
        wait = new WaitUtils(driver);
    }

    By LoginNavButton = By.xpath("//button[text()='Login']");

    By signupTab = By.xpath("//button[text()='Sign Up'][1]");

    By emailField = By.name("email");

    By contactNoField = By.name("contact");

    By passwordField = By.name("password");

    By confirmPasswordField = By.name("confirmPassword");

    By signupButton = By.xpath("(//button[text()='Sign Up'])[2]");

    public void openSignupPage(){
        wait.waitForElementClickable(LoginNavButton);
        driver.findElement(LoginNavButton).click();
    }

    public void clickSignupTab(){
        wait.waitForElementClickable(signupTab);
        driver.findElement(signupTab).click();
    }

    public void enterEmail(String email){
        driver.findElement(emailField).sendKeys(email);
    }

    public void enterContactNo(String contactNo){
        driver.findElement(contactNoField).sendKeys(contactNo);
    }

    public void enterPassword(String password){
        driver.findElement(passwordField).sendKeys(password);
    }

     public void enterConfirmPassword(String confirmPassword){
        driver.findElement(confirmPasswordField).sendKeys(confirmPassword);
     }

     public void clickSignupButton(){
        driver.findElement(signupButton).click();
     }
}
