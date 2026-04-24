package com.example.rd.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.rd.DTO.UserDTO;
import com.example.rd.entity.UserProfile;

@Repository
public interface RepoUser extends JpaRepository<UserProfile, Integer> {
    
    @Query("SELECT new com.example.rd.DTO.UserDTO(u.opbal) FROM UserProfile u WHERE u.id = ?1")

	UserDTO getOpenByUserId(int userId);

}