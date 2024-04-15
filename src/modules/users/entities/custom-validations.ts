/**
 * validate any alphanumeric
 *
 * @example `anyUSERname` or `any123`
 */
function validateAlphanumericOnly(value: string): boolean {
  const regexp = /^([a-z0-9]*)$/i;

  return regexp.test(value);
}

function validateFirstChar(value: string) {
  const regexp = /^[a-z]$/i;

  return regexp.test(value[0]);
}

/**
 * validate email like: `aNy123.EmAiL123@any.com.ex`
 */
function validateEmail(value: string) {
  const regexp = /^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/i;

  return regexp.test(value);
}

export { validateAlphanumericOnly, validateEmail, validateFirstChar };
