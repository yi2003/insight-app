package com.insight.backend.controller;

import com.insight.backend.model.User;
import com.insight.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard(@RequestParam(defaultValue = "10") int limit) {
        List<User> topUsers = userService.getTopUsers(limit);
        
        List<Map<String, Object>> leaderboardEntries = topUsers.stream()
            .map(user -> {
                Map<String, Object> userMap = new HashMap<>();
                userMap.put("userId", user.getId());
                userMap.put("username", user.getUsername());
                userMap.put("avatar", user.getAvatar());
                userMap.put("score", user.getTotalScore());
                userMap.put("rank", user.getRank());
                userMap.put("postsCount", user.getPostsCount());
                return userMap;
            })
            .collect(Collectors.toList());
        
        Map<String, Object> leaderboardResponse = new HashMap<>();
        leaderboardResponse.put("leaderboard", leaderboardEntries);
        leaderboardResponse.put("totalUsers", leaderboardEntries.size());
        return ResponseEntity.ok(leaderboardResponse);
    }
    
    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        try {
            User user = userService.findById(userId);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            
            Map<String, Object> profile = new HashMap<>();
            profile.put("id", user.getId());
            profile.put("username", user.getUsername());
            profile.put("email", user.getEmail());
            profile.put("avatar", user.getAvatar());
            profile.put("totalScore", user.getTotalScore());
            profile.put("rank", user.getRank());
            profile.put("postsCount", user.getPostsCount());
            profile.put("joinedAt", user.getJoinedAt());
            profile.put("achievements", user.getAchievements());
            
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "User not found");
            return ResponseEntity.badRequest().body(error);
        }
    }
}