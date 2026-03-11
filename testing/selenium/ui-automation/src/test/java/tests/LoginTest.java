package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTest extends BaseTest{

    @Test
    public void testLogin() {
        login("testuser2@example.com" , "123456");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement dashboardBtn = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//button[normalize-space()='Dashboard']")
                )
        );

        Assert.assertNotNull(dashboardBtn);
        Assert.assertTrue(dashboardBtn.isDisplayed());
    }

    @Test
    public void testInvalidLogin() {
        login("testuser2@example.com", "wrongPwd");

        Assert.assertTrue(
                driver.findElements(By.xpath("//button[text()='Dashboard']")).isEmpty(),
                "Dashboard should not appear for invalid login"
        );
    }
}
