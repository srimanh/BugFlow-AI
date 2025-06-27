package com.bugflow.bugflow_ai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugflow.bugflow_ai.model.ProjectModule;

public interface ProjectModuleRepository extends JpaRepository<ProjectModule, Long> {
}