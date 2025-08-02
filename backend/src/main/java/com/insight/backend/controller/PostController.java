package com.insight.backend.controller;

import com.insight.backend.dto.PostRequest;
import com.insight.backend.dto.VoteRequest;
import com.insight.backend.model.Post;
import com.insight.backend.model.VoteType;
import com.insight.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    
    @Autowired
    private PostService postService;
    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest, @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            Long userId = extractUserIdFromToken(jwt);
            
            Post post = postService.createPost(
                postRequest.getTitle(),
                postRequest.getContent(),
                userId,
                postRequest.getTags()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Post created successfully");
            response.put("post", post);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/{postId}/vote")
    public ResponseEntity<?> voteOnPost(@PathVariable Long postId, 
                                       @RequestBody VoteRequest voteRequest,
                                       @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            Long userId = extractUserIdFromToken(jwt);
            
            VoteType voteType = VoteType.valueOf(voteRequest.getType().toUpperCase());
            
            Post post = postService.voteOnPost(postId, userId, voteType);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vote recorded successfully");
            response.put("post", post);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/top")
    public ResponseEntity<List<Post>> getTopPosts(@RequestParam(defaultValue = "10") int limit) {
        List<Post> posts = postService.getTopPosts(limit);
        return ResponseEntity.ok(posts);
    }
    
    private Long extractUserIdFromToken(String token) {
        return 1L;
    }
}