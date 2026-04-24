package com.example.rd.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.rd.Service.TransactionService;
import com.example.rd.DTO.TransactionDTO;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    // ✅ CREDIT
    @PostMapping("/credit/{userId}")
    public String credit(@RequestBody TransactionDTO dto,
                         @PathVariable("userId") int userId) {
        service.credit(dto, userId);
        return "Credit Success";
    }

    // ✅ DEBIT
    @PostMapping("/debit/{userId}")
    public String debit(@RequestBody TransactionDTO dto,
                        @PathVariable("userId") int userId) {
        service.debit(dto, userId);
        return "Debit Success";
    }

    // ✅ GET DATA
    @GetMapping("/{userId}")
    public List<TransactionDTO> get(@PathVariable("userId") int userId) {
        return service.getData(userId);
    }
}