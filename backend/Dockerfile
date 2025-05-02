FROM openjdk:21-jdk-slim
WORKDIR /backend
COPY build/libs/backend-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
CMD ["java", "-jar", "backend.jar"]
