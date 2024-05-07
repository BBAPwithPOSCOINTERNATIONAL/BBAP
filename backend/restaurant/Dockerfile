# Build stage
FROM gradle:8.7.0-jdk17-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar --no-daemon

# Package stage
FROM openjdk:17-jdk-alpine

# Set the timezone
RUN apk --no-cache add tzdata \
    && cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime \
    && echo "Asia/Seoul" > /etc/timezone \
    && apk del tzdata


ENV SPRING_PROFILES_ACTIVE=local
COPY --from=build /home/gradle/src/build/libs/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-Dspring.profiles.active=local","-jar","/app/app.jar"]