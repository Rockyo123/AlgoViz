package main

import (
	"algoviz/frontend"
	"net/http"

	"github.com/labstack/echo/v4/middleware"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	frontend.RegisterHandlers(e)
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/api", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello world!")
	})
	e.GET("/ws/", WebsocketHandler)
	e.Logger.Fatal(e.Start(":8080"))
}
