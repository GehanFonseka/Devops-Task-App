FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace
COPY task_api/pom.xml task_api/mvnw ./
COPY task_api/.mvn .mvn
COPY task_api/src task_api/src
RUN chmod +x mvnw
RUN ./mvnw -B -DskipTests package

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
