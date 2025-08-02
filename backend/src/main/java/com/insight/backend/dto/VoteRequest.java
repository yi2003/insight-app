package com.insight.backend.dto;

public class VoteRequest {
    private String type;

    public VoteRequest() {}

    public VoteRequest(String type) {
        this.type = type;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}