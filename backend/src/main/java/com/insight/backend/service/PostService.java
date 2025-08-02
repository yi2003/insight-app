package com.insight.backend.service;

import com.insight.backend.model.Post;
import com.insight.backend.model.User;
import com.insight.backend.model.Vote;
import com.insight.backend.model.VoteType;
import com.insight.backend.repository.PostRepository;
import com.insight.backend.repository.VoteRepository;
import com.insight.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VoteRepository voteRepository;
    
    @Autowired
    private UserService userService;
    
    public Post createPost(String title, String content, Long authorId, List<String> tags) {
        User author = userRepository.findById(authorId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = now.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        
        List<Post> todayPosts = postRepository.findByUserIdAndDate(authorId, startOfDay, endOfDay);
        if (!todayPosts.isEmpty()) {
            throw new RuntimeException("User has already posted today");
        }
        
        Post post = new Post(title, content, author);
        post.setTags(tags);
        post = postRepository.save(post);
        
        userService.incrementPostCount(authorId);
        
        return post;
    }
    
    public List<Post> getAllPosts() {
        return postRepository.findAllOrderByScoreDesc();
    }
    
    public List<Post> getTopPosts(int limit) {
        return postRepository.findAllOrderByScoreDesc().stream()
            .limit(limit)
            .collect(Collectors.toList());
    }
    
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }
    
    public Post voteOnPost(Long postId, Long userId, VoteType voteType) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Optional<Vote> existingVote = voteRepository.findByUserAndPost(user, post);
        
        if (existingVote.isPresent()) {
            Vote vote = existingVote.get();
            if (vote.getType() == voteType) {
                voteRepository.delete(vote);
                post.setScore(post.getScore() + (voteType == VoteType.UP ? -1 : 1));
            } else {
                vote.setType(voteType);
                voteRepository.save(vote);
                post.setScore(post.getScore() + (voteType == VoteType.UP ? 2 : -2));
            }
        } else {
            Vote newVote = new Vote(user, post, voteType);
            voteRepository.save(newVote);
            post.setScore(post.getScore() + (voteType == VoteType.UP ? 1 : -1));
        }
        
        post = postRepository.save(post);
        
        int scoreChange = voteType == VoteType.UP ? 1 : -1;
        userService.updateUserScore(post.getAuthor().getId(), scoreChange);
        userService.updateUserRanks();
        
        return post;
    }
    
    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByAuthorIdOrderByCreatedAtDesc(userId);
    }
    
    public void resetAllPosts() {
        List<Post> allPosts = postRepository.findAll();
        for (Post post : allPosts) {
            post.setScore(0);
            postRepository.save(post);
        }
    }
}