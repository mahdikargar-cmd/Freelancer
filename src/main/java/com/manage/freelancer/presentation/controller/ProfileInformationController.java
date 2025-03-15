package com.manage.freelancer.presentation.controller;

import com.manage.freelancer.application.usecase.ProfileInformationUseCase;
import com.manage.freelancer.domain.entity.ProfileInformation;
import com.manage.freelancer.presentation.response.ProfileInformationResponse;
import com.manage.freelancer.AAA.infrastructure.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class ProfileInformationController {
    private final ProfileInformationUseCase profileInformationUseCase;

    // Define the upload directory - you may want to make this configurable
    private final String UPLOAD_DIR =  "F:\\Uni_project\\Freelancer\\backend\\uploads\\profileImage";
    private static final Logger logger = LoggerFactory.getLogger(ProfileInformationController.class);

    @GetMapping("/getProfileInformation")
    public ResponseEntity<ProfileInformationResponse> getProfileInformation() {
        List<ProfileInformation> lists = profileInformationUseCase.getAllProfileInformation();

        if (lists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new ProfileInformationResponse(lists.get(0)));
    }

    @PostMapping("/createProfileInformation")
    public ResponseEntity<?> createProfileInformation(@RequestBody ProfileInformation profileInformation) {
        try {
            // Validate the required fields
            if (profileInformation.getFirstName() == null || profileInformation.getLastName() == null ||
                    profileInformation.getPhoneNumber() == null || profileInformation.getUser() == null) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            // Check if user with the same phone number already exists
            ProfileInformation existingProfile = profileInformationUseCase.getInformationByPhoneNumber(profileInformation.getPhoneNumber());
            if (existingProfile != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Phone number already in use");
            }

            // Create the profile
            ProfileInformation createdProfile = profileInformationUseCase.createProfileInformation(profileInformation);
            return ResponseEntity.ok(new ProfileInformationResponse(createdProfile));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create profile: " + e.getMessage());
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
                UserEntity existingUser = existingProfile.getUser();
                if (existingUser != null) {
                    UserEntity userWithId = new UserEntity();
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
            return ResponseEntity.ok(new ProfileInformationResponse(updatedProfile));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update profile: " + e.getMessage());
        }
    }

    @DeleteMapping("/DelProfileInformation/{id}")
    public ResponseEntity<Void> deleteProfileInformation(@PathVariable Long id) {
        profileInformationUseCase.deleteProfileInformation(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/uploadProfileImage/{id}")
    public ResponseEntity<?> uploadProfileImage(@PathVariable Long id, @RequestParam("profileImageUrl") MultipartFile file) {
        logger.info("درخواست آپلود فایل برای کاربر: {}", id);
        logger.info("نام فایل دریافت شده: {}", file.getOriginalFilename());

        if (file.isEmpty()) {
            logger.error("فایل دریافت نشد!");
            return ResponseEntity.badRequest().body("فایل ارسال نشده است!");
        }
        try {
            Optional<ProfileInformation> profileInformationOpt = profileInformationUseCase.getProfileInformationById(id);
            if (profileInformationOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            ProfileInformation profileInformation = profileInformationOpt.get();

            // Only allow jpg and png files
            if (!isValidImageFile(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type");
            }

            // Get upload path from environment variables or use default
            String uploadDir = System.getenv("PROFILE_IMAGE_UPLOAD_DIR");
            if (uploadDir == null) {
                uploadDir = UPLOAD_DIR;
            }
            // Create directory if it doesn't exist
// Create directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                try {
                    logger.info("تلاش برای ایجاد مسیر: {}", uploadPath.toAbsolutePath());
                    Files.createDirectories(uploadPath);
                    logger.info("مسیر با موفقیت ایجاد شد: {}", uploadPath.toAbsolutePath());
                } catch (IOException e) {
                    logger.error("خطا در ایجاد مسیر: {} - {}", uploadPath.toAbsolutePath(), e.getMessage());
                    // بهتر است به جای پرتاب مجدد خطا، یک مسیر جایگزین را امتحان کنیم
                    try {
                        // استفاده از مسیر مطلق به جای مسیر نسبی
                        String alternativePath = System.getProperty("user.home") + "/freelancer-uploads/profile-images/";
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

            return ResponseEntity.ok("فایل با موفقیت آپلود شد");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    // Check if the file type is allowed
    private boolean isValidImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.equals("image/jpeg") || contentType.equals("image/png"));
    }

    @PutMapping("/updateProfileImage/{id}")
    public ResponseEntity<?> updateProfileImage(@PathVariable Long id, @RequestParam("profileImageUrl") MultipartFile file) {
        logger.info("درخواست بروزرسانی تصویر پروفایل برای کاربر: {}", id);
        logger.info("نام فایل دریافت شده: {}", file.getOriginalFilename());

        if (file.isEmpty()) {
            logger.error("فایل دریافت نشد!");
            return ResponseEntity.badRequest().body("فایل ارسال نشده است!");
        }

        try {
            Optional<ProfileInformation> profileInformationOpt = profileInformationUseCase.getProfileInformationById(id);
            if (profileInformationOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            ProfileInformation profileInformation = profileInformationOpt.get();

            // Only allow jpg and png files
            if (!isValidImageFile(file)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type");
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

            return ResponseEntity.ok("تصویر پروفایل با موفقیت بروزرسانی شد");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update profile image: " + e.getMessage());
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
        switch (extension) {
            case "png":
                return MediaType.IMAGE_PNG;
            case "gif":
                return MediaType.IMAGE_GIF;
            default:
                return MediaType.IMAGE_JPEG;
        }
    }
}
