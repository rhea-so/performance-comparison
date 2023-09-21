package main

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Book struct {
	ID      uint `gorm:"primaryKey"`
	Title   string
	Content string
}

func main() {
	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN:                       "root:123qwe@tcp(127.0.0.1:3306)/test?charset=utf8&parseTime=True&loc=Local", // data source name
		DefaultStringSize:         256,                                                                          // default size for string fields
		DisableDatetimePrecision:  true,                                                                         // disable datetime precision, which not supported before MySQL 5.6
		DontSupportRenameIndex:    true,                                                                         // drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB
		DontSupportRenameColumn:   true,                                                                         // `change` when rename column, rename column not supported before MySQL 8, MariaDB
		SkipInitializeWithVersion: false,                                                                        // auto configure based on currently MySQL version
	}), &gorm.Config{})

	if err != nil {
		return
	}

	mysqlDB, err := db.DB()

	mysqlDB.SetConnMaxLifetime(time.Minute * 5)
	mysqlDB.SetMaxIdleConns(5)
	mysqlDB.SetMaxOpenConns(100)

	if err != nil {
		return
	}

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/db", func(c *fiber.Ctx) error {
		// find all book
		books := []Book{}
		db.Find(&books)
		return c.SendString(fmt.Sprintf("%v selected.", len(books)))
	})

	app.Listen(":3000")
}
