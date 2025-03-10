package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var db *pgxpool.Pool

//WORKS: gets db access
func  initDB(){
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error with .env file")
	}

	dsn := os.Getenv("DATABASE_URL")
	var errConn error
	db, errConn = pgxpool.New(context.Background(), dsn)
	if errConn != nil{
		log.Fatal("Unable to connect to db: ", errConn)
	}
	log.Println("Connected to db")
}

//WORKS: fetches the words
func getWords(c *gin.Context){
	rows, err := db.Query(context.Background(), "SELECT id, word, translation, example, translationExample, category, pronunciation, picture FROM words")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch words",
			"details": err.Error(),
		})
	return 
	}
	defer rows.Close()

	var words []map[string]interface{}
	for rows.Next(){
		var id int
		var word, translation, category string
		var example, translationExample, pronunciation, picture sql.NullString
		err := rows.Scan(&id, &word, &translation, &example, &translationExample, &category, &pronunciation, &picture)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan words"})
			return
		}

		words = append(words, gin.H{
			"id": id,
			"word": word,
			"translation": translation,
			"example": example.String,
			"translationExample": translationExample.String,
			"category": category,
			"pronunciation": pronunciation.String,
			"picture": picture.String,

		})
	}

	c.JSON(http.StatusOK, words)
}

//WORKS:
func getCategories(c *gin.Context){
	rows, err := db.Query(context.Background(), "SELECT DISTINCT category, translation FROM words WHERE example IS NULL OR example = ''")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch categories",
			"details": err.Error(),
		})
	return
	}
	defer rows.Close()

	var categories []map[string]interface{}
	for rows.Next(){

		var category string
		var translation string

		if err := rows.Scan(&category, &translation); err != nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan categories"})
			return
		}
		categories = append(categories, gin.H{
			"name": category,
			"translation": translation,
		})
	}
	c.JSON(http.StatusOK, categories)
}

//WORKS: entry point
func main(){
	initDB()
	// closes the connection to avoid exhaustion errors
	defer db.Close()
	// initializes Gin router
	router := gin.Default()
	// middleware func ensures the param allows to access the request and response context
	router.Use(func(c *gin.Context) {
		// modifies response with c.Writer
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()	})
	
	// defines the home route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to the Warumungu Dictionary API"})
	})
	// defines the words route
	router.GET("/words", getWords)
	// defines the categories route
	router.GET("/categories", getCategories)
	// starts the server
	router.Run(":8080")
}