package com.anyarusova.lab03;

import lombok.extern.slf4j.Slf4j;

import javax.faces.context.FacesContext;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
public class DatabaseManager implements Serializable {
    private static final long serialVersionUID = 2L;

    private final String URL = "jdbc:postgresql://localhost:8081/postgres";
    private final String USERNAME = "postgres"; 
    private final String PASSWORD = "";

    private static String checkArea(float x, float y, float r) {
        boolean res =  (x >= 0 && y >= 0 && x * x + y * y <= r * r / 4) ||
                (x <= 0 && y <= 0 && x >= -r  && y >= -r / 2) ||
                (x >= 0 && y <= 0 && y >= x / 2 - r / 2);
        if (res) {
            return  "HIT";
        } else {
            return "MISS";
        }
    }

    public void addAttempt(Attempt attempt) {
            log.info("Adding attempt" + attempt.toString() + "to database");
            long startTime = System.nanoTime();
            attempt.setTime(LocalDateTime.now());
            if (attempt.getR() < 2 || attempt.getR() > 5) {
                return;
            }
            log.info("Checking area");
            if (checkArea(attempt.getX(), attempt.getY(), attempt.getR()).equals("HIT")) {
                attempt.setResult("HIT");
            } else {
                attempt.setResult("MISS");
            }
            attempt.setScript_time((System.nanoTime() - startTime) / 1000);
            try (Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD)) {
                PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO attempt (x, y, r, result, time, script_time) VALUES (?, ?, ?, ?, ?, ?)");
                preparedStatement.setFloat(1, attempt.getX());
                preparedStatement.setFloat(2, attempt.getY());
                preparedStatement.setFloat(3, attempt.getR());
                preparedStatement.setString(4, attempt.getResult());
                preparedStatement.setString(5, attempt.getTime().toString());
                preparedStatement.setLong(6, attempt.getScript_time());
                preparedStatement.executeUpdate();
            } catch (SQLException e) {
                //System.out.println(e.getMessage());
                log.error("Error while adding attempt");
                 // log error for e
                log.error(e.getMessage());
                log.error(e.getSQLState());
                e.printStackTrace();
            }

            FacesContext.getCurrentInstance().getExternalContext().getSessionMap().put("attempt", attempt);
            //System.out.println("Attempt" + attempt.toString() + "added to database");
            log.info("Attempt" + attempt.toString() + "added to database"); // can't find info in log

        }


    public void clearAttempts() {
        try (Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD)) {
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM attempt");
            preparedStatement.executeUpdate();
            preparedStatement.close();
            PreparedStatement preparedStatement1 = connection.prepareStatement("ALTER SEQUENCE attempt_attempt_seq RESTART WITH 1");
            preparedStatement1.executeUpdate();
            preparedStatement1.close();
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
            log.error("Error while clearing attempts", e); // can't find error in log
        }
    }

    public List<Attempt> getAttempts() {
            List<Attempt> attempts = new ArrayList<>();
            try(Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD)) {
                PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM attempt");
                preparedStatement.execute();
                ResultSet resultSet = preparedStatement.getResultSet();
                while (resultSet.next()) {
                    Attempt attempt = new Attempt();
                    attempt.setAttempt(resultSet.getInt(1));
                    attempt.setX(resultSet.getFloat(2));
                    attempt.setY(resultSet.getFloat(3));
                    attempt.setR(resultSet.getFloat(4));
                    attempt.setResult(resultSet.getString(5));
                    attempt.setTime((LocalDateTime.parse(resultSet.getString(6))).withNano(0));
                    attempt.setScript_time(resultSet.getLong(7));
                    attempts.add(attempt);
                }

            } catch (SQLException e) {
                //System.out.println(e.getMessage());
                log.error("Error while getting attempts", e.getMessage()); // can't find error in log
                log.error("SOOOOOOS");
            }
            return attempts;
    }

}

// TODO: залить на гелиос
