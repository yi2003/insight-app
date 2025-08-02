package com.insight.backend.service;

import com.insight.backend.model.User;
import com.insight.backend.model.Achievement;
import com.insight.backend.repository.UserRepository;
import com.insight.backend.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AchievementRepository achievementRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User createUser(String username, String email, String password) {
        if (userRepository.existsByUsername(username) || userRepository.existsByEmail(email)) {
            throw new RuntimeException("Username or email already exists");
        }
        
        User user = new User(username, email, passwordEncoder.encode(password));
        user.setJoinedAt(LocalDateTime.now());
        user.setTotalScore(0);
        user.setRank(0);
        user.setPostsCount(0);
        
        return userRepository.save(user);
    }
    
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User findById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public User updateUserScore(Long userId, int scoreChange) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setTotalScore(user.getTotalScore() + scoreChange);
        return userRepository.save(user);
    }
    
    public User incrementPostCount(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setPostsCount(user.getPostsCount() + 1);
        return userRepository.save(user);
    }
    
    public List<User> getTopUsers(int limit) {
        return userRepository.findAllByOrderByTotalScoreDesc().stream()
            .limit(limit)
            .collect(Collectors.toList());
    }
    
    public void updateUserRanks() {
        List<User> users = userRepository.findAllByOrderByTotalScoreDesc();
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            user.setRank(i + 1);
            userRepository.save(user);
        }
    }
    
    public void checkAndAwardAchievements() {
        List<User> users = userRepository.findAll();
        
        for (User user : users) {
            // Check for various achievements
            checkAndAwardFirstPost(user);
            checkAndAwardScoreMilestones(user);
            checkAndAwardPostCountMilestones(user);
            checkAndAwardTopRank(user);
        }
    }
    
    private void checkAndAwardFirstPost(User user) {
        if (user.getPostsCount() >= 1 && !hasAchievement(user, "First Post")) {
            awardAchievement(user, "First Post", "Created your first post", "🎯");
        }
    }
    
    private void checkAndAwardScoreMilestones(User user) {
        int score = user.getTotalScore();
        
        if (score >= 100 && !hasAchievement(user, "Century Club")) {
            awardAchievement(user, "Century Club", "Reached 100 total score", "💯");
        }
        
        if (score >= 500 && !hasAchievement(user, "High Scorer")) {
            awardAchievement(user, "High Scorer", "Reached 500 total score", "🌟");
        }
        
        if (score >= 1000 && !hasAchievement(user, "Score Master")) {
            awardAchievement(user, "Score Master", "Reached 1000 total score", "👑");
        }
    }
    
    private void checkAndAwardPostCountMilestones(User user) {
        int postCount = user.getPostsCount();
        
        if (postCount >= 10 && !hasAchievement(user, "Prolific Poster")) {
            awardAchievement(user, "Prolific Poster", "Created 10 posts", "📝");
        }
        
        if (postCount >= 50 && !hasAchievement(user, "Post Master")) {
            awardAchievement(user, "Post Master", "Created 50 posts", "📚");
        }
    }
    
    private void checkAndAwardTopRank(User user) {
        if (user.getRank() <= 3 && !hasAchievement(user, "Top Performer")) {
            awardAchievement(user, "Top Performer", "Achieved top 3 rank", "🏆");
        }
        
        if (user.getRank() == 1 && !hasAchievement(user, "Rank 1")) {
            awardAchievement(user, "Rank 1", "Achieved the #1 rank", "👑");
        }
    }
    
    private boolean hasAchievement(User user, String achievementName) {
        return user.getAchievements().stream()
            .anyMatch(achievement -> achievement.getName().equals(achievementName));
    }
    
    private void awardAchievement(User user, String name, String description, String icon) {
        Achievement achievement = new Achievement(name, description, icon, user);
        achievementRepository.save(achievement);
        System.out.println("Achievement awarded to " + user.getUsername() + ": " + name);
    }
}