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
    "vue/v-on-event-hyphenation": ["error", "always"],
    "vue/require-prop-types": "error",
    "vue/require-default-prop": "error",
    "vue/prop-name-casing": ["error", "camelCase"],
  }
}