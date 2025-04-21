package com.manage.freelancer.presentation.controller;

import com.codingapi.security.jwt.Jwt;
import com.manage.freelancer.AAA.application.usecase.CustomUserDetails;
import com.manage.freelancer.AAA.infrastructure.repository.UserRepository;
import com.manage.freelancer.application.usecase.ProfileInformationUseCase;
import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.presentation.response.ProfileInformationResponse;
import com.manage.freelancer.AAA.infrastructure.entity.UserDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProfileInformationController {
    private final ProfileInformationUseCase profileInformationUseCase;
    private final UserRepository userRepository;
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/profileImage/";
    private static final Logger logger = LoggerFactory.getLogger(ProfileInformationController.class);

    @GetMapping("/getProfileInformation")
    public ResponseEntity<?> getProfileInformation() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(createErrorResponse("کاربر احراز هویت نشده است"));
            }

            Object principal = authentication.getPrincipal();
            Long userId = extractUserId(principal);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(createErrorResponse("شناسه کاربر یافت نشد"));
            }

            Optional<ProfileInformation> profileOpt = profileInformationUseCase.getProfileInformationByUserId(userId);
            logger.info("Profile lookup for user ID {}: Found={}", userId, profileOpt.isPresent());

            if (profileOpt.isPresent()) {
                ProfileInformation profile = profileOpt.get();
                return ResponseEntity.ok(new ProfileInformationResponse(profile));
            } else {
                logger.info("No profile found for user ID: {}", userId);
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("status", "new_user");
                responseMap.put("message", "پروفایل یافت نشد - می‌توانید پروفایل جدید ایجاد کنید");
                return ResponseEntity.ok(responseMap);
            }
        } catch (Exception e) {
            logger.error("❌ خطا در دریافت پروفایل: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(createErrorResponse("خطای سرور در دریافت اطلاعات پروفایل"));
        }
    }

    private Map<String, String> createErrorResponse(String errorMessage) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", errorMessage);
        return errorResponse;
    }

    private Long extractUserId(Object principal) {
        logger.debug("Extracting user ID from principal: {}", principal);

        if (principal instanceof CustomUserDetails) {
            Long id = ((CustomUserDetails) principal).getUser().getId();
            logger.debug("Extracted ID from CustomUserDetails: {}", id);
            return id;
        } else if (principal instanceof UserDTO) {
            Long id = ((UserDTO) principal).getId();
            logger.debug("Extracted ID from UserDTO: {}", id);
            return id;
        } else if (principal instanceof org.springframework.security.core.userdetails.User) {
            // Handle the standard Spring Security User object
            String username = ((org.springframework.security.core.userdetails.User) principal).getUsername();
            logger.debug("Principal is a Spring Security User with username: {}", username);

            // Look up the user by email/username
            Optional<UserDTO> userOpt = userRepository.findByEmail(username);
            if (userOpt.isPresent()) {
                Long id = userOpt.get().getId();
                logger.debug("Found user by email {}, ID: {}", username, id);
                return id;
            } else {
                logger.warn("No user found with email: {}", username);
            }
        } else if (principal instanceof String) {
            String email = (String) principal;
            logger.debug("Principal is a String (email): {}", email);

            // Try to find user by email
            Optional<UserDTO> userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                Long id = userOpt.get().getId();
                logger.debug("Found user by email {}, ID: {}", email, id);
                return id;
            } else {
                logger.warn("No user found with email: {}", email);
            }
        }

        logger.warn("Could not extract user ID from principal type: {}",
                principal != null ? principal.getClass().getName() : "null");
        return null;
    }


    @PostMapping("/createProfileInformation")
    public ResponseEntity<?> createProfileInformation(@RequestBody ProfileInformation profileInformation) {
        try {
            logger.info("Received profile creation request: {}", profileInformation);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            logger.debug("Authentication: {}", authentication);
            if (authentication == null || !authentication.isAuthenticated()) {
                logger.warn("No authenticated user found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(createErrorResponse("کاربر احراز هویت نشده است"));
            }

            UserDTO currentUser = null;
            Object principal = authentication.getPrincipal();
            logger.debug("Principal: {}", principal);
            logger.debug("Principal type: {}", principal != null ? principal.getClass().getName() : "null");

            if (principal instanceof CustomUserDetails) {
                currentUser = ((CustomUserDetails) principal).getUser();
                logger.debug("Extracted user from CustomUserDetails: {}", currentUser);
            } else if (principal instanceof org.springframework.security.core.userdetails.User) {
                String username = ((org.springframework.security.core.userdetails.User) principal).getUsername();
                logger.debug("Principal is Spring Security User with username: {}", username);
                Optional<UserDTO> userOpt = userRepository.findByEmail(username);
                if (userOpt.isPresent()) {
                    currentUser = userOpt.get();
                    logger.debug("Found user by email {}: {}", username, currentUser);
                } else {
                    logger.warn("No user found with email: {}", username);
                }
            } else {
                logger.warn("Unexpected principal type: {}", principal != null ? principal.getClass().getName() : "null");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(createErrorResponse("نوع غیرمنتظره برای principal"));
            }

            if (currentUser == null) {
                logger.error("Failed to identify current user");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(createErrorResponse("کاربر احراز هویت نشده است"));
            }

            // بررسی وجود پروفایل برای کاربر
            Optional<ProfileInformation> existingProfileByUser = profileInformationUseCase.getProfileInformationByUserId(currentUser.getId());
            if (existingProfileByUser.isPresent()) {
                logger.warn("Profile already exists for user ID: {}", currentUser.getId());
                return ResponseEntity.status(HttpStatus.CONFLICT).body(createErrorResponse("پروفایل برای این کاربر قبلاً ثبت شده است"));
            }

            profileInformation.setUser(currentUser);
            logger.info("Creating profile for user: {}", currentUser.getId());

            // بررسی شماره تلفن
            ProfileInformation existingProfileByPhone = profileInformationUseCase.getInformationByPhoneNumber(profileInformation.getPhoneNumber());
            if (existingProfileByPhone != null) {
                logger.warn("Phone number already exists: {}", profileInformation.getPhoneNumber());
                return ResponseEntity.status(HttpStatus.CONFLICT).body(createErrorResponse("این شماره تلفن قبلاً ثبت شده است"));
            }

            ProfileInformation createdProfile = profileInformationUseCase.createProfileInformation(profileInformation);
            logger.info("Profile created successfully for user: {}", currentUser.getId());
            return ResponseEntity.ok(createdProfile);
        } catch (Exception e) {
            logger.error("❌ Error creating profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("خطا در ثبت اطلاعات پروفایل: " + e.getMessage()));
        }
    }

    @PutMapping("/ProfileInformation/{id}")
    public ResponseEntity<?> updateProfileInformation(@PathVariable Long id, @RequestBody ProfileInformation profileInformation) {
        try {
            // Get existing profile
            Optional<ProfileInformation> existingProfileOpt = profileInformationUseCase.getProfileInformationById(id);
            if (existingProfileOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            ProfileInformation existingProfile = existingProfileOpt.get();

            // Set the ID to ensure we're updating the correct record
            profileInformation.setId(id);

            // Handle the case where only user ID is provided
            if (profileInformation.getUser() != null && profileInformation.getUser().getId() != null) {
                // If we only have user ID, keep all other user properties from existing profile
                UserDTO existingUser = existingProfile.getUser();
                if (existingUser != null) {
                    UserDTO userWithId = new UserDTO();
                    userWithId.setId(profileInformation.getUser().getId());
                    profileInformation.setUser(userWithId);
                }
            } else {
                // Keep existing user association if not provided in update
                profileInformation.setUser(existingProfile.getUser());
            }

            // Keep existing profile image if not provided in update
            if (profileInformation.getProfileImageUrl() == null) {
                profileInformation.setProfileImageUrl(existingProfile.getProfileImageUrl());
            }

            // Update the profile
            ProfileInformation updatedProfile = profileInformationUseCase.updateProfileInformation(id, profileInformation);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to update profile: " + e.getMessage()));
        }
    }

    @DeleteMapping("/DelProfileInformation/{id}")
    public ResponseEntity<Void> deleteProfileInformation(@PathVariable Long id) {
        profileInformationUseCase.deleteProfileInformation(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/uploadProfileImage/{id}")
    public ResponseEntity<?> uploadProfileImage(@PathVariable Long id, @RequestParam("profileImageUrl") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("فایل ارسال نشده است!"));
        }
        try {
            Optional<ProfileInformation> profileInformationOpt = profileInformationUseCase.getProfileInformationById(id);
            if (profileInformationOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            ProfileInformation profileInformation = profileInformationOpt.get();

            // Only allow jpg and png files
            if (!isValidImageFile(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createErrorResponse("Invalid file type"));
            }

            // Get upload path from environment variables or use default
            String uploadDir = System.getenv("PROFILE_IMAGE_UPLOAD_DIR");
            if (uploadDir == null) {
                uploadDir = UPLOAD_DIR;
            }
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                try {
                    logger.info("تلاش برای ایجاد مسیر: {}", uploadPath.toAbsolutePath());
                    Files.createDirectories(uploadPath);
                    logger.info("مسیر با موفقیت ایجاد شد: {}", uploadPath.toAbsolutePath());
                } catch (IOException e) {
                    logger.error("خطا در ایجاد مسیر: {} - {}", uploadPath.toAbsolutePath(), e.getMessage());
                    try {
                        String alternativePath = System.getProperty("user.home") + "/uploads/profileImage/";
                        logger.info("تلاش برای ایجاد مسیر جایگزین: {}", alternativePath);
                        uploadPath = Paths.get(alternativePath);
                        Files.createDirectories(uploadPath);
                        uploadDir = alternativePath;
                        logger.info("مسیر جایگزین با موفقیت ایجاد شد");
                    } catch (IOException e2) {
                        logger.error("خطا در ایجاد مسیر جایگزین: {}", e2.getMessage());
                        throw e; // در این صورت خطا را دوباره پرتاب می‌کنیم
                    }
                }
            }
            // Save file
            String fileExtension = getFileExtension(file.getOriginalFilename());
            if (fileExtension.startsWith(".")) {
                fileExtension = fileExtension.substring(1); // Remove the dot
            }
            String newFileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path filePath = uploadPath.resolve(newFileName);
            file.transferTo(filePath.toFile());

            // Update profile with image URL
            profileInformation.setProfileImageUrl(newFileName);
            profileInformationUseCase.updateProfileInformation(id, profileInformation);

            return ResponseEntity.ok(Map.of("message", "فایل با موفقیت آپلود شد"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to upload image: " + e.getMessage()));
        }
    }

    // Check if the file type is allowed
    private boolean isValidImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.equals("image/jpeg") || contentType.equals("image/png") || contentType.equals("image/jpg"));
    }

    @PutMapping("/updateProfileImage/{id}")
    public ResponseEntity<?> updateProfileImage(@PathVariable Long id, @RequestParam("profileImageUrl") MultipartFile file) {
        logger.info("درخواست بروزرسانی تصویر پروفایل برای کاربر: {}", id);
        logger.info("نام فایل  دریافت شده: {}", file.getOriginalFilename());

        if (file.isEmpty()) {
            logger.error("فایل دریافت  نشد!");
            return ResponseEntity.badRequest().body(createErrorResponse("فایل ارسال نشده است!"));
        }

        try {
            Optional<ProfileInformation> profileInformationOpt = profileInformationUseCase.getProfileInformationById(id);
            if (profileInformationOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            ProfileInformation profileInformation = profileInformationOpt.get();

            // Only allow jpg and png files
            if (!isValidImageFile(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(createErrorResponse("Invalid file type"));
            }

            // Check if the profile already has an image and delete it
            if (profileInformation.getProfileImageUrl() != null && !profileInformation.getProfileImageUrl().isEmpty()) {
                try {
                    Path oldImagePath = Paths.get(UPLOAD_DIR).resolve(profileInformation.getProfileImageUrl());
                    if (Files.exists(oldImagePath)) {
                        Files.delete(oldImagePath);
                        logger.info("Old profile image deleted: {}", profileInformation.getProfileImageUrl());
                    }
                } catch (IOException e) {
                    logger.warn("Failed to delete old profile image: {}", e.getMessage());

                }
            }
            String uploadDir = System.getenv("PROFILE_IMAGE_UPLOAD_DIR");
            if (uploadDir == null) {
                uploadDir = UPLOAD_DIR;
            }

            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file
            String fileExtension = getFileExtension(file.getOriginalFilename());
            if (fileExtension.startsWith(".")) {
                fileExtension = fileExtension.substring(1); // Remove the dot
            }
            String newFileName = UUID.randomUUID().toString() + "." + fileExtension;
            Path filePath = uploadPath.resolve(newFileName);
            file.transferTo(filePath.toFile());

            // Update profile with image URL
            profileInformation.setProfileImageUrl(newFileName);
            profileInformationUseCase.updateProfileInformation(id, profileInformation);

            return ResponseEntity.ok(Map.of("message", "تصویر پروفایل با موفقیت بروزرسانی شد"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to update profile image: " + e.getMessage()));
        }
    }

    @GetMapping("/profileImages/{fileName:.+}")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable String fileName) {
        try {
            Path imagePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            if (!Files.exists(imagePath)) {
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);
            return ResponseEntity.ok()
                    .contentType(getMediaType(fileName))
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) return "jpg";
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return filename.substring(lastDotIndex + 1);
        }
        return "jpg"; // Default extension
    }

    private MediaType getMediaType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            default -> MediaType.IMAGE_JPEG;
        };
    }

    @GetMapping("/profileByUserId/{userId}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable Long userId) {
        try {
            Optional<ProfileInformation> profileOpt = profileInformationUseCase.getProfileInformationByUserId(userId);
            logger.info("Profile lookup for user ID {}: Found={}", userId, profileOpt.isPresent());

            if (profileOpt.isPresent()) {
                ProfileInformation profile = profileOpt.get();
                return ResponseEntity.ok(new ProfileInformationResponse(profile));
            } else {
                logger.info("No profile found for user ID: {}", userId);
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("status", "not_found");
                responseMap.put("message", "پروفایل برای این کاربر یافت نشد");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
            }
        } catch (Exception e) {
            logger.error("❌ خطا در دریافت پروفایل برای userId {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("خطای سرور در دریافت اطلاعات پروفایل"));
        }
    }
}