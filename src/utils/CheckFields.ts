export function CheckFields(fields: string[], objectToVerify: Object) {
    const missingFields: string[] = [];
    fields.forEach(field => {
        if (!(field in objectToVerify)) missingFields.push(field);
    });

    return missingFields;
}