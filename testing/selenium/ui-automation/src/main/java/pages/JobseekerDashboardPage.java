package pages;

import base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import utils.WaitUtils;

public class JobseekerDashboardPage extends BasePage {
    WaitUtils wait;

    public JobseekerDashboardPage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }

    By dashboardButton = By.xpath("//a[normalize-space()='My Dashboard']");
    By welcomeMessage = By.xpath("//h1[contains(text(),'Welcome back')]");
    By notificationButton = By.xpath("//a[@href='/notifications']");
    By findJobsButton = By.xpath("//span[normalize-space()='Find Jobs']");
    By jobHistoryButton = By.xpath("//span[normalize-space()='Job History']");
    By mapViewButton = By.xpath("//span[normalize-space()='Map View']");
    By viewProfileButton = By.xpath("//a[normalize-space()='View Full Profile']");

    public void navigateToJobSeekerDashboardPage(){
        wait.waitForElementClickable(dashboardButton);
        driver.findElement(dashboardButton).click();

    }

    public String getWelcomeMessage() {
        wait.waitForElementClickable(welcomeMessage);
        return driver.findElement(welcomeMessage).getText();
    }

    public void clickNotifications() {
        wait.waitForElementClickable(notificationButton);
        driver.findElement(notificationButton).click();
    }

    public void clickFindJobs() {
        driver.findElement(findJobsButton).click();
    }

    public void clickJobHistory() {
        wait.waitForElementClickable(jobHistoryButton);
        driver.findElement(jobHistoryButton).click();
    }

    public void clickMapView() {
        wait.waitForElementClickable(mapViewButton);
        driver.findElement(mapViewButton).click();
    }

    public void clickViewProfile() {
        wait.waitForElementClickable(viewProfileButton);
        driver.findElement(viewProfileButton).click();
    }




}
