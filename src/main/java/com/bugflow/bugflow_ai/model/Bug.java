package com.bugflow.bugflow_ai.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String priority; // HIGH, MEDIUM, LOW

    @Column
    private String status;   // OPEN, IN_PROGRESS, FIXED, CLOSED

    private String aiSuggestion; // Optional

    @ManyToOne
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private ProjectModule module;

    // --- Add these setters manually if Lombok is not working ---
    public void setReportedBy(User user) { this.reportedBy = user; }
    public void setAssignedTo(User user) { this.assignedTo = user; }
    public void setStatus(String status) { this.status = status; }
}