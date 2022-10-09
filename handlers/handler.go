package handlers

import (
	"context"
	"fmt"
	"go-react-crud/db"
	"go-react-crud/models"
	"log"

	"github.com/gofiber/fiber/v2"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func PostUser(c *fiber.Ctx) error {
	var user models.User
	c.BodyParser(&user)

	coll := db.DB.Database("gomongodb").Collection("users")
	result, err := coll.InsertOne(context.TODO(), bson.D{{
		Key:   "username",
		Value: user.Username,
	}, {
		Key:   "email",
		Value: user.Email,
	}, {
		Key:   "password",
		Value: user.Password,
	},
	})

	if err != nil {
		panic(err)
	}

	return c.JSON(&fiber.Map{
		"data": result,
	})
}

func GetUser(c *fiber.Ctx) error {
	var users []models.User

	coll := db.DB.Database("gomongodb").Collection("users")
	results, err := coll.Find(context.TODO(), bson.M{})

	if err != nil {
		panic(err)
	}

	for results.Next(context.TODO()) {
		var user models.User
		results.Decode(&user)
		users = append(users, user)
	}

	return c.JSON(&fiber.Map{
		"users": users,
	})
}

func PutUser(c *fiber.Ctx) error {
	var user models.User
	c.BodyParser(&user)

	id := c.Params("id")
	newId, _ := primitive.ObjectIDFromHex(id)

	filter := bson.M{"_id": newId}
	update := bson.M{"$set": bson.M{"username": user.Username, "email": user.Email, "password": user.Password}}

	coll := db.DB.Database("gomongodb").Collection("users")
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Modified count: %v\n", result.ModifiedCount)
	return c.JSON(&fiber.Map{
		"data": result,
	})
}

func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	newId, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": newId}

	fmt.Println(filter)

	coll := db.DB.Database("gomongodb").Collection("users")

	results, err := coll.DeleteOne(context.TODO(), filter)

	if err != nil {
		log.Fatal("DeleteOne ERROR:", err)
	}

	fmt.Printf("Deleted: %v\n", results.DeletedCount)

	return c.JSON(&fiber.Map{
		"data": results,
	})
}
