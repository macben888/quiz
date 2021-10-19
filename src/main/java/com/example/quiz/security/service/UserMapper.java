package com.example.quiz.security.service;

import com.example.quiz.security.model.QuizUser;
import com.example.quiz.security.model.UserDTO;

public class UserMapper {

    public QuizUser mapUser(UserDTO user){
        return new QuizUser( user.getUsername(), user.getEmail(), user.getPassword(), user.isOnline(),  user.getHighscores());
    }

    public UserDTO mapUserAndConcealData(QuizUser quizUser){
        return new UserDTO( quizUser.getUsername(), quizUser.isOnline(), quizUser.getHighscores() );
    }

}
