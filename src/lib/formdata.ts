export function appendFormData(
  formData: FormData,
  data: Record<
    string,
    string | number | boolean | File | File[] | null | undefined
  >
): void {
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Handle array fields like gallery
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          }
        });
      } else {
        formData.append(key, String(value));
      }
    }
  });
}
