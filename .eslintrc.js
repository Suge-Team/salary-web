module.exports = {
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
