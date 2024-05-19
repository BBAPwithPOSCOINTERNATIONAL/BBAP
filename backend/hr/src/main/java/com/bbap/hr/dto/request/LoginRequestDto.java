package com.bbap.hr.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequestDto {
    @NotNull
    private String empNo;

    @NotNull
    private String password;

    private String fcmToken;
}
