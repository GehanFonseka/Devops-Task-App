# Stage 1: Build the Spring Boot application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace

# The build context is Devops-Task-App/task_api
# The actual Maven project is nested in ./task_api
COPY task_api/pom.xml ./
COPY task_api/mvnw ./
COPY task_api/.mvn .mvn
COPY task_api/src ./src

RUN chmod +x mvnw
RUN ./mvnw -B -DskipTests package

# Stage 2: Run the application with a slim JRE image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
EXPOSE 8080
COPY --from=build /workspace/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]