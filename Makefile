.PHONY: serve help

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

serve: ## Serve static pages locally on port 3001
	@echo "Serving at http://localhost:3001/502.html"
	@python3 -m http.server 3001
