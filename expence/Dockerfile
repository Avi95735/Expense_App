# Use Java 21 (matches your Gradle requirement)
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy only required files first (better caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Give permission to gradlew
RUN chmod +x gradlew

# Download dependencies (faster rebuilds)
RUN ./gradlew dependencies --no-daemon

# Now copy full project
COPY src src

# Build project (skip tests to avoid DB error)
RUN ./gradlew build -x test --no-daemon

# Expose port (Render will override with PORT env)
EXPOSE 8080

# Run app
CMD ["java", "-jar", "build/libs/*.jar"]
