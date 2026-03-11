package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.PostLoginJobseekerRegistrationPage;

import java.time.Duration;

public class PostLoginJobSeekerRegistrationTest extends BaseTest {

    PostLoginJobseekerRegistrationPage seekerRegistrationPage;

    @Test
    public void testJobSeekerRegistration() {

        //login
        login("testuser2@example.com", "123456");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        seekerRegistrationPage = new PostLoginJobseekerRegistrationPage(driver);
        seekerRegistrationPage.clickGetStarted();
        seekerRegistrationPage.selectJobSeekerRegistration();
        seekerRegistrationPage.enterFirstName("John");
        seekerRegistrationPage.enterLastName("Doe");
        seekerRegistrationPage.selectGender("Male");
        seekerRegistrationPage.enterDOB("2000-01-01");
        seekerRegistrationPage.enterNIC("112222222V");
        seekerRegistrationPage.enterAddress("Colombo");
        seekerRegistrationPage.clickNext();
        seekerRegistrationPage.enterBio("Hardworking job seeker");
        seekerRegistrationPage.selectSkill("Customer Service");
        seekerRegistrationPage.selectSkill("IT Support");
        seekerRegistrationPage.acceptTerms();
        seekerRegistrationPage.clickCreateAccount();

        WebElement dashboardBtn = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[normalize-space()='Dashboard']")
                )
        );

        Assert.assertNotNull(dashboardBtn);
        Assert.assertTrue(dashboardBtn.isDisplayed(),"User was not directed to landing page after registration");


    }

}
