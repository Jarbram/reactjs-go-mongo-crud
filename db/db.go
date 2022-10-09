package db

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func Connect() error {
	mongodb := os.Getenv("MONGODB_URI")

	if mongodb == "" {
		mongodb = "mongodb://localhost:27017/gomongodb"
	}
	var err error

	DB, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodb))
	if err != nil {
		return err
	}
	fmt.Println("Connect to" + mongodb)
	return nil

}
