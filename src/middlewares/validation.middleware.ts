import { Request, Response, NextFunction } from "express";

export interface ValidationRule {
  field: string;
  rules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
    isStrongPassword?: boolean;
  }[];
}

export const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];

      for (const r of rule.rules) {
        // Required check
        if (r.required && (!value || (typeof value === "string" && !value.trim()))) {
          errors.push(`${rule.field} is required`);
          continue;
        }

        if (!value) continue;

        // Email validation
        if (r.isEmail) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof value === "string" && !emailRegex.test(value)) {
            errors.push(`${rule.field} must be a valid email`);
          }
        }

        // Min length validation
        if (r.minLength !== undefined) {
          if (typeof value === "string" && value.length < r.minLength) {
            errors.push(`${rule.field} must be at least ${r.minLength} characters`);
          }
        }

        // Max length validation
        if (r.maxLength !== undefined) {
          if (typeof value === "string" && value.length > r.maxLength) {
            errors.push(`${rule.field} must not exceed ${r.maxLength} characters`);
          }
        }

        // Strong password validation
        if (r.isStrongPassword) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (typeof value === "string" && !passwordRegex.test(value)) {
            errors.push(
              `${rule.field} must contain at least 8 characters, one uppercase, one lowercase, one number and one special character`
            );
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};

// Predefined validation rules
export const signupValidationRules = [
  {
    field: "email",
    rules: [
      { required: true },
      { isEmail: true },
      { maxLength: 255 },
    ],
  },
  {
    field: "password",
    rules: [
      { required: true },
      { minLength: 8 },
      { maxLength: 100 },
      { isStrongPassword: true },
    ],
  },
];

export const loginValidationRules = [
  {
    field: "email",
    rules: [
      { required: true },
      { isEmail: true },
    ],
  },
  {
    field: "password",
    rules: [
      { required: true },
    ],
  },
];