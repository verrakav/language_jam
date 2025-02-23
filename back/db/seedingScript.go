package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

// structure for a word
type Word struct {
	Word string `json:"word"`;
	Translation string `json:"translation"`;
	Example string `json:"example"`;
	Category string `json"category"`;
	Pronunciation string `json:"pronunciation"`;
	Picture string `json"picture"`
}

func main(){
	// connects to db using the connection string
	connStr := "postgres://postgres:a%25iLor4*f@localhost:5432/warumungu?sslmode=disable";

	// opens the db connection
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// reads the JSON
	data, err := os.ReadFile("seeds.json")
	if err != nil {
		log.Fatal(err)
	}

	// parses the JSON
	var words []Word
	err = json.Unmarshal(data, &words)
	if err != nil{
		log.Fatal(err)
	}

	// inserts data into the db
	for _, word := range words {
		_, err := db.Exec("INSERT INTO words (word, translation, example, category, pronunciation, picture) Values ($1, $2, $3, $4, $5, $6)", word.Word, word.Translation, word.Example, word.Category, word.Pronunciation, word.Picture)
		if err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println("DB populated")
}