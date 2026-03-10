package pages;

import base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import utils.WaitUtils;

public class PostLoginRegistrationPage extends BaseTest {

    WaitUtils wait;

    public PostLoginRegistrationPage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }

    By getStartedBtn = By.xpath("//button[normalize-space()='Get Started']");
    By seekerRegCard = By.xpath("//*[@id=\"auth-container\"]/div/div[2]/div[1]/button");
    //jobseeker
    By firstName = By.xpath("//input[@placeholder='John']");
    By lastName = By.xpath("//input[@placeholder='Doe']");
    By genderDropdown = By.xpath("//select");
    By dobField = By.xpath("//input[@type='date']");
    By NICField = By.xpath("//input[@placeholder='123456789V or 200012345678']");
    By addressField = By.xpath("//input[@placeholder='Your address']");
    By seekerNextButton = By.xpath("//button[normalize-space(text())='Next']");
    By bioField = By.xpath("//textarea[@placeholder='Tell employers about yourself...']");
    By termsCheckbox = By.xpath("//input[@type='checkbox']");
    By createAccountButton = By.xpath("//button[normalize-space()='Create Account']");

    public void clickGetStarted(){
        WebElement button = wait.waitForElementClickable(getStartedBtn);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", button);
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", button);
    }

    public void selectJobSeekerRegistration(){
        wait.waitForElementClickable(seekerRegCard);
        driver.findElement(seekerRegCard).click();
    }

    public void enterFirstName(String fName){
        wait.waitForElementVisible(firstName).sendKeys(fName);
    }

    public void enterLastName(String lName){
        wait.waitForElementVisible(lastName);
        driver.findElement(lastName).sendKeys(lName);
    }

    public void selectGender(String gender){
        wait.waitForElementVisible(genderDropdown);
        Select select = new Select(driver.findElement(genderDropdown));
        select.selectByVisibleText(gender);
    }

    public void enterDOB(String dob){
        driver.findElement(dobField).sendKeys(dob);
    }

    public void enterNIC(String nic){
        driver.findElement(NICField).sendKeys(nic);
    }

    public void enterAddress(String address){
        driver.findElement(addressField).sendKeys(address);
    }

    public void clickNext(){
        wait.waitForElementClickable(seekerNextButton).click();
    }

    public void enterBio(String bio){
        wait.waitForElementVisible(bioField).sendKeys(bio);
    }

    // Dynamic skill selection
    public void selectSkill(String skillName){
        By skill = By.xpath("//*[contains(text(),'" + skillName + "')]");
        wait.waitForElementVisible(skill);
        wait.waitForElementClickable(skill);
        WebElement element = driver.findElement(skill);
        ((JavascriptExecutor) driver)
                .executeScript("arguments[0].scrollIntoView(true);", element);
                element.click();
    }

    public void acceptTerms(){
        wait.waitForElementClickable(termsCheckbox).click();
    }

    public void clickCreateAccount(){
        wait.waitForElementClickable(createAccountButton).click();
    }




}
