package cors

import (
	"net/http"

	"github.com/rs/cors"
)

func Handler(next http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:*", "https://ssafybbap.com", "https://kisok.ssafybbap.com"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		AllowedMethods:   []string{"*"},
	})

	return c.Handler(next)
}
