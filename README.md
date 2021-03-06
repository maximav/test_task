# Application

## Развертывание
1. Собираем контейнеры
`docker-compose -f staging-local.docker-compose.yml build`
2. Запустить контейнеры 
`docker-compose -f staging-local.docker-compose.yml up -d`
3. Авторизация
- логин: start_admin
- пароль: starter12345


## Описание приложения 

Цель приложения - определить навыки исполнителя в использовании систем git, docker и в написании автоматических тестов 
для веб-приложения построенного по принципам микро-сервисной архитектуры, сервисы которого коммутируют используя шину RabbitMQ на стороне backend и Websocket 
на стороне клиента. В приложении схематично реализована работа нескольких сервисов. Функциональность приложения простая, имя загружаемого файла 
разделяется на имя файла и расширение, далее отдельно пишутся в выделенные поля базы данных. Завершив запись обновляется и отображаются результаты на стороне клиента.

Основные компоненты

- Client: [reactjs](https://ru.reactjs.org/), [material-ui](https://material-ui.com/ru/). GUI для пользователей
- Balancer: [nginx](https://nginx.org/ru/). Отвечает за routing запросов от клиента к компонентам системы.
- Real-time notificator: [tornado](https://www.tornadoweb.org/en/stable/), [aio-pika](https://aio-pika.readthedocs.io/en/latest/). Отвечает за обновление данных на клиенте в режиме реального времени.
- API: [django](https://www.djangoproject.com/), [django rest framework](https://www.django-rest-framework.org/). Отвечает за логику приложения, а также является связующим звеном с контроллером.
- Database: [postgres](https://www.postgresql.org/). Основное хранилище данных
- AMQP: [rabbitmq](https://www.rabbitmq.com/). Единая шина коммуникации между сервисами.
- Controller: [django](https://www.djangoproject.com/), [django rest framework](https://www.django-rest-framework.org/).  Отдельный django процесс выполняющий парсинг имени файла и записи данных в БД.

Функциональность

1. Авторизация 
2. Загрузка файла на сервер
3. Проброс сообщений контроллеру используя брокер сообщений rabbitmq 
4. Парсинг имени файла на стороне контроллера. Имя и расширение файла записываются в отдельные поля БД.
5. Обновление состояние клиента в режиме real-time используя websocket

## Задание

Исполнитель сам можем выбирать технологию тестирования. 
Основная задача - максимально обернуть всю функциональность приложения автоматическими тестами.

### Frontend-часть
Выполнить тестирование

1. Авторизация 
2. Выход 
3. Загрузка файла через форму
4. После загрузки файла и обновления таблицы с данными валидность отображаемых данных
5. Тестирование компонентов React

### Backend-часть
Выполнить тестирование

1. Авторизация 
2. Выход 
3. Загрузка файла
4. Отправка сообщения контроллеру через шину rabbitmq
5. Парсинг имени файла контроллером 
6. Запись имени и расширения в БД
7. Отправка websocket уведомлений
8. Валидная работа функции парсинга имени файла

Дополнительное задание по backend-части

9. Тестирование класса Service шины сообщений RabbitMQ
10. Тестирование класса SyncConnection соединения с RabbitMQ

### Результат выполнения задания

Для начала выполнения задания, следует клонировать данный репозиторий в свой вновь созданный проект. По завершению выполнения задачи 
выслать ссылку на репозиторий.