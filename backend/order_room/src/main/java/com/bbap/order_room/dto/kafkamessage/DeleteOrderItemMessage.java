package com.bbap.order_room.dto.kafkamessage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteOrderItemMessage {
    private String sessionId;
    private String orderItemId;
}
