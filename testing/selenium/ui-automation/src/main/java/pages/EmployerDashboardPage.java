package pages;

import base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import utils.WaitUtils;

public class EmployerDashboardPage extends BasePage {

    WaitUtils wait;
    public EmployerDashboardPage(WebDriver driver) {
        super(driver);
        wait = new WaitUtils(driver);
    }

    By employerDashboardBtn = By.xpath("//a[normalize-space()='Employer Dashboard']");
    By postJobBtn = By.xpath("//span[normalize-space()='Post New Job']");
    By viewProfileBtn = By.xpath("//a[normalize-space()='View Full Profile']");

    public void navigateToEmployerDashboardPage(){
        wait.waitForElementClickable(employerDashboardBtn);
        driver.findElement(employerDashboardBtn).click();
    }

    public void clickPostJob(){
        wait.waitForElementClickable(postJobBtn);
        driver.findElement(postJobBtn).click();
    }

    public void clickViewProfile(){
        wait.waitForElementClickable(viewProfileBtn);
        driver.findElement(viewProfileBtn).click();
    }
}
