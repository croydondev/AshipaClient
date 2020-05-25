FROM maven:3.5.4-jdk-10-slim

LABEL author="Tunji Jabitta"

WORKDIR /mainserver

COPY . /mainserver/

RUN cp /mainserver/*.jar ./app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]