package com.example.rd.Service;



import org.springframework.stereotype.Service;

import com.example.rd.DTO.TransactionDTO;
import com.example.rd.Repository.RepoUser;
import com.example.rd.Repository.TransactionRepo;
import com.example.rd.entity.Transaction;
import com.example.rd.entity.UserProfile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepo repo;
    private final RepoUser userRepo;

    public TransactionService(TransactionRepo repo, RepoUser userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // CREDIT 
    public void credit(TransactionDTO dto, int userId) {

        UserProfile user = userRepo.findById(userId).orElseThrow();

        double balance = Double.parseDouble(user.getOpbal());
        balance = balance + dto.getAmount();

        user.setOpbal(String.valueOf(balance));
        userRepo.save(user);

        Transaction t = new Transaction();
        t.setUserId(userId);
        t.setDate(dto.getDate());
        t.setNote(dto.getNote());
        t.setAmount(dto.getAmount());
        t.setType("CREDIT");
        t.setRemainingBalance(balance);

        repo.save(t);
    }

    // DEBIT
    public void debit(TransactionDTO dto, int userId) {

        UserProfile user = userRepo.findById(userId).orElseThrow();

        double balance = Double.parseDouble(user.getOpbal());
        balance = balance - dto.getAmount();

        if (balance < 0) {
            throw new RuntimeException("Insufficient Balance");
        }

        user.setOpbal(String.valueOf(balance));
        userRepo.save(user);

        Transaction t = new Transaction();
        t.setUserId(userId);
        t.setDate(dto.getDate());
        t.setNote(dto.getNote());
        t.setAmount(dto.getAmount());
        t.setType("DEBIT");
        t.setRemainingBalance(balance);

        repo.save(t);
    }
    public List<TransactionDTO> getData(int userId) {

        return repo.findByUserId(userId)
                .stream()
                .map(t -> {
                    TransactionDTO dto = new TransactionDTO();
                    dto.setDate(t.getDate());
                    dto.setType(t.getType());
                    dto.setRemainingBalance(t.getRemainingBalance());
                    dto.setNote(t.getNote());
                    dto.setAmount(t.getAmount());
                    dto.setId(t.getId());
                    return dto;
                })
                .toList();
    }
}
