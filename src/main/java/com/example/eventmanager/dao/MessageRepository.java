package com.example.eventmanager.dao;

import com.example.eventmanager.domain.Message;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@PropertySource("classpath:queries/messages.properties")
@Repository
public class MessageRepository implements CrudRepository<Message> {

    private final NamedParameterJdbcTemplate namedJdbcTemplate;
    private final Environment env;
    private final Logger logger = LogManager.getLogger(MessageRepository.class);

    @Autowired
    public MessageRepository(NamedParameterJdbcTemplate namedJdbcTemplate, Environment env) {
        logger.info("Class initialized");

        this.namedJdbcTemplate = namedJdbcTemplate;
        this.env = env;
    }

    private final class MessageMapper implements RowMapper<Message> {
        @Override
        public Message mapRow(ResultSet resultSet, int rowNum) throws SQLException {
            Message msg = new Message();
            
            msg.setId(resultSet.getLong("id"));
            msg.setChatId(resultSet.getLong("chat_id"));
            msg.setDate(resultSet.getDate("date"));
            msg.setParticipantId(resultSet.getLong("participant_id"));
            msg.setText(resultSet.getString("text"));
            
            return msg;
        }
    }


    @Override
    public Message findOne(Long id) {
		return null;
    }

    @Override
    public Iterable<Message> findAll() {
        return namedJdbcTemplate.query(env.getProperty("findAllEvent"), new MessageMapper());
    }

    @Override
    public void update(Message msg) {
        //
    }

    @Override
    public void delete(Message msg) {
        //
    }


    @Override
    public int save(Message msg) {
        Map<String, Object> namedParams = new HashMap<>();
        namedParams.put("chat_id", msg.getChatId());
        namedParams.put("date", msg.getDate());
        namedParams.put("participant_id", msg.getParticipantId());
        namedParams.put("text", msg.getText());

        return namedJdbcTemplate.update(env.getProperty("save"), namedParams);

    }
}