package com.bugflow.bugflow_ai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugflow.bugflow_ai.model.ProjectModule;
import com.bugflow.bugflow_ai.service.ModuleService;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @PostMapping("/create")
    public ResponseEntity<ProjectModule> create(@RequestBody ProjectModule module) {
        return ResponseEntity.ok(moduleService.createModule(module));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectModule>> getAll() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }
}