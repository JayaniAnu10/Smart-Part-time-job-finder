package pages;

import base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.WaitUtils;

import java.time.Duration;

public class JobseekerProfilePage extends BasePage {
    WaitUtils wait;

    public JobseekerProfilePage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }

    By jobseekerProfileLink = By.xpath("//a[@href='/seekerProfile']");
    By firstNameField = By.xpath("//input[@value='John']");
    By lastNameField = By.xpath("//input[@value='Doe']");
    By emailField = By.xpath("//input[@name='email']");
    By phoneField = By.xpath("//input[@name='phone']");
    By addressField = By.xpath("//input[@name='address']");
    By bioField = By.xpath("//textarea[@name='bio']");
    By cancelButton = By.xpath("//button[text()='Cancel']");

    public void clickJobseekerProfileLink() {
        wait.waitForElementClickable(jobseekerProfileLink);
        driver.findElement(jobseekerProfileLink).click();
    }

    public boolean isEmailDisabled() {
        return !driver.findElement(emailField).isEnabled();
    }

    public void enterPhone(String phone) {
        driver.findElement(phoneField).clear();
        driver.findElement(phoneField).sendKeys(phone);
    }

    public void enterAddress(String address) {
        driver.findElement(addressField).clear();
        driver.findElement(addressField).sendKeys(address);
    }

    public void enterBio(String bio) {
        driver.findElement(bioField).clear();
        driver.findElement(bioField).sendKeys(bio);
    }

    public void clickCancel() {
        driver.findElement(cancelButton).click();
    }

    public String getFirstName() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement firstName = wait.until(
                ExpectedConditions.visibilityOfElementLocated(firstNameField)
        );
        assert firstName != null;
        return firstName.getAttribute("value");
    }

    public String getLastName() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement lastName = wait.until(
                ExpectedConditions.visibilityOfElementLocated(lastNameField)
        );
        assert lastName != null;
        return lastName.getAttribute("value");
    }
    
    public String getPhone() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement phone = wait.until(
                ExpectedConditions.visibilityOfElementLocated(phoneField)
        );
        assert phone != null;
        return phone.getAttribute("value");
    }


}
