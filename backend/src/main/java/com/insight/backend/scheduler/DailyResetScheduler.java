package com.insight.backend.scheduler;

import com.insight.backend.service.PostService;
import com.insight.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DailyResetScheduler {
    
    @Autowired
    private PostService postService;
    
    @Autowired
    private UserService userService;
    
    @Scheduled(cron = "0 0 0 * * *") // Run at midnight every day
    public void performDailyReset() {
        try {
            System.out.println("Starting daily reset process...");
            
            // Reset all posts
            postService.resetAllPosts();
            System.out.println("All posts have been reset");
            
            // Update user ranks based on scores
            userService.updateUserRanks();
            System.out.println("User ranks have been updated");
            
            // Check and award achievements
            userService.checkAndAwardAchievements();
            System.out.println("Achievements have been checked and awarded");
            
            System.out.println("Daily reset process completed successfully");
        } catch (Exception e) {
            System.err.println("Error during daily reset: " + e.getMessage());
            e.printStackTrace();
        }
    }
}