import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/**
 * Custom ESLint rule that enforces the `games` array in games.ts is sorted
 * alphabetically (case-insensitive) by each entry's `name` property.
 * @type {import('eslint').Rule.RuleModule}
 */
const sortedGamesRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce that the games array in games.ts is sorted alphabetically by name',
    },
    schema: [],
    messages: {
      unsorted:
        'Game "{{current}}" should come before "{{previous}}". Keep the games array sorted alphabetically by name.',
    },
  },
  create(context) {
    return {
      'VariableDeclarator[id.name="gameEntries"] > ArrayExpression'(node) {
        const elements = node.elements
        const names = elements
          .map((el) => {
            if (!el || el.type !== 'ObjectExpression') return null
            const nameProp = el.properties.find(
              (p) => p.type === 'Property' && p.key && p.key.name === 'name',
            )
            return nameProp && nameProp.value && nameProp.value.type === 'Literal'
              ? String(nameProp.value.value)
              : null
          })
          .filter(Boolean)

        for (let i = 1; i < names.length; i++) {
          if (names[i - 1].localeCompare(names[i], undefined, { sensitivity: 'base', numeric: true }) > 0) {
            context.report({
              node: elements[i],
              messageId: 'unsorted',
              data: { current: names[i], previous: names[i - 1] },
            })
          }
        }
      },
    }
  },
}

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['src/data/games.ts'],
    plugins: {
      local: { rules: { 'sorted-games': sortedGamesRule } },
    },
    rules: {
      'local/sorted-games': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
)
