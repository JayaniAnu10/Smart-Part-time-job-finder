package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.JobseekerDashboardPage;

public class JobseekerDashboardTest extends BaseTest{

    JobseekerDashboardPage jobseekerDashboardPage;

    @Test
    public void testJobseekerDashboard() {

        login("testuser2@example.com", "123456");

        jobseekerDashboardPage = new JobseekerDashboardPage(driver);
        jobseekerDashboardPage.navigateToJobSeekerDashboardPage();
        Assert.assertTrue(jobseekerDashboardPage.getWelcomeMessage().contains("Welcome"));

        //navigate to notifications
        jobseekerDashboardPage.clickNotifications();
        Assert.assertTrue(driver.getCurrentUrl().contains("notifications"));
        driver.navigate().back();

        //navigate to find jobs
        jobseekerDashboardPage.clickFindJobs();
        Assert.assertTrue(driver.getCurrentUrl().contains("find-your-job"));
        driver.navigate().back();

        //navigate to job history
        jobseekerDashboardPage.clickJobHistory();
        Assert.assertTrue(driver.getCurrentUrl().contains("job-history"));
        driver.navigate().back();

        //navigate to mapView
        jobseekerDashboardPage.clickMapView();
        Assert.assertTrue(driver.getCurrentUrl().contains("nearby"));
        driver.navigate().back();

        //navigate to profile
        jobseekerDashboardPage.clickViewProfile();
        Assert.assertTrue(driver.getCurrentUrl().contains("seekerProfile"));








    }
}
