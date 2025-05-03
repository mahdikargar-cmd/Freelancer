package com.manage.freelancer.AAA.application.usecase;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailTestService {
    private final JavaMailSender mailSender;

    public EmailTestService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void testEmail(String toEmail) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(toEmail);
        helper.setSubject("تست ایمیل از ددلاین");
        helper.setText("این یک ایمیل آزمایشی است.", true);
        mailSender.send(message);
}
    }