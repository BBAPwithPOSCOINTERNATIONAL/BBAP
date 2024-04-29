package com.bbap.hr.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LogoutRequestDto {

    @NotBlank
    private String accessToken;

    @NotBlank
    private String refreshToken;

}