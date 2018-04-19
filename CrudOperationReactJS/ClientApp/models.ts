 
export class User{
	id: number;
	Name: string;
	Email: string;
	Address: string;
	PhoneNumber: string;
}
export class JsonResponse {
    Success: boolean;
    Message: string;
    Object: object;
    ValidationErrors ?: ValidationError[];
}
export class ValidationError {
    Key: string
    Value: string
}
