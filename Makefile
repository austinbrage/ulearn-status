.PHONY: serve setup-i18n-dev clean-i18n-dev help

LANGS = en es fr it

help: ## Show available commands
	@echo "\033[36mserve\033[0m              Serve static pages locally on port 3001"
	@echo "\033[36msetup-i18n-dev\033[0m     Create lang subdirs with symlinks for i18n testing"
	@echo "\033[36mclean-i18n-dev\033[0m     Remove lang subdirs created by setup-i18n-dev"
	@echo "\033[36mhelp\033[0m               Show available commands"

serve: ## Serve static pages locally on port 3001
	@echo "Serving at http://localhost:3001 — open downtime.html or maintenance.html"
	@python3 -m http.server 3001

setup-i18n-dev: ## Create lang subdirs with symlinks for i18n testing (e.g. /es/downtime.html, /es/maintenance.html)
	@for lang in $(LANGS); do \
		mkdir -p $$lang; \
		ln -sf ../downtime.html $$lang/downtime.html; \
		ln -sf ../maintenance.html $$lang/maintenance.html; \
		ln -sf ../home.html $$lang/home.html; \
		ln -sf ../pricing.html $$lang/pricing.html; \
		ln -sf ../privacy.html $$lang/privacy.html; \
		echo "  $$lang/downtime.html -> ../downtime.html"; \
		echo "  $$lang/maintenance.html -> ../maintenance.html"; \
		echo "  $$lang/home.html -> ../home.html"; \
		echo "  $$lang/pricing.html -> ../pricing.html"; \
	done
	@echo "Ready. Run 'make serve' then open e.g. http://localhost:3001/es/downtime.html or http://localhost:3001/es/maintenance.html"

clean-i18n-dev: ## Remove lang subdirs created by setup-i18n-dev
	@for lang in $(LANGS); do \
		rm -rf $$lang; \
	done
	@echo "Removed lang dirs: $(LANGS)"
