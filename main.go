package main

import (
	"net/http"

	"go-react-project/frontend"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	frontend.RegisterHandlers(e)
	e.GET("/api", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello world!")
	})
	e.Logger.Fatal(e.Start(":8080"))
}
