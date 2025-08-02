package com.insight.backend.service;

import com.insight.backend.model.Comment;
import com.insight.backend.model.Post;
import com.insight.backend.model.User;
import com.insight.backend.repository.CommentRepository;
import com.insight.backend.repository.PostRepository;
import com.insight.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Comment createComment(String content, Long postId, Long userId, Long parentCommentId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Comment comment = new Comment(user, post, content);
        
        if (parentCommentId != null) {
            Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }
        
        return commentRepository.save(comment);
    }
    
    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
    }
    
    public List<Comment> getReplies(Long commentId) {
        return commentRepository.findByParentCommentIdOrderByCreatedAtAsc(commentId);
    }
}