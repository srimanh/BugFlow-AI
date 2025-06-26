package com.bugflow.bugflow_ai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugflow.bugflow_ai.model.Bug;
import com.bugflow.bugflow_ai.model.User;
import com.bugflow.bugflow_ai.repository.BugRepository;
import com.bugflow.bugflow_ai.repository.UserRepository;

@Service
public class BugService {

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private UserRepository userRepository;

    public Bug createBug(Bug bug, Long reporterId) {
        User reporter = userRepository.findById(reporterId).orElseThrow();
        bug.setReportedBy(reporter);
        bug.setStatus("OPEN"); // Default status
        return bugRepository.save(bug);
    }

    public List<Bug> getBugsReportedBy(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return bugRepository.findByReportedBy(user);
    }

    public List<Bug> getBugsAssignedTo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return bugRepository.findByAssignedTo(user);
    }

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }
}
