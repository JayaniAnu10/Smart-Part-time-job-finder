package com.smartparttime.parttimebackend.common.Services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Attachments;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {

    private SendGrid sendGrid;

    @Value("${sendgrid.api-key}")
    private String sendGridApiKey;

    private static final String FROM_EMAIL = "jayanianuththara10@gmail.com";
    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    @PostConstruct
    public void init() {
        if (sendGridApiKey == null || sendGridApiKey.isEmpty()) {
            throw new RuntimeException(
                    "SendGrid API Key not set in environment variables or application.yml!");
        }
        sendGrid = new SendGrid(sendGridApiKey);
    }

    // -------------------------------------------------------------------------
    // Core send method
    // -------------------------------------------------------------------------

    private void sendEmail(String toEmail, String subject, String htmlBody,
                           Attachments attachments) {
        try {
            Mail mail = new Mail();
            mail.setFrom(new Email(FROM_EMAIL));
            mail.setSubject(subject);

            Personalization personalization = new Personalization();
            personalization.addTo(new Email(toEmail));
            mail.addPersonalization(personalization);

            mail.addContent(new Content("text/html", htmlBody));

            if (attachments != null) {
                mail.addAttachments(attachments);
            }

            com.sendgrid.Request request = new com.sendgrid.Request();
            request.setMethod(com.sendgrid.Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            int statusCode = response.getStatusCode();

            if (statusCode < 200 || statusCode >= 300) {
                throw new RuntimeException("SendGrid rejected email. status="
                        + statusCode + ", body=" + response.getBody());
            }

            log.info("Email sent successfully to {} | subject: {}", toEmail, subject);

        } catch (Exception e) {
            log.error("Failed to send email to {} | subject: {} | error: {}",
                    toEmail, subject, e.getMessage(), e);
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }

    // -------------------------------------------------------------------------
    // Convenience overloads
    // -------------------------------------------------------------------------

    public void sendSimpleEmail(String toEmail, String subject, String body) {
        sendEmail(toEmail, subject, body, null);
    }

    public void sendSimpleEmail(String toEmail, String subject, String body,
                                Attachments attachments) {
        sendEmail(toEmail, subject, body, attachments);
    }

    // -------------------------------------------------------------------------
    // QR Code email  (FIXED: @Async added, %% escaping, date formatting)
    // -------------------------------------------------------------------------

    public void sendQrCodeEmail(String email, String jobTitle,
                                LocalDateTime startDate, LocalDateTime endDate,
                                byte[] qrCode) {
        try {
            if (email == null || email.isBlank()) {
                throw new RuntimeException("Cannot send QR email: recipient email is empty");
            }
            if (qrCode == null || qrCode.length == 0) {
                throw new RuntimeException("Cannot send QR email: generated QR code is empty");
            }

            String htmlContent = buildQrEmailContent(jobTitle, startDate, endDate);
            String subject = "Job Application Approved - Your Attendance QR Code";

            Attachments attachments = new Attachments();
            attachments.setContent(java.util.Base64.getEncoder().encodeToString(qrCode));
            attachments.setType("image/png");
            attachments.setFilename("attendance-qr-code.png");
            attachments.setDisposition("attachment");
            attachments.setContentId("attendance-qr-code");

            sendSimpleEmail(email, subject, htmlContent, attachments);

        } catch (Exception e) {
            log.error("Failed to send QR code email to {}: {}", email, e.getMessage(), e);
            throw new RuntimeException("Failed to send QR code email: " + e.getMessage(), e);
        }
    }

    /**
     * Builds the HTML body for the QR code email.
     *
     * IMPORTANT: Any literal '%' inside a String.formatted() / String.format() template
     * must be escaped as '%%' to avoid MissingFormatArgumentException.
     * CSS properties such as "max-width: 600px" are safe, but "width: 100%" must be
     * written as "width: 100%%".
     */
    private String buildQrEmailContent(String jobTitle,
                                       LocalDateTime startDate,
                                       LocalDateTime endDate) {

        String formattedStart = startDate != null ? startDate.format(DATE_FORMATTER) : "N/A";
        String formattedEnd   = endDate   != null ? endDate.format(DATE_FORMATTER)   : "N/A";

        // NOTE: every CSS percentage (100%%, etc.) is doubled so .formatted() does not
        // mistake it for a format specifier.
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                        .wrapper { background-color: #f0f0f0; padding: 30px 0; }
                        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; }
                        .header { background-color: #19183B; color: #ffffff; padding: 30px 20px; text-align: center; }
                        .header h1 { margin: 0; font-size: 26px; }
                        .content { padding: 30px; background-color: #f9f9f9; }
                        .footer { background-color: #17313E; color: #ffffff; padding: 15px; text-align: center; font-size: 12px; }
                        .highlight { color: #19183B; font-weight: bold; }
                        .info-box { background-color: #ffffff; padding: 15px 20px; margin: 20px 0; border-left: 4px solid #19183B; border-radius: 0 4px 4px 0; }
                        .info-box p { margin: 6px 0; }
                        ul { padding-left: 20px; }
                        ul li { margin-bottom: 6px; }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <div class="container">
                            <div class="header">
                                <h1>Congratulations!</h1>
                                <p style="margin: 8px 0 0;">Your application has been approved</p>
                            </div>
                            <div class="content">
                                <h2>Dear Sir/Madam,</h2>
                                <p>Great news! Your application has been <span class="highlight">APPROVED</span>.</p>

                                <div class="info-box">
                                    <p><strong>Job Title:</strong> %s</p>
                                    <p><strong>Start Date:</strong> %s</p>
                                    <p><strong>End Date:</strong> %s</p>
                                </div>

                                <p>Your attendance QR code is attached to this email. Please:</p>
                                <ul>
                                    <li>Save the QR code on your phone</li>
                                    <li>Present it when marking your attendance</li>
                                    <li>Keep it secure and do not share it with others</li>
                                </ul>

                                <p>We look forward to having you on board!</p>

                                <p>Best regards,<br>
                                <strong>DayBee.lk Team</strong></p>
                            </div>
                            <div class="footer">
                                <p>This is an automated message. Please do not reply to this email.</p>
                                <p>&copy; 2026 DayBee.lk. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(jobTitle, formattedStart, formattedEnd);
    }

    // -------------------------------------------------------------------------
    // Job deleted email
    // -------------------------------------------------------------------------

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
                        <p>We're writing to let you know that the position <strong>"%s"</strong> has been removed from our platform by the employer or the system administrator.</p>

                        <div style="background-color: #fffbeb; border-left: 4px solid #fbbf24; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
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

        sendEmail(to, subject, htmlContent, null);
    }

    // -------------------------------------------------------------------------
    // Payment emails
    // -------------------------------------------------------------------------

    @Async
    public void sendPaymentSuccessEmail(String email, Promotion promotion) {

        String subject = "Payment Successful - Job Promotion Activated";

        String htmlContent = """
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                    <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                        <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">DayBee.lk</h1>
                    </div>
                    <div style="padding: 40px 30px; line-height: 1.6;">
                        <h2 style="color: #0f172a; margin-top: 0;">Payment Successful!</h2>
                        <p>Your job promotion has been successfully activated.</p>

                        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                            <p style="margin: 6px 0;"><strong>Job:</strong> %s</p>
                            <p style="margin: 6px 0;"><strong>Plan:</strong> %s</p>
                            <p style="margin: 6px 0;"><strong>Duration:</strong> %d days</p>
                        </div>

                        <p>Thank you for using our platform.</p>
                        <p><strong>The DayBee.lk Team</strong></p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0;">&copy; 2026 DayBee.lk. All rights reserved.</p>
                    </div>
                </div>
                """.formatted(
                promotion.getJob().getTitle(),
                promotion.getCategory().getName(),
                promotion.getCategory().getDays()
        );

        sendSimpleEmail(email, subject, htmlContent);
    }

    @Async
    public void sendPaymentFailedEmail(String email, Promotion promotion) {

        String subject = "Payment Failed - Job Promotion";

        String htmlContent = """
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                    <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                        <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">DayBee.lk</h1>
                    </div>
                    <div style="padding: 40px 30px; line-height: 1.6;">
                        <h2 style="color: #0f172a; margin-top: 0;">Payment Failed</h2>
                        <p>Unfortunately, your payment could not be completed.</p>

                        <div style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
                            <p style="margin: 0;"><strong>Job:</strong> %s</p>
                        </div>

                        <p>Please try again or contact support if the issue persists.</p>
                        <p><strong>The DayBee.lk Team</strong></p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0;">&copy; 2026 DayBee.lk. All rights reserved.</p>
                    </div>
                </div>
                """.formatted(promotion.getJob().getTitle());

        sendSimpleEmail(email, subject, htmlContent);
    }

    // -------------------------------------------------------------------------
    // User deleted email
    // -------------------------------------------------------------------------

    @Async
    public void sendUserDeletedEmail(String email) {

        String subject = "Account Removed – DayBee.lk";

        String htmlContent = """
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden;">
                    <div style="background-color: #0f172a; padding: 35px; text-align: center; border-bottom: 4px solid #fbbf24;">
                        <h1 style="color: #fbbf24; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">DayBee.lk</h1>
                    </div>

                    <div style="padding: 45px 35px; background-color: #ffffff;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 700;">Account Notice</h2>
                        </div>

                        <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hello,</p>

                        <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                            This is an automated notification to inform you that your account on the
                            <strong>DayBee.lk Platform</strong> has been
                            <span style="color: #e11d48; font-weight: bold;">permanently removed</span>
                            by the system administrator.
                        </p>

                        <div style="background-color: #f8fafc; border-radius: 16px; padding: 25px; border: 1px dashed #cbd5e1; margin-bottom: 30px;">
                            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                                <strong style="color: #475569;">Why was this done?</strong><br/>
                                Accounts are typically removed due to policy violations, long-term inactivity,
                                or a request for account closure. If you believe this action was taken by mistake,
                                please reach out to our support team for assistance.
                            </p>
                        </div>

                        <div style="text-align: center;">
                            <a href="mailto:support@daybee.lk"
                               style="display: inline-block; padding: 14px 30px; background-color: #0f172a; color: #fbbf24; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                                Contact DayBee.lk Support
                            </a>
                        </div>

                        <p style="color: #94a3b8; font-size: 14px; margin-top: 45px; border-top: 1px solid #f1f5f9; padding-top: 25px;">
                            Thank you,<br/>
                            <strong style="color: #0f172a;">The DayBee.lk Team</strong>
                        </p>
                    </div>

                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
                        &copy; 2026 DayBee.lk. All rights reserved.<br/>
                        This is a system-generated message. Please do not reply directly to this email.
                    </div>
                </div>
                """;

        sendSimpleEmail(email, subject, htmlContent);
    }

    // -------------------------------------------------------------------------
    // Complaint emails
    // -------------------------------------------------------------------------

    @Async
    public void sendComplaintResolvedReporterEmail(String toEmail,
                                                   String reporterName,
                                                   String complaintType,
                                                   String createdAt) {

        String subject = "Your Complaint Has Been Resolved";

        String htmlContent = """
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                    <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                        <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">DayBee.lk</h1>
                    </div>
                    <div style="padding: 40px 30px; line-height: 1.6;">
                        <h2 style="color: #0f172a; margin-top: 0;">Complaint Update</h2>
                        <p>Dear <strong>%s</strong>,</p>
                        <p>Thank you for reporting a <strong>%s</strong> complaint on <strong>%s</strong>.</p>
                        <p>We want to inform you that this complaint has been <strong>reviewed and resolved</strong> by our admin team.</p>
                        <p>Your feedback helps us keep the platform safe and fair for everyone.</p>
                        <p style="margin-top: 30px;">Best regards,<br/><strong>DayBee.lk Admin Team</strong></p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0;">&copy; 2026 DayBee.lk. All rights reserved.</p>
                    </div>
                </div>
                """.formatted(reporterName, complaintType, createdAt);

        sendSimpleEmail(toEmail, subject, htmlContent);
    }

    @Async
    public void sendComplaintRejectedReporterEmail(String toEmail,
                                                   String reporterName,
                                                   String complaintType,
                                                   String createdAt) {

        String subject = "Update on Your Complaint";

        String htmlContent = """
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                    <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                        <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">DayBee.lk</h1>
                    </div>
                    <div style="padding: 40px 30px; line-height: 1.6;">
                        <h2 style="color: #0f172a; margin-top: 0;">Complaint Review Update</h2>
                        <p>Dear <strong>%s</strong>,</p>
                        <p>We have carefully reviewed your <strong>%s</strong> complaint submitted on <strong>%s</strong>.</p>
                        <p>After evaluation, we found that this complaint does not meet our review criteria and has been <strong>closed</strong>.</p>
                        <p>If you believe there is a serious issue, you are welcome to submit a new complaint with more details.</p>
                        <p style="margin-top: 30px;">Thank you for your understanding,<br/><strong>DayBee.lk Admin Team</strong></p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0;">&copy; 2026 DayBee.lk. All rights reserved.</p>
                    </div>
                </div>
                """.formatted(reporterName, complaintType, createdAt);

        sendSimpleEmail(toEmail, subject, htmlContent);
    }

    @Async
    public void sendComplaintResolvedTargetEmail(String toEmail,
                                                 String targetName,
                                                 String complaintType) {

        String subject = "Account Notice from DayBee.lk";

        String htmlContent = """
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                    <div style="background-color: #0f172a; padding: 30px; text-align: center;">
                        <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">DayBee.lk</h1>
                    </div>
                    <div style="padding: 40px 30px; line-height: 1.6;">
                        <h2 style="color: #0f172a; margin-top: 0;">Account Notice</h2>
                        <p>Dear <strong>%s</strong>,</p>
                        <p>A <strong>%s</strong> complaint related to your account was reviewed by our admin team.</p>
                        <p>The issue has now been <strong>resolved</strong>.</p>
                        <p>Please make sure to follow our community guidelines to avoid future actions.</p>
                        <p style="margin-top: 30px;">Regards,<br/><strong>DayBee.lk Admin Team</strong></p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0;">&copy; 2026 DayBee.lk. All rights reserved.</p>
                    </div>
                </div>
                """.formatted(targetName, complaintType);

        sendSimpleEmail(toEmail, subject, htmlContent);
    }
}