    package com.manage.freelancer.AAA.config;

    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.fasterxml.jackson.databind.SerializationFeature;
    import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
    import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import com.fasterxml.jackson.databind.Module;

    @Configuration
    public class JacksonConfig {
        @Bean
        public Module hibernateModule() {
            Hibernate6Module module = new Hibernate6Module();
            return module;
        }

        @Bean
        public ObjectMapper objectMapper() {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            mapper.registerModule(hibernateModule());
            mapper.registerModule(new JavaTimeModule());

            return mapper;
        }
    }