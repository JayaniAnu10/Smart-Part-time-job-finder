package pages;

import base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import utils.WaitUtils;

public class PostLoginEmployerRegistrationPage extends BaseTest {
    WaitUtils wait;

    public PostLoginEmployerRegistrationPage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }


    By getStartedBtn = By.xpath("//button[normalize-space()='Get Started']");
    By getStartedFreeButton = By.xpath("//a[normalize-space()='Get Started Free']");
    By employerRegCard = By.xpath("//*[@id=\"auth-container\"]/div/div[2]/div[2]/button");
    By companyNameField = By.xpath("//input[@placeholder='Your Company Ltd.']");
    By businessRegIDField = By.xpath("//input[@placeholder='e.g., PV12345678']");
    By contactPersonField = By.xpath("//input[@placeholder='John Doe']");
    By contactNoField = By.xpath("//input[@placeholder='+94 77 123 4567']");
    By addressField = By.xpath("//input[@placeholder='Company address']");
    By employerNextButton = By.xpath("//button[normalize-space()='Next']");
    By websiteField = By.xpath("//input[@placeholder='https://www.example.com']");
    By industryDropdown = By.xpath("//select");
    By descriptionField = By.xpath("//textarea[@placeholder='Tell job seekers about your company...']");
    By termsCheckbox = By.xpath("//input[@type='checkbox']");
    By createAccountButton = By.xpath("//button[normalize-space()='Create Account']");

//    public void clickGetStartedBtn(){
//        WebElement button = wait.waitForElementClickable(getStartedBtn);
//        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", button);
//        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", button);
//    }

    public void clickGetStartedFreeBtn(){
        wait.waitForElementClickable(getStartedFreeButton);
        driver.findElement(getStartedFreeButton).click();
    }

    public void chooseEmployerRegistration(){
        wait.waitForElementClickable(employerRegCard);
        driver.findElement(employerRegCard).click();
    }

    public void enterCompanyName(String companyName){
        wait.waitForElementVisible(companyNameField);
        driver.findElement(companyNameField).sendKeys(companyName);
    }

    public void enterBusinessID(String businessID){
        driver.findElement(businessRegIDField).sendKeys(businessID);
    }

    public void enterContactPerson(String contactPerson){
        driver.findElement(contactPersonField).sendKeys(contactPerson);
    }

    public void enterContactNo(String contactNo){
        driver.findElement(contactNoField).sendKeys(contactNo);
    }

    public void enterAddress(String address){
        driver.findElement(addressField).sendKeys(address);
    }

    public void clickNextButton(){
        driver.findElement(employerNextButton).click();
    }

    public void enterWebsiteLink(String websiteLink){
        wait.waitForElementVisible(websiteField);
        driver.findElement(websiteField).sendKeys(websiteLink);
    }

    public void selectIndustry(String industry){
        wait.waitForElementVisible(industryDropdown);
        Select select = new Select(driver.findElement(industryDropdown));
        select.selectByVisibleText(industry);
    }

    public void enterDescription(String description){
        driver.findElement(descriptionField).sendKeys(description);
    }

//    public void acceptTerms(){
//        wait.waitForElementClickable(termsCheckbox).click();
//    }

    public void acceptTerms() {

        WebElement checkbox = driver.findElement(By.xpath("//input[@type='checkbox']"));

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", checkbox);
    }

    public void clickCreateAccount(){
        driver.findElement(createAccountButton).click();
    }






}
