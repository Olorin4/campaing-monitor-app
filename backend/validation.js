// backend/validation.js

export function validateSubscriber(email, name) {
    console.log("Validating:", email, name);

    if (!email || !name)
        return { valid: false, message: "Email and name are required." };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return { valid: false, message: "Invalid email format." };

    if (typeof name !== "string" || name.length < 2 || name.length > 50) {
        return {
            valid: false,
            message: "Name must be between 2-50 characters.",
        };
    }

    const nameRegex = /^[A-Za-z' -]{2,50}$/;
    if (!nameRegex.test(name)) {
        console.log("Name validation failed for:", name);
        return { valid: false, message: "Name contains invalid characters." };
    }

    return { valid: true };
}
