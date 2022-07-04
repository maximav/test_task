FROM app/app_base
RUN mkdir /app/notifications
WORKDIR /app/notifications

COPY ./requirements.txt /app/notifications/requirements.txt
RUN pip install -r requirements.txt
COPY ./ /app/notifications
