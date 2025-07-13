package com.hollywood.planary.repository;

import com.hollywood.planary.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> { }