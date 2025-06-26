package com.bugflow.bugflow_ai.controller;

import com.bugflow.bugflow_ai.model.Bug;
import com.bugflow.bugflow_ai.service.BugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bugs")
@CrossOrigin
public class BugController {

    @Autowired
    private BugService bugService;

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
}
