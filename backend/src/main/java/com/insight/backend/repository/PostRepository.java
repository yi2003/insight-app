package com.insight.backend.repository;

import com.insight.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorIdOrderByCreatedAtDesc(Long authorId);
    
    @Query("SELECT p FROM Post p WHERE p.author.id = :userId AND p.createdAt >= :startOfDay AND p.createdAt < :endOfDay")
    List<Post> findByUserIdAndDate(@Param("userId") Long userId, @Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
    
    @Query("SELECT p FROM Post p ORDER BY p.score DESC")
    List<Post> findAllOrderByScoreDesc();
}