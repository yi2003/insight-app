package com.insight.backend.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votes")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VoteType type;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Vote() {
        this.createdAt = LocalDateTime.now();
    }

    public Vote(User user, Post post, VoteType type) {
        this();
        this.user = user;
        this.post = post;
        this.type = type;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }
    
    public VoteType getType() { return type; }
    public void setType(VoteType type) { this.type = type; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}