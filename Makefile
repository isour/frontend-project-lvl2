install: install-deps

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run
