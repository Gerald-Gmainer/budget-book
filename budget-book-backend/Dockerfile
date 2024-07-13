# Stage 1: Build the application using a Gradle image
FROM gradle:7.3.3-jdk17 AS builder

# Set the working directory inside the container
WORKDIR /home/gradle/project

# Copy the Gradle wrapper and build files
COPY gradlew gradlew
COPY build.gradle.kts build.gradle.kts
#COPY settings.gradle.kts settings.gradle.kts
COPY gradle gradle

# Copy the application source code
COPY src src

# Make the Gradle wrapper executable
RUN chmod +x gradlew

# Install JDK 21
RUN apt-get update && apt-get install -y openjdk-21-jdk

# Set JAVA_HOME to JDK 21
RUN export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")

# Verify JAVA_HOME and update PATH
ENV JAVA_HOME=$JAVA_HOME
ENV PATH=$JAVA_HOME/bin:$PATH

# Build the application
RUN ./gradlew build --no-daemon -x test -x integrationTest -x detektIntegrationTest -x detekt

# Stage 2: Create the final image using a JDK base image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar file from the builder stage
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

# Expose the port that the application will run on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]