package com.insight.backend.controller;

import com.insight.backend.dto.CommentRequest;
import com.insight.backend.model.Comment;
import com.insight.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    
    @Autowired
    private CommentService commentService;
    
    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody CommentRequest commentRequest,
                                         @RequestParam Long postId,
                                         @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.substring(7);
            Long userId = 1L;
            
            Comment comment = commentService.createComment(
                commentRequest.getContent(),
                postId,
                userId,
                commentRequest.getParentCommentId()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Comment created successfully");
            response.put("comment", comment);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(comments);
    }
    
    @GetMapping("/{commentId}/replies")
    public ResponseEntity<List<Comment>> getReplies(@PathVariable Long commentId) {
        List<Comment> replies = commentService.getReplies(commentId);
        return ResponseEntity.ok(replies);
    }
}