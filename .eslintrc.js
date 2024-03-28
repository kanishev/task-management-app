module.exports = {
  env: {
    "node": true,
    "browser": true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
  rules: {
    // Strongly Recommended (Improving Readability)

    "vue/attribute-hyphenation": 'error',
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "below"
    }],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "always",
        "selfClosingTag": {
          "singleline": "never",
          "multiline": "always"
        }
      }
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        "startTag": "never" ,
        "endTag": "never" ,
        "selfClosingTag": "always"
      }
    ],
    "vue/html-end-tags": "error",
    "vue/html-indent": ["error", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    "vue/html-quotes": [ "error", "double" ],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/no-multi-spaces": "error",
    "vue/no-spaces-around-equal-signs-in-attribute": "error",
    "vue/v-slot-style": "error",
    "vue/v-on-style": ["error", "shorthand"],
    "vue/require-prop-types": "warn",
    "vue/require-default-prop": "error",
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/no-v-text-v-html-on-component": "warn",

    // Base Rules (Enabling Correct ESLint Parsing)

    "vue/no-deprecated-v-bind-sync": "error",
    "vue/no-mutating-props" : "error",
    "vue/no-ref-as-operand": "warn",
    "vue/no-side-effects-in-computed-properties": "error",
    "vue/no-use-v-if-with-v-for": "error",
    "vue/require-valid-default-prop": "error",

    // Priority C: Recommended (Potentially Dangerous Patterns)

    "vue/attributes-order": ["error", {
      "order": [
        "DEFINITION",
        "LIST_RENDERING",
        "CONDITIONALS",
        "RENDER_MODIFIERS",
        "GLOBAL",
        "TWO_WAY_BINDING",
        "OTHER_DIRECTIVES",
        "OTHER_ATTR",
        "EVENTS",
        "CONTENT"
      ],
      "alphabetical": false
    }],
    "vue/this-in-template": ["error"]
  }
}