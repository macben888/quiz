package com.example.quiz.model.DTO;


import com.example.quiz.model.DB.Highscore;
import com.example.quiz.model.DB.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.util.Objects;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class HighscoreDTO extends Highscore {

    private Integer id;
    private User user;
    private int score;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        HighscoreDTO highscore = (HighscoreDTO) o;
        return Objects.equals(id, highscore.getId());
    }

    @Override
    public int hashCode() {
        return 0;
    }

}
