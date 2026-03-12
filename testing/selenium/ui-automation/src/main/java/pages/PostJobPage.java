package pages;

import base.BasePage;
import org.openqa.selenium.*;
import utils.WaitUtils;

public class PostJobPage extends BasePage {

    WaitUtils wait;

    public PostJobPage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }

    By postJobButton = By.xpath("//a[@href='/postJob' and text()='Post Jobs']");
    By jobTitleField = By.name("title");
    By jobCategoryDropdown = By.xpath("(//button[@role='combobox'])[1]");
    By jobTypeDropdown = By.xpath("(//button[@role='combobox'])[2]");
    By minSalaryField = By.id("salary-min");
    By maxSalaryField = By.id("salary-max");
    By jobLocationField = By.xpath("//input[@placeholder='Search place or address']");
    By searchButton = By.xpath("//button[normalize-space()='Search']");
    By descriptionField = By.name("description");

    By genderDropdown = By.xpath("//button[.//span[text()='Select required gender']]");

    By skillsField = By.name("requirements");

    By startDateField = By.id("schedules.0.startDatetime");
    By endDateField = By.id("schedules.0.endDatetime");

    By requiredWorkersField = By.id("schedules.0.requiredWorkers");

    By deadlineField = By.name("deadline");

    By publishJobBtn = By.xpath("//button[@type='submit']");



    public void clickPostJobBtn(){
        wait.waitForElementClickable(postJobButton);
        driver.findElement(postJobButton).click();
    }

    public void enterJobTitle(String title){
        wait.waitForElementVisible(jobTitleField);
        driver.findElement(jobTitleField).sendKeys(title);
    }

    public void selectJobCategory(String category){

        wait.waitForElementClickable(jobCategoryDropdown);
        driver.findElement(jobCategoryDropdown).click();

        By option = By.xpath("//div[@role='option' and normalize-space()='"+category+"']");
        wait.waitForElementClickable(option);

        driver.findElement(option).click();
    }

    public void selectJobType(String type){

        wait.waitForElementClickable(jobTypeDropdown);
        driver.findElement(jobTypeDropdown).click();

        By option = By.xpath("//div[@role='option' and normalize-space()='"+type+"']");
        wait.waitForElementClickable(option);

        driver.findElement(option).click();
    }

    public void enterMinSalary(String salary){
        driver.findElement(minSalaryField).sendKeys(salary);
    }

    public void enterMaxSalary(String salary){
        driver.findElement(maxSalaryField).sendKeys(salary);
    }

    public void enterJobLocation(String location){
        driver.findElement(jobLocationField).sendKeys(location);
    }

    public void clickSearch(){
        driver.findElement(searchButton).click();
    }

    public void enterDescription(String description){
        driver.findElement(descriptionField).sendKeys(description);
    }

    public void selectGender(String gender){

        wait.waitForElementClickable(genderDropdown);
        driver.findElement(genderDropdown).click();

        By option = By.xpath("//div[@role='option' and normalize-space()='"+gender+"']");
        wait.waitForElementClickable(option);

        driver.findElement(option).click();
    }

    public void enterSkills(String skills){
        driver.findElement(skillsField).sendKeys(skills);
    }


    public void enterStartDate(String datetime){
        WebElement element = wait.waitForElementVisible(startDateField);

        JavascriptExecutor js = (JavascriptExecutor) driver;

        js.executeScript(
                "arguments[0].value = arguments[1];" +
                        "arguments[0].dispatchEvent(new Event('input', {bubbles:true}));" +
                        "arguments[0].dispatchEvent(new Event('change', {bubbles:true}));",
                element,
                datetime
        );

        element.sendKeys(Keys.TAB);
    }

    public void enterEndDate(String datetime){
        WebElement element = wait.waitForElementVisible(endDateField);

        JavascriptExecutor js = (JavascriptExecutor) driver;

        js.executeScript(
                "arguments[0].value = arguments[1];" +
                        "arguments[0].dispatchEvent(new Event('input', {bubbles:true}));" +
                        "arguments[0].dispatchEvent(new Event('change', {bubbles:true}));",
                element,
                datetime
        );

        element.sendKeys(Keys.TAB);
    }

    public void enterDeadline(String datetime){
        WebElement element = wait.waitForElementVisible(deadlineField);

        JavascriptExecutor js = (JavascriptExecutor) driver;

        js.executeScript(
                "arguments[0].value = arguments[1];" +
                        "arguments[0].dispatchEvent(new Event('input', {bubbles:true}));" +
                        "arguments[0].dispatchEvent(new Event('change', {bubbles:true}));",
                element,
                datetime
        );

        element.sendKeys(Keys.TAB);
    }

    public void enterRequiredWorkers(String workers){
        driver.findElement(requiredWorkersField).sendKeys(workers);
    }

    public void clickPublishJobButton(){
        wait.waitForElementClickable(publishJobBtn);
        driver.findElement(publishJobBtn).click();
    }

}