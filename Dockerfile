# Этап сборки
FROM node:18 AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Этап раздачи статики через nginx
FROM nginx:alpine AS production

# Копируем собранные файлы в nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Добавляем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Экспонируем порт для доступа
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
