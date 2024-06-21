package com.Ryan.MyMoodMusic.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set") // 정적 팩토리 메서드 "set"
public class ResponseDto<D> {
    private boolean result; //요청 결과 (성공 or 실패)
    private String message; //응답 메시지
    private D data; //응답 데이터(제네릭 타입)

    //요청이 성공했음을 나타내는 응답 객체를 생성하는 정적 메서드
    public static <D> ResponseDto<D> setSuccess(String message) {
        return ResponseDto.set(true, message,null); // 성공 시 데이터 없이 메시지만 포함
    }

    // 요청이 실패했음을 나타내는 응답 객체를 생성하는 정적 메서드
    public static <D> ResponseDto<D> setFailed(String message) {
        return ResponseDto.set(false, message, null); // 실패 시 데이터 없이 메시지만 포함
    }

    // 요청이 성공했음을 나타내며 데이터도 포함하는 응답 객체를 생성하는 정적 메서드
    public static <D> ResponseDto<D> setSuccessData(String message, D data) {
        return ResponseDto.set(true, message, data); // 성공 시 메시지와 데이터 모두 포함
    }

    // 요청이 실패했음을 나타내며 데이터도 포함하는 응답 객체를 생성하는 정적 메서드
    public static <D> ResponseDto<D> setFailedData(String message, D data) {
        return ResponseDto.set(false, message, data); // 실패 시 메시지와 데이터 모두 포함
    }

    //요청 성공여부 확인
    public boolean getResult() {
        return result;
    }



}
