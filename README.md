# Robocode
Приложение для создания QR кодов.

С помощью приложения можно создать, сохранить и скачать QR код в нужном формате.
На данный момент есть возомжность закодировать:
- Обычный текст
- URL
- SMS
- Номер телефона
- WIFI
- Визитную карту

На данный момент для хранения сохраненных кодов, приложение использует локальное хранилище браузера.

## Инструменты
Для разработки были использованы
#### React + Material-UI
В качестве инструмента для построения интерфейса пользователя
#### Redux-Toolkit
Для управления состоянием приложения
#### qrcode.js
Для генерации изображения кода
#### React Testing Libary + Jest
Для модульного тестирования

## Запуск
Приложение доступно по [ссылке](https://sviridov-e.github.io/robocode "Robocode")

Для локального запуска необходимо скопировать репозиторий и выполнить
```bash
yarn start
```
Для сборки
```bash
yarn build
```
Для запуска тестов
```bash
yarn test
```
## Планируется в будущем
- Сохранение данных в удаленной базе
- Добавление пользовательских настроек для кода, таких как цвет, размер, форма блоков
- Возможность добавления изображения в код
