# Corrected Dockerfile (inside task_api folder)

# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace

# 1. CRITICAL FIX: Reference the files using the task_api/ path, 
# even though the Dockerfile is inside the task_api folder.
# This assumes your docker-compose context is the project root.
COPY task_api/pom.xml ./
COPY task_api/mvnw ./
COPY task_api/.mvn .mvn

# 2. CRITICAL FIX: Copy the source files
COPY task_api/src ./src 

RUN chmod +x mvnw
RUN ./mvnw -B -DskipTests package

# Stage 2: Create the final, lightweight image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
EXPOSE 8080
COPY --from=build /workspace/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]