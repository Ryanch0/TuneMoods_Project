package com.Ryan.MyMoodMusic.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EmotionController {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FLASK_API_URL = "http://localhost:5001/analyze_emotion";

    @PostMapping("/analyze-emotion")
    public ResponseEntity<?> analyzeEmotion(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");

        Map<String, String> request = new HashMap<>();
        request.put("text", text);

        ResponseEntity<Map> response = restTemplate.postForEntity(FLASK_API_URL, request, Map.class);
        return ResponseEntity.ok(response.getBody());
    }
}