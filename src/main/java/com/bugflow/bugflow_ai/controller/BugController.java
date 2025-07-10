package com.bugflow.bugflow_ai.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bugflow.bugflow_ai.model.Bug;
import com.bugflow.bugflow_ai.model.User;
import com.bugflow.bugflow_ai.service.BugService;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin
public class BugController {

    @Autowired
    private BugService bugService;

    @PreAuthorize("hasRole('TESTER')")
    @PostMapping("/create")
    public ResponseEntity<?> createBug(@RequestBody Bug bug, @RequestParam Long reporterId) {
        return ResponseEntity.ok(bugService.createBug(bug, reporterId));
    }

    @GetMapping("/reported")
    public ResponseEntity<List<Bug>> getReported(@RequestParam Long userId) {
        return ResponseEntity.ok(bugService.getBugsReportedBy(userId));
    }

    @GetMapping("/assigned")
    public ResponseEntity<List<Bug>> getAssigned(@RequestParam Long userId) {
        return ResponseEntity.ok(bugService.getBugsAssignedTo(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bug>> getAllBugs() {
        return ResponseEntity.ok(bugService.getAllBugs());
    }

    // @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}/assign")
public ResponseEntity<?> assignBug(
    @PathVariable Long id,
    @RequestBody Map<String, Long> payload
) {
    Long assignedTo = payload.get("assignedTo");
    // Call your service to assign the bug
    bugService.assignBug(id, assignedTo);
    return ResponseEntity.ok("Bug assigned successfully");
}

    @PreAuthorize("hasRole('DEVELOPER')")
    @PutMapping("/status")
    public ResponseEntity<?> updateStatus(@RequestParam Long bugId, @RequestParam String status) {
        return ResponseEntity.ok(bugService.updateBugStatus(bugId, status));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(bugService.getAllUsers());
    }
}