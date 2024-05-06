phony: ci chroma reset

ci:
	./bin/dev.js fetch https://tracker.alpha.canada.ca/graphql && ./bin/dev.js generate ./schema/tracker-alpha-canada-ca.graphql

chroma:
	@curl -f http://chroma:8000/api/v1/heartbeat

chroma-reset:
	@curl -f -X POST http://chroma:8000/api/v1/reset

reset:
	rm -rf ./data && rm -rf ./queries && rm -rf ./schema

