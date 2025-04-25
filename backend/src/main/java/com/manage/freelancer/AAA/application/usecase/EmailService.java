package com.manage.freelancer.AAA.application.usecase;

import com.manage.freelancer.AAA.infrastructure.entity.VerificationCode;
import com.manage.freelancer.AAA.infrastructure.repository.VerificationCodeRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final VerificationCodeRepository verificationCodeRepository;

    @Transactional
    public void sendVerificationEmail(String email) throws MessagingException {
        try {
            // تولید کد ۶ رقمی
            String code = String.format("%06d", new Random().nextInt(999999));
            System.out.println("🔍 Generating code for email: " + email + ", code: " + code);

            // ذخیره کد تأیید در دیتابیس
            VerificationCode verificationCode = VerificationCode.builder()
                    .email(email.toLowerCase()) // نرمال‌سازی ایمیل
                    .code(code)
                    .expiresAt(LocalDateTime.now().plusMinutes(15))
                    .build();
            System.out.println("🔍 Deleting previous codes for email: " + email);
            verificationCodeRepository.deleteByEmail(email.toLowerCase());
            System.out.println("🔍 Saving new verification code");
            VerificationCode savedCode = verificationCodeRepository.save(verificationCode);
            System.out.println("🔍 Saved verification code: " + savedCode.getCode() + ", expires at: " + savedCode.getExpiresAt());

            // ارسال ایمیل
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(email);
            helper.setFrom("deadlineefl@gmail.com", "ددلاین");
            helper.setReplyTo("deadlineefl@gmail.com");
            helper.setSubject("کد تأیید ثبت‌نام شما در ددلاین");

            String htmlContent = """
                    <html dir="rtl">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <style>
                                        @font-face {
                                            font-family: 'Vazir';
                                            src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/Vazir.woff2') format('woff2');
                                            font-weight: normal;
                                        }
                                        body {
                                            font-family: 'Vazir', Tahoma, Arial, sans-serif;
                                            direction: rtl;
                                            text-align: right;
                                            color: #1C1C1C;
                                            line-height: 1.6;
                                        }
                                        .container {
                                            max-width: 600px;
                                            margin: 0 auto;
                                            background-color: #FFFFFF;
                                            padding: 30px;
                                            border-radius: 10px;
                                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                                        }
                                        .header {
                                            text-align: center;
                                            margin-bottom: 30px;
                                        }
                                        .logo {
                                            font-size: 28px;
                                            font-weight: bold;
                                            color: #1C1C1C;
                                        }
                                        .highlight {
                                            color: #CAFF33;
                                        }
                                        h2 {
                                            color: #1C1C1C;
                                            margin-bottom: 20px;
                                        }
                                        .code-container {
                                            background-color: #F5F5F5;
                                            border-radius: 8px;
                                            padding: 20px;
                                            text-align: center;
                                            margin: 25px 0;
                                        }
                                        .code {
                                            font-size: 32px;
                                            font-weight: bold;
                                            letter-spacing: 5px;
                                            color: #1C1C1C;
                                        }
                                        .note {
                                            color: #666666;
                                            font-size: 14px;
                                            margin-top: 25px;
                                        }
                                        .footer {
                                            margin-top: 40px;
                                            text-align: center;
                                            color: #666666;
                                            font-size: 14px;
                                        }
                                        .footer a {
                                            color: #CAFF33;
                                            text-decoration: none;
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <div class="header">
                                            <div class="logo">دد<span class="highlight">لاین</span></div>
                                        </div>
                                        <h2>به ددلاین خوش آمدید!</h2>
                                        <p>با تشکر از ثبت‌نام شما در پلتفرم فریلنسری ددلاین. برای تکمیل فرآیند ثبت‌نام، لطفاً از کد تأیید زیر استفاده کنید:</p>
                                        <div class="code-container">
                                            <div class="code">%s</div>
                                        </div>
                                        <p>این کد تا <strong>15 دقیقه</strong> اعتبار دارد.</p>
                                        <p class="note">اگر شما درخواست این ایمیل را نداده‌اید، لطفاً آن را نادیده بگیرید.</p>
                                        <div class="footer">
                                            <p>تیم ددلاین</p>
                                            <p><a href="https://deadlinee.ir">www.deadlinee.ir</a></p>
                                        </div>
                                    </div>
                                </body>
                                </html>
            """.formatted(code);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            System.out.println("🔍 Email sent to: " + email + " with code: " + code);
        } catch (MessagingException | UnsupportedEncodingException e) {
            System.err.println("🔍 Error sending email: " + e.getMessage());
            throw new RuntimeException("خطا در ارسال ایمیل: " + e.getMessage(), e);
        }
    }

    @Transactional
    public boolean verifyCode(String email, String code) {
        System.out.println("🔍 Verifying code for email: " + email + ", code: " + code);
        Optional<VerificationCode> verificationCode = verificationCodeRepository.findByEmailAndCode(email.toLowerCase(), code);
        if (verificationCode.isPresent()) {
            System.out.println("🔍 Verification code found: " + verificationCode.get().getCode() + ", expires at: " + verificationCode.get().getExpiresAt());
            if (verificationCode.get().getExpiresAt().isAfter(LocalDateTime.now())) {
                System.out.println("🔍 Code is valid, deleting verification code");
                verificationCodeRepository.deleteByEmail(email.toLowerCase());
                return true;
            } else {
                System.out.println("🔍 Code is expired");
            }
        } else {
            System.out.println("🔍 No verification code found for email and code");
        }
        return false;
    }
}