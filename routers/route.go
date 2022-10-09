package routers

import (
	"go-react-crud/handlers"

	"github.com/gofiber/fiber/v2"
)

func SetupRouter(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/users", handlers.PostUser)
	api.Get("/users", handlers.GetUser)
	api.Put("/users/:id", handlers.PutUser)
	api.Delete("/users/:id", handlers.DeleteUser)
}
