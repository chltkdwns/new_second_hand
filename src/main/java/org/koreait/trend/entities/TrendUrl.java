package org.koreait.trend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Entity
public class TrendUrl {
    @Id
    @Column(length = 150)
    private String siteUrl;
}
