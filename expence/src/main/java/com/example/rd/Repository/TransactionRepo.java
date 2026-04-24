package com.example.rd.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rd.entity.Transaction;

import java.util.List;

public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByUserId(int userId);

    Transaction findTopByUserIdOrderByIdDesc(int userId);
}
