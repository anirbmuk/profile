import environmentVariables from './variables';

function isNotEmpty(value: unknown) {
  return !!value && (value as string).trim() !== '';
}

export const checkMissingEnvVars = (variables = {}) => {
  const missing = environmentVariables.filter(
    (key) => !isNotEmpty(variables[key]),
  );
  if (missing?.length) {
    throw new Error(
      `The following environment variables are not set up: '${missing.join(
        ', ',
      )}'. Refer to ".env.template" file for the complete list.`,
    );
  }
};
