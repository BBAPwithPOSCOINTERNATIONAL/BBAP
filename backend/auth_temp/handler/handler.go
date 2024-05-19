package handler

import (
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"pobap-auth/claims"
)

var jwtKey string

func init() {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)

	err := godotenv.Load()
	if err != nil {
		fmt.Println(".env 파일 로딩에 실패했습니다.")
	}

	jwtKey = os.Getenv("JWT_KEY")
}

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/v1/verify", VerifyHandler)
}

func VerifyHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")

	if authHeader == "" {
		// 토큰 없으면 employee id 없이 그냥 리턴만
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	employeeClaim := &claims.Claims{}

	token, err := jwt.ParseWithClaims(tokenString, employeeClaim, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok || token.Header["alg"] != "HS256" {
			log.Printf("알고리즘 확인 실패")
			return nil, fmt.Errorf("토큰 알고리즘이 일치하지 않습니다. %v", token.Header["alg"])
		}
		return []byte(jwtKey), nil
	})

	if err != nil {
		log.Printf("파싱 실패")
		http.Error(w, "정상적이지 않은 요청입니다.", http.StatusInternalServerError)
		return
	}

	if !token.Valid {
		log.Printf("토큰 검증 실패")
		http.Error(w, "허가되지 않은 토큰입니다.", http.StatusUnauthorized)
		return
	}

	w.Header().Set("x-employee-id", strconv.Itoa(employeeClaim.EmployeeId))
}
