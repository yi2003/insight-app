package com.insight.backend.dto;

public class PostRequest {
    private String title;
    private String content;
    private java.util.List<String> tags;

    public PostRequest() {}

    public PostRequest(String title, String content, java.util.List<String> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public java.util.List<String> getTags() { return tags; }
    public void setTags(java.util.List<String> tags) { this.tags = tags; }
}