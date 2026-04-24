package com.example.rd.DTO;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TransactionDTO {

	@JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String type; 
    private double remainingBalance;
    private String note;
    private double amount;
    private int id;

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public double getRemainingBalance() {
		return remainingBalance;
	}
	public void setRemainingBalance(double remainingBalance) {
		this.remainingBalance = remainingBalance;
	}

}