package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.SignupPage;

import java.time.Duration;

public class SignupTest extends BaseTest {

    SignupPage signupPage;

    @Test
    public void testSignup() {
        signupPage = new SignupPage(driver);

        signupPage.openSignupPage();
        signupPage.clickSignupTab();
        signupPage.enterEmail("testuser1@example.com");
        signupPage.enterContactNo("0721111111");
        signupPage.enterPassword("123456");
        signupPage.enterConfirmPassword("123456");
        signupPage.clickSignupButton();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement loginBtn = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//button[normalize-space()='Login']"))
        );

        Assert.assertNotNull(loginBtn);
        Assert.assertTrue(loginBtn.isDisplayed(),"Error message not displayed after successful signUp");


    }
}
