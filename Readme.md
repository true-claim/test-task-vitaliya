
## Тестовое задание для Back-End разработчиков.
Данное задание будет тестироваться отправкой 10000 запросов в один момент на попытку снять с баланса пользователя по 2 единицы. Успешно должно отработать 5000 запросов, вторая их половина должна получить адекватную ошибку о том, что средств на балансе недостаточно.





Стартануть: 

```bash
  npm run start
```

Ручка: 

```json
  api/balance/update
  {"userId": , "amount": }
```




## Задание 1. Создать простое webApp.

1. Создать простое webApp, используя Node.js (Express, JavaScript), PostgresQL (Sequelize ORM).
2. При запуске приложение должно создать в базе данных таблицу “users” с помощью миграции и добавить в неё один пользовательский аккаунт, на котором будет лишь одно поле “balance” со значением 10000. Для совершения миграций, управляемых приложением, можно использовать библиотеку “Umzug”.
3. Написать route для обновления баланса пользователя, как в большую, так и в меньшую сторону, принимающего параметры userId и amount.
4. Важным условием является то, что баланс пользователя не может быть отрицательным.
5. Изменение баланса должно производиться в реальном времени, без использования очередей и отложенных задач.


### Плохие решения
1. Использование блокировок на уровне транзаций при изменении баланса;

2. Отсутствие хорошей валидации входных данных на ручках;

3. Задача на то, чтобы создать базовое приложение и реализовать в нём функционал (ручку) обновления баланса пользователя, который использовался бы для зачисления и для списания баланса;

4. Отсутствие структуры приложения, в которой должны присутствовать, как минимум Controllers, Services, Migrations + Models (без дублирования структуры таблиц), Middlewares, Validators, Utils (Helpers).