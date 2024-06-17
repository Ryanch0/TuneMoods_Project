package com.Ryan.MyMoodMusic.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
