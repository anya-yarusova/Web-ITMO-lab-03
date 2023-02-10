package com.anyarusova.lab03;

import lombok.Data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
public class Attempt implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private int attempt;
    @Column
    private float x;
    @Column
    private float y;
    @Column
    private float r;
    @Column
    private String result;
    @Column
    private LocalDateTime time;
    @Column
    private Long script_time;

}
