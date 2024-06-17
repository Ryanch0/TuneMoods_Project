package com.Ryan.MyMoodMusic.dto;


import com.Ryan.MyMoodMusic.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private int exprTime;
    private User user;
}
