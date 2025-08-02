package com.insight.backend.repository;

import com.insight.backend.model.Vote;
import com.insight.backend.model.User;
import com.insight.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByUserAndPost(User user, Post post);
    void deleteByUserAndPost(User user, Post post);
}