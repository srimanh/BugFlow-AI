package com.bugflow.bugflow_ai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.bugflow.bugflow_ai.model.Bug;
import com.bugflow.bugflow_ai.model.User;

public interface BugRepository extends JpaRepository<Bug, Long> {
    List<Bug> findByReportedBy(User user);
    List<Bug> findByAssignedTo(User user);
}
