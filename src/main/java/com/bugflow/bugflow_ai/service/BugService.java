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
        System.out.println("Fetching assigned bugs for userId: " + userId);
        User user = userRepository.findById(userId).orElseThrow();
        return bugRepository.findByAssignedTo(user);
    }

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }
    public Bug assignBug(Long bugId, Long developerId) {
        Bug bug = bugRepository.findById(bugId).orElseThrow();
        User developer = userRepository.findById(developerId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        // Optionally, check developer.getRole() here
        bug.setAssignedTo(developer);
        return bugRepository.save(bug);
    }

    public Bug updateBugStatus(Long bugId, String status) {
        Bug bug = bugRepository.findById(bugId).orElseThrow();
        bug.setStatus(status.toUpperCase());
        return bugRepository.save(bug);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
