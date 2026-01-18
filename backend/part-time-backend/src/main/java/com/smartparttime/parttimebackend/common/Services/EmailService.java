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

        
        String htmlContent = """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
            <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                <h1 style="color: #fbbf24; margin: 0; font-size: 24px; letter-spacing: 1px;">DayBee.lk</h1>
            </div>
            <div style="padding: 40px 30px; line-height: 1.6;">
                <h2 style="color: #0f172a; margin-top: 0;">Hello, %s %s!</h2>
                <p>We’re writing to let you know that the position <strong>"%s"</strong> has been removed from our platform by the employer or the system administrator.</p>
                
                <div style="background-color: #fffbeb; border-left: 4px solid #fbbf24; padding: 15px; margin: 25px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 14px;">
                        <strong>Note:</strong> While this specific role is no longer available, your profile remains active for other exciting opportunities.
                    </p>
                </div>

                <p>We truly appreciate the time and effort you put into your application. Our team is here to help if you have any questions or need assistance moving forward.</p>
                
                <p style="margin-top: 30px;">Thank you for your understanding,</p>
                <p><strong>The DayBee.lk Team</strong></p>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0;">&copy; 2026 DayBee.lk. All rights reserved.</p>
            </div>
        </div>
        """.formatted(firstName, lastName, jobTitle);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {

            System.err.println("Failed to send HTML email: " + e.getMessage());
        }
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

