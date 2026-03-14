package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.EmployerDashboardPage;

public class EmployerDashboardTest extends BaseTest{

    EmployerDashboardPage employerDashboardPage;

    @Test
    public void testEmployerDashBoard() {

        login("testuser1@example.com", "123456");

        employerDashboardPage = new EmployerDashboardPage(driver);

        employerDashboardPage.navigateToEmployerDashboardPage();
        Assert.assertTrue(driver.getCurrentUrl().contains("empDashboard"));
        driver.navigate().back();

        employerDashboardPage.clickPostJob();
        Assert.assertTrue(driver.getCurrentUrl().contains("postJob"));
        driver.navigate().back();

        employerDashboardPage.clickViewProfile();
        Assert.assertTrue(driver.getCurrentUrl().contains("empProfile"));
        driver.navigate().back();




    }
}
