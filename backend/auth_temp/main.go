package main

import (
	"net/http"
	"pobap-auth/cors"
	"pobap-auth/handler"
)

func main() {
	mux := http.NewServeMux()

	handler.SetupRoutes(mux)

	corsHandler := cors.Handler(mux)
	http.ListenAndServe(":8080", corsHandler)
}
