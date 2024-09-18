package com.investment.portfolio.controller;

import com.investment.portfolio.model.Transaction;
import com.investment.portfolio.model.User;
import com.investment.portfolio.repository.TransactionRepository;
import com.investment.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/log")
    public Transaction logTransaction(@RequestBody Transaction transaction) {
        User user = userRepository.findById(transaction.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> viewTransactions(@PathVariable Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}
