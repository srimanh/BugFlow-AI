package com.bugflow.repository;

import com.bugflow.model.Bug;
import com.bugflow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BugRepository extends JpaRepository<Bug, Long> {
    List<Bug> findByReportedBy(User user);
    List<Bug> findByAssignedTo(User user);
}
