# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace

# 1. CRITICAL FIX: Copy the necessary Maven files and source code.
# Assuming the file structure is Devops-Task-App/task_api/task_api/pom.xml,
# we need to ensure the correct nested folder is copied.

# Copy the build dependencies from the *inner* Spring Boot project folder
COPY task_api/pom.xml ./
COPY task_api/mvnw ./
COPY task_api/.mvn .mvn

# CRITICAL FIX: Copy the source files from the *inner* Spring Boot project folder
COPY task_api/src ./src 

RUN chmod +x mvnw
# This is the line that will now succeed, finding all sources in ./src/
RUN ./mvnw -B -DskipTests package

# Stage 2: Create the final, lightweight image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
EXPOSE 8080
COPY --from=build /workspace/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
