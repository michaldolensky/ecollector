Produkce:
docker-compose -f docker-compose.yml .env --env-file ./config/.env up

Developement:
docker-compose -f docker-compose.dev.yml --env-file ./config/.env.dev up
