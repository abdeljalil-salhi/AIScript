all		:	run

.PHONY	:	run
run		:
			@docker-compose down
			@docker-compose up --build

.PHONY	:	cleardb
cleardb	:
			@docker-compose down
			@docker volume prune -f

.PHONY	:	clean
clean	:	cleardb
			@docker network prune -f

.PHONY	:	fclean
fclean	:	clean
			@docker system prune --all --volumes --force

.PHONY	:	re
re		:	fclean all
