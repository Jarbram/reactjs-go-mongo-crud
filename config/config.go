package config

import (
	"fmt"

	"github.com/joho/godotenv"
)

// Config func to get env value from key ---
func Config() {
	// load .env file
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Print("Error loading .env file")
	}
}
