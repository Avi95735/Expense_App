package com.example.rd.DTO;

public class UserDTO {

    private String opbal;   // 👈 small letter (important)

    // ✅ Required constructor
    public UserDTO(String opbal) {
        this.opbal = opbal;
    }

    public String getOpbal() {
        return opbal;
    }

    public void setOpbal(String opbal) {
        this.opbal = opbal;
    }
}