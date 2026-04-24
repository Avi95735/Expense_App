package com.example.rd.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.rd.DTO.UserDTO;
import com.example.rd.Repository.RepoUser;
import com.example.rd.Service.UserProfileService;
import com.example.rd.entity.UserProfile;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserControl {
      
	@Autowired
	 private final UserProfileService service;
	@Autowired
    private  RepoUser user;

   
	 public UserControl(UserProfileService service, RepoUser user) {
	        this.service = service;
	        this.user = user;
	    }

    // get
    @GetMapping("/getall")
    public List<UserProfile> getData() {
        return user.findAll();
    }

    //  Add User
    @PostMapping("/uadd")
    public UserProfile save(@RequestBody UserProfile s) {
        return user.save(s);
    }

    @GetMapping("/opbal/{userId}")
    public ResponseEntity<UserDTO> getOpeningBalance(@PathVariable("userId") int userId){

        UserDTO dto = service.getOpeningBalance(userId);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }
}