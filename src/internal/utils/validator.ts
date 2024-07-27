export default function Validator(value: any, validators: any[]) {
  const errors: string[] = [];
  for (const validator of validators) {
    const result: any = validator(value);
    if (typeof result === "string") {
      errors.push(result);
    }
  }
  return errors;
}
