package main

import (
	"fmt"
	"go-react-crud/routers"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	app := fiber.New()
	app.Use(cors.New())

	app.Static("/", "./client/public")
	routers.SetupRouter(app)

	fmt.Println("Server on port 3000")

	app.Listen(":" + port)

}
