import * as Yup from "yup"
export const BaseFormValidationSchema = Yup.object().shape({
    healthcard: Yup.string().min(10, "Enter your 10 digit health card number").max(10, "Only 10 digits").matches(/^[0-9]+$/, "Must be only digits, do not version code"),
    photoFile: Yup.mixed().test("fileType", "Unsupported File Format", (value) => {
        if (value) {
            return (
            value.type === "image/jpeg" ||
            value.type === "image/jpg" ||
            value.type === "image/png" ||
            value.type === "application/pdf"
            );
        } else {
            return true;
        }
    }
  )
    // file: Yup.mixed().test('fileSize', "file size is too large", value => value.size <= 5000)
})