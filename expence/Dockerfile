FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . .

RUN chmod +x gradlew

RUN ./gradlew build

EXPOSE 8080

CMD ["sh", "-c", "java -jar build/libs/*.jar"]