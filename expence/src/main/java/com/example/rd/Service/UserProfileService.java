package com.example.rd.Service;

import org.springframework.stereotype.Service;

import com.example.rd.DTO.UserDTO;
import com.example.rd.Repository.RepoUser;

@Service
public class UserProfileService {

    private final RepoUser repo;

    public UserProfileService(RepoUser repo) {
        this.repo = repo;
    }

    public UserDTO getOpeningBalance(int userId) {
        return repo.getOpenByUserId(userId);
    }
}
