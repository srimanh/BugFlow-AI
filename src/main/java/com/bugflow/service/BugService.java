package com.bugflow.service;

import com.bugflow.model.Bug;
import com.bugflow.model.User;
import com.bugflow.repository.BugRepository;
import com.bugflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BugService {

    @Autowired
    private BugRepository bugRepository;

    @Autowired
    private UserRepository userRepository;

    public Bug createBug(Bug bug, Long reporterId) {
        User reporter = userRepository.findById(reporterId).orElseThrow();
        bug.setReportedBy(reporter);
        bug.setStatus("OPEN"); // default status
        return bugRepository.save(bug);
    }

    public List<Bug> getBugsReportedBy(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return bugRepository.findByReportedBy(user);
    }

    public List<Bug> getBugsAssignedTo(Long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    if (userOpt.isEmpty()) {
        return Collections.emptyList();
    }
    return bugRepository.findByAssignedTo(userOpt.get());
}

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }
}
