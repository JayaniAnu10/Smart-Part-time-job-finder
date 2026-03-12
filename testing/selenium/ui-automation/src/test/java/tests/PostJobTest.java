package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.PostJobPage;

import java.time.Duration;

public class PostJobTest extends BaseTest {

    PostJobPage postJobPage;

    @Test
    public void testPostJob() throws InterruptedException {

        login("testuser1@example.com", "123456");

        postJobPage = new PostJobPage(driver);

        postJobPage.clickPostJobBtn();
        postJobPage.enterJobTitle("Mathematics Tutor");
        postJobPage.selectJobCategory("Tutoring & Education");
        postJobPage.selectJobType("Online");
        postJobPage.enterMinSalary("2000");
        postJobPage.enterMaxSalary("4000");
        postJobPage.enterJobLocation("Matara");
        postJobPage.clickSearch();
        postJobPage.enterDescription("Mathematics Tutor for grade students");
        postJobPage.selectGender("Male");
        postJobPage.enterSkills("Mathematics");
        postJobPage.enterStartDate("2027-03-10T05:00");
        postJobPage.enterEndDate("2027-03-10T17:00");
        postJobPage.enterRequiredWorkers("1");
        postJobPage.enterDeadline("2027-03-05T23:00");

        postJobPage.clickPublishJobButton();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toastMessage = wait.until(ExpectedConditions
                .presenceOfElementLocated(By.xpath("//div[@data-rht-toaster]//div")));

        String toastText = toastMessage.getText();
        System.out.println("Toast message: " + toastText);

        if (toastText.toLowerCase().contains("success")) {
            Assert.assertTrue(true, "Job posted successfully");
        } else {
            Assert.fail("Job post failed: " + toastText);
        }

    }
}