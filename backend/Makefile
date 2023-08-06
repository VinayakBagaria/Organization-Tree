# source: https://btree.dev/golang-makefile

.DEFAULT_GOAL := help

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
CYAN   := $(shell tput -Txterm setaf 6)
RESET  := $(shell tput -Txterm sgr0)

## Build Commands
build: ## builds for current OS and architecture
	docker-compose down
	docker-compose build


## Run Commands
server: ## runs the essential services env in Docker
	docker-compose down
	docker-compose up -d api

whole: ## runs the whole env in Docker
	docker-compose down
	docker-compose up -d db
	sleep 4
	docker-compose up api

exec: ## get inside the backend terminal
	docker-compose exec api bash

logs: ## get logs of backend
	docker-compose logs -f api

## Service Commands
services: ## runs the main services required to start an api server: db
	docker-compose down
	docker-compose up -d db


test: ## runs the test cases
	docker-compose down
	docker-compose up -d db
	sleep 4
	docker-compose run api python manage.py test


## Help Commands
.PHONY: help
help: ## shows this help
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-30s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)