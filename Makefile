include .env.local

MIGRATION_PATH=database/migration
DB_URL=mysql://${DB_USER}:${DB_PASSWORD}@tcp(${DB_HOST}:3306)/${DB_DATABASE}

mysql:
	docker run --name user-management-mysql -p 3306:3306 -e MYSQL_DATABASE=user_management -e MYSQL_ROOT_PASSWORD=secret -d mysql:latest

migrate/new:
	migrate create -ext sql -dir "${MIGRATION_PATH}" -seq ${name}

migrate/up:
	migrate -path "${MIGRATION_PATH}" -database "${DB_URL}" -verbose up

migrate/up1:
	migrate -path "${MIGRATION_PATH}" -database "${DB_URL}" -verbose up 1

migrate/down:
	migrate -path "${MIGRATION_PATH}" -database "${DB_URL}" -verbose down

migrate/down1:
	migrate -path "${MIGRATION_PATH}" -database "${DB_URL}" -verbose down 1

.PHONY: mysql migration/new migrate/up migrate/up1 migrate/down migrate/down1