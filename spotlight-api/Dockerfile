# Use the standard Microsoft ASP.NET Core container
FROM docker.repo1.uhc.com/reuse/aspnet:3.1

# DIRECTORY where the Microservice will generate logs
RUN mkdir -p /usr/app/log/ \
    && mkdir -p /var/log/supervisord \
    && mkdir -p /var/log/micro-service


WORKDIR /usr/local/filebeat
RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-6.2.4-amd64.deb

RUN dpkg -i filebeat-6.2.4-amd64.deb
COPY filebeat.yml /etc/filebeat/filebeat.yml

RUN apt-get update && apt-get install -y supervisor

# Open permissions on supervisor log
RUN chmod -R a+rwx /var/log/
RUN chmod -R a+rwx /usr/share/filebeat/
RUN chmod -R a+rwx /usr/app/log/
RUN chmod go-w /etc/filebeat/filebeat.yml

# Create app directory
RUN mkdir -p /usr/app/
ENV HOME=/usr/app/
RUN chmod 777 /usr/app

WORKDIR /usr/app

# Copy our code from output folder to the "/app" folder in our container
# Bundle app source
COPY /Api/publishedApp /usr/app

# Expose port for the Web API traffic
ARG WebApiPortNumber=8080
ENV ASPNETCORE_URLS http://+:${WebApiPortNumber}

EXPOSE ${WebApiPortNumber}

USER 1001

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf

