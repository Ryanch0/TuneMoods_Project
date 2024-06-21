//package com.Ryan.MyMoodMusic.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SwaggerConfig {
//
//    @Bean
//    public GroupedOpenApi customOpenApi() {
//        return GroupedOpenApi.builder()
//                .group("default")
//                .pathsToMatch("/api/**")
//                .build();
//    }
//
//
//    private Info apiInfo() {
//        return new Info()
//                .title("최후통첩 API Test")
//                .description("최후통첩 팀의 제주랑 어플리케이션 API 입니다.")
//                .version("1.0.0");
//    }
//
//}