FROM eclipse-temurin:22-jdk-alpine

WORKDIR /app

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
