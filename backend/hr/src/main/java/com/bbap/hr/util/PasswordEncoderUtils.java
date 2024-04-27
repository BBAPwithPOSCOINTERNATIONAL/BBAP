package com.bbap.hr.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoderUtils {

    private final BCryptPasswordEncoder encoder;

    public PasswordEncoderUtils(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public String encrypt(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public boolean isMatch(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }

}