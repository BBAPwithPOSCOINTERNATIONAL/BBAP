package claims

import "github.com/dgrijalva/jwt-go"

type Claims struct {
	EmployeeId int `json:"employeeId"`
	jwt.StandardClaims
}
