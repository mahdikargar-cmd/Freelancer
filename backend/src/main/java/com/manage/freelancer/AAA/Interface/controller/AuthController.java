package com.manage.freelancer.AAA.Interface.controller;

import com.manage.freelancer.AAA.Interface.dto.AuthResponse;
import com.manage.freelancer.AAA.Interface.dto.LoginRequest;
import com.manage.freelancer.AAA.Interface.dto.RegisterRequest;
import com.manage.freelancer.AAA.application.usecase.EmailTestService;
import com.manage.freelancer.AAA.application.usecase.LoginUserUseCase;
import com.manage.freelancer.AAA.application.usecase.RegisterUserUseCase;
import com.manage.freelancer.AAA.config.JwtService;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import com.manage.freelancer.domain.entity.Role;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final RegisterUserUseCase registerUserUseCase;
    private final LoginUserUseCase loginUserUseCase;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final EmailTestService emailTestService;

    @PostMapping("/register/initiate")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            System.out.println("🔍 Initiating registration for email: " + request.getEmail());
            registerUserUseCase.initiateRegistration(request.getEmail(), request.getPassword(), Role.FREELANCER);
            return ResponseEntity.ok(new AuthResponse("کد تایید به ایمیل شما ارسال شد ", null, null, null));
        } catch (Exception e) {
            System.err.println("🔍 Error in initiate registration: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(e.getMessage(), null, null, null));
        }
    }

    @PostMapping("/register/verify")
    public ResponseEntity<AuthResponse> verifyAndCompleteRegister(@RequestBody RegisterRequest request, @RequestParam String code) {
        try {
            System.out.println("🔍 Starting verifyAndCompleteRegister for email: " + request.getEmail() + ", code: " + code);
            String token = registerUserUseCase.completeRegistration(
                    request.getEmail().toLowerCase(),
                    request.getPassword(),
                    code,
                    Role.FREELANCER
            );
            System.out.println("🔍 Registration completed, fetching user for email: " + request.getEmail());
            UserDTO user = loginUserUseCase.getByEmail(request.getEmail().toLowerCase());
            String roleStr = user.getRole() != null ? user.getRole().toString() : "UNKNOWN";
            System.out.println("🔍 User found: " + user.getEmail() + ", role: " + roleStr + ", id: " + user.getId());
            return ResponseEntity.ok(new AuthResponse("ثبت نام با موفقیت انجام شد", token, roleStr, user.getId().toString()));
        } catch (Exception e) {
            System.err.println("🔍 Error in verifyAndCompleteRegister: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(e.getMessage(), null, null, null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = loginUserUseCase.login(request.getEmail(), request.getPassword());

        if (token != null) {
            UserDTO user = loginUserUseCase.getByEmail(request.getEmail());
            System.out.println("🔍 User ID: " + user.getId()); // لاگ برای دیباگ
            String roleStr = user.getRole() != null ? user.getRole().toString() : "UNKNOWN";
            String userId = user.getId() != null ? user.getId().toString() : null;
            System.out.println("🔍 Response userId: " + userId); // لاگ برای دیباگ
            return ResponseEntity.ok(new AuthResponse("ورود با موفقیت انجام شد : ", token, roleStr, userId));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("ایمیل یا رمز عبور اشتباه است  ", null, null, null));
        }
    }


    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            UserDTO user = loginUserUseCase.getById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("کاربر یافت نشد");
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("توکن نامعتبر  است");
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtService.isTokenValid(token, userDetails)) {
            return ResponseEntity.ok("توکن معتبر است ");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("توکن نامعتبر است");
        }
    }


    @PostMapping("/test-email")
    public ResponseEntity<String> testEmail(@RequestParam String email) {
        try {
            emailTestService.testEmail(email);
            return ResponseEntity.ok("ایمیل آزمایشی ارسال شد");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("خطا در ارسال ایمیل: " + e.getMessage());
        }
    }

}