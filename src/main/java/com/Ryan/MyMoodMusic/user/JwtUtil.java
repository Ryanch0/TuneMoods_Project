package com.Ryan.MyMoodMusic.user;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String secretKeyProperty;

    public static SecretKey key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKeyProperty));
    }

    // JWT 만들어주는 함수
    public static String createToken(Authentication auth) {
        var user = (CustomUser) auth.getPrincipal();
        String jwt = Jwts.builder()
                .claim("username", user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 3600000)) //유효기간 1시간
                .signWith(key)
                .compact();
        return jwt;
    }

    // JWT 까주는 함수
    public static Claims extractToken(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload();
        return claims;
    }

}