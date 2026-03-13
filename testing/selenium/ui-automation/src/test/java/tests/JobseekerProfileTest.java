package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.JobseekerProfilePage;

public class JobseekerProfileTest extends BaseTest {
    JobseekerProfilePage jobseekerProfilePage;

    @Test
    public void testJobseekerProfile() {
        login("testuser2@example.com", "123456");

        jobseekerProfilePage = new JobseekerProfilePage(driver);
        jobseekerProfilePage.clickJobseekerProfileLink();

        //verify existing data
        Assert.assertEquals(jobseekerProfilePage.getFirstName(), "John");
        Assert.assertEquals(jobseekerProfilePage.getLastName(), "Doe");
        Assert.assertEquals(jobseekerProfilePage.getPhone(), "0761111111");
        Assert.assertTrue(jobseekerProfilePage.isEmailDisabled(), "Email field should be disabled");

        //store original value
        String originalPhone = jobseekerProfilePage.getPhone();
        //edit data
        jobseekerProfilePage.enterPhone("0781234567");
        jobseekerProfilePage.enterAddress("Kandy");
        jobseekerProfilePage.enterBio("Updated bio for testing");

        //cancel updates
        jobseekerProfilePage.clickCancel();
        Assert.assertEquals(jobseekerProfilePage.getPhone(), originalPhone);


    }

}
