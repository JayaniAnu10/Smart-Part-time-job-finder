package com.smartparttime.parttimebackend.common.Services;

import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendQrCodeEmail(String email, String jobTitle, LocalDateTime startDate,LocalDateTime endDate, byte[] qrCode) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setTo(email);
                helper.setSubject("Job Application Approved - Your Attendance QR Code");

                String htmlContent = buildEmailContent( jobTitle, startDate,endDate);
                helper.setText(htmlContent, true);

                helper.addAttachment("attendance-qr-code.png",
                        new ByteArrayResource(qrCode), "image/png");

                mailSender.send(message);

            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
            }
        }

        private String buildEmailContent(String jobTitle,LocalDateTime startDate,LocalDateTime endDate) {
            return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #19183B; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                    .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
                    .footer { background-color: #17313E; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
                    .highlight { color: #19183B; font-weight: bold; }
                    .info-box { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #19183B; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎉 Congratulations!</h1>
                    </div>
                    <div class="content">
                        <h2>Dear Sir/Madam,</h2>
                        <p>Great news! Your application has been <span class="highlight">APPROVED</span>!</p>
                        
                        <div class="info-box">
                            <p><strong>Job Title:</strong> %s</p>
                            <p><strong>Job Start Date:</strong> %s</p>
                            <p><strong>Job End Date:</strong> %s</p>
                        </div>
                        
                        <p>Your attendance QR code is attached to this email. Please:</p>
                        <ul>
                            <li>Save the QR code on your phone</li>
                            <li>Present it when marking your attendance</li>
                            <li>Keep it secure and do not share with others</li>
                        </ul>
                        
                        <p>We look forward to having you on board!</p>
                        
                        <p>Best regards,<br>
                        <strong>DayBee.lk Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(jobTitle, startDate, endDate);
        }

        public void sendSimpleEmail(String toEmail, String subject, String body) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

                helper.setTo(toEmail);
                helper.setSubject(subject);
                helper.setText(body, true);

                mailSender.send(message);


            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
            }
        }

    @Async
    public void sendJobDeletedEmail(String to,
                                    String firstName,
                                    String lastName,
                                    String jobTitle) {

        String subject = "Job Update — Position Removed";
        String message = """
        Dear %s %s,

        We’re really sorry to let you know that the job you applied for,
        "%s", has been canceled by the employer or
        
        system administrator with any reason

        We truly appreciate the time and effort you put into applying.

        If you have any questions or need assistance, our team is here
        to help — please feel free to contact us anytime.

        Thank you for understanding,
        DayBee.lk Team
        """.formatted(firstName, lastName, jobTitle);

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }


    public void sendPaymentSuccessEmail(String email, Promotion promotion) {

        String subject = "Payment Successful - Job Promotion Activated";

        String body = """
        <h2>Payment Successful 🎉</h2>
        <p>Your job promotion has been successfully activated.</p>
        <p><strong>Job:</strong> %s</p>
        <p><strong>Plan:</strong> %s</p>
        <p><strong>Duration:</strong> %d days</p>
        <br/>
        <p>Thank you for using our platform.</p>
        """.formatted(
                promotion.getJob().getTitle(),
                promotion.getCategory().getName(),
                promotion.getCategory().getDays()
        );

        sendSimpleEmail(email, subject, body);
    }


    public void sendPaymentFailedEmail(String email, Promotion promotion) {

        String subject = "Payment Failed - Job Promotion";

        String body = """
        <h2>Payment Failed ❌</h2>
        <p>Unfortunately, your payment could not be completed.</p>
        <p><strong>Job:</strong> %s</p>
        <p>Please try again or contact support if the issue persists.</p>
        """.formatted(
                promotion.getJob().getTitle()
        );

        sendSimpleEmail(email, subject, body);
    }


}

