package main

import (
	"fmt"
	"go-react-crud/config"
	"go-react-crud/db"
	"go-react-crud/routers"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	config.Config()

	if err := db.Connect(); err != nil {
		panic(err)
	}

	app := fiber.New()
	app.Use(cors.New())

	app.Static("/", "./client/dist")
	routers.SetupRouter(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	fmt.Println("Server on port 3000")

	err := app.Listen(":" + port)
	if err != nil {
		panic(err)
	}

}
