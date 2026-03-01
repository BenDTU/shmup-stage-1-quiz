import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/**
 * Converts a roman numeral string to its integer value.
 * @param {string} roman
 * @returns {number}
 */
function romanToInt(roman) {
  const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let result = 0
  for (let i = 0; i < roman.length; i++) {
    const curr = val[roman[i]]
    const next = val[roman[i + 1]]
    if (next && curr < next) {
      result -= curr
    } else {
      result += curr
    }
  }
  return result
}

/**
 * Replaces standalone roman numerals in a string with their decimal equivalents
 * so that titles like "R-Type II" sort as "R-Type 2".
 * @param {string} name
 * @returns {string}
 */
function normalizeRomanNumerals(name) {
  return name.replace(
    /\b(M{1,3}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})|CM|CD|D?C{1,3}(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})|XC|XL|L?X{1,3}(?:IX|IV|V?I{0,3})|IX|IV|V?I{1,3})\b/g,
    (match) => String(romanToInt(match)),
  )
}

/**
 * Custom ESLint rule that enforces the `games` array in games.ts is sorted
 * alphabetically (case-insensitive) by each entry's `name` property,
 * treating roman numerals as numbers.
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
        'Game "{{current}}" should come before "{{previous}}". Keep the games array sorted alphabetically by name (roman numerals treated as numbers).',
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
          const prev = normalizeRomanNumerals(names[i - 1])
          const curr = normalizeRomanNumerals(names[i])
          if (prev.localeCompare(curr, undefined, { sensitivity: 'base', numeric: true }) > 0) {
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
