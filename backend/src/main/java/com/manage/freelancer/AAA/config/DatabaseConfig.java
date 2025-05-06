package com.manage.freelancer.AAA.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

  //  @Bean
   // public DataSource dataSource() {
     //   Dotenv dotenv = Dotenv.configure()
       //         .directory(".")
         //       .load();

     //   HikariConfig config = new HikariConfig();
     //   config.setJdbcUrl(dotenv.get("DB_URL"));  // فقط URL از .env
      //  config.setUsername("freelancer");          // مستقیم اینجا
      //  config.setPassword("13521380Mm$$#");

      //  return new HikariDataSource(config);
   // }
}