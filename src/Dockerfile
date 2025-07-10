# Use a Java 17 base image
FROM eclipse-temurin:17-jre

# Set the working directory
WORKDIR /app

# Copy the built jar from the build context
COPY build/libs/bugflow-ai-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
