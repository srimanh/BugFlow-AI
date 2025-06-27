package com.bugflow.bugflow_ai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugflow.bugflow_ai.model.ProjectModule;
import com.bugflow.bugflow_ai.repository.ProjectModuleRepository;

@Service
public class ModuleService {

    @Autowired
    private ProjectModuleRepository moduleRepo;

    public ProjectModule createModule(ProjectModule module) {
        return moduleRepo.save(module);
    }

    public List<ProjectModule> getAllModules() {
        return moduleRepo.findAll();
    }
}