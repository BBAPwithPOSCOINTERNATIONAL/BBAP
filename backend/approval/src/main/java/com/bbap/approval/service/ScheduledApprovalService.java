package com.bbap.approval.service;


import com.bbap.approval.repository.ApprovalRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ScheduledApprovalService {

    private final ApprovalRepository approvalRepository;

    @Scheduled(cron = "0 0 0 1 * ?")
    public void changeApprovalToFalse() {
        approvalRepository.updateAllApprovalStatusToFalse();
    }

}
