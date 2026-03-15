import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';

/**
 * Custom ESLint rule that enforces the `games` array in games.ts is sorted
 * alphabetically (case-insensitive) by each entry's `name` property.
 * If a `sortName` property is present on an entry, it is used for sorting instead.
 * @type {import('eslint').Rule.RuleModule}
 */
const sortedGamesRule = {
    meta: {
        type: 'suggestion',
        fixable: 'code',
        docs: {
            description: 'Enforce that the games array in games.ts is sorted alphabetically by name',
        },
        schema: [],
        messages: {
            unsorted: 'Game "{{current}}" should come before "{{previous}}". Keep the games array sorted alphabetically by name (use sortName to override the sort key if needed).',
            unsortedWithKeys: 'Game "{{current}}" (sort key: "{{currentKey}}") should come before "{{previous}}" (sort key: "{{previousKey}}"). Keep the games array sorted alphabetically by name (use sortName to override the sort key if needed).',
        },
    },
    create(context) {
        return {
            'VariableDeclarator[id.name="gameEntries"] > ArrayExpression'(node) {
                const elements = node.elements;

                /** @type {{ name: string; sortKey: string; node: import('eslint').Rule.Node }[]} */
                const entries = [];
                for (const el of elements) {
                    if (!el || el.type !== 'ObjectExpression') continue;
                    const nameProp = el.properties.find(
                        (p) => p.type === 'Property' && p.key && p.key.name === 'name',
                    );
                    if (!nameProp || !nameProp.value || nameProp.value.type !== 'Literal') continue;
                    const name = String(nameProp.value.value);
                    const sortNameProp = el.properties.find(
                        (p) => p.type === 'Property' && p.key && p.key.name === 'sortName',
                    );
                    const sortKey =
                        sortNameProp && sortNameProp.value && sortNameProp.value.type === 'Literal'
                            ? String(sortNameProp.value.value)
                            : name;
                    entries.push({ name, sortKey, node: el });
                }

                const sortedEntries = [...entries].sort((a, b) =>
                    a.sortKey.localeCompare(b.sortKey, undefined, { sensitivity: 'base', numeric: true }),
                );

                for (let i = 1; i < entries.length; i++) {
                    const prev = entries[i - 1].sortKey;
                    const curr = entries[i].sortKey;
                    if (prev.localeCompare(curr, undefined, { sensitivity: 'base', numeric: true }) > 0) {
                        const useSortKeys =
                            entries[i].sortKey !== entries[i].name || entries[i - 1].sortKey !== entries[i - 1].name;
                        context.report({
                            node: entries[i].node,
                            messageId: useSortKeys ? 'unsortedWithKeys' : 'unsorted',
                            data: useSortKeys
                                ? {
                                    current: entries[i].name,
                                    currentKey: entries[i].sortKey,
                                    previous: entries[i - 1].name,
                                    previousKey: entries[i - 1].sortKey,
                                }
                                : { current: entries[i].name, previous: entries[i - 1].name },
                            fix(fixer) {
                                const sourceCode = context.sourceCode;
                                return entries.map((entry, j) =>
                                    fixer.replaceText(entry.node, sourceCode.getText(sortedEntries[j].node)),
                                );
                            },
                        });
                    }
                }
            },
        };
    },
};


/**
 * Custom ESLint rule that enforces the `Series` enum in types.ts is sorted
 * alphabetically (case-insensitive) by each member's string value.
 * @type {import('eslint').Rule.RuleModule}
 */
const sortedSeriesEnumRule = {
    meta: {
        type: 'suggestion',
        fixable: 'code',
        docs: {
            description: 'Enforce that the Series enum in types.ts is sorted alphabetically by value',
        },
        schema: [],
        messages: {
            unsorted: 'Series member "{{current}}" should come before "{{previous}}". Keep the Series enum sorted alphabetically by value.',
        },
    },
    create(context) {
        return {
            'TSEnumDeclaration[id.name="Series"]'(node) {
                const members = node.members;

                /** @type {{ value: string; node: import('eslint').Rule.Node }[]} */
                const entries = [];
                for (const member of members) {
                    if (!member.initializer || member.initializer.type !== 'Literal') continue;
                    entries.push({ value: String(member.initializer.value), node: member });
                }

                const sortedEntries = [...entries].sort((a, b) =>
                    a.value.localeCompare(b.value, undefined, { sensitivity: 'base', numeric: true }),
                );

                for (let i = 1; i < entries.length; i++) {
                    const prev = entries[i - 1].value;
                    const curr = entries[i].value;
                    if (prev.localeCompare(curr, undefined, { sensitivity: 'base', numeric: true }) > 0) {
                        context.report({
                            node: entries[i].node,
                            messageId: 'unsorted',
                            data: { current: curr, previous: prev },
                            fix(fixer) {
                                const sourceCode = context.sourceCode;
                                return entries.map((entry, j) =>
                                    fixer.replaceText(entry.node, sourceCode.getText(sortedEntries[j].node)),
                                );
                            },
                        });
                    }
                }
            },
        };
    },
};

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        rules: {
            'eqeqeq': ['error', 'always'],
            'no-console': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },
    {
        files: ['**/*.js', '**/*.ts'],
        plugins: { '@stylistic': stylistic },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/object-curly-spacing': ['error', 'always'],
        },
    },
    {
        files: ['**/*.vue'],
        plugins: { '@stylistic': stylistic },
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
        rules: {
            '@stylistic/indent': 'off',
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4],
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
        files: ['src/types.ts'],
        plugins: {
            local: { rules: { 'sorted-series-enum': sortedSeriesEnumRule } },
        },
        rules: {
            'local/sorted-series-enum': 'error',
        },
    },
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
);
